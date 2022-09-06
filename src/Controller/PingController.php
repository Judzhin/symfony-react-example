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
            ->add('ping', new \DateTime)
            ->add('data', $factory->createObjectBuilder()
                ->add('firstName', 'John')
                ->add('lastName', 'Smith')
                ->add('age', 25)
                ->add('address', $factory->createObjectBuilder()
                    ->add('streetAddress', '21 2nd Street')
                    ->add('city', 'New York')
                    ->add('state', 'NY')
                    ->add('postalCode', '10021'))
                ->add('phoneNumber', $factory->createArrayBuilder()
                    ->add($factory->createObjectBuilder()
                        ->add('type', 'home')
                        ->add('number', '212 555-1234'))
                    ->add($factory->createObjectBuilder()
                        ->add('type', 'fax')
                        ->add('number', '646 555-4567')))
                ->add('active', true))
            ->build();

        return $this->json($jsonObject->toArray());
    }
}
