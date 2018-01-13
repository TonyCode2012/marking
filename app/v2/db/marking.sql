/*
 Navicat MySQL Data Transfer

 Source Server         : marking
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : marking

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 13/01/2018 19:48:36
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
  `pusherdelegate_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pusherseeker_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `targetdelegate_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tartgetseeker_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
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
  `delegator_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `seeker_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` int(1) NULL DEFAULT NULL,
  `reward` float(2, 0) NULL DEFAULT NULL,
  `advance` float(2, 0) NULL DEFAULT NULL,
  `isPublic` tinyint(1) NULL DEFAULT NULL,
  `delegationship_id` int(1) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`delegationship_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

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
  `reward` float(1, 0) NULL DEFAULT NULL,
  `advance` float(1, 0) NULL DEFAULT NULL,
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
  `wechat` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone_num` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `life_photo` mediumblob NULL,
  `age` int(1) NULL DEFAULT NULL,
  `height` int(1) NULL DEFAULT NULL,
  `requirement` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `portrait` mediumblob NULL,
  `self_introduction` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `reward` float(1, 0) NULL DEFAULT NULL,
  `constellation` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `blood_type` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `education` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`open_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for User
-- ----------------------------
DROP TABLE IF EXISTS `User`;
CREATE TABLE `User`  (
  `open_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `public_key` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `chain_addr` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `balance` float(255, 0) NOT NULL,
  `gender` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `register_time` datetime(0) NOT NULL,
  `identity_hash` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` int(255) NOT NULL,
  `wechat` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone_num` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `role` int(255) NOT NULL,
  PRIMARY KEY (`open_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
