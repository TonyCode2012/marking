/*
 Navicat MySQL Data Transfer

 Source Server         : marking
 Source Server Type    : MySQL
 Source Server Version : 50721
 Source Host           : localhost:3306
 Source Schema         : cAuth

 Target Server Type    : MySQL
 Target Server Version : 50721
 File Encoding         : 65001

 Date: 06/02/2018 23:59:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for D2DPush
-- ----------------------------
DROP TABLE IF EXISTS `D2DPush`;
CREATE TABLE `D2DPush`  (
  `pDelegator_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pSeeker_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tDelegator_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tSeeker_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `start_time` date NOT NULL,
  `status` int(1) NOT NULL,
  `d2d_push_id` int(1) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`d2d_push_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of D2DPush
-- ----------------------------
INSERT INTO `D2DPush` VALUES ('12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM', '2018-01-02', 0, 6);
INSERT INTO `D2DPush` VALUES ('12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM1', '2018-01-02', 0, 7);
INSERT INTO `D2DPush` VALUES ('12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM2', '2018-01-02', 0, 8);
INSERT INTO `D2DPush` VALUES ('delegatorAID', 'seekerAID', 'delegatorBID', 'seekerBID', '2018-02-02', 0, 9);

-- ----------------------------
-- Table structure for D2SPush
-- ----------------------------
DROP TABLE IF EXISTS `D2SPush`;
CREATE TABLE `D2SPush`  (
  `pDelegator_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pSeeker_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tDelegator_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tSeeker_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `start_time` date NOT NULL,
  `status` int(1) NOT NULL DEFAULT 0,
  `d2s_push_id` int(16) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`d2s_push_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of D2SPush
-- ----------------------------
INSERT INTO `D2SPush` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM', '12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM1', '2018-01-22', 1, 9);
INSERT INTO `D2SPush` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM', 'oHEkW0dNJwwjb3ete07iObpWGFcM1', '12345', 'oHEkW0dNJwwjb3ete07iObpWGFcM', '2018-01-28', 0, 10);
INSERT INTO `D2SPush` VALUES ('delegatorBID', 'seekerBID', 'DelegatorAID', 'seekerAID', '2018-02-02', 5, 11);

-- ----------------------------
-- Table structure for DelegationShip
-- ----------------------------
DROP TABLE IF EXISTS `DelegationShip`;
CREATE TABLE `DelegationShip`  (
  `delegationship_id` int(16) NOT NULL,
  `delegator_openId` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `seeker_openId` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `is_release` tinyint(1) NOT NULL DEFAULT 0,
  `status` int(1) NULL DEFAULT 0,
  PRIMARY KEY (`delegationship_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of DelegationShip
-- ----------------------------
INSERT INTO `DelegationShip` VALUES (1, 'delegatorAID', 'seekerAID', 1, 0);
INSERT INTO `DelegationShip` VALUES (2, 'delegatorBID', 'seekerBID', 1, 0);

-- ----------------------------
-- Table structure for DelegatorInfo
-- ----------------------------
DROP TABLE IF EXISTS `DelegatorInfo`;
CREATE TABLE `DelegatorInfo`  (
  `open_id` varchar(40) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `gender` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `identity_num` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `wechat` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone_num` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `wx_portraitAddr` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`open_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of DelegatorInfo
-- ----------------------------
INSERT INTO `DelegatorInfo` VALUES ('delegatorAID', 'delegatorA', 'male', '522636', 'wechat', '15021128363', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0');
INSERT INTO `DelegatorInfo` VALUES ('delegatorBID', 'delegatorB', 'male', '522636', 'wechat', '15021128363', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0');

-- ----------------------------
-- Table structure for MatchContract
-- ----------------------------
DROP TABLE IF EXISTS `MatchContract`;
CREATE TABLE `MatchContract`  (
  `contract_address` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pDelegator_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pSeeker_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tDelegator_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tSeeker_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pReward` float(10, 0) NOT NULL,
  `tReward` float(10, 0) NOT NULL,
  `pAdvance` float(10, 0) NOT NULL,
  `tAdvance` float(10, 0) NOT NULL,
  `status` int(1) NOT NULL,
  `signature` varchar(2048) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `signature_date` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`contract_address`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of MatchContract
-- ----------------------------
INSERT INTO `MatchContract` VALUES ('xxx', 'delegatorBID', 'seekerBID', 'delegatorAID', 'seekerAID', 400, 400, 200, 200, 0, 'xxxx', '2018-02-06 23:51:05');

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
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `height` int(11) NULL DEFAULT NULL,
  `weight` int(11) NULL DEFAULT NULL,
  `education` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `constellation` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `blood_type` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `portrait` mediumblob NULL,
  `wx_portraitAddr` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `identity_num` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `wechat` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone_num` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `life_photo` mediumblob NULL,
  `requirement` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `self_introduction` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `reward` float(10, 0) NULL DEFAULT NULL,
  `advance` float(10, 0) NULL DEFAULT NULL,
  `is_public` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`open_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of SeekerInfo
-- ----------------------------
INSERT INTO `SeekerInfo` VALUES ('seekerAID', 'xiaomei', 18, 'male', 183, NULL, 'postgraduate', 'baiyang', 'O', NULL, 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0', '522636', 't6865733', '15021128363', 0x5B5D, 'optimistc life attitude, volubility, independence and brave.', 'brave, like fitness, cooking and basketball, sometimes I like taking a travel with my friends.', 400, 200, 1);
INSERT INTO `SeekerInfo` VALUES ('seekerBID', 'xiaoming', 18, 'male', 183, NULL, 'postgraduate', 'baiyang', 'O', NULL, 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0', '522636', 't6865733', '15021128363', 0x5B5D, 'optimistc life attitude, volu    bility, independence and brave.', 'brave, like fitness, cooking and basketball, sometimes I like taking a travel with my friends.', 400, 200, 1);

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
INSERT INTO `User` VALUES ('delegatorAID', 'delegatorAPUBKEY', 'delegatorACADDR', 100, '2018-02-01 18:38:11', 'delegatorAIHASH', 0, 0);
INSERT INTO `User` VALUES ('delegatorBID', 'delegatorBPUBKEY', 'delegatorBCADDR', 100, '2018-02-01 18:38:11', 'delegatorBIHASH', 0, 0);
INSERT INTO `User` VALUES ('seekerAID', 'seekerAPUBKEY', 'seekerACADDR', 100, '2018-02-01 18:38:11', 'seekerAIHASH', 0, 0);
INSERT INTO `User` VALUES ('seekerBID', 'seekerBPUBKEY', 'seekerBCADDR', 100, '2018-02-01 18:38:11', 'seekerBIHASH', 0, 0);

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
INSERT INTO `cSessionInfo` VALUES ('oHEkW0dNJwwjb3ete07iObpWGFcM', 'ee1a07ae-cc1d-4329-86cf-86f56aa19984', 'a182d5e9ff05076f61c7a881ce7780b77795f2d2', '2018-01-30 22:00:14', '2018-01-30 22:00:14', 'r6yLSJgTcFaOba6xSrMIUg==', '{\"openId\":\"oHEkW0dNJwwjb3ete07iObpWGFcM\",\"nickName\":\"yo\",\"gender\":1,\"language\":\"zh_CN\",\"city\":\"Minhang\",\"province\":\"Shanghai\",\"country\":\"China\",\"avatarUrl\":\"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIurjgzyviayzePjJr1VWzsiaCd0OBxqsY7hOSPqrcQ2s8xOsSU21Nuwf5QxcDz5W74eMYIOUe9j54w/0\",\"watermark\":{\"timestamp\":1517320814,\"appid\":\"wx8727802679966793\"}}');

SET FOREIGN_KEY_CHECKS = 1;
