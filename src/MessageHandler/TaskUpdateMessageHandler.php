<?php

namespace App\MessageHandler;

use App\Entity\Task;
use App\Message\TaskUpdateMessage;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;

final class TaskUpdateMessageHandler implements MessageHandlerInterface
{
    /**
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(private EntityManagerInterface $entityManager) {}

    /**
     * @param TaskUpdateMessage $message
     */
    public function __invoke(TaskUpdateMessage $message)
    {
        /** @var Task $task */
        if ($task = $this->entityManager->find(Task::class, $message->getId())) {
            $task
                ->setName($message->getName())
                ->setDescription($message->getDescription())
            ;
            $this->entityManager->flush();
        }
    }
}
