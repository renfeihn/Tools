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
/*Data for the table `application_people` */

insert  into `application_people`(`id`,`user_id`,`app_id`) values (1,'test','1001');

/*Data for the table `aweb_access` */

insert  into `aweb_access`(`ID`,`ELEMENT_ID`,`TYPE`,`NAME`,`PID`,`STATE`,`IS_RES`,`RES_TYPE`,`RES_TABLE`) values ('15010100000030000000','access','0','所有权限','accesssss','1','flase',NULL,NULL),('15010100000030000001','monitorApp','0','一线监控-应用','access','1','flase',NULL,NULL),('15010100000030000002','monitorOperation','0','一线监控-操作','access','1','flase',NULL,NULL),('15010100000030000003','monitorSystem','0','一线监控-系统','access','1','flase',NULL,NULL),('15010100000030000004','appAll','0','应用总览','access','1','true','app','application_people#user_id'),('15010100000030000005','workSpace','0','工作空间','access','1','flase',NULL,NULL),('15010100000030000006','accessData','0','权限管理','access','1','flase',NULL,NULL),('15010100000030000007','access#accessUser','0','用户管理','accessData','1','flase',NULL,NULL),('15010100000030000008','access#accessRole','0','角色管理','accessData','1','flase',NULL,NULL),('15010100000030000009','fineDegree','0','健康度','access','1','false',NULL,NULL);

/*Data for the table `aweb_access_control` */

/*Data for the table `aweb_access_menu` */

insert  into `aweb_access_menu`(`ID`,`PID`,`NAME`,`VALUE`,`ISPARENT`,`OPEN`,`ICON`,`STATE`,`SORT`,`REMARK`) values ('access#accessRole','accessData','角色管理','accessRole.jsp','false','false',NULL,'1','2',NULL),('access#accessUser','accessData','用户管理','accessUser.jsp','false','false',NULL,'1','1',NULL),('accessData','access','权限管理',NULL,'true','true','users','1','6',NULL),('appAll','access','应用总览',NULL,'true','true','users','1','4',NULL),('fineDegree','access','健康度',NULL,'true','true','users','1','7',NULL),('monitorApp','access','一线监控-应用',NULL,'true','true','users','1','1',NULL),('monitorOperation','access','一线监控-操作',NULL,'true','true','users','1','2',NULL),('monitorSystem','access','一线监控-系统',NULL,'true','true','users','1','3',NULL),('workSpace','access','工作空间',NULL,'true','true','users','1','5',NULL);

/*Data for the table `aweb_access_page` */

/*Data for the table `aweb_classify_config` */

insert  into `aweb_classify_config`(`mainclassify`,`subclassify`,`showtype`,`columnconfig`,`state`) values ('test1','cpu','line','{\r\n	\"title\":\"cpu使用率与进程数\",\r\n	\"legend\":[\"cpu使用率\",\"cpu进程数\"],\r\n	\"columns\":[\"cpuUsed\",\"cpuNum\"],\r\n	\"xAxis\":\"cpuName\"\r\n}','01'),('test1','cpu','line','{\r\n	\"title\":\"动态cpu使用率与进程数\",\r\n	\"legend\":[\"cpu使用率\",\"cpu进程数\"],\r\n	\"columns\":[\"cpuUsed\",\"cpuNum\"],\r\n	\"xNum\":\"7\"\r\n}','02'),('test1','cpu','line','{\r\n	\"title\":\"各cpu使用率\",\r\n	\"legend\":\"cpuName\",\r\n	\"columns\":[\"cpuUsed\"],\r\n	\"xAxis\":\"date\"\r\n}','11'),('test1','cpu','line','{\r\n	\"title\":\"各cpu实时使用率\",\r\n	\"legend\":\"cpuName\",\r\n	\"columns\":\"cpuUsed\",\r\n	\"xNum\":\"7\"\r\n}','12'),('test1','cpu','pie','{\r\n	\"title\":\"cpu操作成功失败比\",\r\n	\"legend\":[\"成功\",\"失败\"],\r\n	\"columns\":[\"success\",\"fail\"],\r\n	\"seriesName\":\"cpu描述\"\r\n}','0'),('test1','cpu','pie','{\r\n	\"title\":\"cpu进程数量比\",\r\n	\"legend\":\"cpuName\",\r\n	\"columns\":\"cpuNum\",\r\n	\"seriesName\":\"cpu进程数\"\r\n}','1'),('test1','cpu','table','{\r\n    \"title\": \"cpu表\",\r\n    \"aoColumns\": [\r\n{\r\n            \"mDataProp\": \"cpuName\",\r\n            \"sTitle\": \"cpu名\"\r\n        },\r\n        {\r\n            \"mDataProp\": \"cpuUsed\",\r\n            \"sTitle\": \"cpu使用率\"\r\n        },\r\n        {\r\n            \"mDataProp\": \"cpuNum\",\r\n            \"sTitle\": \"cpu进程数\"\r\n        }\r\n        \r\n    ]\r\n}','0'),('test1','cpu','table','{\r\n    \"title\": \"cpu表\",\r\n    \"aoColumns\": [\r\n        {\r\n            \"mDataProp\": \"cpuName\",\r\n            \"sTitle\": \"cpu名\"\r\n        },\r\n        {\r\n            \"mDataProp\": \"cpuUsed\",\r\n            \"sTitle\": \"cpu使用率\"\r\n        },\r\n        {\r\n            \"mDataProp\": \"cpuNum\",\r\n            \"sTitle\": \"cpu进程数\"\r\n        }\r\n    ]\r\n}','1');

/*Data for the table `aweb_device` */

insert  into `aweb_device`(`PATH`,`NAME`,`DESP`,`DEVTYPE`,`PARENTPATH`,`EXPAND`,`RES_TYPE`,`RES_ID`) values ('/测试系统','测试系统','测试系统','0','/',NULL,'app','1001'),('/测试系统/测试主机','测试主机','测试主机','1','/测试系统',NULL,'app','1001'),('/测试系统/测试主机/中间件','中间件','中间件','3','/测试系统/测试主机',NULL,'app','1001'),('/测试系统/测试主机/应用','应用','应用','5','/测试系统/测试主机',NULL,'app','1001'),('/测试系统/测试主机/操作系统','操作系统','操作系统','2','/测试系统/测试主机',NULL,'app','1001'),('/测试系统/测试主机/数据库','数据库','数据库','4','/测试系统/测试主机',NULL,'app','1001');

/*Data for the table `aweb_device_type` */

insert  into `aweb_device_type`(`DEVTYPE`,`DESP`) values ('0','系统'),('1','主机'),('2','操作系统'),('3','中间件'),('4','数据库'),('5','应用');

/*Data for the table `aweb_finedegree` */

/*Data for the table `aweb_monitor_infoquery` */

insert  into `aweb_monitor_infoquery`(`detail_arr`,`close_num`,`group_close_num`,`group_name`,`group_unclose_num`,`query_flag`,`unclose_num`) values ('事件工单','215','23,44,11,5,7,10,22,2','工单1,工单2,工单3,工单4,工单5,工单6,工单7,工单8','23,17,55,43,7,31,20,19','1','124'),('服务工单','260','4,21,1,43,21,32,28','工单1,工单2,工单3,工单4,工单5,工单6,工单7','87,56,24,13,42,25,13','1','150'),('监控工单','200','20,13,45,34,6,23,39','工单1,工单2,工单3,工单4,工单5,工单6','17,15,23,56,24,65','1','180');

/*Data for the table `aweb_relevancy_role_access` */

insert  into `aweb_relevancy_role_access`(`ID`,`ROLE_ID`,`ACCESS_ID`) values ('208ef8e1-f9a6-42fd-9c39-cb376f9f1461','174s-50N2-7085','15010100000030000002'),('220f3514-78ad-4e67-9aee-f4a976107292','174s-50N2-7085','15010100000030000007'),('29483463-1590-4d43-8890-15da8a729f8a','174s-50N2-7085','15010100000030000005'),('2bf67da1-086a-440a-bc27-3d200a4e639e','174s-50N2-7085','15010100000030000000'),('2cb20b25-09df-4f8e-8c43-6e853412e117','2065-0765-I1l4','15010100000030000007'),('377ef1e2-00f9-4ebd-8be5-57f5e313ccdc','2065-0765-I1l4','15010100000030000003'),('38c1915e-25f5-4f50-a61a-60e139144551','174s-50N2-7085','15010100000030000001'),('4a2e538d-3c2d-4bdb-b0af-a68e6b5ce9de','174s-50N2-7085','15010100000030000006'),('74ebfd68-9540-4ca9-9f8e-cde226777660','2065-0765-I1l4','15010100000030000002'),('8510e03f-7b8c-42bc-8361-78c9adfbab84','2065-0765-I1l4','15010100000030000006'),('90b35cc6-9e0e-4667-914b-a9a61dcf5ac3','2065-0765-I1l4','15010100000030000008'),('92c91f3a-8d19-4da3-9d39-ffa29a523402','174s-50N2-7085','15010100000030000004'),('9fdd76cf-3525-45f0-8de9-7105d95e87d0','2065-0765-I1l4','15010100000030000001'),('a800557a-356c-4fa9-803a-22d79bf14b71','2065-0765-I1l4','15010100000030000004'),('b50eb1f0-7d96-4133-82a3-8b5d40bf1c31','2065-0765-I1l4','15010100000030000005'),('b5c9c002-3c8d-4439-b5ca-0834307ad453','2065-0765-I1l4','15010100000030000000'),('dc691e44-a910-451f-b98e-423cb2307299','174s-50N2-7085','15010100000030000003'),('fd3b57a6-6303-4e2d-86a0-1e8a3f28699f','174s-50N2-7085','15010100000030000008');

/*Data for the table `aweb_relevancy_user_role` */

insert  into `aweb_relevancy_user_role`(`ID`,`USERNAME`,`ROLE_ID`) values ('6e313023-6e4d-4edd-8002-569f7babebb9','test','174s-50N2-7085');

/*Data for the table `aweb_role` */

insert  into `aweb_role`(`ID`,`NAME`,`CREATEUSER`,`CREATETIME`,`UPDATETIME`,`STATE`,`REMARK`,`ROLE_GROUP`,`ROLE_TYPE`) values ('174s-50N2-7085','应用管理员','admin','2016-05-26 18:26:04','2016-05-26 18:26:04','1','应用管理员',NULL,'1'),('2065-0765-I1l4','系统管理员','admin','2016-05-26 18:25:49','2016-05-26 18:25:49','1','系统管理员',NULL,'0');

/*Data for the table `aweb_user` */

insert  into `aweb_user`(`USERNAME`,`PASSWORD`,`NICKNAME`,`IP`,`MAILBOX`,`TELEPHONE`,`CREATEUSER`,`CREATETIME`,`UPDATETIME`,`LOGINTIME`,`LOCKTIME`,`CONTINUOUSERRORNUM`,`STATE`,`USERTYPE`,`REMARK`,`TEL_NO`,`AD`,`SENDTIMES`,`review_pass`,`review_length`,`admin_userid`,`user_group`) values ('admin','0201060304','管理员','localhost','admin@agree.com','15088888888','admin','2015-01-01 00:00:00','2015-01-01 00:00:00','2016-05-27 16:23:02','','0','1','0','管理员',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('test','C2C2C2C2C2C2','test',NULL,'test@123.com','11111111111','admin','2016-05-26 18:24:56',NULL,NULL,NULL,'0','1','1','test',NULL,NULL,NULL,NULL,NULL,NULL,NULL);

/*Data for the table `aweb_user_grid` */

insert  into `aweb_user_grid`(`USERNAME`,`GRIDCONF`) values ('admin','[null,null,null,null,null,null,null,null,null]');

/*Data for the table `aweb_user_login` */

insert  into `aweb_user_login`(`USERNAME`,`SESSIONID`,`LASTHOST`) values ('admin','6F9C505FB576F2446679C555C2FB2CFA','127.0.0.1:8080');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
