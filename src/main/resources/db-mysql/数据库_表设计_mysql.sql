/*
SQLyog Ultimate v9.30 
MySQL - 5.6.28-log : Database - cama4
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `application_people` */

DROP TABLE IF EXISTS `application_people`;

CREATE TABLE `application_people` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50)  DEFAULT NULL,
  `app_id` varchar(50)  DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Table structure for table `aweb_access` */

DROP TABLE IF EXISTS `aweb_access`;

CREATE TABLE `aweb_access` (
  `ID` varchar(50) NOT NULL,
  `ELEMENT_ID` varchar(100) DEFAULT NULL,
  `TYPE` varchar(10) DEFAULT NULL,
  `NAME` varchar(100) DEFAULT NULL,
  `PID` varchar(100) DEFAULT NULL,
  `STATE` varchar(5) DEFAULT NULL,
  `IS_RES` varchar(50) DEFAULT NULL,
  `RES_TYPE` varchar(50) DEFAULT NULL,
  `RES_TABLE` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `aweb_access_control` */

DROP TABLE IF EXISTS `aweb_access_control`;

CREATE TABLE `aweb_access_control` (
  `ID` varchar(100) NOT NULL,
  `NAME` varchar(100) DEFAULT NULL,
  `VALUE` varchar(200) DEFAULT NULL,
  `STATE` varchar(1) DEFAULT NULL,
  `REMARK` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `aweb_access_menu` */

DROP TABLE IF EXISTS `aweb_access_menu`;

CREATE TABLE `aweb_access_menu` (
  `ID` varchar(100) NOT NULL,
  `PID` varchar(100) DEFAULT NULL COMMENT '父节点ID',
  `NAME` varchar(100) DEFAULT NULL COMMENT '节点名',
  `VALUE` varchar(200) DEFAULT NULL COMMENT 'url值，为空时，无对应的页面',
  `ISPARENT` varchar(5) DEFAULT NULL COMMENT '是否为父节点',
  `OPEN` varchar(5) DEFAULT NULL COMMENT '初始化时是否打开',
  `ICON` varchar(20) DEFAULT NULL COMMENT '图标',
  `STATE` varchar(1) DEFAULT NULL,
  `SORT` varchar(5) DEFAULT NULL,
  `REMARK` varchar(200) DEFAULT NULL COMMENT '备注信息',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `aweb_access_page` */

DROP TABLE IF EXISTS `aweb_access_page`;

CREATE TABLE `aweb_access_page` (
  `ID` varchar(100) NOT NULL,
  `NAME` varchar(100) DEFAULT NULL,
  `VALUE` varchar(200) DEFAULT NULL,
  `STATE` varchar(1) DEFAULT NULL,
  `REMARK` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `aweb_classify_config` */

DROP TABLE IF EXISTS `aweb_classify_config`;

CREATE TABLE `aweb_classify_config` (
  `mainclassify` varchar(20) DEFAULT '' COMMENT '大指标分类',
  `subclassify` varchar(20) NOT NULL DEFAULT '' COMMENT '小指标分类',
  `showtype` varchar(20) NOT NULL COMMENT '显示类型',
  `columnconfig` blob COMMENT '数据字段配置，不同显示类型该配置不同',
  `state` varchar(20) NOT NULL COMMENT '图例x轴状态',
  PRIMARY KEY (`subclassify`,`showtype`,`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `aweb_device` */

DROP TABLE IF EXISTS `aweb_device`;

CREATE TABLE `aweb_device` (
  `PATH` varchar(100) NOT NULL,
  `NAME` varchar(20) NOT NULL,
  `DESP` varchar(20) NOT NULL,
  `DEVTYPE` varchar(20) NOT NULL,
  `PARENTPATH` varchar(100) NOT NULL,
  `EXPAND` varchar(30) DEFAULT NULL,
  `RES_TYPE` varchar(30) DEFAULT NULL,
  `RES_ID` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`PATH`),
  KEY `AD_F_ADT` (`DEVTYPE`),
  CONSTRAINT `AD_F_ADT` FOREIGN KEY (`DEVTYPE`) REFERENCES `aweb_device_type` (`DEVTYPE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `aweb_device_type` */

DROP TABLE IF EXISTS `aweb_device_type`;

CREATE TABLE `aweb_device_type` (
  `DEVTYPE` varchar(20) NOT NULL,
  `DESP` varchar(20) NOT NULL,
  PRIMARY KEY (`DEVTYPE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `aweb_finedegree` */

DROP TABLE IF EXISTS `aweb_finedegree`;

CREATE TABLE `aweb_finedegree` (
  `ID` int(30) NOT NULL AUTO_INCREMENT,
  `SYSTEMNAME` varchar(50) DEFAULT NULL,
  `USERID` varchar(50) DEFAULT NULL,
  `VIEWID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Table structure for table `aweb_monitor_infoquery` */

DROP TABLE IF EXISTS `aweb_monitor_infoquery`;

CREATE TABLE `aweb_monitor_infoquery` (
  `detail_arr` varchar(255) NOT NULL,
  `close_num` varchar(255) DEFAULT NULL,
  `group_close_num` varchar(255) DEFAULT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  `group_unclose_num` varchar(255) DEFAULT NULL,
  `query_flag` varchar(255) DEFAULT NULL,
  `unclose_num` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`detail_arr`),
  UNIQUE KEY `detail_arr` (`detail_arr`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `aweb_relevancy_role_access` */

DROP TABLE IF EXISTS `aweb_relevancy_role_access`;

CREATE TABLE `aweb_relevancy_role_access` (
  `ID` varchar(50) NOT NULL,
  `ROLE_ID` varchar(50) DEFAULT NULL,
  `ACCESS_ID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `aweb_relevancy_user_role` */

DROP TABLE IF EXISTS `aweb_relevancy_user_role`;

CREATE TABLE `aweb_relevancy_user_role` (
  `ID` varchar(50) NOT NULL,
  `USERNAME` varchar(50) DEFAULT NULL,
  `ROLE_ID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `aweb_role` */

DROP TABLE IF EXISTS `aweb_role`;

CREATE TABLE `aweb_role` (
  `ID` varchar(50) NOT NULL,
  `NAME` varchar(100) DEFAULT NULL,
  `CREATEUSER` varchar(50) DEFAULT NULL,
  `CREATETIME` varchar(30) DEFAULT NULL,
  `UPDATETIME` varchar(30) DEFAULT NULL,
  `STATE` varchar(1) DEFAULT NULL,
  `REMARK` varchar(200) DEFAULT NULL,
  `ROLE_GROUP` varchar(50) DEFAULT NULL,
  `ROLE_TYPE` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `aweb_user` */

DROP TABLE IF EXISTS `aweb_user`;

CREATE TABLE `aweb_user` (
  `USERNAME` varchar(50)  NOT NULL,
  `PASSWORD` varchar(50)  DEFAULT NULL,
  `NICKNAME` varchar(50)  DEFAULT NULL,
  `IP` varchar(20)  DEFAULT NULL,
  `MAILBOX` varchar(50)  DEFAULT NULL,
  `TELEPHONE` varchar(20)  DEFAULT NULL,
  `CREATEUSER` varchar(50)  DEFAULT NULL,
  `CREATETIME` varchar(30)  DEFAULT NULL,
  `UPDATETIME` varchar(30)  DEFAULT NULL,
  `LOGINTIME` varchar(30)  DEFAULT NULL,
  `LOCKTIME` varchar(30)  DEFAULT NULL,
  `CONTINUOUSERRORNUM` varchar(2)  DEFAULT NULL,
  `STATE` varchar(1)  DEFAULT NULL,
  `USERTYPE` varchar(1)  DEFAULT NULL,
  `REMARK` varchar(200)  DEFAULT NULL,
  `TEL_NO` varchar(20)  DEFAULT NULL COMMENT '座机',
  `AD` varchar(40)  DEFAULT NULL COMMENT '广发权限专用，行方账号',
  `SENDTIMES` int(10) DEFAULT NULL COMMENT '广发专用，操作员（2），提醒（0），解决问题（1）',
  `review_pass` varchar(30)  DEFAULT NULL COMMENT '复核功能：复核密码',
  `review_length` varchar(20)  DEFAULT NULL COMMENT '复核功能：密码长度，前三位，后三位',
  `admin_userid` varchar(20)  DEFAULT NULL COMMENT '功能未明确',
  `user_group` varchar(20)  DEFAULT NULL COMMENT '功能为明确',
  PRIMARY KEY (`USERNAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `aweb_user_grid` */

DROP TABLE IF EXISTS `aweb_user_grid`;

CREATE TABLE `aweb_user_grid` (
  `USERNAME` varchar(50) NOT NULL COMMENT '用户名',
  `GRIDCONF` varchar(2000) DEFAULT NULL COMMENT '网格配置',
  PRIMARY KEY (`USERNAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `aweb_user_login` */

DROP TABLE IF EXISTS `aweb_user_login`;

CREATE TABLE `aweb_user_login` (
  `USERNAME` varchar(50) NOT NULL,
  `SESSIONID` varchar(50) NOT NULL,
  `LASTHOST` varchar(25) NOT NULL,
  PRIMARY KEY (`USERNAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
