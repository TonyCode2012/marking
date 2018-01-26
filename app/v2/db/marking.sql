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

 Date: 26/01/2018 18:50:24
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
  `start_time` date DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `d2d_push_id` int(1) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`d2d_push_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of D2DPush
-- ----------------------------
BEGIN;
INSERT INTO `D2DPush` VALUES ('12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM', NULL, NULL, 6);
INSERT INTO `D2DPush` VALUES ('12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM1', NULL, NULL, 7);
INSERT INTO `D2DPush` VALUES ('12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM2', NULL, NULL, 8);
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
  `start_time` date DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  `d2s_push_id` int(2) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`d2s_push_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of D2SPush
-- ----------------------------
BEGIN;
INSERT INTO `D2SPush` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM', '12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM', NULL, 0, 9);
INSERT INTO `D2SPush` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM1', '12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM', NULL, 0, 10);
COMMIT;

-- ----------------------------
-- Table structure for DelegationShip
-- ----------------------------
DROP TABLE IF EXISTS `DelegationShip`;
CREATE TABLE `DelegationShip` (
  `delegationship_id` varchar(80) NOT NULL,
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
INSERT INTO `DelegationShip` VALUES ('12345oHEkW0dNJwwjb3ete07iObpWGFcM', '12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM', 1, 0);
INSERT INTO `DelegationShip` VALUES ('12345oHEkW0dNJwwjb3ete07iObpWGFcM1', '12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM1', 1, 0);
INSERT INTO `DelegationShip` VALUES ('12345oHEkW0dNJwwjb3ete07iObpWGFcM2', '12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM2', 0, 0);
INSERT INTO `DelegationShip` VALUES ('12345oHEkW0dNJwwjb3ete07iObpWGFcM3', '123451', 'oHEkW0dNJwwjb3ete07iObpWGFcM3', 0, 0);
INSERT INTO `DelegationShip` VALUES ('12345oHEkW0dNJwwjb3ete07iObpWGFcM4', '123452', 'oHEkW0dNJwwjb3ete07iObpWGFcM4', 0, 0);
INSERT INTO `DelegationShip` VALUES ('12345oHEkW0dNJwwjb3ete07iObpWGFcM5', '123453', 'oHEkW0dNJwwjb3ete07iObpWGFcM5', 0, 0);
INSERT INTO `DelegationShip` VALUES ('12345oHEkW0dNJwwjb3ete07iObpWGFcM6', '123454', 'oHEkW0dNJwwjb3ete07iObpWGFcM6', 0, 0);
INSERT INTO `DelegationShip` VALUES ('12345oHEkW0dNJwwjb3ete07iObpWGFcM7', '123455', 'oHEkW0dNJwwjb3ete07iObpWGFcM7', 0, 0);
INSERT INTO `DelegationShip` VALUES ('12345oHEkW0dNJwwjb3ete07iObpWGFcM8', '123456', 'oHEkW0dNJwwjb3ete07iObpWGFcM8', 0, 0);
INSERT INTO `DelegationShip` VALUES ('12345oHEkW0dNJwwjb3ete07iObpWGFcM9', '123457', 'oHEkW0dNJwwjb3ete07iObpWGFcM9', 0, 0);
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
  `wx_portraitAddr` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`open_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of DelegatorInfo
-- ----------------------------
BEGIN;
INSERT INTO `DelegatorInfo` VALUES ('12345', 'yaoz', 'male', '522636', 'wechat', '15021128363', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0');
INSERT INTO `DelegatorInfo` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM', 'yaoz', 'male', '522636', 'wechat', '15021128363', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0');
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
  `reward` float(10,0) DEFAULT NULL,
  `advance` float(4,0) DEFAULT NULL,
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
  `height` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `education` varchar(20) DEFAULT NULL,
  `constellation` varchar(12) DEFAULT NULL,
  `blood_type` varchar(10) DEFAULT NULL,
  `portrait` mediumblob,
  `wx_portraitAddr` varchar(200) DEFAULT NULL,
  `identity_num` varchar(20) DEFAULT NULL,
  `wechat` varchar(32) DEFAULT NULL,
  `phone_num` varchar(20) DEFAULT NULL,
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
INSERT INTO `SeekerInfo` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM', 'yaoz', 18, 'male', 183, NULL, 'postgraduate', 'baiyang', 'O', NULL, 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0', '522636', 't6865733', '15021128363', 0x5B5D, 'optimistc life attitude, volubility, independence and brave.', 'brave, like fitness, cooking and basketball, sometimes I like taking a travel with my friends.', 400, NULL, 1);
INSERT INTO `SeekerInfo` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM1', 'yaoz', 18, 'male', 183, NULL, 'postgraduate', 'baiyang', 'O', NULL, 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0', '522636', 't6865733', '15021128363', 0x5B5D, 'optimistc life attitude, volu    bility, independence and brave.', 'brave, like fitness, cooking and basketball, sometimes I like taking a travel with my friends.', 400, NULL, 1);
INSERT INTO `SeekerInfo` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM2', 'yaoz', 18, 'male', 183, NULL, 'postgraduate', 'baiyang', 'O', NULL, 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0', '522636', 't6865733', '15021128363', 0x5B5D, 'optimistc life attitude, volu    bility, independence and brave.', 'brave, like fitness, cooking and basketball, sometimes I like taking a travel with my friends.', 400, NULL, 1);
INSERT INTO `SeekerInfo` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM3', 'yaoz', 18, 'male', 183, NULL, 'postgraduate', 'baiyang', 'O', NULL, 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0', '522636', 't6865733', '15021128363', 0x5B5D, 'optimistc life attitude, volu    bility, independence and brave.', 'brave, like fitness, cooking and basketball, sometimes I like taking a travel with my friends.', 400, NULL, 1);
INSERT INTO `SeekerInfo` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM4', 'yaoz', 18, 'male', 183, NULL, 'postgraduate', 'baiyang', 'O', NULL, 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0', '522636', 't6865733', '15021128363', 0x5B5D, 'optimistc life attitude, volu    bility, independence and brave.', 'brave, like fitness, cooking and basketball, sometimes I like taking a travel with my friends.', 400, NULL, 1);
INSERT INTO `SeekerInfo` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM5', 'yaoz', 18, 'male', 183, NULL, 'postgraduate', 'baiyang', 'O', NULL, 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0', '522636', 't6865733', '15021128363', 0x5B5D, 'optimistc life attitude, volu    bility, independence and brave.', 'brave, like fitness, cooking and basketball, sometimes I like taking a travel with my friends.', 400, NULL, 1);
INSERT INTO `SeekerInfo` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM6', 'yaoz', 18, 'male', 183, NULL, 'postgraduate', 'baiyang', 'O', NULL, 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0', '522636', 't6865733', '15021128363', 0x5B5D, 'optimistc life attitude, volu    bility, independence and brave.', 'brave, like fitness, cooking and basketball, sometimes I like taking a travel with my friends.', 400, NULL, 1);
INSERT INTO `SeekerInfo` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM7', 'yaoz', 18, 'male', 183, NULL, 'postgraduate', 'baiyang', 'O', NULL, 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0', '522636', 't6865733', '15021128363', 0x5B5D, 'optimistc life attitude, volu    bility, independence and brave.', 'brave, like fitness, cooking and basketball, sometimes I like taking a travel with my friends.', 400, NULL, 1);
INSERT INTO `SeekerInfo` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM8', 'yaoz', 18, 'male', 183, NULL, 'postgraduate', 'baiyang', 'O', NULL, 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0', '522636', 't6865733', '15021128363', 0x5B5D, 'optimistc life attitude, volu    bility, independence and brave.', 'brave, like fitness, cooking and basketball, sometimes I like taking a travel with my friends.', 400, NULL, 1);
INSERT INTO `SeekerInfo` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM9', 'yaoz', 18, 'male', 183, NULL, 'postgraduate', 'baiyang', 'O', NULL, 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0', '522636', 't6865733', '15021128363', 0x5B5D, 'optimistc life attitude, volu    bility, independence and brave.', 'brave, like fitness, cooking and basketball, sometimes I like taking a travel with my friends.', 400, NULL, 1);
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
INSERT INTO `cSessionInfo` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM', '6f8b9da9-0b59-405b-93d0-e03805d46903', '93ad2473a183e251f432395b2b9dc5e6b37f57f2', '2018-01-26 17:53:09', '2018-01-26 17:53:09', '1hLn+Drm54DbWkqu0oSYXA==', '{\"openId\":\"oHEkW0dNJwwjb3ete07iObpWGFcM\",\"nickName\":\"yo\",\"gender\":1,\"language\":\"zh_CN\",\"city\":\"Minhang\",\"province\":\"Shanghai\",\"country\":\"China\",\"avatarUrl\":\"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0\",\"watermark\":{\"timestamp\":1516960105,\"appid\":\"wx8727802679966793\"}}');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
