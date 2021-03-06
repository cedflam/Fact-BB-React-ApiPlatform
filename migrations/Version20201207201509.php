<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201207201509 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE invoice DROP FOREIGN KEY FK_9065174485F23082');
        $this->addSql('ALTER TABLE invoice ADD CONSTRAINT FK_9065174485F23082 FOREIGN KEY (estimate_id) REFERENCES estimate (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE invoice DROP FOREIGN KEY FK_9065174485F23082');
        $this->addSql('ALTER TABLE invoice ADD CONSTRAINT FK_9065174485F23082 FOREIGN KEY (estimate_id) REFERENCES invoice (id)');
    }
}
