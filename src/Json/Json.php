<?php

namespace App\Json;

use JetBrains\PhpStorm\Pure;

class Json
{
    /**
     * @return JsonObjectBuilder
     */
    public static function createObjectBuilder(): JsonObjectBuilder
    {
        return new JsonObjectBuilder;
    }

    /**
     * @param $options
     * @return JsonBuilderFactory
     */
    #[Pure] public static function createBuilderFactory($options = null): JsonBuilderFactory
    {
        return new JsonBuilderFactory;
    }
}