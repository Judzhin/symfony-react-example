<?php

namespace App\Json;

use JetBrains\PhpStorm\Pure;

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

    /**
     * @return JsonObject
     */
    #[Pure] public function build(): JsonObject
    {
        $result = new JsonObject;
        foreach ($this->getArrayCopy() as $key => $value) {
            if ($value instanceof JsonBuilderInterface) {
                $value = $value->build();
            }
            $result[$key] = $value;
        }
        return $result;
    }
}