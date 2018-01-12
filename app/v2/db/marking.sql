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

 Date: 12/01/2018 08:57:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
  `wechat` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone_num` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role` int(255) NOT NULL,
  PRIMARY KEY (`open_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
