-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: csc317db
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` mediumtext NOT NULL,
  `fk_authorid` int NOT NULL,
  `fk_postid` int NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `key_touserstable_idx` (`fk_authorid`),
  KEY `key_toposttable_idx` (`fk_postid`),
  CONSTRAINT `key_toposttable` FOREIGN KEY (`fk_postid`) REFERENCES `posts` (`id`),
  CONSTRAINT `key_touserstable` FOREIGN KEY (`fk_authorid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'this is a test',3,9,'2021-12-12 17:19:53'),(2,'this is a testfdfdfdfsdsdfsd',3,9,'2021-12-12 17:20:28'),(3,'this is a testfdfdfdfsdsdfsd',3,9,'2021-12-12 17:20:28'),(4,'this is a testfdfdfdfsdsdfsd',3,9,'2021-12-12 17:20:28'),(5,'this is a testfdfdfdfsdsdfsd',3,9,'2021-12-12 17:20:28'),(6,'this is a testfdfdfdfsdsdfsd',3,9,'2021-12-12 17:20:28'),(7,'this is a testfdfdfdfsdsdfsd',3,9,'2021-12-12 17:20:28'),(8,'this is a testfdfdfdfsdsdfsd',3,9,'2021-12-12 17:20:28'),(9,'this is a testfdfdfdfsdsdfsd',3,9,'2021-12-12 17:20:28'),(10,'this is a testfdfdfdfsdsdfsd',3,9,'2021-12-12 17:20:28'),(11,'this is a testfdfdfdfsdsdfsd',3,9,'2021-12-12 17:20:28'),(12,'this is a testfdfdfdfsdsdfsd',3,9,'2021-12-12 17:20:28'),(13,'front end',2,9,'2021-12-12 18:01:55'),(14,'full test',2,9,'2021-12-12 18:14:11'),(15,'full test fdfds\n',2,9,'2021-12-12 18:14:36'),(16,'full test fdfds\nfdsfdsfdsfdsfds',2,9,'2021-12-12 18:14:40'),(17,'full test fdfds\nfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfds',2,9,'2021-12-12 18:14:43'),(18,'fullhello',2,9,'2021-12-12 18:14:56');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` mediumtext NOT NULL,
  `photopath` varchar(2048) NOT NULL,
  `thumbnail` varchar(2048) NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `created` datetime NOT NULL,
  `fk_userid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `post_author_idx` (`fk_userid`),
  CONSTRAINT `post_author` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'gfsgfdfgfd','gdfgdfgfd','public\\images\\uploads\\a3720e49311c3f24b686768db38cf194f8b9a1a0126e.jpeg','public/images/uploads/thumbnail-a3720e49311c3f24b686768db38cf194f8b9a1a0126e.jpeg',1,'2021-12-12 06:09:30',4),(2,'kjhgjgh','yhfdgbdfg','public\\images\\uploads\\3ad475fcec356b78b55208d2a6941b31e62bda4e56a5.jpeg','public/images/uploads/thumbnail-3ad475fcec356b78b55208d2a6941b31e62bda4e56a5.jpeg',1,'2021-12-12 06:09:37',4),(3,'gvcbvcbc','fdhgredrey','public\\images\\uploads\\86c7500ea80c60a268591aabed655ecda0a7c129ac12.jpeg','public/images/uploads/thumbnail-86c7500ea80c60a268591aabed655ecda0a7c129ac12.jpeg',1,'2021-12-12 06:09:47',4),(4,'jhhgjhg','jhgdfghd','public\\images\\uploads\\9153a84ecc2ee703e4057a919ba61cabae4aebf1ca87.jpeg','public/images/uploads/thumbnail-9153a84ecc2ee703e4057a919ba61cabae4aebf1ca87.jpeg',1,'2021-12-12 06:09:54',4),(5,'gfdgjngf','hfgdghdfgdf','public\\images\\uploads\\9f2da6cfc06c030abe9643070a31514386f3f4aeaaa8.jpeg','public/images/uploads/thumbnail-9f2da6cfc06c030abe9643070a31514386f3f4aeaaa8.jpeg',1,'2021-12-12 06:10:02',4),(6,'hjdfgnfgn','hgdfhdff','public\\images\\uploads\\c3f42a7f36a01c3280439064daa68a5feeec49b64659.jpeg','public/images/uploads/thumbnail-c3f42a7f36a01c3280439064daa68a5feeec49b64659.jpeg',1,'2021-12-12 06:10:08',4),(7,'jgfjgfjnfgn','tssgsd','public\\images\\uploads\\ff6007f8646010e119aef69588a35cd81d72c5e93017.jpeg','public/images/uploads/thumbnail-ff6007f8646010e119aef69588a35cd81d72c5e93017.jpeg',1,'2021-12-12 06:10:28',1),(8,'jgdnbgnfg','hdgbdv  d','public\\images\\uploads\\809bd7f5cf9ae97d1149f7bdc3810ece82d126fe623d.png','public/images/uploads/thumbnail-809bd7f5cf9ae97d1149f7bdc3810ece82d126fe623d.png',1,'2021-12-12 06:10:36',1),(9,'gfdgfd yeqw','edsgdjfghkt','public\\images\\uploads\\5bb1a73fd3fd7c90e3257550eeef9e48ee5178e0352a.jpeg','public/images/uploads/thumbnail-5bb1a73fd3fd7c90e3257550eeef9e48ee5178e0352a.jpeg',1,'2021-12-12 06:10:55',2);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(128) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test01','test01@test.test','$2b$15$qUGyIh5ZEihxwN71ok7CM.OeAZcvb6NZAKlkckiAP56uXUmN458aq',1,'2021-12-12 04:29:31'),(2,'test02','test02@test.test','$2b$15$t4vE9LXwKTElqoYwnrh0YOuOOkXA0qJHCD4ITnYg.DhC.DLo1rJ/O',1,'2021-12-12 06:07:59'),(3,'test03','test03@test.test','$2b$15$ApqHCXAG7j7QjeTUI9PfAeH.AmTNUmvqeSjJw0UnTWfbXhu3XnXiO',1,'2021-12-12 06:08:20'),(4,'test04','test04@test.test','$2b$15$5kk5Pbo7joLXV.sr6KkptucF1veC3p2rPK90.5BfUK.vmKpNHdkdy',1,'2021-12-12 06:09:02');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-12 18:32:11
