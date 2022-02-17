<?php

namespace App\Controller;

use App\Entity\Task;
use App\Repository\TaskRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

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
        return $this->createResponse(self::serialize($task));
    }
}
