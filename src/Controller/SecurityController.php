<?php

namespace App\Controller;

use mysql_xdevapi\Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="app_login", methods={"POST"})
     */
    public function login()
    {
        return $this->json([
            'user' => $this->getUser() ? $this->getUser() : null,
        ]);
    }

    /**
     * @Route ("/logout", name="app_logout")
     */
    public function logout()
    {
        throw new Exception("Ne doit pas être atteint");
    }
}