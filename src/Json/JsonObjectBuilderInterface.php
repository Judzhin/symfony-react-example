<?php

namespace App\Json;

interface JsonObjectBuilderInterface extends JsonBuilderInterface
{
    /**
     * @param string $name
     * @param $value
     * @return $this
     */
    public function add(string $name, $value): static;
}