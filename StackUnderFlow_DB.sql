-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: webprodb
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comm_id` int NOT NULL AUTO_INCREMENT,
  `comm_content` text NOT NULL,
  `post_id` int NOT NULL,
  `mem_id` int DEFAULT NULL,
  `comm_vote` int DEFAULT '0',
  `comm_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `accept` int DEFAULT '0',
  PRIMARY KEY (`comm_id`),
  KEY `comm_post_id_idx` (`post_id`),
  KEY `comm_mem_id_idx` (`mem_id`),
  CONSTRAINT `comm_mem_id` FOREIGN KEY (`mem_id`) REFERENCES `member` (`mem_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comm_post_id` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=163 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `follow_id` int NOT NULL AUTO_INCREMENT,
  `mem_id` int NOT NULL,
  `followby_id` int NOT NULL,
  PRIMARY KEY (`follow_id`),
  KEY `follow_mem_id_fk_idx` (`mem_id`),
  CONSTRAINT `follow_member_mem_id_fk` FOREIGN KEY (`mem_id`) REFERENCES `member` (`mem_id`)
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `mem_id` int NOT NULL AUTO_INCREMENT,
  `mem_fname` varchar(255) DEFAULT NULL,
  `mem_lname` varchar(255) DEFAULT NULL,
  `mem_email` varchar(255) DEFAULT NULL,
  `mem_user_name` varchar(255) DEFAULT NULL,
  `mem_password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT 'user',
  `reputation` int DEFAULT '0',
  `mem_pic` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`mem_id`),
  UNIQUE KEY `mem_email_UNIQUE` (`mem_email`),
  UNIQUE KEY `mem_user_name` (`mem_user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_title` varchar(255) NOT NULL,
  `post_desc` varchar(255) DEFAULT NULL,
  `mem_id` int NOT NULL,
  `tag_id` int NOT NULL,
  `post_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `post_vote` int DEFAULT '0',
  PRIMARY KEY (`post_id`),
  KEY `post_mem_id_idx` (`mem_id`),
  KEY `post_tag_id` (`tag_id`),
  CONSTRAINT `post_mem_id` FOREIGN KEY (`mem_id`) REFERENCES `member` (`mem_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `post_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reply_comment`
--

DROP TABLE IF EXISTS `reply_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reply_comment` (
  `reply_id` int NOT NULL AUTO_INCREMENT,
  `comm_id` int NOT NULL,
  `post_id` int NOT NULL,
  `reply_content` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `mem_id` int DEFAULT NULL,
  `reply_create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reply_id`),
  KEY `reply_comm_id_fk` (`comm_id`),
  KEY `reply_post_id_fk` (`post_id`),
  KEY `reply_mem_id_fk` (`mem_id`),
  CONSTRAINT `reply_comm_id_fk` FOREIGN KEY (`comm_id`) REFERENCES `comment` (`comm_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reply_mem_id_fk` FOREIGN KEY (`mem_id`) REFERENCES `member` (`mem_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reply_post_id_fk` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `report_content` text NOT NULL,
  `post_id` int DEFAULT NULL,
  `status` enum('Pending','Guilty','Innocent') NOT NULL DEFAULT 'Pending',
  `mem_id` int DEFAULT NULL,
  PRIMARY KEY (`report_id`),
  KEY `report_post_id_idx` (`post_id`),
  KEY `report_mem_id_fk_idx` (`mem_id`),
  CONSTRAINT `report_mem_id_fk` FOREIGN KEY (`mem_id`) REFERENCES `member` (`mem_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) NOT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vote_comment`
--

DROP TABLE IF EXISTS `vote_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vote_comment` (
  `vote_comment_id` int NOT NULL AUTO_INCREMENT,
  `mem_id` int NOT NULL,
  `comm_id` int NOT NULL,
  `vote_status` enum('up','down','mid') COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`vote_comment_id`),
  KEY `like_comment_mem_id_fk` (`mem_id`),
  KEY `like_post_comm_id_fk` (`comm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vote_post`
--

DROP TABLE IF EXISTS `vote_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vote_post` (
  `vote_post_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `mem_id` int NOT NULL,
  `vote_status` enum('up','down','mid') COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`vote_post_id`),
  KEY `like_post_mem_id_fk` (`mem_id`),
  KEY `like_post_post_id_fk` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-22  9:35:16
