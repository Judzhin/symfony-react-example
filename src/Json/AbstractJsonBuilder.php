<?php

namespace App\Json;

use Laminas\Stdlib\ArrayObject;

abstract class AbstractJsonBuilder extends ArrayObject implements JsonBuilderInterface
{
    /**
     * @param string $name
     * @return $this
     */
    public function addNull(string $name): static
    {
        $this->offsetSet($name, null);
        return $this;
    }
}