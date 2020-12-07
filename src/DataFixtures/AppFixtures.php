<?php

namespace App\DataFixtures;

use App\Entity\Company;
use App\Entity\Customer;
use App\Entity\Estimate;
use App\Entity\Invoice;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    private UserPasswordEncoderInterface $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {

        $faker = Factory::create('fr_FR');
        $date = new \DateTime();

        $company = new Company();
        $company->setRoles(['ROLE_USER'])
                ->setSiret('819 580 523 00100')
                ->setMention1('Devis valable 3 mois')
                ->setPhone('0662710456 - 0606999456')
                ->setEmail('test@test.com')
                ->setAddress('12 chemin de chenevière ')
                ->setPostCode('75010')
                ->setCity('Paris')
                ->setName('Batiment Duchemin')
                ->setFirstname('Pierre')
                ->setLastname('Duchemin')
                ->setPassword($this->encoder->encodePassword($company, 'password'))
        ;
        $manager->persist($company);

        for ($i = 0; $i < 50; $i ++){

            $customer = new Customer();
            $customer->setCompany($company)
                    ->setFirstname($faker->firstName)
                    ->setLastname($faker->lastName)
                    ->setAddress($faker->streetAddress)
                    ->setPostCode($faker->postcode)
                    ->setCity($faker->city)
                    ->setEmail($faker->email)
                    ->setPhone($faker->e164PhoneNumber)
            ;
            $manager->persist($customer);

            for($j = 0; $j < 5; $j ++){
                $estimate = new Estimate();
                $estimate->setCompany($company)
                    ->setTotalHt(mt_rand(1000, 5000))
                    ->setTotalTtc($estimate->getTotalHt())
                    ->setCreatedAt($faker->dateTimeBetween('-12 months', 'now'))
                    ->setReference($date->format('ymdHi'))
                    ->setCustomer($customer)
                    ->setArchive(rand(0, 1))
                    ->setStatus(rand(0, 1))
                ;

                $invoice = new Invoice();
                $invoice->setEstimate($estimate)
                        ->setCompany($company)
                        ->setStatus(Invoice::NON_PAYEE)
                        ->setCustomer($customer)
                        ->setCreatedAt($estimate->getCreatedAt())
                        ->setReference($date->format('ymdHi'))
                        ->setTotalTtc($estimate->getTotalTtc())
                        ->setTotalHt($estimate->getTotalHt())
                        ->setTotalAdvance(0)
                        ->setRemainingCapital($estimate->getTotalTtc())
                        ->setTypeInvoice(Invoice::ATTENTE)
                        ->setMeansPayment('')
                ;
                $manager->persist($invoice);
                $estimate->setInvoice($invoice);
                $manager->persist($estimate);
                }
        }
        $manager->flush();
    }
}
