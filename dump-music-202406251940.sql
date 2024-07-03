-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: music
-- ------------------------------------------------------
-- Server version	11.3.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_m_v`
--

DROP TABLE IF EXISTS `_m_v`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_m_v` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `video` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `originaly_released` datetime NOT NULL,
  `discription` varchar(255) DEFAULT NULL,
  `status` enum('pending','accept','canceled') NOT NULL DEFAULT 'pending',
  `heart` bigint(20) NOT NULL DEFAULT 0,
  `composition_copyright` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_m_v`
--

LOCK TABLES `_m_v` WRITE;
/*!40000 ALTER TABLE `_m_v` DISABLE KEYS */;
INSERT INTO `_m_v` VALUES (1,'Positions','1718801588.mp4','1718801588.jpg',1,'2024-06-19 00:00:00',NULL,'accept',0,'Ariana Grande','2024-06-19 05:53:09','2024-06-19 06:08:04');
/*!40000 ALTER TABLE `_m_v` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activity_log`
--

DROP TABLE IF EXISTS `activity_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `log_name` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `subject_type` varchar(255) DEFAULT NULL,
  `event` varchar(255) DEFAULT NULL,
  `subject_id` bigint(20) unsigned DEFAULT NULL,
  `causer_type` varchar(255) DEFAULT NULL,
  `causer_id` bigint(20) unsigned DEFAULT NULL,
  `properties` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`properties`)),
  `batch_uuid` char(36) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subject` (`subject_type`,`subject_id`),
  KEY `causer` (`causer_type`,`causer_id`),
  KEY `activity_log_log_name_index` (`log_name`)
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_log`
--

LOCK TABLES `activity_log` WRITE;
/*!40000 ALTER TABLE `activity_log` DISABLE KEYS */;
INSERT INTO `activity_log` VALUES (1,'default','created','App\\Models\\ListeningHistory','created',1,'App\\Models\\User',1,'{\"attributes\":{\"id\":1,\"user_id\":1,\"song_id\":6,\"created_at\":\"2024-06-18T09:31:12.000000Z\",\"updated_at\":\"2024-06-18T09:31:12.000000Z\"}}',NULL,'2024-06-19 02:31:13','2024-06-18 02:31:13'),(2,'default','created','App\\Models\\ListeningHistory','created',2,'App\\Models\\User',1,'{\"attributes\":{\"id\":2,\"user_id\":1,\"song_id\":5,\"created_at\":\"2024-06-18T10:22:36.000000Z\",\"updated_at\":\"2024-06-18T10:22:36.000000Z\"}}',NULL,'2024-06-18 03:22:36','2024-06-18 03:22:36'),(3,'default','created','App\\Models\\ListeningHistory','created',3,'App\\Models\\User',1,'{\"attributes\":{\"id\":3,\"user_id\":1,\"song_id\":5,\"created_at\":\"2024-06-18T10:23:03.000000Z\",\"updated_at\":\"2024-06-18T10:23:03.000000Z\"}}',NULL,'2024-06-18 03:23:03','2024-06-18 03:23:03'),(4,'default','created','App\\Models\\InteractSong','created',1,'App\\Models\\User',1,'{\"attributes\":{\"id\":1,\"user_id\":1,\"song_id\":5,\"type\":\"add_heart_song\",\"created_at\":\"2024-06-18T10:23:29.000000Z\",\"updated_at\":\"2024-06-18T10:23:29.000000Z\"}}',NULL,'2024-06-19 03:23:29','2024-06-18 03:23:29'),(5,'default','created','App\\Models\\ListeningHistory','created',4,'App\\Models\\User',1,'{\"attributes\":{\"id\":4,\"user_id\":1,\"song_id\":4,\"created_at\":\"2024-06-18T10:23:58.000000Z\",\"updated_at\":\"2024-06-18T10:23:58.000000Z\"}}',NULL,'2024-06-18 03:23:58','2024-06-18 03:23:58'),(6,'default','created','App\\Models\\ListeningHistory','created',5,'App\\Models\\User',1,'{\"attributes\":{\"id\":5,\"user_id\":1,\"song_id\":4,\"created_at\":\"2024-06-18T10:24:02.000000Z\",\"updated_at\":\"2024-06-18T10:24:02.000000Z\"}}',NULL,'2024-06-18 03:24:02','2024-06-18 03:24:02'),(7,'default','created','App\\Models\\InteractSong','created',2,'App\\Models\\User',1,'{\"attributes\":{\"id\":2,\"user_id\":1,\"song_id\":4,\"type\":\"add_heart_song\",\"created_at\":\"2024-06-18T10:24:52.000000Z\",\"updated_at\":\"2024-06-18T10:24:52.000000Z\"}}',NULL,'2024-06-18 03:24:52','2024-06-18 03:24:52'),(8,'default','created','App\\Models\\ListeningHistory','created',6,'App\\Models\\User',1,'{\"attributes\":{\"id\":6,\"user_id\":1,\"song_id\":4,\"created_at\":\"2024-06-18T10:25:59.000000Z\",\"updated_at\":\"2024-06-18T10:25:59.000000Z\"}}',NULL,'2024-06-18 03:25:59','2024-06-18 03:25:59'),(9,'default','created','App\\Models\\ListeningHistory','created',7,'App\\Models\\User',1,'{\"attributes\":{\"id\":7,\"user_id\":1,\"song_id\":10,\"created_at\":\"2024-06-18T12:35:27.000000Z\",\"updated_at\":\"2024-06-18T12:35:27.000000Z\"}}',NULL,'2024-06-18 05:35:27','2024-06-18 05:35:27'),(10,'default','created','App\\Models\\ListeningHistory','created',8,'App\\Models\\User',1,'{\"attributes\":{\"id\":8,\"user_id\":1,\"song_id\":10,\"created_at\":\"2024-06-18T12:37:32.000000Z\",\"updated_at\":\"2024-06-18T12:37:32.000000Z\"}}',NULL,'2024-06-18 05:37:32','2024-06-18 05:37:32'),(11,'default','created','App\\Models\\ListeningHistory','created',9,'App\\Models\\User',1,'{\"attributes\":{\"id\":9,\"user_id\":1,\"song_id\":4,\"created_at\":\"2024-06-18T16:59:10.000000Z\",\"updated_at\":\"2024-06-18T16:59:10.000000Z\"}}',NULL,'2024-06-18 09:59:10','2024-06-18 09:59:10'),(12,'default','created','App\\Models\\ListeningHistory','created',10,'App\\Models\\User',1,'{\"attributes\":{\"id\":10,\"user_id\":1,\"song_id\":4,\"created_at\":\"2024-06-18T16:59:13.000000Z\",\"updated_at\":\"2024-06-18T16:59:13.000000Z\"}}',NULL,'2024-06-18 09:59:13','2024-06-18 09:59:13'),(13,'default','created','App\\Models\\ListeningHistory','created',11,'App\\Models\\User',1,'{\"attributes\":{\"id\":11,\"user_id\":1,\"song_id\":4,\"created_at\":\"2024-06-18T17:00:16.000000Z\",\"updated_at\":\"2024-06-18T17:00:16.000000Z\"}}',NULL,'2024-06-18 10:00:16','2024-06-18 10:00:16'),(14,'default','created','App\\Models\\ListeningHistory','created',12,'App\\Models\\User',1,'{\"attributes\":{\"id\":12,\"user_id\":1,\"song_id\":4,\"created_at\":\"2024-06-18T17:00:52.000000Z\",\"updated_at\":\"2024-06-18T17:00:52.000000Z\"}}',NULL,'2024-06-18 10:00:52','2024-06-18 10:00:52'),(15,'default','created','App\\Models\\ListeningHistory','created',13,'App\\Models\\User',1,'{\"attributes\":{\"id\":13,\"user_id\":1,\"song_id\":5,\"created_at\":\"2024-06-18T17:02:08.000000Z\",\"updated_at\":\"2024-06-18T17:02:08.000000Z\"}}',NULL,'2024-06-18 10:02:08','2024-06-18 10:02:08'),(16,'default','created','App\\Models\\ListeningHistory','created',14,'App\\Models\\User',1,'{\"attributes\":{\"id\":14,\"user_id\":1,\"song_id\":5,\"created_at\":\"2024-06-18T17:02:26.000000Z\",\"updated_at\":\"2024-06-18T17:02:26.000000Z\"}}',NULL,'2024-06-18 10:02:26','2024-06-18 10:02:26'),(17,'default','created','App\\Models\\ListeningHistory','created',15,'App\\Models\\User',1,'{\"attributes\":{\"id\":15,\"user_id\":1,\"song_id\":6,\"created_at\":\"2024-06-18T17:02:42.000000Z\",\"updated_at\":\"2024-06-18T17:02:42.000000Z\"}}',NULL,'2024-06-18 10:02:42','2024-06-18 10:02:42'),(18,'default','created','App\\Models\\ListeningHistory','created',16,'App\\Models\\User',1,'{\"attributes\":{\"id\":16,\"user_id\":1,\"song_id\":8,\"created_at\":\"2024-06-18T17:02:58.000000Z\",\"updated_at\":\"2024-06-18T17:02:58.000000Z\"}}',NULL,'2024-06-18 10:02:58','2024-06-18 10:02:58'),(19,'default','created','App\\Models\\ListeningHistory','created',17,'App\\Models\\User',1,'{\"attributes\":{\"id\":17,\"user_id\":1,\"song_id\":10,\"created_at\":\"2024-06-19T03:49:06.000000Z\",\"updated_at\":\"2024-06-19T03:49:06.000000Z\"}}',NULL,'2024-06-18 20:49:06','2024-06-18 20:49:06'),(20,'default','created','App\\Models\\ListeningHistory','created',18,'App\\Models\\User',1,'{\"attributes\":{\"id\":18,\"user_id\":1,\"song_id\":5,\"created_at\":\"2024-06-19T03:58:32.000000Z\",\"updated_at\":\"2024-06-19T03:58:32.000000Z\"}}',NULL,'2024-06-18 20:58:32','2024-06-18 20:58:32'),(21,'default','created','App\\Models\\ListeningHistory','created',19,'App\\Models\\User',1,'{\"attributes\":{\"id\":19,\"user_id\":1,\"song_id\":10,\"created_at\":\"2024-06-19T05:18:19.000000Z\",\"updated_at\":\"2024-06-19T05:18:19.000000Z\"}}',NULL,'2024-06-18 22:18:19','2024-06-18 22:18:19'),(22,'default','created','App\\Models\\ListeningHistory','created',20,'App\\Models\\User',1,'{\"attributes\":{\"id\":20,\"user_id\":1,\"song_id\":10,\"created_at\":\"2024-06-19T05:19:00.000000Z\",\"updated_at\":\"2024-06-19T05:19:00.000000Z\"}}',NULL,'2024-06-18 22:19:00','2024-06-18 22:19:00'),(23,'default','created','App\\Models\\ListeningHistory','created',21,'App\\Models\\User',1,'{\"attributes\":{\"id\":21,\"user_id\":1,\"song_id\":10,\"created_at\":\"2024-06-19T05:19:17.000000Z\",\"updated_at\":\"2024-06-19T05:19:17.000000Z\"}}',NULL,'2024-06-18 22:19:17','2024-06-18 22:19:17'),(24,'default','created','App\\Models\\ListeningHistory','created',22,'App\\Models\\User',1,'{\"attributes\":{\"id\":22,\"user_id\":1,\"song_id\":10,\"created_at\":\"2024-06-19T05:19:18.000000Z\",\"updated_at\":\"2024-06-19T05:19:18.000000Z\"}}',NULL,'2024-06-18 22:19:18','2024-06-18 22:19:18'),(25,'default','created','App\\Models\\ListeningHistory','created',23,'App\\Models\\User',1,'{\"attributes\":{\"id\":23,\"user_id\":1,\"song_id\":10,\"created_at\":\"2024-06-19T05:21:12.000000Z\",\"updated_at\":\"2024-06-19T05:21:12.000000Z\"}}',NULL,'2024-06-18 22:21:12','2024-06-18 22:21:12'),(26,'default','created','App\\Models\\ListeningHistory','created',24,'App\\Models\\User',1,'{\"attributes\":{\"id\":24,\"user_id\":1,\"song_id\":10,\"created_at\":\"2024-06-19T05:21:56.000000Z\",\"updated_at\":\"2024-06-19T05:21:56.000000Z\"}}',NULL,'2024-06-18 22:21:56','2024-06-18 22:21:56'),(27,'default','created','App\\Models\\ListeningHistory','created',25,'App\\Models\\User',1,'{\"attributes\":{\"id\":25,\"user_id\":1,\"song_id\":10,\"created_at\":\"2024-06-19T05:23:24.000000Z\",\"updated_at\":\"2024-06-19T05:23:24.000000Z\"}}',NULL,'2024-06-18 22:23:24','2024-06-18 22:23:24'),(28,'default','created','App\\Models\\ListeningHistory','created',26,'App\\Models\\User',1,'{\"attributes\":{\"id\":26,\"user_id\":1,\"song_id\":10,\"created_at\":\"2024-06-19T05:23:29.000000Z\",\"updated_at\":\"2024-06-19T05:23:29.000000Z\"}}',NULL,'2024-06-18 22:23:29','2024-06-18 22:23:29'),(29,'default','created','App\\Models\\ListeningHistory','created',27,'App\\Models\\User',1,'{\"attributes\":{\"id\":27,\"user_id\":1,\"song_id\":10,\"created_at\":\"2024-06-19T05:23:52.000000Z\",\"updated_at\":\"2024-06-19T05:23:52.000000Z\"}}',NULL,'2024-06-18 22:23:52','2024-06-18 22:23:52'),(30,'default','created','App\\Models\\ListeningHistory','created',28,'App\\Models\\User',1,'{\"attributes\":{\"id\":28,\"user_id\":1,\"song_id\":10,\"created_at\":\"2024-06-19T05:23:53.000000Z\",\"updated_at\":\"2024-06-19T05:23:53.000000Z\"}}',NULL,'2024-06-18 22:23:53','2024-06-18 22:23:53'),(31,'default','created','App\\Models\\ListeningHistory','created',29,'App\\Models\\User',1,'{\"attributes\":{\"id\":29,\"user_id\":1,\"song_id\":10,\"created_at\":\"2024-06-19T05:24:25.000000Z\",\"updated_at\":\"2024-06-19T05:24:25.000000Z\"}}',NULL,'2024-06-18 22:24:25','2024-06-18 22:24:25'),(32,'default','created','App\\Models\\ListeningHistory','created',30,'App\\Models\\User',1,'{\"attributes\":{\"id\":30,\"user_id\":1,\"song_id\":10,\"created_at\":\"2024-06-19T05:24:26.000000Z\",\"updated_at\":\"2024-06-19T05:24:26.000000Z\"}}',NULL,'2024-06-18 22:24:26','2024-06-18 22:24:26'),(33,'default','created','App\\Models\\ListeningHistory','created',31,'App\\Models\\User',1,'{\"attributes\":{\"id\":31,\"user_id\":1,\"song_id\":10,\"created_at\":\"2024-06-19T05:24:30.000000Z\",\"updated_at\":\"2024-06-19T05:24:30.000000Z\"}}',NULL,'2024-06-18 22:24:30','2024-06-18 22:24:30'),(34,'default','created','App\\Models\\ListeningHistory','created',32,'App\\Models\\User',1,'{\"attributes\":{\"id\":32,\"user_id\":1,\"song_id\":10,\"created_at\":\"2024-06-19T05:25:26.000000Z\",\"updated_at\":\"2024-06-19T05:25:26.000000Z\"}}',NULL,'2024-06-18 22:25:26','2024-06-18 22:25:26'),(35,'default','created','App\\Models\\ListeningHistory','created',33,'App\\Models\\User',1,'{\"attributes\":{\"id\":33,\"user_id\":1,\"song_id\":10,\"created_at\":\"2024-06-19T05:26:42.000000Z\",\"updated_at\":\"2024-06-19T05:26:42.000000Z\"}}',NULL,'2024-06-18 22:26:42','2024-06-18 22:26:42'),(36,'default','created','App\\Models\\ListeningHistory','created',34,'App\\Models\\User',1,'{\"attributes\":{\"id\":34,\"user_id\":1,\"song_id\":10,\"created_at\":\"2024-06-19T05:27:40.000000Z\",\"updated_at\":\"2024-06-19T05:27:40.000000Z\"}}',NULL,'2024-06-18 22:27:40','2024-06-18 22:27:40'),(37,'default','created','App\\Models\\ListeningHistory','created',35,'App\\Models\\User',1,'{\"attributes\":{\"id\":35,\"user_id\":1,\"song_id\":8,\"created_at\":\"2024-06-19T05:27:45.000000Z\",\"updated_at\":\"2024-06-19T05:27:45.000000Z\"}}',NULL,'2024-06-18 22:27:45','2024-06-18 22:27:45'),(38,'default','created','App\\Models\\ListeningHistory','created',36,'App\\Models\\User',1,'{\"attributes\":{\"id\":36,\"user_id\":1,\"song_id\":10,\"created_at\":\"2024-06-19T05:28:21.000000Z\",\"updated_at\":\"2024-06-19T05:28:21.000000Z\"}}',NULL,'2024-06-18 22:28:21','2024-06-18 22:28:21'),(39,'default','created','App\\Models\\ListeningHistory','created',37,'App\\Models\\User',1,'{\"attributes\":{\"id\":37,\"user_id\":1,\"song_id\":10,\"created_at\":\"2024-06-19T05:28:53.000000Z\",\"updated_at\":\"2024-06-19T05:28:53.000000Z\"}}',NULL,'2024-06-18 22:28:53','2024-06-18 22:28:53'),(40,'default','created','App\\Models\\ListeningHistory','created',38,'App\\Models\\User',1,'{\"attributes\":{\"id\":38,\"user_id\":1,\"song_id\":10,\"created_at\":\"2024-06-19T05:30:27.000000Z\",\"updated_at\":\"2024-06-19T05:30:27.000000Z\"}}',NULL,'2024-06-18 22:30:27','2024-06-18 22:30:27'),(41,'default','created','App\\Models\\ListeningHistory','created',39,'App\\Models\\User',1,'{\"attributes\":{\"id\":39,\"user_id\":1,\"song_id\":7,\"created_at\":\"2024-06-19T05:30:32.000000Z\",\"updated_at\":\"2024-06-19T05:30:32.000000Z\"}}',NULL,'2024-06-18 22:30:32','2024-06-18 22:30:32'),(42,'default','created','App\\Models\\ListeningHistory','created',40,'App\\Models\\User',1,'{\"attributes\":{\"id\":40,\"user_id\":1,\"song_id\":5,\"created_at\":\"2024-06-19T05:32:28.000000Z\",\"updated_at\":\"2024-06-19T05:32:28.000000Z\"}}',NULL,'2024-06-18 22:32:28','2024-06-18 22:32:28'),(43,'default','created','App\\Models\\ListeningHistory','created',41,'App\\Models\\User',1,'{\"attributes\":{\"id\":41,\"user_id\":1,\"song_id\":5,\"created_at\":\"2024-06-19T05:32:32.000000Z\",\"updated_at\":\"2024-06-19T05:32:32.000000Z\"}}',NULL,'2024-06-18 22:32:32','2024-06-18 22:32:32'),(44,'default','created','App\\Models\\ListeningHistory','created',42,'App\\Models\\User',1,'{\"attributes\":{\"id\":42,\"user_id\":1,\"song_id\":8,\"created_at\":\"2024-06-19T05:36:21.000000Z\",\"updated_at\":\"2024-06-19T05:36:21.000000Z\"}}',NULL,'2024-06-18 22:36:21','2024-06-18 22:36:21'),(45,'default','created','App\\Models\\ListeningHistory','created',43,'App\\Models\\User',1,'{\"attributes\":{\"id\":43,\"user_id\":1,\"song_id\":8,\"created_at\":\"2024-06-19T05:36:54.000000Z\",\"updated_at\":\"2024-06-19T05:36:54.000000Z\"}}',NULL,'2024-06-18 22:36:54','2024-06-18 22:36:54'),(46,'default','created','App\\Models\\InteractSong','created',3,'App\\Models\\User',1,'{\"attributes\":{\"id\":3,\"user_id\":1,\"song_id\":6,\"type\":\"add_heart_song\",\"created_at\":\"2024-06-19T07:02:32.000000Z\",\"updated_at\":\"2024-06-19T07:02:32.000000Z\"}}',NULL,'2024-06-19 00:02:32','2024-06-19 00:02:32'),(47,'default','created','App\\Models\\Song','created',11,'App\\Models\\User',1,'{\"attributes\":{\"id\":11,\"title\":\"Save With Me\",\"artists\":\"[\\\"Gryffin\\\",\\\"Audrey Mika\\\"]\",\"language\":\"US\",\"primary_genre\":\"Pop\",\"secondary_genre\":\"Pop\",\"composition_copyright\":\"gryffinofficial\",\"record_laber_name\":null,\"originaly_released\":\"2024-06-19T00:00:00.000000Z\",\"audio\":\"1718782202.mp3\",\"image\":\"1718782202.jpg\",\"thumbnail\":\"1718782202.jpg\",\"lyric_file\":null,\"type_id\":null,\"status\":\"pending\",\"user_id\":1,\"heart\":0,\"discription\":null,\"created_at\":\"2024-06-19T07:30:03.000000Z\",\"updated_at\":\"2024-06-19T07:30:03.000000Z\",\"delete_ad\":null}}',NULL,'2024-06-19 00:30:03','2024-06-19 00:30:03'),(48,'default','created','App\\Models\\ListeningHistory','created',44,'App\\Models\\User',1,'{\"attributes\":{\"id\":44,\"user_id\":1,\"song_id\":5,\"created_at\":\"2024-06-19T07:51:22.000000Z\",\"updated_at\":\"2024-06-19T07:51:22.000000Z\"}}',NULL,'2024-06-19 00:51:23','2024-06-19 00:51:23'),(49,'default','created','App\\Models\\ListeningHistory','created',45,'App\\Models\\User',1,'{\"attributes\":{\"id\":45,\"user_id\":1,\"song_id\":5,\"created_at\":\"2024-06-19T07:51:26.000000Z\",\"updated_at\":\"2024-06-19T07:51:26.000000Z\"}}',NULL,'2024-06-19 00:51:26','2024-06-19 00:51:26'),(50,'default','created','App\\Models\\ListeningHistory','created',46,'App\\Models\\User',1,'{\"attributes\":{\"id\":46,\"user_id\":1,\"song_id\":5,\"created_at\":\"2024-06-19T07:54:02.000000Z\",\"updated_at\":\"2024-06-19T07:54:02.000000Z\"}}',NULL,'2024-06-19 00:54:02','2024-06-19 00:54:02'),(51,'default','created','App\\Models\\ListeningHistory','created',47,'App\\Models\\User',1,'{\"attributes\":{\"id\":47,\"user_id\":1,\"song_id\":5,\"created_at\":\"2024-06-19T07:55:22.000000Z\",\"updated_at\":\"2024-06-19T07:55:22.000000Z\"}}',NULL,'2024-06-19 00:55:22','2024-06-19 00:55:22'),(52,'default','created','App\\Models\\ListeningHistory','created',48,'App\\Models\\User',1,'{\"attributes\":{\"id\":48,\"user_id\":1,\"song_id\":5,\"created_at\":\"2024-06-19T07:55:45.000000Z\",\"updated_at\":\"2024-06-19T07:55:45.000000Z\"}}',NULL,'2024-06-19 00:55:45','2024-06-19 00:55:45'),(53,'default','created','App\\Models\\ListeningHistory','created',49,'App\\Models\\User',1,'{\"attributes\":{\"id\":49,\"user_id\":1,\"song_id\":5,\"created_at\":\"2024-06-19T07:55:49.000000Z\",\"updated_at\":\"2024-06-19T07:55:49.000000Z\"}}',NULL,'2024-06-19 00:55:49','2024-06-19 00:55:49'),(54,'default','created','App\\Models\\ListeningHistory','created',50,'App\\Models\\User',1,'{\"attributes\":{\"id\":50,\"user_id\":1,\"song_id\":5,\"created_at\":\"2024-06-19T07:55:56.000000Z\",\"updated_at\":\"2024-06-19T07:55:56.000000Z\"}}',NULL,'2024-06-19 00:55:56','2024-06-19 00:55:56'),(55,'default','created','App\\Models\\ListeningHistory','created',51,'App\\Models\\User',1,'{\"attributes\":{\"id\":51,\"user_id\":1,\"song_id\":5,\"created_at\":\"2024-06-19T07:56:07.000000Z\",\"updated_at\":\"2024-06-19T07:56:07.000000Z\"}}',NULL,'2024-06-19 00:56:07','2024-06-19 00:56:07'),(56,'default','created','App\\Models\\ListeningHistory','created',52,'App\\Models\\User',1,'{\"attributes\":{\"id\":52,\"user_id\":1,\"song_id\":5,\"created_at\":\"2024-06-19T07:56:41.000000Z\",\"updated_at\":\"2024-06-19T07:56:41.000000Z\"}}',NULL,'2024-06-19 00:56:41','2024-06-19 00:56:41'),(57,'default','created','App\\Models\\ListeningHistory','created',53,'App\\Models\\User',1,'{\"attributes\":{\"id\":53,\"user_id\":1,\"song_id\":5,\"created_at\":\"2024-06-19T07:57:23.000000Z\",\"updated_at\":\"2024-06-19T07:57:23.000000Z\"}}',NULL,'2024-06-19 00:57:23','2024-06-19 00:57:23'),(58,'default','created','App\\Models\\ListeningHistory','created',54,'App\\Models\\User',1,'{\"attributes\":{\"id\":54,\"user_id\":1,\"song_id\":5,\"created_at\":\"2024-06-19T07:57:34.000000Z\",\"updated_at\":\"2024-06-19T07:57:34.000000Z\"}}',NULL,'2024-06-19 00:57:34','2024-06-19 00:57:34'),(59,'default','created','App\\Models\\ListeningHistory','created',55,'App\\Models\\User',1,'{\"attributes\":{\"id\":55,\"user_id\":1,\"song_id\":5,\"created_at\":\"2024-06-19T07:59:30.000000Z\",\"updated_at\":\"2024-06-19T07:59:30.000000Z\"}}',NULL,'2024-06-19 00:59:30','2024-06-19 00:59:30'),(60,'default','updated','App\\Models\\Song','updated',11,'App\\Models\\User',1,'{\"attributes\":{\"status\":\"accept\",\"updated_at\":\"2024-06-19T08:10:51.000000Z\"},\"old\":{\"status\":\"pending\",\"updated_at\":\"2024-06-19T07:30:03.000000Z\"}}',NULL,'2024-06-19 01:10:51','2024-06-19 01:10:51'),(61,'default','created','App\\Models\\Post','created',1,'App\\Models\\User',1,'{\"attributes\":{\"id\":1,\"user_id\":1,\"text_content\":\"test image\",\"file_song\":\"\",\"file_image\":\"1718787955.jpg\",\"status\":\"pending\",\"is_private\":false,\"created_at\":\"2024-06-19T09:05:55.000000Z\",\"updated_at\":\"2024-06-19T09:05:55.000000Z\",\"heart\":0,\"count_of_share\":0,\"count_of_comment\":0}}',NULL,'2024-06-19 02:05:55','2024-06-19 02:05:55'),(62,'default','updated','App\\Models\\Post','updated',1,'App\\Models\\User',1,'{\"attributes\":{\"updated_at\":\"2024-06-19T09:24:13.000000Z\",\"count_of_comment\":1},\"old\":{\"updated_at\":\"2024-06-19T09:05:55.000000Z\",\"count_of_comment\":0}}',NULL,'2024-06-19 02:24:13','2024-06-19 02:24:13'),(63,'default','updated','App\\Models\\Post','updated',1,'App\\Models\\User',1,'{\"attributes\":{\"updated_at\":\"2024-06-19T09:26:50.000000Z\",\"heart\":1},\"old\":{\"updated_at\":\"2024-06-19T09:24:13.000000Z\",\"heart\":0}}',NULL,'2024-06-19 02:26:50','2024-06-19 02:26:50'),(64,'default','created','App\\Models\\InteractSong','created',4,'App\\Models\\User',1,'{\"attributes\":{\"id\":4,\"user_id\":1,\"song_id\":1,\"type\":\"add_heart_post\",\"created_at\":\"2024-06-19T09:26:50.000000Z\",\"updated_at\":\"2024-06-19T09:26:50.000000Z\"}}',NULL,'2024-06-19 02:26:50','2024-06-19 02:26:50'),(65,'default','updated','App\\Models\\Post','updated',1,'App\\Models\\User',1,'{\"attributes\":{\"updated_at\":\"2024-06-19T09:27:59.000000Z\",\"heart\":0},\"old\":{\"updated_at\":\"2024-06-19T09:26:50.000000Z\",\"heart\":1}}',NULL,'2024-06-19 02:27:59','2024-06-19 02:27:59'),(66,'default','deleted','App\\Models\\InteractSong','deleted',4,'App\\Models\\User',1,'{\"old\":{\"id\":4,\"user_id\":1,\"song_id\":1,\"type\":\"add_heart_post\",\"created_at\":\"2024-06-19T09:26:50.000000Z\",\"updated_at\":\"2024-06-19T09:26:50.000000Z\"}}',NULL,'2024-06-19 02:27:59','2024-06-19 02:27:59'),(67,'default','created','App\\Models\\ListeningHistory','created',56,'App\\Models\\User',1,'{\"attributes\":{\"id\":56,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T09:34:16.000000Z\",\"updated_at\":\"2024-06-19T09:34:16.000000Z\"}}',NULL,'2024-06-19 02:34:16','2024-06-19 02:34:16'),(73,'default','created','App\\Models\\ListeningHistory','created',62,'App\\Models\\User',1,'{\"attributes\":{\"id\":62,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T09:38:55.000000Z\",\"updated_at\":\"2024-06-19T09:38:55.000000Z\"}}',NULL,'2024-06-19 02:38:55','2024-06-19 02:38:55'),(74,'default','created','App\\Models\\ListeningHistory','created',63,'App\\Models\\User',1,'{\"attributes\":{\"id\":63,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T09:39:12.000000Z\",\"updated_at\":\"2024-06-19T09:39:12.000000Z\"}}',NULL,'2024-06-19 02:39:12','2024-06-19 02:39:12'),(75,'default','created','App\\Models\\ListeningHistory','created',64,'App\\Models\\User',1,'{\"attributes\":{\"id\":64,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T09:42:31.000000Z\",\"updated_at\":\"2024-06-19T09:42:31.000000Z\"}}',NULL,'2024-06-19 02:42:31','2024-06-19 02:42:31'),(76,'default','created','App\\Models\\ListeningHistory','created',65,'App\\Models\\User',1,'{\"attributes\":{\"id\":65,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T09:44:20.000000Z\",\"updated_at\":\"2024-06-19T09:44:20.000000Z\"}}',NULL,'2024-06-19 02:44:20','2024-06-19 02:44:20'),(77,'default','created','App\\Models\\ListeningHistory','created',66,'App\\Models\\User',1,'{\"attributes\":{\"id\":66,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T09:44:37.000000Z\",\"updated_at\":\"2024-06-19T09:44:37.000000Z\"}}',NULL,'2024-06-19 02:44:37','2024-06-19 02:44:37'),(78,'default','created','App\\Models\\ListeningHistory','created',67,'App\\Models\\User',1,'{\"attributes\":{\"id\":67,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T09:44:59.000000Z\",\"updated_at\":\"2024-06-19T09:44:59.000000Z\"}}',NULL,'2024-06-19 02:44:59','2024-06-19 02:44:59'),(79,'default','created','App\\Models\\ListeningHistory','created',68,'App\\Models\\User',1,'{\"attributes\":{\"id\":68,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T09:45:20.000000Z\",\"updated_at\":\"2024-06-19T09:45:20.000000Z\"}}',NULL,'2024-06-19 02:45:20','2024-06-19 02:45:20'),(80,'default','created','App\\Models\\ListeningHistory','created',69,'App\\Models\\User',1,'{\"attributes\":{\"id\":69,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T09:45:49.000000Z\",\"updated_at\":\"2024-06-19T09:45:49.000000Z\"}}',NULL,'2024-06-19 02:45:49','2024-06-19 02:45:49'),(81,'default','created','App\\Models\\ListeningHistory','created',70,'App\\Models\\User',1,'{\"attributes\":{\"id\":70,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T09:46:12.000000Z\",\"updated_at\":\"2024-06-19T09:46:12.000000Z\"}}',NULL,'2024-06-19 02:46:12','2024-06-19 02:46:12'),(82,'default','created','App\\Models\\ListeningHistory','created',71,'App\\Models\\User',1,'{\"attributes\":{\"id\":71,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T09:46:47.000000Z\",\"updated_at\":\"2024-06-19T09:46:47.000000Z\"}}',NULL,'2024-06-19 02:46:47','2024-06-19 02:46:47'),(83,'default','created','App\\Models\\ListeningHistory','created',72,'App\\Models\\User',1,'{\"attributes\":{\"id\":72,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T09:47:33.000000Z\",\"updated_at\":\"2024-06-19T09:47:33.000000Z\"}}',NULL,'2024-06-19 02:47:33','2024-06-19 02:47:33'),(84,'default','created','App\\Models\\ListeningHistory','created',73,'App\\Models\\User',1,'{\"attributes\":{\"id\":73,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T09:47:57.000000Z\",\"updated_at\":\"2024-06-19T09:47:57.000000Z\"}}',NULL,'2024-06-19 02:47:57','2024-06-19 02:47:57'),(85,'default','created','App\\Models\\ListeningHistory','created',74,'App\\Models\\User',1,'{\"attributes\":{\"id\":74,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T09:49:26.000000Z\",\"updated_at\":\"2024-06-19T09:49:26.000000Z\"}}',NULL,'2024-06-19 02:49:27','2024-06-19 02:49:27'),(86,'default','created','App\\Models\\ListeningHistory','created',75,'App\\Models\\User',1,'{\"attributes\":{\"id\":75,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T09:49:32.000000Z\",\"updated_at\":\"2024-06-19T09:49:32.000000Z\"}}',NULL,'2024-06-19 02:49:32','2024-06-19 02:49:32'),(87,'default','created','App\\Models\\ListeningHistory','created',76,'App\\Models\\User',1,'{\"attributes\":{\"id\":76,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T09:49:33.000000Z\",\"updated_at\":\"2024-06-19T09:49:33.000000Z\"}}',NULL,'2024-06-19 02:49:33','2024-06-19 02:49:33'),(88,'default','created','App\\Models\\ListeningHistory','created',77,'App\\Models\\User',1,'{\"attributes\":{\"id\":77,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T09:49:57.000000Z\",\"updated_at\":\"2024-06-19T09:49:57.000000Z\"}}',NULL,'2024-06-19 02:49:57','2024-06-19 02:49:57'),(89,'default','created','App\\Models\\ListeningHistory','created',78,'App\\Models\\User',1,'{\"attributes\":{\"id\":78,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T09:54:41.000000Z\",\"updated_at\":\"2024-06-19T09:54:41.000000Z\"}}',NULL,'2024-06-19 02:54:41','2024-06-19 02:54:41'),(90,'default','created','App\\Models\\ListeningHistory','created',79,'App\\Models\\User',1,'{\"attributes\":{\"id\":79,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T10:14:29.000000Z\",\"updated_at\":\"2024-06-19T10:14:29.000000Z\"}}',NULL,'2024-06-19 03:14:29','2024-06-19 03:14:29'),(91,'default','created','App\\Models\\ListeningHistory','created',80,'App\\Models\\User',1,'{\"attributes\":{\"id\":80,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T10:15:07.000000Z\",\"updated_at\":\"2024-06-19T10:15:07.000000Z\"}}',NULL,'2024-06-19 03:15:07','2024-06-19 03:15:07'),(92,'default','created','App\\Models\\ListeningHistory','created',81,'App\\Models\\User',1,'{\"attributes\":{\"id\":81,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T10:15:09.000000Z\",\"updated_at\":\"2024-06-19T10:15:09.000000Z\"}}',NULL,'2024-06-19 03:15:09','2024-06-19 03:15:09'),(93,'default','created','App\\Models\\ListeningHistory','created',82,'App\\Models\\User',1,'{\"attributes\":{\"id\":82,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T10:15:12.000000Z\",\"updated_at\":\"2024-06-19T10:15:12.000000Z\"}}',NULL,'2024-06-19 03:15:12','2024-06-19 03:15:12'),(94,'default','updated','App\\Models\\Song','updated',11,'App\\Models\\User',1,'{\"attributes\":{\"heart\":1,\"updated_at\":\"2024-06-19T10:16:40.000000Z\"},\"old\":{\"heart\":0,\"updated_at\":\"2024-06-19T08:10:51.000000Z\"}}',NULL,'2024-06-19 03:16:40','2024-06-19 03:16:40'),(95,'default','created','App\\Models\\InteractSong','created',5,'App\\Models\\User',1,'{\"attributes\":{\"id\":5,\"user_id\":1,\"song_id\":11,\"type\":\"add_heart_post\",\"created_at\":\"2024-06-19T10:16:40.000000Z\",\"updated_at\":\"2024-06-19T10:16:40.000000Z\"}}',NULL,'2024-06-19 03:16:40','2024-06-19 03:16:40'),(96,'default','updated','App\\Models\\Song','updated',11,'App\\Models\\User',1,'{\"attributes\":{\"heart\":2,\"updated_at\":\"2024-06-19T10:16:49.000000Z\"},\"old\":{\"heart\":1,\"updated_at\":\"2024-06-19T10:16:40.000000Z\"}}',NULL,'2024-06-19 03:16:49','2024-06-19 03:16:49'),(97,'default','created','App\\Models\\InteractSong','created',6,'App\\Models\\User',1,'{\"attributes\":{\"id\":6,\"user_id\":1,\"song_id\":11,\"type\":\"add_heart_post\",\"created_at\":\"2024-06-19T10:16:49.000000Z\",\"updated_at\":\"2024-06-19T10:16:49.000000Z\"}}',NULL,'2024-06-19 03:16:49','2024-06-19 03:16:49'),(98,'default','updated','App\\Models\\Song','updated',11,'App\\Models\\User',1,'{\"attributes\":{\"heart\":1,\"updated_at\":\"2024-06-19T10:18:32.000000Z\"},\"old\":{\"heart\":0,\"updated_at\":\"2024-06-19T10:16:49.000000Z\"}}',NULL,'2024-06-19 03:18:32','2024-06-19 03:18:32'),(99,'default','created','App\\Models\\InteractSong','created',7,'App\\Models\\User',1,'{\"attributes\":{\"id\":7,\"user_id\":1,\"song_id\":11,\"type\":\"add_heart_song\",\"created_at\":\"2024-06-19T10:18:32.000000Z\",\"updated_at\":\"2024-06-19T10:18:32.000000Z\"}}',NULL,'2024-06-19 03:18:32','2024-06-19 03:18:32'),(100,'default','updated','App\\Models\\Song','updated',11,'App\\Models\\User',1,'{\"attributes\":{\"heart\":0,\"updated_at\":\"2024-06-19T10:18:44.000000Z\"},\"old\":{\"heart\":1,\"updated_at\":\"2024-06-19T10:18:32.000000Z\"}}',NULL,'2024-06-19 03:18:44','2024-06-19 03:18:44'),(101,'default','deleted','App\\Models\\InteractSong','deleted',7,'App\\Models\\User',1,'{\"old\":{\"id\":7,\"user_id\":1,\"song_id\":11,\"type\":\"add_heart_song\",\"created_at\":\"2024-06-19T10:18:32.000000Z\",\"updated_at\":\"2024-06-19T10:18:32.000000Z\"}}',NULL,'2024-06-19 03:18:44','2024-06-19 03:18:44'),(102,'default','updated','App\\Models\\Post','updated',1,'App\\Models\\User',1,'{\"attributes\":{\"updated_at\":\"2024-06-19T10:19:00.000000Z\",\"heart\":1},\"old\":{\"updated_at\":\"2024-06-19T09:27:59.000000Z\",\"heart\":0}}',NULL,'2024-06-19 03:19:00','2024-06-19 03:19:00'),(103,'default','created','App\\Models\\InteractSong','created',8,'App\\Models\\User',1,'{\"attributes\":{\"id\":8,\"user_id\":1,\"song_id\":1,\"type\":\"add_heart_post\",\"created_at\":\"2024-06-19T10:19:00.000000Z\",\"updated_at\":\"2024-06-19T10:19:00.000000Z\"}}',NULL,'2024-06-19 03:19:00','2024-06-19 03:19:00'),(104,'default','updated','App\\Models\\Song','updated',11,'App\\Models\\User',1,'{\"attributes\":{\"heart\":1,\"updated_at\":\"2024-06-19T10:19:10.000000Z\"},\"old\":{\"heart\":0,\"updated_at\":\"2024-06-19T10:18:44.000000Z\"}}',NULL,'2024-06-19 03:19:10','2024-06-19 03:19:10'),(105,'default','created','App\\Models\\InteractSong','created',9,'App\\Models\\User',1,'{\"attributes\":{\"id\":9,\"user_id\":1,\"song_id\":11,\"type\":\"add_heart_song\",\"created_at\":\"2024-06-19T10:19:10.000000Z\",\"updated_at\":\"2024-06-19T10:19:10.000000Z\"}}',NULL,'2024-06-19 03:19:10','2024-06-19 03:19:10'),(106,'default','created','App\\Models\\ListeningHistory','created',83,'App\\Models\\User',1,'{\"attributes\":{\"id\":83,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T12:11:34.000000Z\",\"updated_at\":\"2024-06-19T12:11:34.000000Z\"}}',NULL,'2024-06-19 05:11:34','2024-06-19 05:11:34'),(107,'default','created','App\\Models\\Post','created',2,'App\\Models\\User',1,'{\"attributes\":{\"id\":2,\"user_id\":1,\"text_content\":\"test song\",\"file_song\":\"1718799847.mp3\",\"file_image\":\"1718799847.jpg\",\"status\":\"pending\",\"is_private\":false,\"created_at\":\"2024-06-19T12:24:07.000000Z\",\"updated_at\":\"2024-06-19T12:24:07.000000Z\",\"heart\":0,\"count_of_share\":0,\"count_of_comment\":0}}',NULL,'2024-06-19 05:24:07','2024-06-19 05:24:07'),(108,'default','created','App\\Models\\ListeningHistory','created',84,'App\\Models\\User',1,'{\"attributes\":{\"id\":84,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T12:25:53.000000Z\",\"updated_at\":\"2024-06-19T12:25:53.000000Z\"}}',NULL,'2024-06-19 05:25:53','2024-06-19 05:25:53'),(109,'default','created','App\\Models\\ListeningHistory','created',85,'App\\Models\\User',1,'{\"attributes\":{\"id\":85,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T12:30:04.000000Z\",\"updated_at\":\"2024-06-19T12:30:04.000000Z\"}}',NULL,'2024-06-19 05:30:04','2024-06-19 05:30:04'),(110,'default','updated','App\\Models\\Post','updated',2,'App\\Models\\User',1,'{\"attributes\":{\"updated_at\":\"2024-06-19T12:30:47.000000Z\",\"count_of_comment\":1},\"old\":{\"updated_at\":\"2024-06-19T12:24:07.000000Z\",\"count_of_comment\":0}}',NULL,'2024-06-19 05:30:47','2024-06-19 05:30:47'),(111,'default','created','App\\Models\\ListeningHistory','created',86,'App\\Models\\User',1,'{\"attributes\":{\"id\":86,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T12:36:44.000000Z\",\"updated_at\":\"2024-06-19T12:36:44.000000Z\"}}',NULL,'2024-06-19 05:36:44','2024-06-19 05:36:44'),(112,'default','created','App\\Models\\ListeningHistory','created',87,'App\\Models\\User',1,'{\"attributes\":{\"id\":87,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T12:36:54.000000Z\",\"updated_at\":\"2024-06-19T12:36:54.000000Z\"}}',NULL,'2024-06-19 05:36:54','2024-06-19 05:36:54'),(113,'default','created','App\\Models\\ListeningHistory','created',88,'App\\Models\\User',1,'{\"attributes\":{\"id\":88,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T12:37:15.000000Z\",\"updated_at\":\"2024-06-19T12:37:15.000000Z\"}}',NULL,'2024-06-19 05:37:15','2024-06-19 05:37:15'),(114,'default','created','App\\Models\\ListeningHistory','created',89,'App\\Models\\User',1,'{\"attributes\":{\"id\":89,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T12:37:24.000000Z\",\"updated_at\":\"2024-06-19T12:37:24.000000Z\"}}',NULL,'2024-06-19 05:37:24','2024-06-19 05:37:24'),(115,'default','updated','App\\Models\\Post','updated',2,'App\\Models\\User',1,'{\"attributes\":{\"updated_at\":\"2024-06-19T12:37:36.000000Z\",\"heart\":1},\"old\":{\"updated_at\":\"2024-06-19T12:30:47.000000Z\",\"heart\":0}}',NULL,'2024-06-19 05:37:36','2024-06-19 05:37:36'),(116,'default','created','App\\Models\\InteractSong','created',10,'App\\Models\\User',1,'{\"attributes\":{\"id\":10,\"user_id\":1,\"song_id\":2,\"type\":\"add_heart_post\",\"created_at\":\"2024-06-19T12:37:36.000000Z\",\"updated_at\":\"2024-06-19T12:37:36.000000Z\"}}',NULL,'2024-06-19 05:37:36','2024-06-19 05:37:36'),(117,'default','created','App\\Models\\ListeningHistory','created',90,'App\\Models\\User',1,'{\"attributes\":{\"id\":90,\"user_id\":1,\"song_id\":7,\"created_at\":\"2024-06-19T12:38:41.000000Z\",\"updated_at\":\"2024-06-19T12:38:41.000000Z\"}}',NULL,'2024-06-19 05:38:41','2024-06-19 05:38:41'),(118,'default','updated','App\\Models\\Song','updated',7,'App\\Models\\User',1,'{\"attributes\":{\"heart\":1,\"updated_at\":\"2024-06-19T12:38:49.000000Z\"},\"old\":{\"heart\":0,\"updated_at\":\"2024-06-18T09:29:57.000000Z\"}}',NULL,'2024-06-19 05:38:49','2024-06-19 05:38:49'),(119,'default','created','App\\Models\\InteractSong','created',11,'App\\Models\\User',1,'{\"attributes\":{\"id\":11,\"user_id\":1,\"song_id\":7,\"type\":\"add_heart_song\",\"created_at\":\"2024-06-19T12:38:49.000000Z\",\"updated_at\":\"2024-06-19T12:38:49.000000Z\"}}',NULL,'2024-06-19 05:38:49','2024-06-19 05:38:49'),(120,'default','created','App\\Models\\ListeningHistory','created',91,'App\\Models\\User',1,'{\"attributes\":{\"id\":91,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-19T12:54:15.000000Z\",\"updated_at\":\"2024-06-19T12:54:15.000000Z\"}}',NULL,'2024-06-19 05:54:15','2024-06-19 05:54:15'),(121,'default','created','App\\Models\\ListeningHistory','created',92,'App\\Models\\User',1,'{\"attributes\":{\"id\":92,\"user_id\":1,\"song_id\":4,\"created_at\":\"2024-06-19T13:22:09.000000Z\",\"updated_at\":\"2024-06-19T13:22:09.000000Z\"}}',NULL,'2024-06-19 06:22:09','2024-06-19 06:22:09'),(122,'default','created','App\\Models\\ListeningHistory','created',93,'App\\Models\\User',1,'{\"attributes\":{\"id\":93,\"user_id\":1,\"song_id\":6,\"created_at\":\"2024-06-19T13:22:49.000000Z\",\"updated_at\":\"2024-06-19T13:22:49.000000Z\"}}',NULL,'2024-06-19 06:22:49','2024-06-19 06:22:49'),(123,'default','created','App\\Models\\ListeningHistory','created',94,'App\\Models\\User',1,'{\"attributes\":{\"id\":94,\"user_id\":1,\"song_id\":6,\"created_at\":\"2024-06-19T13:22:56.000000Z\",\"updated_at\":\"2024-06-19T13:22:56.000000Z\"}}',NULL,'2024-06-19 06:22:56','2024-06-19 06:22:56'),(124,'default','created','App\\Models\\ListeningHistory','created',95,'App\\Models\\User',1,'{\"attributes\":{\"id\":95,\"user_id\":1,\"song_id\":4,\"created_at\":\"2024-06-19T13:24:30.000000Z\",\"updated_at\":\"2024-06-19T13:24:30.000000Z\"}}',NULL,'2024-06-19 06:24:30','2024-06-19 06:24:30'),(125,'default','created','App\\Models\\ListeningHistory','created',96,'App\\Models\\User',1,'{\"attributes\":{\"id\":96,\"user_id\":1,\"song_id\":5,\"created_at\":\"2024-06-19T13:24:36.000000Z\",\"updated_at\":\"2024-06-19T13:24:36.000000Z\"}}',NULL,'2024-06-19 06:24:36','2024-06-19 06:24:36'),(126,'default','created','App\\Models\\ListeningHistory','created',97,'App\\Models\\User',1,'{\"attributes\":{\"id\":97,\"user_id\":1,\"song_id\":4,\"created_at\":\"2024-06-19T13:25:01.000000Z\",\"updated_at\":\"2024-06-19T13:25:01.000000Z\"}}',NULL,'2024-06-19 06:25:01','2024-06-19 06:25:01'),(127,'default','created','App\\Models\\ListeningHistory','created',98,'App\\Models\\User',1,'{\"attributes\":{\"id\":98,\"user_id\":1,\"song_id\":4,\"created_at\":\"2024-06-19T13:25:19.000000Z\",\"updated_at\":\"2024-06-19T13:25:19.000000Z\"}}',NULL,'2024-06-19 06:25:19','2024-06-19 06:25:19'),(128,'default','created','App\\Models\\ListeningHistory','created',99,'App\\Models\\User',1,'{\"attributes\":{\"id\":99,\"user_id\":1,\"song_id\":6,\"created_at\":\"2024-06-19T13:32:58.000000Z\",\"updated_at\":\"2024-06-19T13:32:58.000000Z\"}}',NULL,'2024-06-19 06:32:58','2024-06-19 06:32:58'),(129,'default','updated','App\\Models\\Song','updated',8,'App\\Models\\User',1,'{\"attributes\":{\"heart\":1,\"updated_at\":\"2024-06-19T15:39:39.000000Z\"},\"old\":{\"heart\":0,\"updated_at\":\"2024-06-18T09:29:23.000000Z\"}}',NULL,'2024-06-19 08:39:39','2024-06-19 08:39:39'),(130,'default','created','App\\Models\\InteractSong','created',12,'App\\Models\\User',1,'{\"attributes\":{\"id\":12,\"user_id\":1,\"song_id\":8,\"type\":\"add_heart_song\",\"created_at\":\"2024-06-19T15:39:39.000000Z\",\"updated_at\":\"2024-06-19T15:39:39.000000Z\"}}',NULL,'2024-06-19 08:39:39','2024-06-19 08:39:39'),(131,'default','created','App\\Models\\ListeningHistory','created',100,'App\\Models\\User',2,'{\"attributes\":{\"id\":100,\"user_id\":2,\"song_id\":5,\"created_at\":\"2024-06-19T15:51:05.000000Z\",\"updated_at\":\"2024-06-19T15:51:05.000000Z\"}}',NULL,'2024-06-19 08:51:05','2024-06-19 08:51:05'),(132,'default','created','App\\Models\\ListeningHistory','created',101,'App\\Models\\User',2,'{\"attributes\":{\"id\":101,\"user_id\":2,\"song_id\":5,\"created_at\":\"2024-06-19T15:55:26.000000Z\",\"updated_at\":\"2024-06-19T15:55:26.000000Z\"}}',NULL,'2024-06-19 08:55:26','2024-06-19 08:55:26'),(133,'default','created','App\\Models\\ListeningHistory','created',102,'App\\Models\\User',2,'{\"attributes\":{\"id\":102,\"user_id\":2,\"song_id\":5,\"created_at\":\"2024-06-19T15:58:31.000000Z\",\"updated_at\":\"2024-06-19T15:58:31.000000Z\"}}',NULL,'2024-06-19 08:58:31','2024-06-19 08:58:31'),(134,'default','created','App\\Models\\ListeningHistory','created',103,'App\\Models\\User',2,'{\"attributes\":{\"id\":103,\"user_id\":2,\"song_id\":5,\"created_at\":\"2024-06-19T15:58:41.000000Z\",\"updated_at\":\"2024-06-19T15:58:41.000000Z\"}}',NULL,'2024-06-19 08:58:41','2024-06-19 08:58:41'),(135,'default','created','App\\Models\\ListeningHistory','created',104,'App\\Models\\User',2,'{\"attributes\":{\"id\":104,\"user_id\":2,\"song_id\":5,\"created_at\":\"2024-06-19T15:59:07.000000Z\",\"updated_at\":\"2024-06-19T15:59:07.000000Z\"}}',NULL,'2024-06-19 08:59:07','2024-06-19 08:59:07'),(136,'default','created','App\\Models\\ListeningHistory','created',105,'App\\Models\\User',2,'{\"attributes\":{\"id\":105,\"user_id\":2,\"song_id\":11,\"created_at\":\"2024-06-19T16:31:09.000000Z\",\"updated_at\":\"2024-06-19T16:31:09.000000Z\"}}',NULL,'2024-06-19 09:31:09','2024-06-19 09:31:09'),(137,'default','updated','App\\Models\\Post','updated',2,'App\\Models\\User',2,'{\"attributes\":{\"updated_at\":\"2024-06-19T16:31:30.000000Z\",\"count_of_comment\":2},\"old\":{\"updated_at\":\"2024-06-19T12:37:36.000000Z\",\"count_of_comment\":1}}',NULL,'2024-06-19 09:31:30','2024-06-19 09:31:30'),(138,'default','updated','App\\Models\\Post','updated',2,'App\\Models\\User',2,'{\"attributes\":{\"updated_at\":\"2024-06-19T16:31:44.000000Z\",\"heart\":2},\"old\":{\"updated_at\":\"2024-06-19T16:31:30.000000Z\",\"heart\":1}}',NULL,'2024-06-19 09:31:44','2024-06-19 09:31:44'),(139,'default','created','App\\Models\\InteractSong','created',13,'App\\Models\\User',2,'{\"attributes\":{\"id\":13,\"user_id\":2,\"song_id\":2,\"type\":\"add_heart_post\",\"created_at\":\"2024-06-19T16:31:44.000000Z\",\"updated_at\":\"2024-06-19T16:31:44.000000Z\"}}',NULL,'2024-06-19 09:31:44','2024-06-19 09:31:44'),(140,'default','updated','App\\Models\\Post','updated',1,'App\\Models\\User',2,'{\"attributes\":{\"updated_at\":\"2024-06-19T16:31:56.000000Z\",\"heart\":2},\"old\":{\"updated_at\":\"2024-06-19T10:19:00.000000Z\",\"heart\":1}}',NULL,'2024-06-19 09:31:56','2024-06-19 09:31:56'),(141,'default','created','App\\Models\\InteractSong','created',14,'App\\Models\\User',2,'{\"attributes\":{\"id\":14,\"user_id\":2,\"song_id\":1,\"type\":\"add_heart_post\",\"created_at\":\"2024-06-19T16:31:56.000000Z\",\"updated_at\":\"2024-06-19T16:31:56.000000Z\"}}',NULL,'2024-06-19 09:31:56','2024-06-19 09:31:56'),(142,'default','updated','App\\Models\\Song','updated',6,'App\\Models\\User',2,'{\"attributes\":{\"heart\":2,\"updated_at\":\"2024-06-19T16:35:25.000000Z\"},\"old\":{\"heart\":1,\"updated_at\":\"2024-06-19T07:02:32.000000Z\"}}',NULL,'2024-06-19 09:35:25','2024-06-19 09:35:25'),(143,'default','created','App\\Models\\InteractSong','created',15,'App\\Models\\User',2,'{\"attributes\":{\"id\":15,\"user_id\":2,\"song_id\":6,\"type\":\"add_heart_song\",\"created_at\":\"2024-06-19T16:35:25.000000Z\",\"updated_at\":\"2024-06-19T16:35:25.000000Z\"}}',NULL,'2024-06-19 09:35:25','2024-06-19 09:35:25'),(144,'default','created','App\\Models\\ListeningHistory','created',106,'App\\Models\\User',2,'{\"attributes\":{\"id\":106,\"user_id\":2,\"song_id\":6,\"created_at\":\"2024-06-19T16:35:31.000000Z\",\"updated_at\":\"2024-06-19T16:35:31.000000Z\"}}',NULL,'2024-06-19 09:35:31','2024-06-19 09:35:31'),(145,'default','created','App\\Models\\ListeningHistory','created',107,'App\\Models\\User',2,'{\"attributes\":{\"id\":107,\"user_id\":2,\"song_id\":6,\"created_at\":\"2024-06-19T16:35:33.000000Z\",\"updated_at\":\"2024-06-19T16:35:33.000000Z\"}}',NULL,'2024-06-19 09:35:33','2024-06-19 09:35:33'),(146,'default','updated','App\\Models\\Song','updated',8,'App\\Models\\User',2,'{\"attributes\":{\"heart\":2,\"updated_at\":\"2024-06-19T16:36:20.000000Z\"},\"old\":{\"heart\":1,\"updated_at\":\"2024-06-19T15:39:39.000000Z\"}}',NULL,'2024-06-19 09:36:20','2024-06-19 09:36:20'),(147,'default','created','App\\Models\\InteractSong','created',16,'App\\Models\\User',2,'{\"attributes\":{\"id\":16,\"user_id\":2,\"song_id\":8,\"type\":\"add_heart_song\",\"created_at\":\"2024-06-19T16:36:20.000000Z\",\"updated_at\":\"2024-06-19T16:36:20.000000Z\"}}',NULL,'2024-06-19 09:36:20','2024-06-19 09:36:20'),(148,'default','created','App\\Models\\ListeningHistory','created',108,'App\\Models\\User',2,'{\"attributes\":{\"id\":108,\"user_id\":2,\"song_id\":4,\"created_at\":\"2024-06-19T16:37:18.000000Z\",\"updated_at\":\"2024-06-19T16:37:18.000000Z\"}}',NULL,'2024-06-19 09:37:18','2024-06-19 09:37:18'),(149,'default','created','App\\Models\\ListeningHistory','created',109,'App\\Models\\User',2,'{\"attributes\":{\"id\":109,\"user_id\":2,\"song_id\":5,\"created_at\":\"2024-06-19T16:37:50.000000Z\",\"updated_at\":\"2024-06-19T16:37:50.000000Z\"}}',NULL,'2024-06-19 09:37:50','2024-06-19 09:37:50'),(150,'default','created','App\\Models\\ListeningHistory','created',110,'App\\Models\\User',2,'{\"attributes\":{\"id\":110,\"user_id\":2,\"song_id\":4,\"created_at\":\"2024-06-19T17:49:32.000000Z\",\"updated_at\":\"2024-06-19T17:49:32.000000Z\"}}',NULL,'2024-06-19 10:49:32','2024-06-19 10:49:32'),(151,'default','created','App\\Models\\ListeningHistory','created',111,'App\\Models\\User',2,'{\"attributes\":{\"id\":111,\"user_id\":2,\"song_id\":5,\"created_at\":\"2024-06-19T17:50:46.000000Z\",\"updated_at\":\"2024-06-19T17:50:46.000000Z\"}}',NULL,'2024-06-19 10:50:46','2024-06-19 10:50:46'),(152,'default','created','App\\Models\\ListeningHistory','created',112,'App\\Models\\User',2,'{\"attributes\":{\"id\":112,\"user_id\":2,\"song_id\":5,\"created_at\":\"2024-06-19T17:50:49.000000Z\",\"updated_at\":\"2024-06-19T17:50:49.000000Z\"}}',NULL,'2024-06-19 10:50:49','2024-06-19 10:50:49'),(153,'default','created','App\\Models\\ListeningHistory','created',113,'App\\Models\\User',2,'{\"attributes\":{\"id\":113,\"user_id\":2,\"song_id\":5,\"created_at\":\"2024-06-19T17:51:57.000000Z\",\"updated_at\":\"2024-06-19T17:51:57.000000Z\"}}',NULL,'2024-06-19 10:51:57','2024-06-19 10:51:57'),(154,'default','created','App\\Models\\ListeningHistory','created',114,'App\\Models\\User',1,'{\"attributes\":{\"id\":114,\"user_id\":1,\"song_id\":11,\"created_at\":\"2024-06-20T05:59:05.000000Z\",\"updated_at\":\"2024-06-20T05:59:05.000000Z\"}}',NULL,'2024-06-19 22:59:05','2024-06-19 22:59:05'),(155,'default','created','App\\Models\\ListeningHistory','created',115,'App\\Models\\User',1,'{\"attributes\":{\"id\":115,\"user_id\":1,\"song_id\":4,\"created_at\":\"2024-06-20T07:14:30.000000Z\",\"updated_at\":\"2024-06-20T07:14:30.000000Z\"}}',NULL,'2024-06-20 00:14:30','2024-06-20 00:14:30'),(157,'default','created','App\\Models\\ListeningHistory','created',117,'App\\Models\\User',1,'{\"attributes\":{\"id\":117,\"user_id\":1,\"song_id\":6,\"created_at\":\"2024-06-20T07:14:47.000000Z\",\"updated_at\":\"2024-06-20T07:14:47.000000Z\"}}',NULL,'2024-06-20 00:14:47','2024-06-20 00:14:47'),(158,'default','created','App\\Models\\ListeningHistory','created',118,'App\\Models\\User',1,'{\"attributes\":{\"id\":118,\"user_id\":1,\"song_id\":6,\"created_at\":\"2024-06-20T07:14:52.000000Z\",\"updated_at\":\"2024-06-20T07:14:52.000000Z\"}}',NULL,'2024-06-20 00:14:52','2024-06-20 00:14:52');
/*!40000 ALTER TABLE `activity_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_post`
--

DROP TABLE IF EXISTS `comment_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_post` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `post_id` bigint(20) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_post`
--

LOCK TABLES `comment_post` WRITE;
/*!40000 ALTER TABLE `comment_post` DISABLE KEYS */;
INSERT INTO `comment_post` VALUES (1,1,1,'biển đông tác','2024-06-19 02:24:13','2024-06-19 02:24:13'),(2,1,2,'chay vai','2024-06-19 05:30:47','2024-06-19 05:30:47'),(3,2,2,'hay','2024-06-19 09:31:30','2024-06-19 09:31:30');
/*!40000 ALTER TABLE `comment_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_song`
--

DROP TABLE IF EXISTS `comment_song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_song` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `song_id` bigint(20) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_song`
--

LOCK TABLES `comment_song` WRITE;
/*!40000 ALTER TABLE `comment_song` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_song` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `song_id` bigint(20) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follows`
--

DROP TABLE IF EXISTS `follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follows` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `follower` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follows`
--

LOCK TABLES `follows` WRITE;
/*!40000 ALTER TABLE `follows` DISABLE KEYS */;
/*!40000 ALTER TABLE `follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hot_mv`
--

DROP TABLE IF EXISTS `hot_mv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hot_mv` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `mv_id` bigint(20) NOT NULL,
  `start_time` datetime DEFAULT NULL,
  `value` bigint(20) DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `new_start_time` datetime DEFAULT NULL,
  `new_value` bigint(20) DEFAULT NULL,
  `new_end_time` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hot_mv`
--

LOCK TABLES `hot_mv` WRITE;
/*!40000 ALTER TABLE `hot_mv` DISABLE KEYS */;
INSERT INTO `hot_mv` VALUES (1,1,NULL,NULL,NULL,NULL,NULL,NULL,'2024-06-19 05:53:09','2024-06-19 05:53:09');
/*!40000 ALTER TABLE `hot_mv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hot_song`
--

DROP TABLE IF EXISTS `hot_song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hot_song` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `song_id` bigint(20) NOT NULL,
  `start_time` date DEFAULT NULL,
  `value` bigint(20) DEFAULT NULL,
  `end_time` date DEFAULT NULL,
  `new_start_time` date DEFAULT NULL,
  `new_value` bigint(20) DEFAULT NULL,
  `new_end_time` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hot_song`
--

LOCK TABLES `hot_song` WRITE;
/*!40000 ALTER TABLE `hot_song` DISABLE KEYS */;
INSERT INTO `hot_song` VALUES (4,4,NULL,NULL,NULL,NULL,NULL,NULL,'2024-06-17 05:49:25','2024-06-17 05:49:25'),(5,5,NULL,NULL,NULL,NULL,NULL,NULL,'2024-06-17 06:10:51','2024-06-17 06:10:51'),(6,6,NULL,NULL,NULL,NULL,NULL,NULL,'2024-06-17 06:26:24','2024-06-17 06:26:24'),(7,7,NULL,NULL,NULL,NULL,NULL,NULL,'2024-06-17 06:42:27','2024-06-17 06:42:27'),(8,8,NULL,NULL,NULL,NULL,NULL,NULL,'2024-06-17 06:48:18','2024-06-17 06:48:18'),(9,9,NULL,NULL,NULL,NULL,NULL,NULL,'2024-06-17 06:54:06','2024-06-17 06:54:06'),(10,10,NULL,NULL,NULL,NULL,NULL,NULL,'2024-06-17 06:59:02','2024-06-17 06:59:02'),(11,11,NULL,NULL,NULL,NULL,NULL,NULL,'2024-06-19 00:30:03','2024-06-19 00:30:03');
/*!40000 ALTER TABLE `hot_song` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interact_song`
--

DROP TABLE IF EXISTS `interact_song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interact_song` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `song_id` bigint(20) NOT NULL,
  `type` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interact_song`
--

LOCK TABLES `interact_song` WRITE;
/*!40000 ALTER TABLE `interact_song` DISABLE KEYS */;
INSERT INTO `interact_song` VALUES (1,1,5,'add_heart_song','2024-06-18 03:23:29','2024-06-18 03:23:29'),(2,1,4,'add_heart_song','2024-06-18 03:24:52','2024-06-18 03:24:52'),(3,1,6,'add_heart_song','2024-06-19 00:02:32','2024-06-19 00:02:32'),(8,1,1,'add_heart_post','2024-06-19 03:19:00','2024-06-19 03:19:00'),(9,1,11,'add_heart_song','2024-06-19 03:19:10','2024-06-19 03:19:10'),(10,1,2,'add_heart_post','2024-06-19 05:37:36','2024-06-19 05:37:36'),(11,1,7,'add_heart_song','2024-06-19 05:38:49','2024-06-19 05:38:49'),(12,1,8,'add_heart_song','2024-06-19 08:39:39','2024-06-19 08:39:39'),(13,2,2,'add_heart_post','2024-06-19 09:31:44','2024-06-19 09:31:44'),(14,2,1,'add_heart_post','2024-06-19 09:31:56','2024-06-19 09:31:56'),(15,2,6,'add_heart_song','2024-06-19 09:35:25','2024-06-19 09:35:25'),(16,2,8,'add_heart_song','2024-06-19 09:36:20','2024-06-19 09:36:20');
/*!40000 ALTER TABLE `interact_song` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interacts`
--

DROP TABLE IF EXISTS `interacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interacts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `song_id` bigint(20) NOT NULL,
  `type` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interacts`
--

LOCK TABLES `interacts` WRITE;
/*!40000 ALTER TABLE `interacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `interacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listening_history`
--

DROP TABLE IF EXISTS `listening_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listening_history` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `song_id` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listening_history`
--

LOCK TABLES `listening_history` WRITE;
/*!40000 ALTER TABLE `listening_history` DISABLE KEYS */;
INSERT INTO `listening_history` VALUES (38,1,10,'2024-06-18 22:30:27','2024-06-18 22:30:27'),(43,1,8,'2024-06-18 22:36:54','2024-06-18 22:36:54'),(90,1,7,'2024-06-19 05:38:41','2024-06-19 05:38:41'),(96,1,5,'2024-06-19 06:24:36','2024-06-19 06:24:36'),(105,2,11,'2024-06-19 09:31:09','2024-06-19 09:31:09'),(107,2,6,'2024-06-19 09:35:33','2024-06-19 09:35:33'),(110,2,4,'2024-06-19 10:49:32','2024-06-19 10:49:32'),(113,2,5,'2024-06-19 10:51:57','2024-06-19 10:51:57'),(114,1,11,'2024-06-19 22:59:05','2024-06-19 22:59:05'),(115,1,4,'2024-06-20 00:14:30','2024-06-20 00:14:30'),(118,1,6,'2024-06-20 00:14:52','2024-06-20 00:14:52');
/*!40000 ALTER TABLE `listening_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_reset_tokens_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2024_03_11_030327_create_songs',1),(6,'2024_03_11_031424_create_types',1),(7,'2024_03_11_031523_create_hot_song',1),(8,'2024_03_11_032015_create_play_list',1),(9,'2024_03_11_032222_create_listening_history',1),(10,'2024_03_11_032304_create_interacts',1),(11,'2024_03_11_032352_create_comments',1),(12,'2024_03_11_032508_create_follows',1),(13,'2024_03_11_033321_create_permission_tables',1),(14,'2024_04_16_052014_update_song',1),(15,'2024_05_07_124642_create__m_v_table',1),(16,'2024_05_07_130235_add_column_status__m_v_table',1),(17,'2024_05_07_134242_add_column_heart__m_v_table',1),(18,'2024_05_08_072301_create_hot_mv_table',1),(19,'2024_05_18_030438_create_post_table',1),(20,'2024_05_18_135824_update_post_table',1),(21,'2024_05_19_151456_create_notifications_table',1),(22,'2024_05_20_022737_create_activity_log_table',1),(23,'2024_05_20_022738_add_event_column_to_activity_log_table',1),(24,'2024_05_20_022739_add_batch_uuid_column_to_activity_log_table',1),(25,'2024_05_20_090155_create_interact_song',1),(26,'2024_05_21_072726_create_comment_song_table',1),(27,'2024_05_21_072925_create_comment_post_table',1),(28,'2024_05_27_040946_add_column_lyric_to_table_songs',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_permissions`
--

DROP TABLE IF EXISTS `model_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) unsigned NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_permissions`
--

LOCK TABLES `model_has_permissions` WRITE;
/*!40000 ALTER TABLE `model_has_permissions` DISABLE KEYS */;
INSERT INTO `model_has_permissions` VALUES (1,'App\\Models\\User',1),(2,'App\\Models\\User',1),(3,'App\\Models\\User',1),(4,'App\\Models\\User',1),(5,'App\\Models\\User',1),(6,'App\\Models\\User',1),(7,'App\\Models\\User',1),(8,'App\\Models\\User',1),(9,'App\\Models\\User',1),(10,'App\\Models\\User',1),(11,'App\\Models\\User',1),(12,'App\\Models\\User',1),(13,'App\\Models\\User',1),(14,'App\\Models\\User',1),(15,'App\\Models\\User',1),(16,'App\\Models\\User',1),(17,'App\\Models\\User',1),(18,'App\\Models\\User',1),(19,'App\\Models\\User',1),(20,'App\\Models\\User',1),(21,'App\\Models\\User',1);
/*!40000 ALTER TABLE `model_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_roles`
--

DROP TABLE IF EXISTS `model_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) unsigned NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_roles`
--

LOCK TABLES `model_has_roles` WRITE;
/*!40000 ALTER TABLE `model_has_roles` DISABLE KEYS */;
INSERT INTO `model_has_roles` VALUES (1,'App\\Models\\User',1),(2,'App\\Models\\User',2);
/*!40000 ALTER TABLE `model_has_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` char(36) NOT NULL,
  `type` varchar(255) NOT NULL,
  `notifiable_type` varchar(255) NOT NULL,
  `notifiable_id` bigint(20) unsigned NOT NULL,
  `data` text NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'login','web','2024-06-17 01:45:41','2024-06-17 01:45:41'),(2,'register','web','2024-06-17 01:45:41','2024-06-17 01:45:41'),(3,'change_password','web','2024-06-17 01:45:41','2024-06-17 01:45:41'),(4,'upload_song','web','2024-06-17 01:45:41','2024-06-17 01:45:41'),(5,'update_song','web','2024-06-17 01:45:41','2024-06-17 01:45:41'),(6,'delete_song','web','2024-06-17 01:45:41','2024-06-17 01:45:41'),(7,'view_song','web','2024-06-17 01:45:41','2024-06-17 01:45:41'),(8,'upload_mv','web','2024-06-17 01:45:41','2024-06-17 01:45:41'),(9,'update_mv','web','2024-06-17 01:45:42','2024-06-17 01:45:42'),(10,'delete_mv','web','2024-06-17 01:45:42','2024-06-17 01:45:42'),(11,'view_mv','web','2024-06-17 01:45:42','2024-06-17 01:45:42'),(12,'manager_mv','web','2024-06-17 01:45:42','2024-06-17 01:45:42'),(13,'manager_song','web','2024-06-17 01:45:42','2024-06-17 01:45:42'),(14,'download_song','web','2024-06-17 01:45:42','2024-06-17 01:45:42'),(15,'create_post','web','2024-06-17 01:45:42','2024-06-17 01:45:42'),(16,'view_post','web','2024-06-17 01:45:42','2024-06-17 01:45:42'),(17,'add_comment','web','2024-06-17 01:45:42','2024-06-17 01:45:42'),(18,'view_comment','web','2024-06-17 01:45:42','2024-06-17 01:45:42'),(19,'delete_comment','web','2024-06-17 01:45:42','2024-06-17 01:45:42'),(20,'view_zingchart','web','2024-06-17 01:45:42','2024-06-17 01:45:42'),(21,'add_playlist','web','2024-06-17 01:45:42','2024-06-17 01:45:42');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',1,'Admin-Token','aeb148687e48d962da61f41a01c4057a1372d5d866c2402aff7fe2b6010f9038','[\"*\"]','2024-06-19 06:39:09',NULL,'2024-06-17 01:51:21','2024-06-19 06:39:09'),(2,'App\\Models\\User',1,'Admin-Token','b9619712ec882f29f9f5e74787350845c2e59f24051c55857eae5ab66c9d356a','[\"*\"]','2024-06-19 07:05:41',NULL,'2024-06-19 06:46:59','2024-06-19 07:05:41'),(3,'App\\Models\\User',1,'Admin-Token','ffd926e58978208ad34c2bf3d92b84c3462fe4a728c053d70e9ffa04e8aa2af0','[\"*\"]','2024-06-19 07:51:23',NULL,'2024-06-19 07:06:33','2024-06-19 07:51:23'),(4,'App\\Models\\User',1,'Admin-Token','1ccb777f5964dd2c0668986fe3d072c73e1739f1464dbad8199a845f8e2a2e93','[\"*\"]','2024-06-19 08:05:02',NULL,'2024-06-19 08:04:04','2024-06-19 08:05:02'),(5,'App\\Models\\User',1,'Admin-Token','db7d33ffc81da9d7931f260176faca77c3f20bb801357ee01e11120a800db509','[\"*\"]','2024-06-19 08:41:29',NULL,'2024-06-19 08:37:18','2024-06-19 08:41:29'),(6,'App\\Models\\User',2,'Admin-Token','0273959ac5964034a617210b062cfb6d03aa0f2b6b19af192b7f15da0810e3b5','[\"*\"]','2024-06-19 08:51:05',NULL,'2024-06-19 08:48:44','2024-06-19 08:51:05'),(7,'App\\Models\\User',2,'Admin-Token','a8aa2b7d4f36a43a076a357e11a6c100c2b0aab180a64e47928aae053b0b269d','[\"*\"]','2024-06-19 09:00:51',NULL,'2024-06-19 08:55:02','2024-06-19 09:00:51'),(8,'App\\Models\\User',2,'Admin-Token','8b8a80feac09a6ed5dd801915b87a6aad20750bda2428ba198daf0559209f34d','[\"*\"]','2024-06-19 10:54:07',NULL,'2024-06-19 09:08:19','2024-06-19 10:54:07'),(9,'App\\Models\\User',1,'Admin-Token','390b8e428e0451d4f64b1c5254a9c35242d654332e5da2a7c6e0db4224d6c916','[\"*\"]','2024-06-20 02:48:37',NULL,'2024-06-19 10:54:38','2024-06-20 02:48:37');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `play_list`
--

DROP TABLE IF EXISTS `play_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `play_list` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `song_id` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `play_list`
--

LOCK TABLES `play_list` WRITE;
/*!40000 ALTER TABLE `play_list` DISABLE KEYS */;
INSERT INTO `play_list` VALUES (1,1,4,'2024-06-18 03:24:57','2024-06-18 03:24:57'),(2,1,5,'2024-06-18 03:25:01','2024-06-18 03:25:01'),(3,1,6,'2024-06-19 00:02:35','2024-06-19 00:02:35'),(4,1,7,'2024-06-19 05:38:52','2024-06-19 05:38:52'),(5,2,6,'2024-06-19 09:35:23','2024-06-19 09:35:23');
/*!40000 ALTER TABLE `play_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `text_content` varchar(255) DEFAULT NULL,
  `file_song` varchar(255) DEFAULT NULL,
  `file_image` varchar(255) DEFAULT NULL,
  `status` enum('pending','accept','canceled') NOT NULL DEFAULT 'pending',
  `is_private` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `heart` bigint(20) NOT NULL DEFAULT 0,
  `count_of_share` bigint(20) NOT NULL DEFAULT 0,
  `count_of_comment` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,1,'test image','','1718787955.jpg','pending',0,'2024-06-19 02:05:55','2024-06-19 09:31:56',2,0,1),(2,1,'test song','1718799847.mp3','1718799847.jpg','pending',0,'2024-06-19 05:24:07','2024-06-19 09:31:44',2,0,2);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) unsigned NOT NULL,
  `role_id` bigint(20) unsigned NOT NULL,
  KEY `role_has_permissions_permission_id_foreign` (`permission_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_has_permissions`
--

LOCK TABLES `role_has_permissions` WRITE;
/*!40000 ALTER TABLE `role_has_permissions` DISABLE KEYS */;
INSERT INTO `role_has_permissions` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1),(18,1),(19,1),(20,1),(21,1),(1,2),(2,2),(3,2),(4,2),(5,2),(6,2),(7,2),(8,2),(9,2),(10,2),(11,2),(14,2),(15,2),(16,2),(17,2),(18,2),(19,2),(20,2),(21,2);
/*!40000 ALTER TABLE `role_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','web','2024-06-17 01:45:41','2024-06-17 01:45:41'),(2,'User','web','2024-06-17 01:45:41','2024-06-17 01:45:41'),(3,'Author','web','2024-06-17 01:45:41','2024-06-17 01:45:41');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `artists` varchar(255) NOT NULL,
  `language` varchar(255) DEFAULT NULL,
  `primary_genre` varchar(255) NOT NULL,
  `secondary_genre` varchar(255) NOT NULL,
  `composition_copyright` varchar(255) NOT NULL,
  `record_laber_name` varchar(255) DEFAULT NULL,
  `originaly_released` date NOT NULL,
  `audio` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `lyric_file` varchar(255) DEFAULT NULL,
  `type_id` bigint(20) DEFAULT NULL,
  `status` enum('pending','accept','canceled') NOT NULL DEFAULT 'pending',
  `user_id` bigint(20) NOT NULL,
  `heart` bigint(20) NOT NULL DEFAULT 0,
  `discription` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `delete_ad` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES (4,'Maps','[\"Maroon 5\"]','GB','Pop','Pop','Maroon 5',NULL,'2024-06-17','1718628564.mp3','1718628564.jpg','1718628564.jpg','1718628565.lrc',NULL,'accept',1,1,NULL,'2024-06-17 05:49:25','2024-06-18 03:24:52',NULL),(5,'Một Mai','[\"Whee!\"]','VN','Easy Listening','Pop','Yin Yang Media',NULL,'2024-06-17','1718629851.mp3','1718629851.jpg','1718629851.jpg','1718629851.lrc',NULL,'accept',1,1,NULL,'2024-06-17 06:10:51','2024-06-18 03:23:29',NULL),(6,'Sinh Ra Đã Là Thứ Đối Lập Nhau','[\"Emcee L (Da LAB)\",\"Badbie\"]','VN','Pop','Pop','Yin Yang Media',NULL,'2024-06-17','1718630784.mp3','1718630784.jpg','1718630784.jpg','1718630784.lrc',NULL,'accept',1,2,NULL,'2024-06-17 06:26:24','2024-06-19 09:35:25',NULL),(7,'Something Just Like This','[\"The Chainsmokers & Coldplay\"]','GB','Pop','Dance','The Chainsmokers',NULL,'2024-06-17','1718631746.mp3','1718631746.jpg','1718631746.jpg',NULL,NULL,'accept',1,1,NULL,'2024-06-17 06:42:27','2024-06-19 05:38:49',NULL),(8,'Chuyện Đôi Ta','[\"Emcee L (Da LAB)\",\"Mu\\u1ed9ii\"]','VN','Easy Listening','Pop','Yin Yang Media',NULL,'2024-06-17','1718632098.mp3','1718632098.jpg','1718632098.jpg','1718632098.lrc',NULL,'accept',1,2,NULL,'2024-06-17 06:48:18','2024-06-19 09:36:20',NULL),(9,'Có Hẹn Với Thanh Xuân','[\"Suni H\\u1ea1 Linh\",\"Ho\\u00e0ng D\\u0169ng\",\"GREY D\",\"Orange\",\"tlinh\"]','VN','Pop','Blues','MMusic',NULL,'2024-06-17','1718632445.mp3','1718632445.jpg','1718632445.jpg','1718632446.lrc',NULL,'accept',1,0,NULL,'2024-06-17 06:54:06','2024-06-18 02:26:03',NULL),(10,'Âm Thầm Bên Em','[\"S\\u01a1n T\\u00f9ng M-TP\"]','VN','Pop','Easy Listening','VIVI ENM',NULL,'2024-06-17','1718632741.mp3','1718632741.jpg','1718632741.jpg','1718632742.lrc',NULL,'accept',1,0,NULL,'2024-06-17 06:59:02','2024-06-18 05:37:29',NULL),(11,'Save With Me','[\"Gryffin\",\"Audrey Mika\"]','US','Pop','Pop','gryffinofficial',NULL,'2024-06-19','1718782202.mp3','1718782202.jpg','1718782202.jpg',NULL,NULL,'accept',1,1,NULL,'2024-06-19 00:30:03','2024-06-19 03:19:10',NULL);
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types`
--

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `birth_day` date NOT NULL,
  `gender` enum('male','female','other') NOT NULL DEFAULT 'male',
  `status` enum('enable','disable') NOT NULL DEFAULT 'enable',
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `count_follower` bigint(20) NOT NULL DEFAULT 0,
  `avatar` varchar(255) NOT NULL DEFAULT 'user.png',
  `avatar_origin` varchar(255) NOT NULL DEFAULT 'user_origin.png',
  `background_image` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `language` varchar(255) NOT NULL DEFAULT 'en',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_phone_number_unique` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'dang hung','dung','dung_admin','2004-04-12','male','enable',NULL,'0918180441','$2y$12$BRbyzX.lbb6kvvKTorlpReM1UYsEXmvkzTuhEiZ4chID/L9Hp1YQ2',0,'1718780607.jpg','1718780607.jpg','1718706400.jpg',NULL,'en',NULL,'2024-06-19 01:45:41','2024-06-19 00:05:55'),(2,'dung dang','hung','user1','2024-06-05','male','enable','user1@gmail.com',NULL,'$2y$12$lNo/By8dfwZ1BeC6qeIdrOWdL2khvBb12x5rrX94l1fwAKDdIKNmu',0,'user.png','user_origin.png','1718812612.jpg',NULL,'en',NULL,'2024-06-19 08:48:16','2024-06-19 08:56:52');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'music'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-25 19:40:42
