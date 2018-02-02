/*
 Navicat MySQL Data Transfer

 Source Server         : marking
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : cAuth

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 02/02/2018 18:45:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for D2DPush
-- ----------------------------
DROP TABLE IF EXISTS `D2DPush`;
CREATE TABLE `D2DPush` (
  `pDelegator_openid` varchar(40) NOT NULL,
  `pSeeker_openid` varchar(40) NOT NULL,
  `tDelegator_openid` varchar(40) NOT NULL,
  `tSeeker_openid` varchar(40) NOT NULL,
  `start_time` date NOT NULL,
  `status` int(1) NOT NULL,
  `d2d_push_id` int(1) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`d2d_push_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of D2DPush
-- ----------------------------
BEGIN;
INSERT INTO `D2DPush` VALUES ('12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM', '2018-01-02', 0, 6);
INSERT INTO `D2DPush` VALUES ('12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM1', '2018-01-02', 0, 7);
INSERT INTO `D2DPush` VALUES ('12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM2', '2018-01-02', 0, 8);
INSERT INTO `D2DPush` VALUES ('delegatorAID', 'seekerAID', 'delegatorBID', 'seekerBID', '2018-02-02', 0, 9);
COMMIT;

-- ----------------------------
-- Table structure for D2SPush
-- ----------------------------
DROP TABLE IF EXISTS `D2SPush`;
CREATE TABLE `D2SPush` (
  `pDelegator_openid` varchar(40) NOT NULL,
  `pSeeker_openid` varchar(40) NOT NULL,
  `tDelegator_openid` varchar(40) NOT NULL,
  `tSeeker_openid` varchar(40) NOT NULL,
  `start_time` date NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  `d2s_push_id` int(16) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`d2s_push_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of D2SPush
-- ----------------------------
BEGIN;
INSERT INTO `D2SPush` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM', '12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM1', '2018-01-22', 1, 9);
INSERT INTO `D2SPush` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM1', '12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM', '2018-01-28', 0, 10);
INSERT INTO `D2SPush` VALUES ('delegatorBID', 'seekerBID', 'DelegatorAID', 'seekerAID', '2018-02-02', 1, 11);
COMMIT;

-- ----------------------------
-- Table structure for DelegationShip
-- ----------------------------
DROP TABLE IF EXISTS `DelegationShip`;
CREATE TABLE `DelegationShip` (
  `delegationship_id` int(16) NOT NULL,
  `delegator_openId` varchar(40) NOT NULL,
  `seeker_openId` varchar(40) NOT NULL,
  `is_release` tinyint(1) NOT NULL DEFAULT '0',
  `status` int(1) DEFAULT '0',
  PRIMARY KEY (`delegationship_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of DelegationShip
-- ----------------------------
BEGIN;
INSERT INTO `DelegationShip` VALUES (1, 'delegatorAID', 'seekerAID', 1, 0);
INSERT INTO `DelegationShip` VALUES (2, 'delegatorBID', 'seekerBID', 1, 0);
COMMIT;

-- ----------------------------
-- Table structure for DelegatorInfo
-- ----------------------------
DROP TABLE IF EXISTS `DelegatorInfo`;
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

-- ----------------------------
-- Records of DelegatorInfo
-- ----------------------------
BEGIN;
INSERT INTO `DelegatorInfo` VALUES ('DelegatorAID', 'delegatorA', 'male', '522636', 'wechat', '15021128363', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0');
INSERT INTO `DelegatorInfo` VALUES ('DelegatorBID', 'delegatorB', 'male', '522636', 'wechat', '15021128363', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0');
COMMIT;

-- ----------------------------
-- Table structure for MatchContract
-- ----------------------------
DROP TABLE IF EXISTS `MatchContract`;
CREATE TABLE `MatchContract` (
  `contract_address` varchar(40) NOT NULL,
  `delegatemale_openid` varchar(40) NOT NULL,
  `delegatefemale_openid` varchar(40) NOT NULL,
  `seekermale_openid` varchar(40) NOT NULL,
  `seekerfemale_openid` varchar(40) NOT NULL,
  `reward` float(10,0) NOT NULL,
  `advance` float(4,0) NOT NULL,
  `status` int(1) NOT NULL,
  `signature` varchar(2048) NOT NULL,
  `signature_date` date NOT NULL,
  PRIMARY KEY (`contract_address`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for S2DPush
-- ----------------------------
DROP TABLE IF EXISTS `S2DPush`;
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

-- ----------------------------
-- Table structure for SeekerInfo
-- ----------------------------
DROP TABLE IF EXISTS `SeekerInfo`;
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
  `advance` float(2,0) DEFAULT NULL,
  `is_public` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`open_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of SeekerInfo
-- ----------------------------
BEGIN;
INSERT INTO `SeekerInfo` VALUES ('seekerAID', 'xiaomei', 18, 'male', 183, NULL, 'postgraduate', 'baiyang', 'O', NULL, 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0', '522636', 't6865733', '15021128363', 0x5B5D, 'optimistc life attitude, volubility, independence and brave.', 'brave, like fitness, cooking and basketball, sometimes I like taking a travel with my friends.', 400, NULL, 1);
INSERT INTO `SeekerInfo` VALUES ('seekerBID', 'xiaoming', 18, 'male', 183, NULL, 'postgraduate', 'baiyang', 'O', NULL, 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0', '522636', 't6865733', '15021128363', 0x5B5D, 'optimistc life attitude, volu    bility, independence and brave.', 'brave, like fitness, cooking and basketball, sometimes I like taking a travel with my friends.', 400, NULL, 1);
COMMIT;

-- ----------------------------
-- Table structure for User
-- ----------------------------
DROP TABLE IF EXISTS `User`;
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

-- ----------------------------
-- Records of User
-- ----------------------------
BEGIN;
INSERT INTO `User` VALUES ('delegatorAID', 'delegatorAPUBKEY', 'delegatorACADDR', 100, '2018-02-01 18:38:11', 'delegatorAIHASH', 0, 0);
INSERT INTO `User` VALUES ('delegatorBID', 'delegatorBPUBKEY', 'delegatorBCADDR', 100, '2018-02-01 18:38:11', 'delegatorBIHASH', 0, 0);
INSERT INTO `User` VALUES ('seekerAID', 'seekerAPUBKEY', 'seekerACADDR', 100, '2018-02-01 18:38:11', 'seekerAIHASH', 0, 0);
INSERT INTO `User` VALUES ('seekerBID', 'seekerBPUBKEY', 'seekerBCADDR', 100, '2018-02-01 18:38:11', 'seekerBIHASH', 0, 0);
COMMIT;

-- ----------------------------
-- Table structure for cSessionInfo
-- ----------------------------
DROP TABLE IF EXISTS `cSessionInfo`;
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

-- ----------------------------
-- Records of cSessionInfo
-- ----------------------------
BEGIN;
INSERT INTO `cSessionInfo` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM', 'ee1a07ae-cc1d-4329-86cf-86f56aa19984', 'a182d5e9ff05076f61c7a881ce7780b77795f2d2', '2018-01-30 22:00:14', '2018-01-30 22:00:14', 'r6yLSJgTcFaOba6xSrMIUg==', '{\"openId\":\"oHEkW0dNJwwjb3ete07iObpWGFcM\",\"nickName\":\"yo\",\"gender\":1,\"language\":\"zh_CN\",\"city\":\"Minhang\",\"province\":\"Shanghai\",\"country\":\"China\",\"avatarUrl\":\"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0\",\"watermark\":{\"timestamp\":1517320814,\"appid\":\"wx8727802679966793\"}}');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
