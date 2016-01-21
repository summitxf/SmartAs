/*
Navicat MySQL Data Transfer

Source Server         : smart
Source Server Version : 50709
Source Host           : localhost:3306
Source Database       : smartas

Target Server Type    : MYSQL
Target Server Version : 50709
File Encoding         : 65001

Date: 2016-01-21 16:59:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tpl_app_group_t
-- ----------------------------
DROP TABLE IF EXISTS `tpl_app_group_t`;
CREATE TABLE `tpl_app_group_t` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(128) NOT NULL COMMENT '群组编码',
  `name` varchar(128) NOT NULL COMMENT '群组名称',
  `desc` varchar(128) DEFAULT NULL COMMENT '描述',
  `status` smallint(6) NOT NULL COMMENT '状态',
  `isDefaultIn` char(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='群组表';

-- ----------------------------
-- Records of tpl_app_group_t
-- ----------------------------

-- ----------------------------
-- Table structure for tpl_app_role_perms_t
-- ----------------------------
DROP TABLE IF EXISTS `tpl_app_role_perms_t`;
CREATE TABLE `tpl_app_role_perms_t` (
  `role_id` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  PRIMARY KEY (`role_id`,`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tpl_app_role_perms_t
-- ----------------------------
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1000.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1000.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1000.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1001.1000');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1001.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1001.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1001.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1002.1000');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1002.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1002.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1002.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1003.1000');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1003.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1003.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1003.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1003.3002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '9000.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('2', '1000.1000');
INSERT INTO `tpl_app_role_perms_t` VALUES ('2', '1000.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('2', '1000.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('2', '1000.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('3', '1000.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('3', '1000.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('53', '1000.1000');
INSERT INTO `tpl_app_role_perms_t` VALUES ('53', '1000.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('53', '1000.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('53', '1000.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('54', '1000.1000');
INSERT INTO `tpl_app_role_perms_t` VALUES ('54', '1000.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('54', '1000.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('54', '1000.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('55', '1000.1000');
INSERT INTO `tpl_app_role_perms_t` VALUES ('55', '1000.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('55', '1000.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('55', '1000.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('56', '1000.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('56', '1000.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1000.1000');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1000.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1000.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1000.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1001.1000');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1001.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1001.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1001.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1002.1000');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1002.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1002.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1002.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1003.1000');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1003.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1003.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1003.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1003.3002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '9000.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('58', '1001.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('59', '1001.1004');

-- ----------------------------
-- Table structure for tpl_app_role_t
-- ----------------------------
DROP TABLE IF EXISTS `tpl_app_role_t`;
CREATE TABLE `tpl_app_role_t` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL COMMENT '角色名称',
  `desc` varchar(128) NOT NULL COMMENT '角色描述',
  `status` smallint(6) NOT NULL COMMENT '状态',
  `rights` text,
  `defaultIn` char(1) NOT NULL,
  `code` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Records of tpl_app_role_t
-- ----------------------------
INSERT INTO `tpl_app_role_t` VALUES ('1', 'Admin', '系统管理员', '1', null, '1', '');
INSERT INTO `tpl_app_role_t` VALUES ('2', 'Public', '公共权限', '1', null, '1', '');
INSERT INTO `tpl_app_role_t` VALUES ('3', 'Guest', '访客', '1', null, '1', '');
INSERT INTO `tpl_app_role_t` VALUES ('62', 'Test62', '测试62', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('63', 'Test63', '测试63', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('64', 'Test64', '测试64', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('65', 'Test65', '测试65', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('66', 'Test66', '测试66', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('67', 'Test67', '测试67', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('68', 'Test68', '测试68', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('69', 'Test69', '测试69', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('70', 'Test70', '测试70', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('71', 'Test71', '测试71', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('72', 'Test72', '测试72', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('73', 'Test73', '测试73', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('74', 'Test74', '测试74', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('75', 'Test75', '测试75', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('76', 'Test76', '测试76', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('77', 'Test77', '测试77', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('78', 'Test78', '测试78', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('79', 'Test79', '测试79', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('80', 'Test80', '测试80', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('81', 'Test81', '测试81', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('82', 'Test82', '测试82', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('83', 'Test83', '测试83', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('84', 'Test84', '测试84', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('85', 'Test85', '测试85', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('86', 'Test86', '测试86', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('87', 'Test87', '测试87', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('88', 'Test88', '测试88', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('89', 'Test89', '测试89', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('90', 'Test90', '测试90', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('91', 'Test91', '测试91', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('92', 'Test92', '测试92', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('93', 'Test93', '测试93', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('94', 'Test94', '测试94', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('95', 'Test95', '测试95', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('96', 'Test96', '测试96', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('97', 'Test97', '测试97', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('98', 'Test98', '测试98', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('99', 'Test99', '测试99', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('100', 'Test100', '测试100', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('101', 'Test101', '测试101', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('102', 'Test102', '测试102', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('103', 'Test103', '测试103', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('104', 'Test104', '测试104', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('105', 'Test105', '测试105', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('106', 'Test106', '测试106', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('107', 'Test107', '测试107', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('108', 'Test108', '测试108', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('109', 'Test109', '测试109', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('110', 'Test110', '测试110', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('111', 'Test111', '测试111', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('112', 'Test112', '测试112', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('113', 'Test113', '测试113', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('114', 'Test114', '测试114', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('115', 'Test115', '测试115', '1', null, '0', null);

-- ----------------------------
-- Table structure for tpl_menu_t
-- ----------------------------
DROP TABLE IF EXISTS `tpl_menu_t`;
CREATE TABLE `tpl_menu_t` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  `className` varchar(45) DEFAULT NULL,
  `iconName` varchar(45) DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  `sn` int(11) DEFAULT NULL,
  `publish` char(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tpl_menu_t
-- ----------------------------
INSERT INTO `tpl_menu_t` VALUES ('1', 'tool_bar', '工具菜单', '', '', '', '0', '1', '1');
INSERT INTO `tpl_menu_t` VALUES ('2', 'nav_bar', '导航菜单', '', '', '', '0', '2', '1');
INSERT INTO `tpl_menu_t` VALUES ('3', '', '我的工作空间', '', '', '', '2', '5', '1');
INSERT INTO `tpl_menu_t` VALUES ('4', '', '系统管理', '', '', '', '2', '10', '1');
INSERT INTO `tpl_menu_t` VALUES ('5', '', '用户和权限', '', '', '', '4', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('6', '', '定时任务', '', '', '', '4', '1', '1');
INSERT INTO `tpl_menu_t` VALUES ('7', '', '多lookup管理', '', '', '', '4', '2', '1');
INSERT INTO `tpl_menu_t` VALUES ('8', '', '国际化信息管理', '', '', '', '4', '10', '1');
INSERT INTO `tpl_menu_t` VALUES ('15', '', '数据字典', '', '', '', '4', '1', '1');
INSERT INTO `tpl_menu_t` VALUES ('16', '', 'lookup管理', '', '', '', '4', '2', '1');
INSERT INTO `tpl_menu_t` VALUES ('17', '', '菜单管理', '#!web/security/menu/index.html', '', '', '4', '3', '1');
INSERT INTO `tpl_menu_t` VALUES ('18', '', '富文本管理', '', '', '', '4', '4', '0');
INSERT INTO `tpl_menu_t` VALUES ('19', '', '规则引擎', '', '', '', '4', '5', '1');
INSERT INTO `tpl_menu_t` VALUES ('20', '', '流程管理', '', '', '', '4', '6', '0');
INSERT INTO `tpl_menu_t` VALUES ('21', '', '内容管理', '', '', '', '4', '7', '0');
INSERT INTO `tpl_menu_t` VALUES ('22', '', '异步服务', '', '', '', '4', '8', '0');
INSERT INTO `tpl_menu_t` VALUES ('23', '', '数据锁', '', '', '', '4', '9', '0');
INSERT INTO `tpl_menu_t` VALUES ('24', '', 'ART控制台', '', '', '', '4', '90', '0');
INSERT INTO `tpl_menu_t` VALUES ('25', '', '信息管理', '', '', '', '4', '80', '0');
INSERT INTO `tpl_menu_t` VALUES ('26', '', '导入监控', '', '', '', '4', '70', '1');
INSERT INTO `tpl_menu_t` VALUES ('27', '', '导出监控', '', '', '', '4', '60', '1');
INSERT INTO `tpl_menu_t` VALUES ('28', '', '服务器管理', '', '', '', '4', '999', '1');
INSERT INTO `tpl_menu_t` VALUES ('29', '', '用户管理', '#!web/security/user/index.jsx', '', '', '5', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('30', null, '群组管理', null, null, null, '5', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('31', null, '数据范围管理', null, null, null, '5', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('32', '', '角色管理', '#!web/security/role/index.jsx', '', '', '5', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('33', null, '维度管理', null, null, null, '5', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('34', null, '属性组管理', null, null, null, '5', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('35', null, '用户权限批处理', null, null, null, '5', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('36', null, '群组权限批处理', null, null, null, '5', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('37', null, '用户登陆次数统计', null, null, null, '5', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('38', null, '用户权限审批日志', null, null, null, '5', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('39', '', '我的待办', '', '', '', '3', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('40', null, '我的已办', null, null, null, '3', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('41', null, '我的导入', null, null, null, '3', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('42', null, '我的导出', null, null, null, '3', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('43', '', '开发', '', '', '', '2', '99', '1');
INSERT INTO `tpl_menu_t` VALUES ('44', '', 'UI Demo', '', '', '', '43', '6', '1');
INSERT INTO `tpl_menu_t` VALUES ('45', '', 'API', '', '', '', '43', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('46', '', 'Dashboard', '12', '', '', '1', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('47', '', 'Profile', '1234', '', '', '1', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('48', null, '{{name}}', null, null, null, '1', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('49', null, 'Help', null, null, null, '1', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('50', null, '资料', null, null, null, '48', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('51', null, '设置', null, null, null, '48', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('52', null, '退出', null, null, null, '48', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('53', '', '首页', '#!web/demo/Dashboard.html', '', '', '2', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('54', null, 'Grid', '#!web/demo/bootstrap/grid/index.html', null, null, '44', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('55', '', '运维工具', '', '', '', '28', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('56', '', '缓存管理', '', '', '', '28', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('57', '', '版本信息', '', '', '', '28', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('58', null, 'SOA设置', null, null, null, '28', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('59', null, '类和项维护', null, null, null, '7', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('60', null, 'Easu UI Demo', null, null, null, '43', '2', '1');
INSERT INTO `tpl_menu_t` VALUES ('61', null, 'Grid', null, null, null, '60', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('62', '', 'contextmenu', '#!web/demo/easyui/datagrid/contextmenu.html', '', '', '61', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('63', '', 'Plugins', '', '', '', '44', '5', '1');
INSERT INTO `tpl_menu_t` VALUES ('64', '', 'Form', '#!web/demo/plugins/Form/index.jsx', '', '', '63', '0', '1');

-- ----------------------------
-- Table structure for tpl_user_t
-- ----------------------------
DROP TABLE IF EXISTS `tpl_user_t`;
CREATE TABLE `tpl_user_t` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `acount` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `firstname` varchar(80) NOT NULL,
  `lastname` varchar(80) NOT NULL,
  `status` varchar(2) DEFAULT NULL,
  `addr1` varchar(80) NOT NULL,
  `addr2` varchar(40) DEFAULT NULL,
  `city` varchar(80) NOT NULL,
  `state` varchar(80) NOT NULL,
  `zip` varchar(20) NOT NULL,
  `country` varchar(20) NOT NULL,
  `phone` varchar(80) NOT NULL,
  `password` varchar(128) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tpl_user_t
-- ----------------------------
INSERT INTO `tpl_user_t` VALUES ('1', 'chenjpu', 'chenjpu', 'chenjpu', 'chenjpu', '1', '11', '22', '11', '1', '1', '1', '1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO `tpl_user_t` VALUES ('2', 'test', 'test111', 'test', 'test', '1', '11', '22', '11', '1', '1', '1', '1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO `tpl_user_t` VALUES ('3', 'test1', 'test1', 'test1', 'test1', '1', '11', '22', '11', '1', '1', '1', '1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO `tpl_user_t` VALUES ('4', 'test2', 'test2', 'test2', 'test2', '1', '11', '22', '11', '1', '1', '1', '1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO `tpl_user_t` VALUES ('5', 'test3', 'test3', 'test3', 'test3', '1', '11', '22', '11', '1', '1', '1', '1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO `tpl_user_t` VALUES ('6', 'test4', 'test4', 'test4', 'test4', '1', '11', '22', '11', '1', '1', '1', '1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO `tpl_user_t` VALUES ('7', 'test5', 'test5', 'test5', 'test5', '1', '11', '22', '11', '1', '1', '1', '1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO `tpl_user_t` VALUES ('8', 'test6', 'test6', 'test6', 'test6', '1', '11', '22', '11', '1', '1', '1', '1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO `tpl_user_t` VALUES ('9', 'test7', 'test7', 'test7', 'test7', '1', '11', '22', '11', '1', '1', '1', '1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO `tpl_user_t` VALUES ('10', 'test8', 'test8', 'test8', 'test8', '1', '11', '22', '11', '1', '1', '1', '1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO `tpl_user_t` VALUES ('11', 'test9', 'test9', 'test9', 'test9', '1', '11', '22', '11', '1', '1', '1', '1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');

-- ----------------------------
-- Function structure for fn_rcs_menu
-- ----------------------------
DROP FUNCTION IF EXISTS `fn_rcs_menu`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `fn_rcs_menu`(rootId INT) RETURNS varchar(1000) CHARSET utf8
BEGIN 
       DECLARE sTemp VARCHAR(4000); 
       DECLARE sTempChd VARCHAR(1000); 
     
       SET sTemp = '$'; 
       SET sTempChd =cast(rootId as CHAR); 
     
       WHILE sTempChd is not null DO 
         SET sTemp = concat(sTemp,',',sTempChd); 
         SELECT group_concat(id) INTO sTempChd FROM tpl_menu_t t where t.publish = 1 and FIND_IN_SET(t.parentId,sTempChd)>0; 
       END WHILE; 
       RETURN sTemp; 
     END
;;
DELIMITER ;

-- ----------------------------
-- Function structure for fn_size
-- ----------------------------
DROP FUNCTION IF EXISTS `fn_size`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `fn_size`(tb_name VARCHAR(40)) RETURNS int(11)
BEGIN
DECLARE sTempChd int;

SET sTempChd = 0;

SELECT count(id) INTO sTempChd FROM tpl_menu_t;

return sTempChd;

END
;;
DELIMITER ;
