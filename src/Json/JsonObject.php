<?php

namespace App\Json;

use JetBrains\PhpStorm\Pure;
use Laminas\Stdlib\ArrayObject;

class JsonObject extends ArrayObject
{
    /**
     * @return object|array
     */
    #[Pure] public function toArray(): object|array
    {
        $result = [];
        foreach ($this->getArrayCopy() as $item => $value) {
            if ($value instanceof JsonBuilderInterface) {
                $jsonObject = $value->build();
                $value = $jsonObject->getArrayCopy();
            }
            $result[$item] = $value;
        }

        return $result;
    }
}