<?php

namespace App\Json;

interface JsonArrayBuilderInterface
{
    /**
     * @param $value
     * @return $this
     */
    public function add($value): static;
}