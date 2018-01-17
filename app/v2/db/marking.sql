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

 Date: 17/01/2018 18:53:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for D2DPush
-- ----------------------------
DROP TABLE IF EXISTS `D2DPush`;
CREATE TABLE `D2DPush` (
  `pusherdelegate_openid` varchar(40) DEFAULT NULL,
  `pusherseeker_openid` varchar(40) DEFAULT NULL,
  `targetdelegate_openid` varchar(40) DEFAULT NULL,
  `tartgetseeker_openid` varchar(40) DEFAULT NULL,
  `start_time` date DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `d2d_push_id` int(1) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`d2d_push_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for D2SPush
-- ----------------------------
DROP TABLE IF EXISTS `D2SPush`;
CREATE TABLE `D2SPush` (
  `pusherdelegate_openid` varchar(40) DEFAULT NULL,
  `pusherseeker_openid` varchar(40) DEFAULT NULL,
  `targetdelegate_openid` varchar(40) DEFAULT NULL,
  `tartgetseeker_openid` varchar(40) DEFAULT NULL,
  `start_time` date DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `d2s_push_id` int(2) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`d2s_push_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for DelegationShip
-- ----------------------------
DROP TABLE IF EXISTS `DelegationShip`;
CREATE TABLE `DelegationShip` (
  `delegator_openId` varchar(40) NOT NULL,
  `seeker_openId` varchar(40) NOT NULL,
  `status` int(1) DEFAULT NULL,
  `reward` float(2,0) DEFAULT NULL,
  `advance` float(2,0) DEFAULT NULL,
  `isPublic` tinyint(1) DEFAULT NULL,
  `delegationship_id` varchar(80) NOT NULL,
  PRIMARY KEY (`delegationship_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of DelegationShip
-- ----------------------------
BEGIN;
INSERT INTO `DelegationShip` VALUES ('12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM', NULL, NULL, NULL, NULL, '12345oHEkW0dNJwwjb3ete07iObpWGFcM');
COMMIT;

-- ----------------------------
-- Table structure for DelegatorInfo
-- ----------------------------
DROP TABLE IF EXISTS `DelegatorInfo`;
CREATE TABLE `DelegatorInfo` (
  `open_id` varchar(40) NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `gender` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `identity_num` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `wechat` varchar(32) CHARACTER SET utf8 DEFAULT NULL,
  `phone_num` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`open_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of DelegatorInfo
-- ----------------------------
BEGIN;
INSERT INTO `DelegatorInfo` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM', 'yaoz', 'male', '522636', 'wechat', '15021128363');
COMMIT;

-- ----------------------------
-- Table structure for MatchContract
-- ----------------------------
DROP TABLE IF EXISTS `MatchContract`;
CREATE TABLE `MatchContract` (
  `contract_address` varchar(40) DEFAULT NULL,
  `delegatemale_openid` varchar(40) DEFAULT NULL,
  `delegatefemale_openid` varchar(40) DEFAULT NULL,
  `seekermale_openid` varchar(40) DEFAULT NULL,
  `seekerfemale_openid` varchar(40) DEFAULT NULL,
  `reward` float(1,0) DEFAULT NULL,
  `advance` float(1,0) DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `signature` varchar(2048) DEFAULT NULL,
  `signature_date` date DEFAULT NULL,
  `contract_id` int(1) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`contract_id`) USING BTREE
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
  `name` varchar(20) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `identity_num` varchar(20) DEFAULT NULL,
  `wechat` varchar(32) DEFAULT NULL,
  `phone_num` varchar(20) DEFAULT NULL,
  `life_photo` mediumblob,
  `height` int(11) DEFAULT NULL,
  `requirement` varchar(200) DEFAULT NULL,
  `portrait` mediumblob,
  `self_introduction` varchar(500) DEFAULT NULL,
  `reward` float DEFAULT NULL,
  `constellation` varchar(12) DEFAULT NULL,
  `blood_type` varchar(10) DEFAULT NULL,
  `education` varchar(20) DEFAULT NULL,
  `publicRelease` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`open_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of SeekerInfo
-- ----------------------------
BEGIN;
INSERT INTO `SeekerInfo` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM', 'yaoz', 18, 'male', '522636', 't6865733', '15021128363', 0x5B5D, 183, 'optimistc life attitude, volubility, independence and brave.', NULL, 'brave, like fitness, cooking and basketball, sometimes I like taking a travel with my friends.', 400, 'baiyang', 'O', 'postgraduate', 1);
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
INSERT INTO `User` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM98765', 100, '2018-01-14 17:30:03', 'oHEkW0dNJwwjb3ete07iObpWGFcMyaoz', 0, 0);
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
INSERT INTO `cSessionInfo` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM', 'f5c1c406-f7be-4ab6-9fa9-21420c7059cd', 'c69b261913e611ca4f50afa7f187bab6d53c25da', '2018-01-17 18:26:31', '2018-01-17 18:26:31', 'UjwA4AJ3H96dbGEtGy7zDg==', '{\"openId\":\"oHEkW0dNJwwjb3ete07iObpWGFcM\",\"nickName\":\"yo\",\"gender\":1,\"language\":\"zh_CN\",\"city\":\"Minhang\",\"province\":\"Shanghai\",\"country\":\"China\",\"avatarUrl\":\"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0\",\"watermark\":{\"timestamp\":1516184536,\"appid\":\"wx8727802679966793\"}}');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
