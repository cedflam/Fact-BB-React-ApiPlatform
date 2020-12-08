<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Company;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class PasswordHashSubscriber implements EventSubscriberInterface
{
    // Propriétés
    private UserPasswordEncoderInterface $encoder;

    /**
     * PasswordHashSubscriber constructor.
     * @param UserPasswordEncoderInterface $encoder
     */
    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    /**
     * @return array|array[]
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['hashPassword', EventPriorities::PRE_WRITE]
        ];
    }

    /**
     * @param ViewEvent $event
     */
    public function hashPassword(ViewEvent $event)
    {
        $company = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$company instanceof Company || Request::METHOD_POST !== $method){
            return;
        }

        $company->setPassword($this->encoder->encodePassword($company, $company->getPassword()));
    }
}