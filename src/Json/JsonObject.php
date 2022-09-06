<?php

namespace App\Json;

use JetBrains\PhpStorm\Pure;
use Laminas\Stdlib\ArrayObject;

class JsonObject extends ArrayObject
{
    /**
     * @param $values
     * @return mixed
     */
    public function convert($values): mixed
    {
        if (is_array($values)) {
            $result = [];
            foreach ($values as $item => $value) {
                $result[$item] = $this->convert($value);
            }
            return $result;
        }

        if ($values instanceof JsonBuilderInterface) {
            return $this->convert($values->build()->getArrayCopy());
        }

        if ($values instanceof JsonObject) {
            return $values->getArrayCopy();
        }

        return $values;
    }

    /**
     * @return array
     */
    #[Pure] public function toArray(): array
    {
        return $this->convert($this->getArrayCopy());
    }
}