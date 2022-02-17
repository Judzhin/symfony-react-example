<?php

namespace App\Message;

final class TaskUpdateMessage
{
    /**
     * @param int $id
     * @param string $name
     */
    public function __construct(private int $id, private string $name)
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
}
