<?php

namespace App\Json;

use JetBrains\PhpStorm\Pure;

class JsonBuilderFactory
{
    /**
     * @return JsonObjectBuilderInterface
     */
    #[Pure] public function createObjectBuilder(): JsonObjectBuilderInterface
    {
        return new JsonObjectBuilder;
    }

    /**
     * @return JsonArrayBuilderInterface
     */
    #[Pure] public function createArrayBuilder(): JsonArrayBuilderInterface
    {
        return new JsonArrayBuilder;
    }
}