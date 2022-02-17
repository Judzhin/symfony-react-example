<?php

namespace App\Controller;

use App\Entity\Task;
use App\Repository\TaskRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
     * @param SerializerInterface $serializer
     */
    public function __construct(private EntityManagerInterface $entityManager, private TaskRepository $taskRepository)
    {
    }

    /**
     * @return Response
     */
    #[Route('/', name: 'findBy')]
    public function index(): Response
    {
        return $this->createResponse(array_map([$this, 'serialize'], $this->taskRepository->findAll()));
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
}
