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

 Date: 21/01/2018 23:56:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for D2DPush
-- ----------------------------
DROP TABLE IF EXISTS `D2DPush`;
CREATE TABLE `D2DPush`  (
  `pusherdelegate_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pusherseeker_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `targetdelegate_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tartgetseeker_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `start_time` date NULL DEFAULT NULL,
  `status` int(1) NULL DEFAULT NULL,
  `d2d_push_id` int(1) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`d2d_push_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for D2SPush
-- ----------------------------
DROP TABLE IF EXISTS `D2SPush`;
CREATE TABLE `D2SPush`  (
  `pDelegator_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pSeeker_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tDelegator_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tSeeker_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `start_time` date NULL DEFAULT NULL,
  `status` int(1) NULL DEFAULT NULL,
  `d2s_push_id` int(2) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`d2s_push_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for DelegationShip
-- ----------------------------
DROP TABLE IF EXISTS `DelegationShip`;
CREATE TABLE `DelegationShip`  (
  `delegationship_id` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `delegator_openId` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `seeker_openId` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `is_release` tinyint(1) NOT NULL DEFAULT 0,
  `status` int(1) NULL DEFAULT 0,
  PRIMARY KEY (`delegationship_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of DelegationShip
-- ----------------------------
INSERT INTO `DelegationShip` VALUES ('12345oHEkW0dNJwwjb3ete07iObpWGFcM', '12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM', 1, 0);
INSERT INTO `DelegationShip` VALUES ('12345oHEkW0dNJwwjb3ete07iObpWGFcM1', '12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM1', 0, 0);
INSERT INTO `DelegationShip` VALUES ('12345oHEkW0dNJwwjb3ete07iObpWGFcM2', '12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM2', 0, 0);
INSERT INTO `DelegationShip` VALUES ('12345oHEkW0dNJwwjb3ete07iObpWGFcM3', '123451', 'oHEkW0dNJwwjb3ete07iObpWGFcM3', 0, 0);
INSERT INTO `DelegationShip` VALUES ('12345oHEkW0dNJwwjb3ete07iObpWGFcM4', '123452', 'oHEkW0dNJwwjb3ete07iObpWGFcM4', 0, 0);
INSERT INTO `DelegationShip` VALUES ('12345oHEkW0dNJwwjb3ete07iObpWGFcM5', '123453', 'oHEkW0dNJwwjb3ete07iObpWGFcM5', 0, 0);
INSERT INTO `DelegationShip` VALUES ('12345oHEkW0dNJwwjb3ete07iObpWGFcM6', '123454', 'oHEkW0dNJwwjb3ete07iObpWGFcM6', 0, 0);
INSERT INTO `DelegationShip` VALUES ('12345oHEkW0dNJwwjb3ete07iObpWGFcM7', '123455', 'oHEkW0dNJwwjb3ete07iObpWGFcM7', 0, 0);
INSERT INTO `DelegationShip` VALUES ('12345oHEkW0dNJwwjb3ete07iObpWGFcM8', '123456', 'oHEkW0dNJwwjb3ete07iObpWGFcM8', 0, 0);
INSERT INTO `DelegationShip` VALUES ('12345oHEkW0dNJwwjb3ete07iObpWGFcM9', '123457', 'oHEkW0dNJwwjb3ete07iObpWGFcM9', 0, 0);

-- ----------------------------
-- Table structure for DelegatorInfo
-- ----------------------------
DROP TABLE IF EXISTS `DelegatorInfo`;
CREATE TABLE `DelegatorInfo`  (
  `open_id` varchar(40) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gender` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `identity_num` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `wechat` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone_num` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`open_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of DelegatorInfo
-- ----------------------------
INSERT INTO `DelegatorInfo` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM', 'yaoz', 'male', '522636', 'wechat', '15021128363');

-- ----------------------------
-- Table structure for MatchContract
-- ----------------------------
DROP TABLE IF EXISTS `MatchContract`;
CREATE TABLE `MatchContract`  (
  `contract_address` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `delegatemale_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `delegatefemale_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `seekermale_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `seekerfemale_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `reward` float(10, 0) NULL DEFAULT NULL,
  `advance` float(4, 0) NULL DEFAULT NULL,
  `status` int(1) NULL DEFAULT NULL,
  `signature` varchar(2048) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `signature_date` date NULL DEFAULT NULL,
  `contract_id` int(1) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`contract_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for S2DPush
-- ----------------------------
DROP TABLE IF EXISTS `S2DPush`;
CREATE TABLE `S2DPush`  (
  `pusherseeker_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pusherdelegate_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `targetdelegate_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tartgetseeker_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `start_time` date NULL DEFAULT NULL,
  `status` int(1) NULL DEFAULT NULL,
  `s2d_push_id` int(2) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`s2d_push_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for SeekerInfo
-- ----------------------------
DROP TABLE IF EXISTS `SeekerInfo`;
CREATE TABLE `SeekerInfo`  (
  `open_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `age` int(11) NULL DEFAULT NULL,
  `gender` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `height` int(11) NULL DEFAULT NULL,
  `weight` int(11) NULL DEFAULT NULL,
  `education` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `constellation` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `blood_type` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `portrait` mediumblob NULL,
  `wx_portraitAddr` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `identity_num` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `wechat` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone_num` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `life_photo` mediumblob NULL,
  `requirement` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `self_introduction` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `reward` float(10, 0) NULL DEFAULT NULL,
  `advance` float(2, 0) NULL DEFAULT NULL,
  `is_public` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`open_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of SeekerInfo
-- ----------------------------
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

-- ----------------------------
-- Table structure for User
-- ----------------------------
DROP TABLE IF EXISTS `User`;
CREATE TABLE `User`  (
  `open_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `public_key` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `chain_addr` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `balance` float(255, 0) NOT NULL,
  `register_time` datetime(0) NOT NULL,
  `identity_hash` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` int(255) NOT NULL DEFAULT 0,
  `role` int(255) NOT NULL,
  PRIMARY KEY (`open_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of User
-- ----------------------------
INSERT INTO `User` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM98765', 100, '2018-01-14 17:30:03', 'oHEkW0dNJwwjb3ete07iObpWGFcMyaoz', 0, 0);

-- ----------------------------
-- Table structure for cSessionInfo
-- ----------------------------
DROP TABLE IF EXISTS `cSessionInfo`;
CREATE TABLE `cSessionInfo`  (
  `open_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `skey` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `session_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_info` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`open_id`) USING BTREE,
  INDEX `openid`(`open_id`) USING BTREE,
  INDEX `skey`(`skey`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '会话管理用户信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cSessionInfo
-- ----------------------------
INSERT INTO `cSessionInfo` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM', 'df5cb3b6-a544-475a-b08f-fd88d245c238', 'bdd30904fa2b6fcc41b0882d906466839d8601f2', '2018-01-21 22:33:30', '2018-01-21 22:33:30', '2V/rORoAyoTrUGojnWBQMQ==', '{\"openId\":\"oHEkW0dNJwwjb3ete07iObpWGFcM\",\"nickName\":\"yo\",\"gender\":1,\"language\":\"zh_CN\",\"city\":\"Minhang\",\"province\":\"Shanghai\",\"country\":\"China\",\"avatarUrl\":\"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0\",\"watermark\":{\"timestamp\":1516545210,\"appid\":\"wx8727802679966793\"}}');

SET FOREIGN_KEY_CHECKS = 1;
