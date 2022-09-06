<?php

namespace App\Json;

class JsonObjectBuilder extends AbstractJsonBuilder implements JsonObjectBuilderInterface
{
    /**
     * @param string $name
     * @param $value
     * @return $this
     */
    public function add(string $name, $value): static
    {
        $this->offsetSet($name, $value);
        return $this;
    }
}