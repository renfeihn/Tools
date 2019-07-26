--==============================================================
-- DBMS name:      IBM DB2 Version 9.x for z/OS
-- Created on:     2016/4/27 15:11:29
--==============================================================


alter table "aweb_device"
   drop foreign key AD_F_ADT;

drop table "aweb_access";

drop table "aweb_access_control";

drop table "aweb_access_menu";

drop table "aweb_access_page";

drop table "aweb_device";

drop table "aweb_device_type";

drop table "aweb_relevancy_role_access";

drop table "aweb_relevancy_user_role";

drop table "aweb_role";

drop table "aweb_user";

drop table "aweb_user_login";

--==============================================================
-- Table: "aweb_access"
--==============================================================
create table "aweb_access" (
   ID                   VARCHAR(50)            not null,
   ELEMENT_ID           VARCHAR(100),
   "TYPE"               VARCHAR(10),
   NAME                 VARCHAR(100),
   PID                  VARCHAR(100),
   STATE                VARCHAR(5),
   "constraint"         PK_AWEB_ACCESS primary key (ID)
);

--==============================================================
-- Table: "aweb_access_control"
--==============================================================
create table "aweb_access_control" (
   ID                   VARCHAR(100)           not null,
   NAME                 VARCHAR(100),
   "VALUE"              VARCHAR(200),
   STATE                VARCHAR(1),
   REMARK               VARCHAR(200),
   "constraint"         PK_AWEB_ACCESS_CONTROL primary key (ID)
);

--==============================================================
-- Table: "aweb_access_menu"
--==============================================================
create table "aweb_access_menu" (
   ID                   VARCHAR(100)           not null,
   PID                  VARCHAR(100)           default NULL,
   NAME                 VARCHAR(100)           default NULL,
   "VALUE"              VARCHAR(200)           default NULL,
   ISPARENT             VARCHAR(5)             default NULL,
   "OPEN"               VARCHAR(5)             default NULL,
   ICON                 VARCHAR(20)            default NULL,
   STATE                VARCHAR(1)             default NULL,
   SORT                 VARCHAR(5)             default NULL,
   REMARK               VARCHAR(200)           default NULL,
   "constraint"         PK_AWEB_ACCESS_MENU primary key (ID)
);

comment on column "aweb_access_menu".PID is
'父节点ID';

comment on column "aweb_access_menu".NAME is
'节点名';

comment on column "aweb_access_menu"."VALUE" is
'url值，为空时，无对应的页面';

comment on column "aweb_access_menu".ISPARENT is
'是否为父节点';

comment on column "aweb_access_menu"."OPEN" is
'初始化时是否打开';

comment on column "aweb_access_menu".ICON is
'图标';

comment on column "aweb_access_menu".REMARK is
'备注信息';

--==============================================================
-- Table: "aweb_access_page"
--==============================================================
create table "aweb_access_page" (
   ID                   VARCHAR(100)           not null,
   NAME                 VARCHAR(100),
   "VALUE"              VARCHAR(200),
   STATE                VARCHAR(1),
   REMARK               VARCHAR(200),
   "constraint"         PK_AWEB_ACCESS_PAGE primary key (ID)
);

--==============================================================
-- Table: "aweb_device"
--==============================================================
create table "aweb_device" (
   "PATH"               VARCHAR(100)           not null,
   NAME                 VARCHAR(20)            not null,
   DESP                 VARCHAR(20)            not null,
   DEVTYPE              VARCHAR(20)            not null,
   PARENTPATH           VARCHAR(100)           not null,
   EXPAND               VARCHAR(30),
   constraint "P_Key_1" primary key ("PATH")
);

--==============================================================
-- Table: "aweb_device_type"
--==============================================================
create table "aweb_device_type" (
   DEVTYPE              VARCHAR(20)            not null,
   DESP                 VARCHAR(20)            not null,
   constraint "P_Key_1" primary key (DEVTYPE)
);

--==============================================================
-- Table: "aweb_relevancy_role_access"
--==============================================================
create table "aweb_relevancy_role_access" (
   ID                   VARCHAR(50)            not null,
   ROLE_ID              VARCHAR(50),
   ACCESS_ID            VARCHAR(50),
   "constraint"         PK_AWEB_RELEVANCY_ROLE_ACCESS primary key (ID)
);

--==============================================================
-- Table: "aweb_relevancy_user_role"
--==============================================================
create table "aweb_relevancy_user_role" (
   ID                   VARCHAR(50)            not null,
   USERNAME             VARCHAR(50),
   ROLE_ID              VARCHAR(50),
   "constraint"         PK_AWEB_RELEVANCY_USER_ROLE primary key (ID)
);

--==============================================================
-- Table: "aweb_role"
--==============================================================
create table "aweb_role" (
   ID                   VARCHAR(50)            not null,
   NAME                 VARCHAR(100),
   CREATEUSER           VARCHAR(50),
   CREATETIME           VARCHAR(30),
   UPDATETIME           VARCHAR(30),
   STATE                VARCHAR(1),
   REMARK               VARCHAR(200),
   "constraint"         PK_AWEB_ROLE primary key (ID)
);

--==============================================================
-- Table: "aweb_user"
--==============================================================
create table "aweb_user" (
   USERNAME             VARCHAR(50)            not null,
   PASSWORD             VARCHAR(50),
   NICKNAME             VARCHAR(50),
   IP                   VARCHAR(20),
   MAILBOX              VARCHAR(50),
   TELEPHONE            VARCHAR(20),
   CREATEUSER           VARCHAR(50),
   CREATETIME           VARCHAR(30),
   UPDATETIME           VARCHAR(30),
   LOGINTIME            VARCHAR(30),
   LOCKTIME             VARCHAR(30),
   CONTINUOUSERRORNUM   VARCHAR(2),
   STATE                VARCHAR(1),
   USERTYPE             VARCHAR(1),
   REMARK               VARCHAR(200),
   "constraint"         PK_AWEB_USER primary key (USERNAME)
);

--==============================================================
-- Table: "aweb_user_login"
--==============================================================
create table "aweb_user_login" (
   USERNAME             VARCHAR(50)            not null,
   SESSIONID            VARCHAR(50)            not null,
   LASTHOST             VARCHAR(25)            not null,
   "constraint"         PK_AWEB_USER_LOGIN primary key (USERNAME)
);

alter table "aweb_device"
   add constraint AD_F_ADT foreign key (DEVTYPE)
      references "aweb_device_type" (DEVTYPE)
      on delete no action;

