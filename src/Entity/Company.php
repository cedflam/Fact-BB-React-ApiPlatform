<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CompanyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=CompanyRepository::class)
 * @ApiResource(
 *     normalizationContext={
 *          "groups"={"company_read"}
 *     },
 * )
 */
class Company implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"company_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"company_read"})
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"company_read"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"company_read"})
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"company_read"})
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"company_read"})
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"company_read"})
     */
    private $postCode;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"company_read"})
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"company_read"})
     */
    private $phone;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"company_read"})
     */
    private $siret;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"company_read"})
     */
    private $rcs;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $mention1;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"company_read"})
     */
    private $mention2;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"company_read"})
     */
    private $mention3;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"company_read"})
     */
    private $mention4;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"company_read"})
     */
    private $mention5;

    /**
     * @ORM\OneToMany(targetEntity=Customer::class, mappedBy="company")
     *
     */
    private $customers;

    /**
     * @ORM\OneToMany(targetEntity=Estimate::class, mappedBy="company")
     */
    private $estimates;

    /**
     * @ORM\OneToMany(targetEntity=Invoice::class, mappedBy="company")
     */
    private $invoices;

    public function __construct()
    {
        $this->customers = new ArrayCollection();
        $this->estimates = new ArrayCollection();
        $this->invoices = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getPostCode(): ?string
    {
        return $this->postCode;
    }

    public function setPostCode(string $postCode): self
    {
        $this->postCode = $postCode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getSiret(): ?string
    {
        return $this->siret;
    }

    public function setSiret(string $siret): self
    {
        $this->siret = $siret;

        return $this;
    }

    public function getRcs(): ?string
    {
        return $this->rcs;
    }

    public function setRcs(?string $rcs): self
    {
        $this->rcs = $rcs;

        return $this;
    }

    public function getMention1(): ?string
    {
        return $this->mention1;
    }

    public function setMention1(?string $mention1): self
    {
        $this->mention1 = $mention1;

        return $this;
    }

    public function getMention2(): ?string
    {
        return $this->mention2;
    }

    public function setMention2(?string $mention2): self
    {
        $this->mention2 = $mention2;

        return $this;
    }

    public function getMention3(): ?string
    {
        return $this->mention3;
    }

    public function setMention3(?string $mention3): self
    {
        $this->mention3 = $mention3;

        return $this;
    }

    public function getMention4(): ?string
    {
        return $this->mention4;
    }

    public function setMention4(?string $mention4): self
    {
        $this->mention4 = $mention4;

        return $this;
    }

    public function getMention5(): ?string
    {
        return $this->mention5;
    }

    public function setMention5(?string $mention5): self
    {
        $this->mention5 = $mention5;

        return $this;
    }

    /**
     * @return Collection|Customer[]
     */
    public function getCustomers(): Collection
    {
        return $this->customers;
    }

    public function addCustomer(Customer $customer): self
    {
        if (!$this->customers->contains($customer)) {
            $this->customers[] = $customer;
            $customer->setCompany($this);
        }

        return $this;
    }

    public function removeCustomer(Customer $customer): self
    {
        if ($this->customers->removeElement($customer)) {
            // set the owning side to null (unless already changed)
            if ($customer->getCompany() === $this) {
                $customer->setCompany(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Estimate[]
     */
    public function getEstimates(): Collection
    {
        return $this->estimates;
    }

    public function addEstimate(Estimate $estimate): self
    {
        if (!$this->estimates->contains($estimate)) {
            $this->estimates[] = $estimate;
            $estimate->setCompany($this);
        }

        return $this;
    }

    public function removeEstimate(Estimate $estimate): self
    {
        if ($this->estimates->removeElement($estimate)) {
            // set the owning side to null (unless already changed)
            if ($estimate->getCompany() === $this) {
                $estimate->setCompany(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Invoice[]
     */
    public function getInvoices(): Collection
    {
        return $this->invoices;
    }

    public function addInvoice(Invoice $invoice): self
    {
        if (!$this->invoices->contains($invoice)) {
            $this->invoices[] = $invoice;
            $invoice->setCompany($this);
        }

        return $this;
    }

    public function removeInvoice(Invoice $invoice): self
    {
        if ($this->invoices->removeElement($invoice)) {
            // set the owning side to null (unless already changed)
            if ($invoice->getCompany() === $this) {
                $invoice->setCompany(null);
            }
        }

        return $this;
    }
}
