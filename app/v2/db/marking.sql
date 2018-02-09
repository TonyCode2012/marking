-- MySQL dump 10.13  Distrib 5.7.20, for macos10.12 (x86_64)
--
-- Host: localhost    Database: cAuth
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `D2DPush`
--

DROP TABLE IF EXISTS `D2DPush`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `D2DPush` (
  `pDelegator_openid` varchar(40) NOT NULL,
  `pSeeker_openid` varchar(40) NOT NULL,
  `tDelegator_openid` varchar(40) NOT NULL,
  `tSeeker_openid` varchar(40) NOT NULL,
  `start_time` date NOT NULL,
  `status` int(1) NOT NULL,
  `d2d_push_id` int(1) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`d2d_push_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `D2DPush`
--

LOCK TABLES `D2DPush` WRITE;
/*!40000 ALTER TABLE `D2DPush` DISABLE KEYS */;
INSERT INTO `D2DPush` VALUES ('12345','oHEkW0dNJwwjb3ete07iObpWGFcM','oHEkW0dNJwwjb3ete07iObpWGFcM','oHEkW0dNJwwjb3ete07iObpWGFcM','2018-01-02',0,6),('12345','oHEkW0dNJwwjb3ete07iObpWGFcM','oHEkW0dNJwwjb3ete07iObpWGFcM','oHEkW0dNJwwjb3ete07iObpWGFcM1','2018-01-02',0,7),('12345','oHEkW0dNJwwjb3ete07iObpWGFcM','oHEkW0dNJwwjb3ete07iObpWGFcM','oHEkW0dNJwwjb3ete07iObpWGFcM2','2018-01-02',0,8),('delegatorBID','seekerBID','delegatorAID','seekerAID','2018-02-08',0,18);
/*!40000 ALTER TABLE `D2DPush` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `D2SPush`
--

DROP TABLE IF EXISTS `D2SPush`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `D2SPush` (
  `pDelegator_openid` varchar(40) NOT NULL,
  `pSeeker_openid` varchar(40) NOT NULL,
  `tDelegator_openid` varchar(40) NOT NULL,
  `tSeeker_openid` varchar(40) NOT NULL,
  `start_time` date NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  `d2s_push_id` int(16) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`d2s_push_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `D2SPush`
--

LOCK TABLES `D2SPush` WRITE;
/*!40000 ALTER TABLE `D2SPush` DISABLE KEYS */;
INSERT INTO `D2SPush` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM','oHEkW0dNJwwjb3ete07iObpWGFcM','12345','oHEkW0dNJwwjb3ete07iObpWGFcM1','2018-01-22',1,9),('oHEkW0dNJwwjb3ete07iObpWGFcM','oHEkW0dNJwwjb3ete07iObpWGFcM1','12345','oHEkW0dNJwwjb3ete07iObpWGFcM','2018-01-28',0,10),('delegatorAID','seekerAID','delegatorBID','seekerBID','2018-02-08',5,20);
/*!40000 ALTER TABLE `D2SPush` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DelegationShip`
--

DROP TABLE IF EXISTS `DelegationShip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DelegationShip` (
  `delegationship_id` int(16) NOT NULL,
  `delegator_openId` varchar(40) NOT NULL,
  `seeker_openId` varchar(40) NOT NULL,
  `is_release` tinyint(1) NOT NULL DEFAULT '0',
  `status` int(1) DEFAULT '0',
  PRIMARY KEY (`delegationship_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DelegationShip`
--

LOCK TABLES `DelegationShip` WRITE;
/*!40000 ALTER TABLE `DelegationShip` DISABLE KEYS */;
INSERT INTO `DelegationShip` VALUES (1,'delegatorAID','seekerAID',1,0),(2,'delegatorBID','seekerBID',0,0);
/*!40000 ALTER TABLE `DelegationShip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DelegatorInfo`
--

DROP TABLE IF EXISTS `DelegatorInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DelegatorInfo` (
  `open_id` varchar(40) NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `gender` varchar(10) CHARACTER SET utf8 NOT NULL,
  `identity_num` varchar(20) CHARACTER SET utf8 NOT NULL,
  `wechat` varchar(32) CHARACTER SET utf8 NOT NULL,
  `phone_num` varchar(20) CHARACTER SET utf8 NOT NULL,
  `wx_portraitAddr` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`open_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DelegatorInfo`
--

LOCK TABLES `DelegatorInfo` WRITE;
/*!40000 ALTER TABLE `DelegatorInfo` DISABLE KEYS */;
INSERT INTO `DelegatorInfo` VALUES ('delegatorAID','delegatorA','male','522636','wechat','15021128363','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0'),('delegatorBID','delegatorB','male','522636','wechat','15021128363','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0');
/*!40000 ALTER TABLE `DelegatorInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MatchContract`
--

DROP TABLE IF EXISTS `MatchContract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MatchContract` (
  `contract_addr` varchar(40) NOT NULL,
  `pDelegator_openid` varchar(40) NOT NULL,
  `pSeeker_openid` varchar(40) NOT NULL,
  `tDelegator_openid` varchar(40) NOT NULL,
  `tSeeker_openid` varchar(40) NOT NULL,
  `pReward` float(10,0) NOT NULL,
  `tReward` float(10,0) NOT NULL,
  `pAdvance` float(10,0) NOT NULL,
  `tAdvance` float(10,0) NOT NULL,
  `status` int(1) NOT NULL,
  `signature` varchar(2048) NOT NULL,
  `signature_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`contract_addr`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MatchContract`
--

LOCK TABLES `MatchContract` WRITE;
/*!40000 ALTER TABLE `MatchContract` DISABLE KEYS */;
INSERT INTO `MatchContract` VALUES ('xxx','delegatorAID','seekerAID','delegatorBID','seekerBID',400,400,200,200,5,'xxxx','2018-02-08 09:53:35');
/*!40000 ALTER TABLE `MatchContract` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `S2DPush`
--

DROP TABLE IF EXISTS `S2DPush`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `S2DPush` (
  `pusherseeker_openid` varchar(40) DEFAULT NULL,
  `pusherdelegate_openid` varchar(40) DEFAULT NULL,
  `targetdelegate_openid` varchar(40) DEFAULT NULL,
  `tartgetseeker_openid` varchar(40) DEFAULT NULL,
  `start_time` date DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `s2d_push_id` int(2) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`s2d_push_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `S2DPush`
--

LOCK TABLES `S2DPush` WRITE;
/*!40000 ALTER TABLE `S2DPush` DISABLE KEYS */;
/*!40000 ALTER TABLE `S2DPush` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SeekerInfo`
--

DROP TABLE IF EXISTS `SeekerInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SeekerInfo` (
  `open_id` varchar(40) NOT NULL,
  `name` varchar(20) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `height` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `education` varchar(20) DEFAULT NULL,
  `constellation` varchar(12) DEFAULT NULL,
  `blood_type` varchar(10) DEFAULT NULL,
  `portrait` mediumblob,
  `wx_portraitAddr` varchar(200) DEFAULT NULL,
  `identity_num` varchar(20) NOT NULL,
  `wechat` varchar(32) NOT NULL,
  `phone_num` varchar(20) NOT NULL,
  `life_photo` mediumblob,
  `requirement` varchar(200) DEFAULT NULL,
  `self_introduction` varchar(500) DEFAULT NULL,
  `reward` float(10,0) DEFAULT NULL,
  `advance` float(10,0) DEFAULT NULL,
  `is_public` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`open_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SeekerInfo`
--

LOCK TABLES `SeekerInfo` WRITE;
/*!40000 ALTER TABLE `SeekerInfo` DISABLE KEYS */;
INSERT INTO `SeekerInfo` VALUES ('seekerAID','xiaomei',18,'female',170,NULL,'postgraduate','baiyang','O',NULL,'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0','522636','t6865733','15021128363','[]','optimistc life attitude, volubility, independence and brave.','brave, like fitness, cooking and basketball, sometimes I like taking a travel with my friends.',400,200,1),('seekerBID','xiaoming',18,'male',183,NULL,'postgraduate','baiyang','O',NULL,'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0','522636','t6865733','15021128363','[]','optimistc life attitude, volu    bility, independence and brave.','brave, like fitness, cooking and basketball, sometimes I like taking a travel with my friends.',400,200,1);
/*!40000 ALTER TABLE `SeekerInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `open_id` varchar(40) NOT NULL,
  `public_key` varchar(128) NOT NULL,
  `chain_addr` varchar(45) NOT NULL,
  `balance` float(255,0) NOT NULL,
  `register_time` datetime NOT NULL,
  `identity_hash` varchar(32) NOT NULL,
  `status` int(255) NOT NULL DEFAULT '0',
  `role` int(255) NOT NULL,
  PRIMARY KEY (`open_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('delegatorAID','delegatorAPUBKEY','delegatorACADDR',100,'2018-02-01 18:38:11','delegatorAIHASH',0,0),('delegatorBID','delegatorBPUBKEY','delegatorBCADDR',100,'2018-02-01 18:38:11','delegatorBIHASH',0,0),('seekerAID','seekerAPUBKEY','seekerACADDR',100,'2018-02-01 18:38:11','seekerAIHASH',0,0),('seekerBID','seekerBPUBKEY','seekerBCADDR',100,'2018-02-01 18:38:11','seekerBIHASH',0,0);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cSessionInfo`
--

DROP TABLE IF EXISTS `cSessionInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cSessionInfo` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skey` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `session_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_info` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`open_id`) USING BTREE,
  KEY `openid` (`open_id`) USING BTREE,
  KEY `skey` (`skey`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='会话管理用户信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cSessionInfo`
--

LOCK TABLES `cSessionInfo` WRITE;
/*!40000 ALTER TABLE `cSessionInfo` DISABLE KEYS */;
INSERT INTO `cSessionInfo` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM','ee1a07ae-cc1d-4329-86cf-86f56aa19984','a182d5e9ff05076f61c7a881ce7780b77795f2d2','2018-01-30 14:00:14','2018-01-30 14:00:14','r6yLSJgTcFaOba6xSrMIUg==','{\"openId\":\"oHEkW0dNJwwjb3ete07iObpWGFcM\",\"nickName\":\"yo\",\"gender\":1,\"language\":\"zh_CN\",\"city\":\"Minhang\",\"province\":\"Shanghai\",\"country\":\"China\",\"avatarUrl\":\"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0\",\"watermark\":{\"timestamp\":1517320814,\"appid\":\"wx8727802679966793\"}}');
/*!40000 ALTER TABLE `cSessionInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'cAuth'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-09 19:01:52
