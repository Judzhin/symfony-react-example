<?php

namespace App\MessageHandler;

use App\Entity\Task;
use App\Message\TaskDeleteMessage;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;

final class TaskDeleteMessageHandler implements MessageHandlerInterface
{
    /**
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(private EntityManagerInterface $entityManager) {}

    /**
     * @param TaskDeleteMessage $message
     */
    public function __invoke(TaskDeleteMessage $message)
    {
        /** @var Task $task */
        if ($task = $this->entityManager->find(Task::class, $message->getId())) {
            $this->entityManager->remove($task);
            $this->entityManager->flush();
        }
    }
}
