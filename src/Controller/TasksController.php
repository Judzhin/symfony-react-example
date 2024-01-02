<?php

namespace App\Controller;

use App\Builder\JsonBuilder;
use App\Entity\Task;
use App\Form\TaskType;
use App\Json\Json;
use App\Message\TaskDeleteMessage;
use App\Message\TaskUpdateMessage;
use App\Repository\TaskRepository;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\ArrayShape;
use JetBrains\PhpStorm\Pure;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/tasks', name: 'tasks')]
class TasksController extends AbstractController
{
    use RestController;

    /**
     * @param EntityManagerInterface $entityManager
     * @param TaskRepository $taskRepository
     */
    public function __construct(
        private EntityManagerInterface $entityManager,
        private TaskRepository         $taskRepository)
    {
    }

    /**
     * @param Task $task
     * @return array
     */
    #[Pure] #[ArrayShape(['id' => "\int|null", 'name' => "string", 'description' => "string"])]
    private static function serialize(Task $task): array
    {
        return $task->toArray();
        //return [
        //    'id' => $task->getId(),
        //    'name' => $task->getName(),
        //    'description' => $task->getDescription(),
        //];
    }

    /**
     * @return JsonResponse
     */
    #[Route('/', name: 'findBy', methods: ['GET'])]
    public function index(): JsonResponse
    {
        // return $this->createResponse(array_map([$this, 'serialize'], $this->taskRepository->findAll()));

        // $builder = new JsonBuilder;
        // $builder->addData(array_map([$this, 'serialize'], $this->taskRepository->findAll()));
        // return $builder->build();

        $factory = Json::createBuilderFactory();
        $jsonObject = $factory->createObjectBuilder()
            ->add('success', true)
            ->add('data', array_map([$this, 'serialize'], $this->taskRepository->findAll()))
            ->build();
        return $this->json($jsonObject->getArrayCopy());
    }

    /**
     * @param Request $request
     * @return Response
     */
    #[Route('/', name: 'persist', methods: ['POST'])]
    public function create(Request $request): Response
    {
        // return $this->createResponse(self::serialize($task));
        $builder = new JsonBuilder;

        try {
            $this->transformJsonBody($request);
            $content = json_decode($request->getContent());

            $form = $this->createForm(TaskType::class);
            // $form->handleRequest($request);
            $form->submit((array)$content);

            if (!$form->isValid()) {

                $builder
                    ->error('Validation error!');
                // $errors = [];

                foreach ($form->getErrors(true, true) as $error) {
                    // $propName = $error->getOrigin()->getName();
                    // $errors[$propName] = $error->getMessage();
                    $builder->addError($error->getOrigin()->getName(), $error->getMessage());
                }

                return $builder
                    ->build();
            }

            $task = (new Task)
                ->setName($content->name)
                ->setDescription($content->description);
            $this->entityManager->persist($task);
            $this->entityManager->flush();
        } catch (\Exception $exception) {
            return $builder
                // ->setStatus($exception->getCode())
                ->error($exception->getMessage())
                ->addError('code', $exception->getCode())
                ->addError('line', $exception->getLine())
                ->addError('file', $exception->getFile())
                ->addError('trace', $exception->getTrace())
                ->build();
        }

        return $builder
            ->addData(self::serialize($task))
            ->success([
                'To-Do has been created!',
                "Task: {$task->getName()}"
            ])
            ->build();
    }

    /**
     * @param Request $request
     * @param int $id
     * @param MessageBusInterface $bus
     * @return JsonResponse
     */
    #[Route('/{id}', name: 'merge', requirements: ['id' => '\d+'], methods: ['PUT'])]
    public function update(Request $request, int $id, MessageBusInterface $bus): JsonResponse
    {
        // Sync mode
        //if (!$task = $this->taskRepository->findOneById($id)) {
        //    return $this->createNotFoundException('Task was not found!');
        //}

        $this->transformJsonBody($request);
        $content = json_decode($request->getContent());

        //$task->setName($content->name);
        //$this->entityManager->flush();

        // Async mode
        $bus->dispatch(new TaskUpdateMessage($id, $content->name, $content->description));

        // return $this->respondWithSuccess('Task was updated!');

        $builder = (new JsonBuilder);
        return $builder
            ->success('Task has been updated.')
            ->build();
    }

    /**
     * @param Request $request
     * @param int $id
     * @param MessageBusInterface $bus
     * @return JsonResponse
     */
    #[Route('/{id}', name: 'remove', requirements: ['id' => '\d+'], methods: ['DELETE'])]
    public function delete(Request $request, int $id, MessageBusInterface $bus): JsonResponse
    {
        //if (!$task = $this->taskRepository->findOneById($id)) {
        //    return $this->createNotFoundException('Task was not found!');
        //}

        // Sync mode
        //$this->entityManager->remove($task);
        //$this->entityManager->flush();

        // Async mode
        $bus->dispatch(new TaskDeleteMessage($id));
        // return $this->respondWithSuccess('Task has been deleted.');

        $builder = (new JsonBuilder);
        return $builder
            ->success('Task has been deleted.')
            ->build();

    }
}
