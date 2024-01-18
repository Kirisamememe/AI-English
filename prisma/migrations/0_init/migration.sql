-- CreateTable
CREATE TABLE `Definitions` (
    `definition_id` INTEGER NOT NULL AUTO_INCREMENT,
    `meaning_id` INTEGER NOT NULL,
    `definition` TEXT NOT NULL,
    `example` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `order` INTEGER NULL,

    INDEX `Definitions_meaning_id_fkey`(`meaning_id`),
    PRIMARY KEY (`definition_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Meanings` (
    `meaning_id` INTEGER NOT NULL AUTO_INCREMENT,
    `word_id` INTEGER NOT NULL,
    `partOfSpeech` VARCHAR(191) NOT NULL,
    `synonyms` VARCHAR(191) NULL,
    `antonyms` VARCHAR(191) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `order` INTEGER NULL,

    INDEX `Meanings_word_id_fkey`(`word_id`),
    PRIMARY KEY (`meaning_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Words` (
    `word_id` INTEGER NOT NULL AUTO_INCREMENT,
    `word` VARCHAR(191) NOT NULL,
    `phonetic` VARCHAR(191) NULL,

    PRIMARY KEY (`word_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArticleHistory` (
    `article_id` INTEGER NOT NULL AUTO_INCREMENT,
    `article` TEXT NULL,
    `generated_at` DATETIME(0) NULL,

    PRIMARY KEY (`article_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SentencesHistory` (
    `sentences_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sentences` TEXT NULL,
    `generated_at` DATETIME(0) NULL,

    PRIMARY KEY (`sentences_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Definitions` ADD CONSTRAINT `Definitions_meaning_id_fkey` FOREIGN KEY (`meaning_id`) REFERENCES `Meanings`(`meaning_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meanings` ADD CONSTRAINT `Meanings_word_id_fkey` FOREIGN KEY (`word_id`) REFERENCES `Words`(`word_id`) ON DELETE CASCADE ON UPDATE CASCADE;

