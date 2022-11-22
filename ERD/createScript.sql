-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema Rottprototype
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Rottprototype
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Rottprototype` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `Rottprototype` ;

-- -----------------------------------------------------
-- Table `Rottprototype`.`Assignment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rottprototype`.`Assignment` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Title` VARCHAR(45) NULL DEFAULT NULL,
  `Description` VARCHAR(255) NULL DEFAULT NULL,
  `Points` INT NULL DEFAULT '0',
  `Deadline` DATETIME NOT NULL,
  `Type` VARCHAR(45) NOT NULL,
  `Url` VARCHAR(45) NOT NULL,
  `Chapter` INT NULL DEFAULT NULL,
  `Answer` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC) VISIBLE,
  UNIQUE INDEX `Assignmentcol_UNIQUE` (`Url` ASC) VISIBLE,
  UNIQUE INDEX `Title_UNIQUE` (`Title` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `Rottprototype`.`Badge`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rottprototype`.`Badge` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NOT NULL,
  `Description` VARCHAR(255) NULL DEFAULT NULL,
  `Image` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `Rottprototype`.`BadgeMilestone`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rottprototype`.`BadgeMilestone` (
  `Id` INT NOT NULL,
  `Badge_id` INT NOT NULL,
  `Description` VARCHAR(255) NOT NULL,
  `Value` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `Constr_BadgeMilestone_Badge_fk_idx` (`Badge_id` ASC) VISIBLE,
  CONSTRAINT `Constr_BadgeMilestone_Badge_fk`
    FOREIGN KEY (`Badge_id`)
    REFERENCES `Rottprototype`.`Badge` (`Id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `Rottprototype`.`MultiplechoiceOptions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rottprototype`.`MultiplechoiceOptions` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Assignment_id` INT NOT NULL,
  `Name` VARCHAR(255) NOT NULL,
  `Correct` INT NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC) VISIBLE,
  INDEX `Constr_MultiplechoiceOptions_Assignment_fk_idx` (`Assignment_id` ASC) VISIBLE,
  CONSTRAINT `Constr_MultiplechoiceOptions_Assignment_fk`
    FOREIGN KEY (`Assignment_id`)
    REFERENCES `Rottprototype`.`Assignment` (`Id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `Rottprototype`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rottprototype`.`User` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(45) NULL DEFAULT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `AssignmentStreak` INT NULL DEFAULT '0',
  `Points` INT NULL DEFAULT '0',
  `LoginStreak` INT NULL DEFAULT '0',
  `LastLogin` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `Rottprototype`.`User_Assignment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rottprototype`.`User_Assignment` (
  `User_id` INT NOT NULL,
  `Assignment_id` INT NOT NULL,
  `Achieved` INT NULL DEFAULT '0',
  PRIMARY KEY (`User_id`, `Assignment_id`),
  INDEX `Constr_User_assignment_Assignment_fk_idx` (`Assignment_id` ASC) VISIBLE,
  CONSTRAINT `Constr_User_assignment_Assignment_fk`
    FOREIGN KEY (`Assignment_id`)
    REFERENCES `Rottprototype`.`Assignment` (`Id`),
  CONSTRAINT `Constr_User_assignment_User_fk`
    FOREIGN KEY (`User_id`)
    REFERENCES `Rottprototype`.`User` (`Id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `Rottprototype`.`User_Assignment_Answer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rottprototype`.`User_Assignment_Answer` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `User_id` INT NOT NULL,
  `Assignment_id` INT NOT NULL,
  `Answer` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC) VISIBLE,
  INDEX `Constr_UserAssignmentAnswer_User_fk_idx` (`User_id` ASC) VISIBLE,
  INDEX `Constr_UserAssignmentAnswer_Assignment_fk_idx` (`Assignment_id` ASC) VISIBLE,
  CONSTRAINT `Constr_UserAssignmentAnswer_Assignment_fk`
    FOREIGN KEY (`Assignment_id`)
    REFERENCES `Rottprototype`.`Assignment` (`Id`),
  CONSTRAINT `Constr_UserAssignmentAnswer_User_fk`
    FOREIGN KEY (`User_id`)
    REFERENCES `Rottprototype`.`User` (`Id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `Rottprototype`.`User_Badge`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rottprototype`.`User_Badge` (
  `User_id` INT NOT NULL,
  `Badge_id` INT NOT NULL,
  PRIMARY KEY (`User_id`, `Badge_id`),
  INDEX `Constr_UserBadge_Badge_fk_idx` (`Badge_id` ASC) VISIBLE,
  CONSTRAINT `Constr_UserBadge_Badge_fk`
    FOREIGN KEY (`Badge_id`)
    REFERENCES `Rottprototype`.`Badge` (`Id`),
  CONSTRAINT `Constr_UserBadge_User_fk`
    FOREIGN KEY (`User_id`)
    REFERENCES `Rottprototype`.`User` (`Id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
