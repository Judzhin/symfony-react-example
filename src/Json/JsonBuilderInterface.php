<?php

namespace App\Json;

use JetBrains\PhpStorm\Pure;

interface JsonBuilderInterface
{
    /**
     * @return JsonObject
     */
    #[Pure] public function build(): JsonObject;
}