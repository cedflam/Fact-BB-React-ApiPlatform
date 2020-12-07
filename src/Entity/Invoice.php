<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\InvoiceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=InvoiceRepository::class)
 * @ApiResource()
 */
class Invoice
{
    const PAYEE = true;
    const NON_PAYEE = false;
    const ATTENTE = 'attente';
    const FINALE = 'finale';
    const ACOMPTE = 'acompte';
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     */
    private $totalHt;

    /**
     * @ORM\Column(type="float")
     */
    private $totalTtc;

    /**
     * @ORM\Column(type="float")
     */
    private $totalAdvance;

    /**
     * @ORM\Column(type="boolean")
     */
    private $status;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $typeInvoice;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $reference;

    /**
     * @ORM\Column(type="float")
     */
    private $remainingCapital;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $meansPayment;

    /**
     * @ORM\ManyToOne(targetEntity=Company::class, inversedBy="invoices")
     */
    private $company;

    /**
     * @ORM\ManyToOne(targetEntity=Customer::class, inversedBy="invoices")
     */
    private $customer;

    /**
     * @ORM\OneToMany(targetEntity=Advance::class, mappedBy="invoice")
     */
    private $advances;

    /**
     * @ORM\OneToOne(targetEntity=Estimate::class, inversedBy="invoice", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $estimate;



    public function __construct()
    {
        $this->advances = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTotalHt(): ?float
    {
        return $this->totalHt;
    }

    public function setTotalHt(float $totalHt): self
    {
        $this->totalHt = $totalHt;

        return $this;
    }

    public function getTotalTtc(): ?float
    {
        return $this->totalTtc;
    }

    public function setTotalTtc(float $totalTtc): self
    {
        $this->totalTtc = $totalTtc;

        return $this;
    }

    public function getTotalAdvance(): ?float
    {
        return $this->totalAdvance;
    }

    public function setTotalAdvance(float $totalAdvance): self
    {
        $this->totalAdvance = $totalAdvance;

        return $this;
    }

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getTypeInvoice(): ?string
    {
        return $this->typeInvoice;
    }

    public function setTypeInvoice(string $typeInvoice): self
    {
        $this->typeInvoice = $typeInvoice;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getReference(): ?string
    {
        return $this->reference;
    }

    public function setReference(string $reference): self
    {
        $this->reference = $reference;

        return $this;
    }

    public function getRemainingCapital(): ?float
    {
        return $this->remainingCapital;
    }

    public function setRemainingCapital(float $remainingCapital): self
    {
        $this->remainingCapital = $remainingCapital;

        return $this;
    }

    public function getMeansPayment(): ?string
    {
        return $this->meansPayment;
    }

    public function setMeansPayment(?string $meansPayment): self
    {
        $this->meansPayment = $meansPayment;

        return $this;
    }

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(?Company $company): self
    {
        $this->company = $company;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    /**
     * @return Collection|Advance[]
     */
    public function getAdvances(): Collection
    {
        return $this->advances;
    }

    public function addAdvance(Advance $advance): self
    {
        if (!$this->advances->contains($advance)) {
            $this->advances[] = $advance;
            $advance->setInvoice($this);
        }

        return $this;
    }

    public function removeAdvance(Advance $advance): self
    {
        if ($this->advances->removeElement($advance)) {
            // set the owning side to null (unless already changed)
            if ($advance->getInvoice() === $this) {
                $advance->setInvoice(null);
            }
        }

        return $this;
    }

    public function getEstimate(): ?Estimate
    {
        return $this->estimate;
    }

    public function setEstimate(Estimate $estimate): self
    {
        $this->estimate = $estimate;

        return $this;
    }
}
