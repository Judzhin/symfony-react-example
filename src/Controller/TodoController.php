<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TodoController extends AbstractController
{
    /**
     * @return Response
     */
    #[Route('/todo', name: 'todo')]
    public function index(): Response
    {
        return $this->json([
            'key' => 'value'
        ]);
    }
}
