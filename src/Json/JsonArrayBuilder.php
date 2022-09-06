<?php

namespace App\Json;

use JetBrains\PhpStorm\Pure;

class JsonArrayBuilder extends AbstractJsonBuilder implements JsonArrayBuilderInterface
{
    /**
     * @param $value
     * @return $this
     */
    public function add($value): static
    {
        $this->append($value);
        return $this;
    }
}