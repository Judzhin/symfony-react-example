<?php

namespace App\Controller;

use App\Json\Json;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PingController extends AbstractController
{
    #[Route('/ping', name: 'ping')]
    public function index(): Response
    {
        // Example 1
        // $jsonObject = Json::createObjectBuilder()->build();

        $factory = Json::createBuilderFactory();
        // Example 2
        $jsonObject = $factory->createObjectBuilder()
            ->add('firstName', 'John')
            ->add('lastName', 'Smith')
            ->add('age', 25)
            ->add('address', $factory->createArrayBuilder()
                ->add($factory->createObjectBuilder()
                    ->add('streetAddress', '21 2nd Street')
                    ->add('city', 'New York')
                )
            )->build();

        dd($jsonObject->toArray());

        return $this->json([
            'ping' => new \DateTime
        ]);
    }
}
