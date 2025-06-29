-- MySQL Script generated by MySQL Workbench
-- Sun Jun 15 22:29:48 2025
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_projekt-sem4-agh
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `db_projekt-sem4-agh` ;

-- -----------------------------------------------------
-- Schema db_projekt-sem4-agh
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_projekt-sem4-agh` DEFAULT CHARACTER SET utf8 COLLATE utf8_polish_ci ;
USE `db_projekt-sem4-agh` ;

-- -----------------------------------------------------
-- Table `db_projekt-sem4-agh`.`address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_projekt-sem4-agh`.`address` ;

CREATE TABLE IF NOT EXISTS `db_projekt-sem4-agh`.`address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(255) NOT NULL,
  `postcode` VARCHAR(255) NOT NULL,
  `street` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_projekt-sem4-agh`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_projekt-sem4-agh`.`users` ;

CREATE TABLE IF NOT EXISTS `db_projekt-sem4-agh`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `surname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `address_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_address_idx` (`address_id` ASC),
  CONSTRAINT `fk_users_address`
    FOREIGN KEY (`address_id`)
    REFERENCES `db_projekt-sem4-agh`.`address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_projekt-sem4-agh`.`companies`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_projekt-sem4-agh`.`companies` ;

CREATE TABLE IF NOT EXISTS `db_projekt-sem4-agh`.`companies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `nip` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `address_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_companies_address1_idx` (`address_id` ASC),
  CONSTRAINT `fk_companies_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `db_projekt-sem4-agh`.`address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_projekt-sem4-agh`.`transactions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_projekt-sem4-agh`.`transactions` ;

CREATE TABLE IF NOT EXISTS `db_projekt-sem4-agh`.`transactions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `timestamp` DATETIME NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `postcode` VARCHAR(255) NOT NULL,
  `street` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_transactions_users1_idx` (`user_id` ASC),
  CONSTRAINT `fk_transactions_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `db_projekt-sem4-agh`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_projekt-sem4-agh`.`product_transaction`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_projekt-sem4-agh`.`product_transaction` ;

CREATE TABLE IF NOT EXISTS `db_projekt-sem4-agh`.`product_transaction` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `transaction_id` INT NOT NULL,
  `product_company_id` INT NOT NULL,
  `product_id` VARCHAR(255) NOT NULL,
  `variant_id` VARCHAR(255) NOT NULL,
  `product_count` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_transaction_transactions1_idx` (`transaction_id` ASC),
  INDEX `fk_product_transaction_companies1_idx` (`product_company_id` ASC),
  CONSTRAINT `fk_product_transaction_transactions1`
    FOREIGN KEY (`transaction_id`)
    REFERENCES `db_projekt-sem4-agh`.`transactions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_transaction_companies1`
    FOREIGN KEY (`product_company_id`)
    REFERENCES `db_projekt-sem4-agh`.`companies` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_projekt-sem4-agh`.`cart`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_projekt-sem4-agh`.`cart` ;

CREATE TABLE IF NOT EXISTS `db_projekt-sem4-agh`.`cart` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `product_id` VARCHAR(255) NOT NULL,
  `variant_id` VARCHAR(255) NOT NULL,
  `count` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cart_users1_idx` (`user_id` ASC),
  CONSTRAINT `fk_cart_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `db_projekt-sem4-agh`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_projekt-sem4-agh`.`product_reviews`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_projekt-sem4-agh`.`product_reviews` ;

CREATE TABLE IF NOT EXISTS `db_projekt-sem4-agh`.`product_reviews` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` VARCHAR(255) NOT NULL,
  `variant_id` VARCHAR(255) NOT NULL,
  `user_id` INT NOT NULL,
  `content` TEXT NOT NULL,
  `rating` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_reviews_users1_idx` (`user_id` ASC),
  CONSTRAINT `fk_product_reviews_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `db_projekt-sem4-agh`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
