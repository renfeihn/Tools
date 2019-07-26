/*==============================================================*/
/* DBMS name:      ORACLE Version 11g                           */
/* Created on:     2016/4/27 15:08:47                           */
/*==============================================================*/


alter table "aweb_device"
   drop constraint AD_F_ADT;

drop table "aweb_access" cascade constraints;

drop table "aweb_access_control" cascade constraints;

drop table "aweb_access_menu" cascade constraints;

drop table "aweb_access_page" cascade constraints;

drop table "aweb_device" cascade constraints;

drop table "aweb_device_type" cascade constraints;

drop table "aweb_relevancy_role_access" cascade constraints;

drop table "aweb_relevancy_user_role" cascade constraints;

drop table "aweb_role" cascade constraints;

drop table "aweb_user" cascade constraints;

drop table "aweb_user_login" cascade constraints;

/*==============================================================*/
/* Table: "aweb_access"                                         */
/*==============================================================*/
create table "aweb_access" 
(
   ID                   VARCHAR2(50)         not null,
   ELEMENT_ID           VARCHAR2(100),
   TYPE                 VARCHAR2(10),
   NAME                 VARCHAR2(100),
   PID                  VARCHAR2(100),
   STATE                VARCHAR2(5),
   "constraint"         PK_AWEB_ACCESS primary key (ID)
);

/*==============================================================*/
/* Table: "aweb_access_control"                                 */
/*==============================================================*/
create table "aweb_access_control" 
(
   ID                   VARCHAR2(100)        not null,
   NAME                 VARCHAR2(100),
   VALUE                VARCHAR2(200),
   STATE                VARCHAR2(1),
   REMARK               VARCHAR2(200),
   "constraint"         PK_AWEB_ACCESS_CONTROL primary key (ID)
);

/*==============================================================*/
/* Table: "aweb_access_menu"                                    */
/*==============================================================*/
create table "aweb_access_menu" 
(
   ID                   VARCHAR2(100)        not null,
   PID                  VARCHAR2(100)        default NULL,
   NAME                 VARCHAR2(100)        default NULL,
   VALUE                VARCHAR2(200)        default NULL,
   ISPARENT             VARCHAR2(5)          default NULL,
   OPEN                 VARCHAR2(5)          default NULL,
   ICON                 VARCHAR2(20)         default NULL,
   STATE                VARCHAR2(1)          default NULL,
   SORT                 VARCHAR2(5)          default NULL,
   REMARK               VARCHAR2(200)        default NULL,
   "constraint"         PK_AWEB_ACCESS_MENU primary key (ID)
);

comment on column "aweb_access_menu".PID is
'父节点ID';

comment on column "aweb_access_menu".NAME is
'节点名';

comment on column "aweb_access_menu".VALUE is
'url值，为空时，无对应的页面';

comment on column "aweb_access_menu".ISPARENT is
'是否为父节点';

comment on column "aweb_access_menu".OPEN is
'初始化时是否打开';

comment on column "aweb_access_menu".ICON is
'图标';

comment on column "aweb_access_menu".REMARK is
'备注信息';

/*==============================================================*/
/* Table: "aweb_access_page"                                    */
/*==============================================================*/
create table "aweb_access_page" 
(
   ID                   VARCHAR2(100)        not null,
   NAME                 VARCHAR2(100),
   VALUE                VARCHAR2(200),
   STATE                VARCHAR2(1),
   REMARK               VARCHAR2(200),
   "constraint"         PK_AWEB_ACCESS_PAGE primary key (ID)
);

/*==============================================================*/
/* Table: "aweb_device"                                         */
/*==============================================================*/
create table "aweb_device" 
(
   PATH                 VARCHAR2(100)        not null,
   NAME                 VARCHAR2(20)         not null,
   DESP                 VARCHAR2(20)         not null,
   DEVTYPE              VARCHAR2(20)         not null,
   PARENTPATH           VARCHAR2(100)        not null,
   EXPAND               VARCHAR2(30),
   constraint PK_AWEB_DEVICE primary key (PATH)
);

/*==============================================================*/
/* Table: "aweb_device_type"                                    */
/*==============================================================*/
create table "aweb_device_type" 
(
   DEVTYPE              VARCHAR2(20)         not null,
   DESP                 VARCHAR2(20)         not null,
   constraint PK_AWEB_DEVICE_TYPE primary key (DEVTYPE)
);

/*==============================================================*/
/* Table: "aweb_relevancy_role_access"                          */
/*==============================================================*/
create table "aweb_relevancy_role_access" 
(
   ID                   VARCHAR2(50)         not null,
   ROLE_ID              VARCHAR2(50),
   ACCESS_ID            VARCHAR2(50),
   "constraint"         PK_AWEB_RELEVANCY_ROLE_ACCESS primary key (ID)
);

/*==============================================================*/
/* Table: "aweb_relevancy_user_role"                            */
/*==============================================================*/
create table "aweb_relevancy_user_role" 
(
   ID                   VARCHAR2(50)         not null,
   USERNAME             VARCHAR2(50),
   ROLE_ID              VARCHAR2(50),
   "constraint"         PK_AWEB_RELEVANCY_USER_ROLE primary key (ID)
);

/*==============================================================*/
/* Table: "aweb_role"                                           */
/*==============================================================*/
create table "aweb_role" 
(
   ID                   VARCHAR2(50)         not null,
   NAME                 VARCHAR2(100),
   CREATEUSER           VARCHAR2(50),
   CREATETIME           VARCHAR2(30),
   UPDATETIME           VARCHAR2(30),
   STATE                VARCHAR2(1),
   REMARK               VARCHAR2(200),
   "constraint"         PK_AWEB_ROLE primary key (ID)
);

/*==============================================================*/
/* Table: "aweb_user"                                           */
/*==============================================================*/
create table "aweb_user" 
(
   USERNAME             VARCHAR2(50)         not null,
   PASSWORD             VARCHAR2(50),
   NICKNAME             VARCHAR2(50),
   IP                   VARCHAR2(20),
   MAILBOX              VARCHAR2(50),
   TELEPHONE            VARCHAR2(20),
   CREATEUSER           VARCHAR2(50),
   CREATETIME           VARCHAR2(30),
   UPDATETIME           VARCHAR2(30),
   LOGINTIME            VARCHAR2(30),
   LOCKTIME             VARCHAR2(30),
   CONTINUOUSERRORNUM   VARCHAR2(2),
   STATE                VARCHAR2(1),
   USERTYPE             VARCHAR2(1),
   REMARK               VARCHAR2(200),
   "constraint"         PK_AWEB_USER primary key (USERNAME)
);

/*==============================================================*/
/* Table: "aweb_user_login"                                     */
/*==============================================================*/
create table "aweb_user_login" 
(
   USERNAME             VARCHAR2(50)         not null,
   SESSIONID            VARCHAR2(50)         not null,
   LASTHOST             VARCHAR2(25)         not null,
   "constraint"         PK_AWEB_USER_LOGIN primary key (USERNAME)
);

alter table "aweb_device"
   add constraint AD_F_ADT foreign key (DEVTYPE)
      references "aweb_device_type" (DEVTYPE);

