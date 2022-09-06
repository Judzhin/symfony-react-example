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

    /**
     * @inheritDoc
     *
     * @return JsonObject
     */
    #[Pure] public function build(): JsonObject
    {
        return new JsonObject($this->getArrayCopy());
    }
}