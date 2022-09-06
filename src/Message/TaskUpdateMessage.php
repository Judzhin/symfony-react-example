<?php

namespace App\Message;

final class TaskUpdateMessage
{
    /**
     * @param int $id
     * @param string $name
     * @param string $description
     */
    public function __construct(
        private int    $id,
        private string $name,
        private string $description
    )
    {
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }
}
