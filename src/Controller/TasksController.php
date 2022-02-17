<?php

namespace App\Controller;

use App\Builder\JsonResponseBuilder;
use App\Entity\Task;
use App\Message\TaskDeleteMessage;
use App\Message\TaskUpdateMessage;
use App\Repository\TaskRepository;
use Doctrine\ORM\EntityManagerInterface;
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
    public function __construct(private EntityManagerInterface $entityManager, private TaskRepository $taskRepository)
    {
    }

    /**
     * @param Task $task
     * @return array
     */
    private static function serialize(Task $task): array {
        return [
            'id' => $task->getId(),
            'name' => $task->getName(),
        ];
    }

    /**
     * @return Response
     */
    #[Route('/', name: 'findBy', methods: ['GET'])]
    public function index(): Response
    {
        return $this->createResponse(array_map([$this, 'serialize'], $this->taskRepository->findAll()));
    }

    /**
     * @param Request $request
     * @return Response
     */
    #[Route('/', name: 'persist', methods: ['POST'])]
    public function create(Request $request): Response
    {
        $this->transformJsonBody($request);
        $content = json_decode($request->getContent());
        $task = (new Task)->setName($content->name);
        $this->entityManager->persist($task);
        $this->entityManager->flush();

        // return $this->createResponse(self::serialize($task));

        $jsonBuilder = new JsonResponseBuilder;
        $jsonBuilder->addData('todo', self::serialize($task));
        return $jsonBuilder->build();
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
        $bus->dispatch(new TaskUpdateMessage($id, $content->name));

        // return $this->respondWithSuccess('Task was updated!');

        $jsonBuilder = (new JsonResponseBuilder)->success('Task was updated!');
        return $jsonBuilder->build();
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

        $jsonBuilder = (new JsonResponseBuilder)->success('Task has been deleted.');
        return $jsonBuilder->build();

    }
}
