/*
Navicat MySQL Data Transfer

Source Server         : 146.33.20.28
Source Server Version : 50717
Source Host           : 146.33.20.28:60035
Source Database       : api_server_0409

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-04-16 16:38:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for qrtz_blob_triggers
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_blob_triggers`;
CREATE TABLE `qrtz_blob_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_NAME` varchar(200) NOT NULL,
  `TRIGGER_GROUP` varchar(200) NOT NULL,
  `BLOB_DATA` blob,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  CONSTRAINT `qrtz_blob_triggers_ibfk_1` FOREIGN KEY (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`) REFERENCES `qrtz_triggers` (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qrtz_blob_triggers
-- ----------------------------

-- ----------------------------
-- Table structure for qrtz_calendars
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_calendars`;
CREATE TABLE `qrtz_calendars` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `CALENDAR_NAME` varchar(200) NOT NULL,
  `CALENDAR` blob NOT NULL,
  PRIMARY KEY (`SCHED_NAME`,`CALENDAR_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qrtz_calendars
-- ----------------------------

-- ----------------------------
-- Table structure for qrtz_cron_triggers
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_cron_triggers`;
CREATE TABLE `qrtz_cron_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_NAME` varchar(200) NOT NULL,
  `TRIGGER_GROUP` varchar(200) NOT NULL,
  `CRON_EXPRESSION` varchar(200) NOT NULL,
  `TIME_ZONE_ID` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  CONSTRAINT `qrtz_cron_triggers_ibfk_1` FOREIGN KEY (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`) REFERENCES `qrtz_triggers` (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qrtz_cron_triggers
-- ----------------------------

-- ----------------------------
-- Table structure for qrtz_fired_triggers
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_fired_triggers`;
CREATE TABLE `qrtz_fired_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `ENTRY_ID` varchar(95) NOT NULL,
  `TRIGGER_NAME` varchar(200) NOT NULL,
  `TRIGGER_GROUP` varchar(200) NOT NULL,
  `INSTANCE_NAME` varchar(200) NOT NULL,
  `FIRED_TIME` bigint(13) NOT NULL,
  `SCHED_TIME` bigint(13) NOT NULL,
  `PRIORITY` int(11) NOT NULL,
  `STATE` varchar(16) NOT NULL,
  `JOB_NAME` varchar(200) DEFAULT NULL,
  `JOB_GROUP` varchar(200) DEFAULT NULL,
  `IS_NONCONCURRENT` varchar(1) DEFAULT NULL,
  `REQUESTS_RECOVERY` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`SCHED_NAME`,`ENTRY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qrtz_fired_triggers
-- ----------------------------

-- ----------------------------
-- Table structure for qrtz_job_details
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_job_details`;
CREATE TABLE `qrtz_job_details` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `JOB_NAME` varchar(200) NOT NULL,
  `JOB_GROUP` varchar(200) NOT NULL,
  `DESCRIPTION` varchar(250) DEFAULT NULL,
  `JOB_CLASS_NAME` varchar(250) NOT NULL,
  `IS_DURABLE` varchar(1) NOT NULL,
  `IS_NONCONCURRENT` varchar(1) NOT NULL,
  `IS_UPDATE_DATA` varchar(1) NOT NULL,
  `REQUESTS_RECOVERY` varchar(1) NOT NULL,
  `JOB_DATA` blob,
  PRIMARY KEY (`SCHED_NAME`,`JOB_NAME`,`JOB_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qrtz_job_details
-- ----------------------------

-- ----------------------------
-- Table structure for qrtz_locks
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_locks`;
CREATE TABLE `qrtz_locks` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `LOCK_NAME` varchar(40) NOT NULL,
  PRIMARY KEY (`SCHED_NAME`,`LOCK_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qrtz_locks
-- ----------------------------

-- ----------------------------
-- Table structure for qrtz_paused_trigger_grps
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_paused_trigger_grps`;
CREATE TABLE `qrtz_paused_trigger_grps` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_GROUP` varchar(200) NOT NULL,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qrtz_paused_trigger_grps
-- ----------------------------

-- ----------------------------
-- Table structure for qrtz_scheduler_state
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_scheduler_state`;
CREATE TABLE `qrtz_scheduler_state` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `INSTANCE_NAME` varchar(200) NOT NULL,
  `LAST_CHECKIN_TIME` bigint(13) NOT NULL,
  `CHECKIN_INTERVAL` bigint(13) NOT NULL,
  PRIMARY KEY (`SCHED_NAME`,`INSTANCE_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qrtz_scheduler_state
-- ----------------------------

-- ----------------------------
-- Table structure for qrtz_simple_triggers
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_simple_triggers`;
CREATE TABLE `qrtz_simple_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_NAME` varchar(200) NOT NULL,
  `TRIGGER_GROUP` varchar(200) NOT NULL,
  `REPEAT_COUNT` bigint(7) NOT NULL,
  `REPEAT_INTERVAL` bigint(12) NOT NULL,
  `TIMES_TRIGGERED` bigint(10) NOT NULL,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  CONSTRAINT `qrtz_simple_triggers_ibfk_1` FOREIGN KEY (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`) REFERENCES `qrtz_triggers` (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qrtz_simple_triggers
-- ----------------------------

-- ----------------------------
-- Table structure for qrtz_simprop_triggers
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_simprop_triggers`;
CREATE TABLE `qrtz_simprop_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_NAME` varchar(200) NOT NULL,
  `TRIGGER_GROUP` varchar(200) NOT NULL,
  `STR_PROP_1` varchar(512) DEFAULT NULL,
  `STR_PROP_2` varchar(512) DEFAULT NULL,
  `STR_PROP_3` varchar(512) DEFAULT NULL,
  `INT_PROP_1` int(11) DEFAULT NULL,
  `INT_PROP_2` int(11) DEFAULT NULL,
  `LONG_PROP_1` bigint(20) DEFAULT NULL,
  `LONG_PROP_2` bigint(20) DEFAULT NULL,
  `DEC_PROP_1` decimal(13,4) DEFAULT NULL,
  `DEC_PROP_2` decimal(13,4) DEFAULT NULL,
  `BOOL_PROP_1` varchar(1) DEFAULT NULL,
  `BOOL_PROP_2` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  CONSTRAINT `qrtz_simprop_triggers_ibfk_1` FOREIGN KEY (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`) REFERENCES `qrtz_triggers` (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qrtz_simprop_triggers
-- ----------------------------

-- ----------------------------
-- Table structure for qrtz_triggers
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_triggers`;
CREATE TABLE `qrtz_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_NAME` varchar(200) NOT NULL,
  `TRIGGER_GROUP` varchar(200) NOT NULL,
  `JOB_NAME` varchar(200) NOT NULL,
  `JOB_GROUP` varchar(200) NOT NULL,
  `DESCRIPTION` varchar(250) DEFAULT NULL,
  `NEXT_FIRE_TIME` bigint(13) DEFAULT NULL,
  `PREV_FIRE_TIME` bigint(13) DEFAULT NULL,
  `PRIORITY` int(11) DEFAULT NULL,
  `TRIGGER_STATE` varchar(16) NOT NULL,
  `TRIGGER_TYPE` varchar(8) NOT NULL,
  `START_TIME` bigint(13) NOT NULL,
  `END_TIME` bigint(13) DEFAULT NULL,
  `CALENDAR_NAME` varchar(200) DEFAULT NULL,
  `MISFIRE_INSTR` smallint(2) DEFAULT NULL,
  `JOB_DATA` blob,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  KEY `SCHED_NAME` (`SCHED_NAME`,`JOB_NAME`,`JOB_GROUP`) USING BTREE,
  CONSTRAINT `qrtz_triggers_ibfk_1` FOREIGN KEY (`SCHED_NAME`, `JOB_NAME`, `JOB_GROUP`) REFERENCES `qrtz_job_details` (`SCHED_NAME`, `JOB_NAME`, `JOB_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qrtz_triggers
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_area
-- ----------------------------
DROP TABLE IF EXISTS `tbl_area`;
CREATE TABLE `tbl_area` (
  `id` varchar(32) NOT NULL COMMENT '主键ID',
  `site_id` varchar(32) NOT NULL COMMENT '所属站点ID',
  `name` varchar(64) NOT NULL COMMENT '区域名称',
  `description` varchar(256) DEFAULT NULL COMMENT '区域描述',
  `enabled` bit(1) NOT NULL COMMENT '可用状态(1:可用，0:不可用)',
  `backup_storage_id` varchar(32) NOT NULL COMMENT '所用备份存储',
  `create_datetime` datetime NOT NULL COMMENT '创建时间',
  `create_user_login_name` varchar(32) NOT NULL COMMENT '创建者',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='区域表';

-- ----------------------------
-- Records of tbl_area
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_auth_menu
-- ----------------------------
DROP TABLE IF EXISTS `tbl_auth_menu`;
CREATE TABLE `tbl_auth_menu` (
  `role_code` varchar(32) NOT NULL COMMENT '角色代码，引用角色表主键code',
  `menu_code` varchar(32) NOT NULL COMMENT '菜单代码，引用菜单表主键code',
  PRIMARY KEY (`role_code`,`menu_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='授权菜单表';

-- ----------------------------
-- Records of tbl_auth_menu
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_auth_menu_resource
-- ----------------------------
DROP TABLE IF EXISTS `tbl_auth_menu_resource`;
CREATE TABLE `tbl_auth_menu_resource` (
  `role_code` varchar(32) NOT NULL COMMENT '角色代码，引用角色表主键code\n',
  `menu_resource_id` varchar(32) NOT NULL COMMENT '菜单资源ID',
  PRIMARY KEY (`role_code`,`menu_resource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='授权菜单资源';

-- ----------------------------
-- Records of tbl_auth_menu_resource
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_backup_storage
-- ----------------------------
DROP TABLE IF EXISTS `tbl_backup_storage`;
CREATE TABLE `tbl_backup_storage` (
  `id` varchar(32) NOT NULL COMMENT '主键',
  `site_id` varchar(32) NOT NULL COMMENT '所属站点',
  `name` varchar(64) NOT NULL COMMENT '备份存储名称',
  `type` varchar(64) NOT NULL COMMENT '备份存储类型(dicTypeCode=backup_storage_type)',
  `ip` varchar(15) NOT NULL COMMENT 'nfs IP地址',
  `dir` varchar(256) NOT NULL COMMENT 'nfs 源目录',
  `mount_dir` varchar(256) NOT NULL COMMENT 'nfs 挂载目录',
  `mount_opts` varchar(1024) DEFAULT NULL COMMENT 'nfs 挂载参数',
  `enabled` bit(1) NOT NULL COMMENT '可用状态(1:可用，0:不可用)',
  `description` varchar(256) DEFAULT NULL COMMENT '区域描述',
  `create_datetime` datetime NOT NULL COMMENT '创建时间',
  `create_user_login_name` varchar(32) NOT NULL COMMENT '创建者',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='nfs备份存储表';

-- ----------------------------
-- Records of tbl_backup_storage
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_backup_strategy
-- ----------------------------
DROP TABLE IF EXISTS `tbl_backup_strategy`;
CREATE TABLE `tbl_backup_strategy` (
  `id` varchar(32) NOT NULL COMMENT '主键',
  `type` varchar(64) NOT NULL COMMENT '备份策略类型',
  `db_name` varchar(255) DEFAULT NULL,
  `table_names` varchar(255) DEFAULT NULL,
  `cron_expression` varchar(64) NOT NULL,
  `expire_datetime` datetime DEFAULT NULL,
  `retention` int(11) NOT NULL,
  `enabled` bit(1) NOT NULL COMMENT '可用状态(1:可用，0:不可用)',
  `remark` varchar(255) DEFAULT NULL,
  `serv_id` varchar(32) DEFAULT NULL,
  `create_datetime` datetime NOT NULL COMMENT '创建时间',
  `create_user_login_name` varchar(32) NOT NULL COMMENT '创建者',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='nfs备份存储表';

-- ----------------------------
-- Records of tbl_backup_strategy
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_business_subsystem
-- ----------------------------
DROP TABLE IF EXISTS `tbl_business_subsystem`;
CREATE TABLE `tbl_business_subsystem` (
  `id` varchar(32) NOT NULL,
  `name` varchar(64) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `business_system_id` varchar(32) NOT NULL,
  `create_datetime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_business_subsystem
-- ----------------------------
INSERT INTO `tbl_business_subsystem` VALUES ('business_subsystem_admin', '默认业务子系统', '', 'business_system_admin', '2017-09-15 13:51:38');
INSERT INTO `tbl_business_subsystem` VALUES ('business_subsystem_user', '默认业务子系统', '', 'business_system_user', '2017-09-15 13:51:38');

-- ----------------------------
-- Table structure for tbl_business_subsystem_order
-- ----------------------------
DROP TABLE IF EXISTS `tbl_business_subsystem_order`;
CREATE TABLE `tbl_business_subsystem_order` (
  `business_subsystem_id` varchar(64) NOT NULL,
  `order_id` varchar(64) NOT NULL COMMENT '创建者'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_business_subsystem_order
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_business_system
-- ----------------------------
DROP TABLE IF EXISTS `tbl_business_system`;
CREATE TABLE `tbl_business_system` (
  `id` varchar(32) NOT NULL,
  `name` varchar(64) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `owner` varchar(255) NOT NULL,
  `create_datetime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_business_system
-- ----------------------------
INSERT INTO `tbl_business_system` VALUES ('business_system_admin', '默认业务系统', '', 'admin', '2017-09-15 13:50:44');
INSERT INTO `tbl_business_system` VALUES ('business_system_user', '默认业务系统', '', 'user', '2017-09-15 13:50:44');

-- ----------------------------
-- Table structure for tbl_cluster
-- ----------------------------
DROP TABLE IF EXISTS `tbl_cluster`;
CREATE TABLE `tbl_cluster` (
  `id` varchar(32) NOT NULL COMMENT ' 主键，集群ID',
  `area_id` varchar(32) NOT NULL COMMENT '所属区域',
  `name` varchar(64) NOT NULL COMMENT '集群名称',
  `relate_id` varchar(64) DEFAULT NULL COMMENT '关联ID, 由于事务处理需要所以可以为空',
  `mixed` bit(1) NOT NULL,
  `enabled` bit(1) NOT NULL COMMENT '可用状态(1:可用，0:不可用)',
  `definition_subserv_names` varchar(255) NOT NULL COMMENT '包含软件',
  `description` varchar(256) DEFAULT NULL COMMENT '区域描述',
  `create_datetime` datetime NOT NULL COMMENT '创建时间',
  `create_user_login_name` varchar(32) NOT NULL COMMENT '创建者',
  PRIMARY KEY (`id`),
  UNIQUE KEY `relate_id_UNIQUE` (`relate_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='集群表';

-- ----------------------------
-- Records of tbl_cluster
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_cluster_networking
-- ----------------------------
DROP TABLE IF EXISTS `tbl_cluster_networking`;
CREATE TABLE `tbl_cluster_networking` (
  `cluster_id` varchar(32) NOT NULL COMMENT '集群ID',
  `networking_id` varchar(32) NOT NULL COMMENT '子服务软件定义ID',
  PRIMARY KEY (`cluster_id`,`networking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='集群子服务软件关联表，存储集群可容纳子服务软件,是集群属性扩展表';

-- ----------------------------
-- Records of tbl_cluster_networking
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_combo
-- ----------------------------
DROP TABLE IF EXISTS `tbl_combo`;
CREATE TABLE `tbl_combo` (
  `id` varchar(64) NOT NULL,
  `name` varchar(64) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `definition_serv_code` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of tbl_combo
-- ----------------------------
INSERT INTO `tbl_combo` VALUES ('upredis_urproxy_sentinel_m1s1_2c16g', '主备中型', null, 'upredis_urproxy_sentinel');
INSERT INTO `tbl_combo` VALUES ('upredis_urproxy_sentinel_m1s1_2c8g', '主备小型', null, 'upredis_urproxy_sentinel');
INSERT INTO `tbl_combo` VALUES ('upredis_urproxy_sentinel_m1_2c16g', '单库中型', null, 'upredis_urproxy_sentinel');
INSERT INTO `tbl_combo` VALUES ('upredis_urproxy_sentinel_m1_2c8g', '单库小型', null, 'upredis_urproxy_sentinel');
INSERT INTO `tbl_combo` VALUES ('upsql_upproxy_swm_m1sb1s1_2c12g', '主备1从小型', null, 'upsql_upproxy_swm');
INSERT INTO `tbl_combo` VALUES ('upsql_upproxy_swm_m1sb1s1_4c24g', '主备1从中型', null, 'upsql_upproxy_swm');
INSERT INTO `tbl_combo` VALUES ('upsql_upproxy_swm_m1sb1_2c12g', '主备小型', null, 'upsql_upproxy_swm');
INSERT INTO `tbl_combo` VALUES ('upsql_upproxy_swm_m1sb1_4c24g', '主备中型', null, 'upsql_upproxy_swm');
INSERT INTO `tbl_combo` VALUES ('upsql_upproxy_swm_m1_2c12g', '单库小型', null, 'upsql_upproxy_swm');
INSERT INTO `tbl_combo` VALUES ('upsql_upproxy_swm_m1_4c24g', '单库中型', null, 'upsql_upproxy_swm');

-- ----------------------------
-- Table structure for tbl_definition
-- ----------------------------
DROP TABLE IF EXISTS `tbl_definition`;
CREATE TABLE `tbl_definition` (
  `dict_type_code` varchar(64) NOT NULL COMMENT '字典编码',
  `dict_code` varchar(64) NOT NULL,
  `code` varchar(64) NOT NULL COMMENT '关联编码',
  PRIMARY KEY (`dict_type_code`,`dict_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_definition
-- ----------------------------
INSERT INTO `tbl_definition` VALUES ('backup_type', 'full', 'full');
INSERT INTO `tbl_definition` VALUES ('backup_type', 'tables', 'tables');
INSERT INTO `tbl_definition` VALUES ('data_dir_type', 'local_hdd', 'local:HDD');
INSERT INTO `tbl_definition` VALUES ('data_dir_type', 'local_ssd', 'local:SSD');
INSERT INTO `tbl_definition` VALUES ('data_dir_type', 'san', 'SAN');
INSERT INTO `tbl_definition` VALUES ('log_dir_type', 'local_hdd', 'local:HDD');
INSERT INTO `tbl_definition` VALUES ('log_dir_type', 'local_ssd', 'local:SSD');
INSERT INTO `tbl_definition` VALUES ('log_dir_type', 'san', 'SAN');
INSERT INTO `tbl_definition` VALUES ('serv_user_auth_type', 'dbpm', 'DBPM');
INSERT INTO `tbl_definition` VALUES ('serv_user_auth_type', 'password', 'password');
INSERT INTO `tbl_definition` VALUES ('storage_type', 'local_hdd', 'local:HDD');
INSERT INTO `tbl_definition` VALUES ('storage_type', 'local_ssd', 'local:SSD');
INSERT INTO `tbl_definition` VALUES ('storage_type', 'san', 'SAN');

-- ----------------------------
-- Table structure for tbl_definition_metric
-- ----------------------------
DROP TABLE IF EXISTS `tbl_definition_metric`;
CREATE TABLE `tbl_definition_metric` (
  `name` varchar(64) NOT NULL,
  `type` varchar(64) NOT NULL,
  `metric` varchar(64) NOT NULL COMMENT '监控项',
  `description` varchar(64) DEFAULT NULL,
  `event_show_enabled` bit(1) NOT NULL DEFAULT b'1',
  `composed` bit(1) DEFAULT NULL,
  PRIMARY KEY (`name`,`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_definition_metric
-- ----------------------------
INSERT INTO `tbl_definition_metric` VALUES ('all_cpu_usage', 'container', 'container.all_cpu_usage', '全部CPU使用率', '', '');
INSERT INTO `tbl_definition_metric` VALUES ('aof_last_bgrewrite_status', 'upredis', 'unit_upredis.aof_last_bgrewrite_status', '', '\0', null);
INSERT INTO `tbl_definition_metric` VALUES ('avg_cpu_usage', 'container', 'container.avg_cpu_usage', 'CPU平均使用率', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('blocked_clients', 'upredis', 'unit_upredis.blocked_clients', '', '\0', null);
INSERT INTO `tbl_definition_metric` VALUES ('buffer_pool_dirty_page', 'upsql', 'unit_upsql.buffer_pool_dirty_page', 'BUFFERPOOL脏页数', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('buffer_pool_free_size', 'upsql', 'unit_upsql.buffer_pool_free_size', 'BUFFERPOOL剩余量', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('buffer_pool_hit', 'upsql', 'unit_upsql.buffer_pool_hit', 'BUFFERPOOL命中率', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('buffer_pool_size', 'upsql', 'unit_upsql.buffer_pool_size', 'BUFFERPOOL总量', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('buffer_pool_usage', 'upsql', 'unit_upsql.buffer_pool_usage', 'BUFFERPOOL使用率', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('client_biggest_input_buf', 'upredis', 'unit_upredis.client_biggest_input_buf', '', '\0', null);
INSERT INTO `tbl_definition_metric` VALUES ('client_longest_output_list', 'upredis', 'unit_upredis.client_longest_output_list', '', '\0', null);
INSERT INTO `tbl_definition_metric` VALUES ('com_delete', 'upsql', 'unit_upsql.com_delete', 'DELETE/秒', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('com_insert', 'upsql', 'unit_upsql.com_insert', 'INSERT/秒', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('com_select', 'upsql', 'unit_upsql.com_select', 'SELECT/秒', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('com_update', 'upsql', 'unit_upsql.com_update', 'UPDATE/秒', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('connection', 'upproxy', 'unit_upproxy.connection', '连接数量', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('connection', 'upredis', 'unit_upredis.connected_clients', '连接客户端数量', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('connection', 'upsql', 'unit_upsql.connection_attempts', '当前连接数', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('connection', 'urproxy', 'unit_urproxy.connection', '连接数量', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('connection_info', 'upredis', 'connection#rejected_connections', '连接客户端数量', '\0', '');
INSERT INTO `tbl_definition_metric` VALUES ('connection_max', 'upsql', 'unit_upsql.connection_max', '最大连接数量', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('connection_usage', 'upsql', 'unit_upsql.connection_usage', '连接数使用率', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('consul_agent_status', 'host', 'host.consul_agent_status', 'consul_agent服务状态', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('cpu_usage', 'host', 'host.cpu_usage', '主机cpu使用率', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('datadir_total', 'upredis', 'unit_upredis.datadir_total', '', '\0', null);
INSERT INTO `tbl_definition_metric` VALUES ('datadir_total', 'upsql', 'unit_upsql.datadir_total', '表空间大小', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('datadir_usage', 'upredis', 'unit_upredis.datadir_usage', '数据目录使用率', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('datadir_usage', 'upsql', 'unit_upsql.datadir_usage', '表空间使用率', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('dir_usage', 'host', 'rootdir_usage#homedir_usage', '目录使用率', '\0', '');
INSERT INTO `tbl_definition_metric` VALUES ('dir_usage', 'upredis', 'datadir_usage#logdir_usage', ' 表空间使用率', '\0', '');
INSERT INTO `tbl_definition_metric` VALUES ('dir_usage', 'upsql', 'datadir_usage#logdir_usage', '表空间/日志空间使用率', '\0', '');
INSERT INTO `tbl_definition_metric` VALUES ('docker_plugin_status', 'host', 'host.docker_plugin_status', 'docker_plugin服务状态', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('docker_status', 'host', 'host.docker_status', 'docker服务状态', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('error_file_size', 'upsql', 'unit_upsql.error_file_size', '错误日志文件大小', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('evicted_keys', 'upredis', 'unit_upredis.evicted_keys', '丢弃KEY的数量', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('exec_thread', 'upsql', 'unit_upsql.exec_thread', '运行中线程数量', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('expired_keys', 'upredis', 'unit_upredis.expired_keys', '过期的KEY数量', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('homedir_total', 'host', 'host.homedir_total', '系统home目录总大小', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('homedir_usage', 'host', 'host.homedir_usage', '系统home目录使用率', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('innodb_open_table', 'upsql', 'unit_upsql.innodb_open_table', '打开表数量', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('instantaneous_input_kbps', 'upredis', 'unit_upredis.instantaneous_input_kbps', '', '\0', null);
INSERT INTO `tbl_definition_metric` VALUES ('instantaneous_ops_per_sec', 'upredis', 'unit_upredis.instantaneous_ops_per_sec', ' 每秒操作数量(OPS)', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('instantaneous_output_kbps', 'upredis', 'unit_upredis.instantaneous_output_kbps', '', '\0', null);
INSERT INTO `tbl_definition_metric` VALUES ('io_thread', 'upsql', 'unit_upsql.slave_io', 'IO_THREAD线程状态', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('keyspace_hits', 'upredis', 'unit_upredis.keyspace_hits', '命中KEY数量', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('keyspace_misses', 'upredis', 'unit_upredis.keyspace_misses', '未命中KEY数量', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('key_info', 'upredis', 'keyspace_hits#keyspace_misses#expired_keys#evicted_keys', 'KEY监控', '\0', '');
INSERT INTO `tbl_definition_metric` VALUES ('latest_fork_usec', 'upredis', 'unit_upredis.latest_fork_usec', '', '\0', null);
INSERT INTO `tbl_definition_metric` VALUES ('lock_wait_info', 'upsql', 'unit_upsql.lock_wait_info', '锁等待信息', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('logdir_total', 'upredis', 'unit_upredis.logdir_total', '', '\0', null);
INSERT INTO `tbl_definition_metric` VALUES ('logdir_total', 'upsql', 'unit_upsql.logdir_total', '日志空间总大小', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('logdir_usage', 'upredis', 'unit_upredis.logdir_usage', '目录使用率', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('logdir_usage', 'upsql', 'unit_upsql.logdir_usage', '日志空间使用率', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('mem_fragmentation_ratio', 'upredis', 'unit_upredis.mem_fragmentation_ratio', '内存碎片率', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('mem_usage', 'container', 'container.mem_usage', '内存使用率', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('mem_usage', 'host', 'host.mem_usage', '主机内存使用率', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('network', 'container', 'net_input#net_output', '网络吞吐', '\0', '');
INSERT INTO `tbl_definition_metric` VALUES ('net_input', 'container', 'container.net_input', '网络input', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('net_output', 'container', 'container.net_output', '网络output', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('process_check', 'upsql', 'unit_upsql.process_check', '数据库进程状态', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('qps', 'upredis', 'unit_upredis.instantaneous_ops_per_sec', ' 每秒操作数量（QPS）', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('qps', 'upsql', 'unit_upsql.qps', 'UPSQL 每秒查询数量（QPS）', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('rdb_bgsave_in_progress', 'upredis', 'unit_upredis.rdb_bgsave_in_progress', '', '\0', null);
INSERT INTO `tbl_definition_metric` VALUES ('rdb_changes_since_last_save', 'upredis', 'unit_upredis.rdb_changes_since_last_save', '', '\0', null);
INSERT INTO `tbl_definition_metric` VALUES ('rdb_last_bgsave_status', 'upredis', 'unit_upredis.rdb_last_bgsave_status', '', '\0', null);
INSERT INTO `tbl_definition_metric` VALUES ('rdb_last_bgsave_time_sec', 'upredis', 'unit_upredis.rdb_last_bgsave_time_sec', '持久化耗时（秒）', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('rdb_last_save_time', 'upredis', 'unit_upredis.rdb_last_save_time', '持久化时间戳', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('rejected_connections', 'upredis', 'unit_upredis.rejected_connections', '拒绝的连接数量', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('replication_status', 'upredis', 'unit_upredis.replication_status', '复制状态', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('replication_status', 'upsql', 'unit_upsql.replication_status', '复制状态', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('rootdir_total', 'host', 'host.rootdir_total', '系统root目录总大小', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('rootdir_usage', 'host', 'host.rootdir_usage', '系统root目录使用率', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('slow_query_file_size', 'upsql', 'unit_upsql.slow_query_file_size', '慢日志文件大小', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('sql_press', 'upsql', 'com_delete#com_insert#com_select#com_update', '数据库负载(TPS)', '\0', '');
INSERT INTO `tbl_definition_metric` VALUES ('sql_tread', 'upsql', 'unit_upsql.slave_sql', 'SQL_THREAD线程状态', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('status', 'sentinel', 'unit_sentinel.status', '服务状态', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('status', 'switch_manager', 'unit_switch_manager.status', '服务状态', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('status', 'upproxy', 'unit_upproxy.status', 'upproxy服务状态', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('status', 'upredis', 'unit_upredis.status', '服务状态', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('status', 'upsql', 'unit_upsql.status', '服务状态', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('status', 'urproxy', 'unit_urproxy.status', '服务状态', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('swarm_agent_status', 'host', 'host.swarm_agent_status', 'swarm_agent服务状态', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('table_size', 'upsql', 'unit_upsql.table_size', '表格大小', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('thread_cache_usage', 'upsql', 'unit_upsql.thread_cache_usage', '线程使用率', '', null);
INSERT INTO `tbl_definition_metric` VALUES ('thread_connection', 'upsql', 'connection#connection_max#exec_thread', '连接数', '\0', '');
INSERT INTO `tbl_definition_metric` VALUES ('used_memory', 'upredis', 'unit_upredis.used_memory', '', '\0', null);
INSERT INTO `tbl_definition_metric` VALUES ('used_memory_pct', 'upredis', 'unit_upredis.used_memory_pct', 'Redis内存使用率', '', null);

-- ----------------------------
-- Table structure for tbl_definition_metric_class
-- ----------------------------
DROP TABLE IF EXISTS `tbl_definition_metric_class`;
CREATE TABLE `tbl_definition_metric_class` (
  `metric_class_id` char(64) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`metric_class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_definition_metric_class
-- ----------------------------
INSERT INTO `tbl_definition_metric_class` VALUES ('container_cpu', '容器CPU的监控', '容器CPU的监控', 'container');
INSERT INTO `tbl_definition_metric_class` VALUES ('container_mem', '容器内存的监控', '容器内存的监控', 'container');
INSERT INTO `tbl_definition_metric_class` VALUES ('container_net', '容器网络的监控', '容器网络的监控', 'container');
INSERT INTO `tbl_definition_metric_class` VALUES ('host_consul_agent', '主机consul_agent 的监控', '主机consul_agent 的监控', 'host');
INSERT INTO `tbl_definition_metric_class` VALUES ('host_cpu', '主机CPU的监控', '主机CPU的监控', 'host');
INSERT INTO `tbl_definition_metric_class` VALUES ('host_docker', '主机 docker的监控', '主机 docker的监控', 'host');
INSERT INTO `tbl_definition_metric_class` VALUES ('host_docker_plugin', '主机 docker_plugin的监控', '主机 docker_plugin的监控', 'host');
INSERT INTO `tbl_definition_metric_class` VALUES ('host_fs', '主机目录 的监控', '主机目录 的监控', 'host');
INSERT INTO `tbl_definition_metric_class` VALUES ('host_mem', '主机内存的监控', '主机内存的监控', 'host');
INSERT INTO `tbl_definition_metric_class` VALUES ('host_swarm_agent', '主机 swarm_agent的监控', '主机 swarm_agent的监控', 'host');
INSERT INTO `tbl_definition_metric_class` VALUES ('unit_sentinel_status', 'sentinel实例状态的监控', 'sentinel实例状态的监控', 'unit');
INSERT INTO `tbl_definition_metric_class` VALUES ('unit_switch_manager_status', 'switch_manager实例状态的监控', 'switch_manager实例状态的监控', 'unit');
INSERT INTO `tbl_definition_metric_class` VALUES ('unit_upproxy_connection', 'UPproxy实例连接数的监控', 'UPproxy实例连接数的监控', 'unit');
INSERT INTO `tbl_definition_metric_class` VALUES ('unit_upproxy_status', 'UPproxy实例状态的监控', 'UPproxy实例状态的监控', 'unit');
INSERT INTO `tbl_definition_metric_class` VALUES ('unit_upredis_client', 'UPredis实例的连接情况监控', 'UPredis实例的连接情况监控', 'unit');
INSERT INTO `tbl_definition_metric_class` VALUES ('unit_upredis_fs', 'UPredis实例文件系统使用的监控', 'UPredis实例文件系统使用的监控', 'unit');
INSERT INTO `tbl_definition_metric_class` VALUES ('unit_upredis_memory', 'UPredis实例内存的监控', 'UPredis实例内存的监控', 'unit');
INSERT INTO `tbl_definition_metric_class` VALUES ('unit_upredis_persistence', 'UPredis实例的压力负载监控', 'UPredis实例的压力负载监控', 'unit');
INSERT INTO `tbl_definition_metric_class` VALUES ('unit_upredis_replication', 'UPredis实例复制信息的监控', 'UPredis实例复制信息的监控', 'unit');
INSERT INTO `tbl_definition_metric_class` VALUES ('unit_upredis_stat', 'UPredis实例的详细监控', 'UPredis实例的详细监控', 'unit');
INSERT INTO `tbl_definition_metric_class` VALUES ('unit_upredis_status', 'UPredis实例状态的监控', 'UPredis实例状态的监控', 'unit');
INSERT INTO `tbl_definition_metric_class` VALUES ('unit_upsql_buffer', 'UPSQL实例的buffer监控', 'UPSQL实例的buffer监控', 'unit');
INSERT INTO `tbl_definition_metric_class` VALUES ('unit_upsql_connection', 'UPSQL实例连接数的监控', 'UPSQL实例连接数的监控', 'unit');
INSERT INTO `tbl_definition_metric_class` VALUES ('unit_upsql_file', 'UPSQL实例文件的监控', 'UPSQL实例文件的监控', 'unit');
INSERT INTO `tbl_definition_metric_class` VALUES ('unit_upsql_fs', 'UPSQL实例所属容器的目录监控', 'UPSQL实例所属容器的目录监控', 'unit');
INSERT INTO `tbl_definition_metric_class` VALUES ('unit_upsql_lock', 'UPSQL实例锁的监控', 'UPSQL实例锁的监控', 'unit');
INSERT INTO `tbl_definition_metric_class` VALUES ('unit_upsql_pressure', 'UPSQL实例的压力负载监控', 'UPSQL实例的压力负载监控', 'unit');
INSERT INTO `tbl_definition_metric_class` VALUES ('unit_upsql_process', 'UPSQL实例的进程监控', 'UPSQL实例的进程监控', 'unit');
INSERT INTO `tbl_definition_metric_class` VALUES ('unit_upsql_replication', 'UPSQL实例的复制监控', 'UPSQL实例的复制监控', 'unit');
INSERT INTO `tbl_definition_metric_class` VALUES ('unit_upsql_status', 'UPSQL实例状态的监控', 'UPSQL实例状态的监控', 'unit');
INSERT INTO `tbl_definition_metric_class` VALUES ('unit_urproxy_connection', 'URproxy实例连接数的监控', 'URproxy实例连接数的监控', 'unit');
INSERT INTO `tbl_definition_metric_class` VALUES ('unit_urproxy_status', 'URproxy实例状态的监控', 'URproxy实例状态的监控', 'unit');

-- ----------------------------
-- Table structure for tbl_definition_metric_type
-- ----------------------------
DROP TABLE IF EXISTS `tbl_definition_metric_type`;
CREATE TABLE `tbl_definition_metric_type` (
  `type_name` varchar(45) DEFAULT NULL,
  `type` varchar(45) NOT NULL,
  `type_metric` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of tbl_definition_metric_type
-- ----------------------------
INSERT INTO `tbl_definition_metric_type` VALUES ('主机监控', 'host', 'host');
INSERT INTO `tbl_definition_metric_type` VALUES ('sentinel监控', 'sentinel', 'unit_sentinel');
INSERT INTO `tbl_definition_metric_type` VALUES ('switch_manager监控', 'switch_manager', 'unit_switch_manager');
INSERT INTO `tbl_definition_metric_type` VALUES ('upproxy监控', 'upproxy', 'unit_upproxy');
INSERT INTO `tbl_definition_metric_type` VALUES ('upredis监控', 'upredis', 'unit_upredis');
INSERT INTO `tbl_definition_metric_type` VALUES ('upsql监控', 'upsql', 'unit_upsql');
INSERT INTO `tbl_definition_metric_type` VALUES ('urproxy监控', 'urproxy', 'unit_urproxy');

-- ----------------------------
-- Table structure for tbl_definition_serv
-- ----------------------------
DROP TABLE IF EXISTS `tbl_definition_serv`;
CREATE TABLE `tbl_definition_serv` (
  `code` varchar(64) NOT NULL COMMENT '主键，服务定义代码',
  `name` varchar(64) NOT NULL COMMENT '服务名称',
  `description` varchar(255) DEFAULT NULL COMMENT '服务图标文件名称',
  `enabled` bit(1) NOT NULL COMMENT '可用',
  PRIMARY KEY (`code`),
  UNIQUE KEY `name_UNIQUE` (`name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='服务定义表';

-- ----------------------------
-- Records of tbl_definition_serv
-- ----------------------------
INSERT INTO `tbl_definition_serv` VALUES ('upredis_urproxy_sentinel', 'upredis_urproxy_sentinel', '', '');
INSERT INTO `tbl_definition_serv` VALUES ('upsql_upproxy_swm', 'upsql_upproxy_swm', ' ', '');

-- ----------------------------
-- Table structure for tbl_definition_subserv
-- ----------------------------
DROP TABLE IF EXISTS `tbl_definition_subserv`;
CREATE TABLE `tbl_definition_subserv` (
  `id` varchar(64) NOT NULL COMMENT '主键，子服务定义ID',
  `definition_serv_code` varchar(64) NOT NULL COMMENT '所属服务定义ID',
  `name` varchar(64) NOT NULL,
  `type` varchar(64) NOT NULL COMMENT '子服务定义名称',
  `description` varchar(255) DEFAULT NULL COMMENT '子服务定义图标',
  `default_data_dir_size` bigint(20) NOT NULL COMMENT '默认数据目录容量',
  `default_data_dir_device_type` varchar(32) NOT NULL COMMENT '默认数据目录设备类型(dictTypeCode=)',
  `default_log_dir_size` bigint(20) NOT NULL COMMENT '默认日志目录容量',
  `default_log_dir_device_type` varchar(32) NOT NULL COMMENT '日志目录设备类型',
  `port_key` varchar(255) NOT NULL,
  `priority` int(11) NOT NULL,
  `canbackup` bit(1) NOT NULL,
  `compose` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='子服务定义表';

-- ----------------------------
-- Records of tbl_definition_subserv
-- ----------------------------
INSERT INTO `tbl_definition_subserv` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_sentinel', 'upredis_urproxy_sentinel', 'sentinel', '', 'UPREDIS高可用模块', '5368709120', 'local_hdd', '5368709120', 'local_hdd', 'port', '3', '\0', '\0');
INSERT INTO `tbl_definition_subserv` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_upredis', 'upredis_urproxy_sentinel', 'upredis', '', 'UPREDIS', '5368709120', 'local_hdd', '5368709120', 'local_hdd', 'port', '1', '', '');
INSERT INTO `tbl_definition_subserv` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_urproxy', 'upredis_urproxy_sentinel', 'urproxy', '', 'UPREDIS代理模块', '5368709120', 'local_hdd', '5368709120', 'local_hdd', 'port', '2', '\0', '\0');
INSERT INTO `tbl_definition_subserv` VALUES ('df_serv_upsql_upproxy_swm_subserv_swm', 'upsql_upproxy_swm', 'switch_manager', '', 'UPSQL高可用模块', '5368709120', 'local_hdd', '5368709120', 'local_hdd', 'Port', '3', '\0', '\0');
INSERT INTO `tbl_definition_subserv` VALUES ('df_serv_upsql_upproxy_swm_subserv_upproxy', 'upsql_upproxy_swm', 'upproxy', '', 'UPSQL代理模块', '5368709120', 'local_hdd', '5368709120', 'local_hdd', 'upsql-proxy::proxy_data_port', '2', '\0', '\0');
INSERT INTO `tbl_definition_subserv` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql', 'upsql_upproxy_swm', 'upsql', 'rds', 'UPSQL', '5368709120', 'local_hdd', '5368709120', 'local_hdd', 'mysqld::port', '1', '', '\0');

-- ----------------------------
-- Table structure for tbl_definition_subserv_arch
-- ----------------------------
DROP TABLE IF EXISTS `tbl_definition_subserv_arch`;
CREATE TABLE `tbl_definition_subserv_arch` (
  `id` varchar(128) NOT NULL COMMENT '主键',
  `definition_subserv_id` varchar(64) NOT NULL COMMENT '所属服务定义ID',
  `name` varchar(64) NOT NULL,
  `code` varchar(64) NOT NULL COMMENT '架构代码',
  `type` varchar(64) NOT NULL,
  `unit_num` int(11) NOT NULL COMMENT '单元数量',
  `sequence` int(11) NOT NULL,
  `high_availability` int(11) NOT NULL COMMENT '高可用指数',
  `consistency` int(11) NOT NULL COMMENT '一致性指数',
  `capability` int(11) NOT NULL COMMENT '性能指标',
  `default` bit(1) NOT NULL,
  `has_standby` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='子服务所属服务表';

-- ----------------------------
-- Records of tbl_definition_subserv_arch
-- ----------------------------
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_sentinel_arch_clone_m3', 'df_serv_upredis_urproxy_sentinel_subserv_sentinel', '三节点', 'M:3', 'clone', '3', '0', '100', '80', '70', '', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_upredis_arch_replication_m1', 'df_serv_upredis_urproxy_sentinel_subserv_upredis', '单节点', 'M:1', 'replication', '1', '0', '90', '70', '60', '', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_upredis_arch_replication_m1s1', 'df_serv_upredis_urproxy_sentinel_subserv_upredis', '主备', 'M:1#S:1', 'replication', '2', '0', '90', '70', '60', '\0', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_upredis_arch_replication_m1s2', 'df_serv_upredis_urproxy_sentinel_subserv_upredis', '1主2从', 'M:1#S:2', 'replication', '3', '4', '90', '70', '60', '\0', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_urproxy_arch_clone_m1', 'df_serv_upredis_urproxy_sentinel_subserv_urproxy', '单节点', 'M:1', 'clone', '1', '1', '100', '80', '70', '', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_urproxy_arch_clone_m10', 'df_serv_upredis_urproxy_sentinel_subserv_urproxy', '十节点', 'M:10', 'clone', '10', '10', '100', '80', '70', '\0', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_urproxy_arch_clone_m2', 'df_serv_upredis_urproxy_sentinel_subserv_urproxy', '双节点', 'M:2', 'clone', '2', '2', '100', '80', '70', '\0', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_urproxy_arch_clone_m3', 'df_serv_upredis_urproxy_sentinel_subserv_urproxy', '三节点', 'M:3', 'clone', '3', '3', '100', '80', '70', '\0', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_urproxy_arch_clone_m4', 'df_serv_upredis_urproxy_sentinel_subserv_urproxy', '四节点', 'M:4', 'clone', '4', '4', '100', '80', '70', '\0', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_urproxy_arch_clone_m5', 'df_serv_upredis_urproxy_sentinel_subserv_urproxy', '五节点', 'M:5', 'clone', '5', '5', '100', '80', '70', '\0', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_urproxy_arch_clone_m6', 'df_serv_upredis_urproxy_sentinel_subserv_urproxy', '六节点', 'M:6', 'clone', '6', '6', '100', '80', '70', '\0', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_urproxy_arch_clone_m7', 'df_serv_upredis_urproxy_sentinel_subserv_urproxy', '七节点', 'M:7', 'clone', '7', '7', '100', '80', '70', '\0', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_urproxy_arch_clone_m8', 'df_serv_upredis_urproxy_sentinel_subserv_urproxy', '八节点', 'M:8', 'clone', '8', '8', '100', '80', '70', '\0', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_urproxy_arch_clone_m9', 'df_serv_upredis_urproxy_sentinel_subserv_urproxy', '九节点', 'M:9', 'clone', '9', '9', '100', '80', '70', '\0', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upsql_upproxy_swm_subserv_swm_arch_clone_m1', 'df_serv_upsql_upproxy_swm_subserv_swm', '单节点', 'M:1', 'clone', '1', '0', '100', '80', '70', '', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upsql_upproxy_swm_subserv_upproxy_arch_clone_m1', 'df_serv_upsql_upproxy_swm_subserv_upproxy', '单节点', 'M:1', 'clone', '1', '1', '100', '80', '70', '', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upsql_upproxy_swm_subserv_upproxy_arch_clone_m10', 'df_serv_upsql_upproxy_swm_subserv_upproxy', '十节点', 'M:10', 'clone', '10', '10', '100', '80', '70', '', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upsql_upproxy_swm_subserv_upproxy_arch_clone_m2', 'df_serv_upsql_upproxy_swm_subserv_upproxy', '双节点', 'M:2', 'clone', '2', '2', '100', '80', '70', '\0', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upsql_upproxy_swm_subserv_upproxy_arch_clone_m3', 'df_serv_upsql_upproxy_swm_subserv_upproxy', '三节点', 'M:3', 'clone', '3', '3', '100', '80', '70', '\0', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upsql_upproxy_swm_subserv_upproxy_arch_clone_m4', 'df_serv_upsql_upproxy_swm_subserv_upproxy', '四节点', 'M:4', 'clone', '4', '4', '100', '80', '70', '', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upsql_upproxy_swm_subserv_upproxy_arch_clone_m5', 'df_serv_upsql_upproxy_swm_subserv_upproxy', '五节点', 'M:5', 'clone', '5', '5', '100', '80', '70', '\0', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upsql_upproxy_swm_subserv_upproxy_arch_clone_m6', 'df_serv_upsql_upproxy_swm_subserv_upproxy', '六节点', 'M:6', 'clone', '6', '6', '100', '80', '70', '\0', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upsql_upproxy_swm_subserv_upproxy_arch_clone_m7', 'df_serv_upsql_upproxy_swm_subserv_upproxy', '七节点', 'M:7', 'clone', '7', '7', '100', '80', '70', '', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upsql_upproxy_swm_subserv_upproxy_arch_clone_m8', 'df_serv_upsql_upproxy_swm_subserv_upproxy', '八节点', 'M:8', 'clone', '8', '8', '100', '80', '70', '\0', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upsql_upproxy_swm_subserv_upproxy_arch_clone_m9', 'df_serv_upsql_upproxy_swm_subserv_upproxy', '九节点', 'M:9', 'clone', '9', '9', '100', '80', '70', '\0', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_arch_replication_m1', 'df_serv_upsql_upproxy_swm_subserv_upsql', '单节点', 'M:1', 'replication', '1', '1', '100', '80', '70', '\0', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_arch_replication_m1sb1', 'df_serv_upsql_upproxy_swm_subserv_upsql', '主备', 'M:1#SB:1', 'replication', '2', '2', '100', '80', '70', '', '\0');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_arch_replication_m1sb1s1', 'df_serv_upsql_upproxy_swm_subserv_upsql', '主备1从', 'M:1#SB:1#S:1', 'replication', '3', '3', '100', '80', '70', '\0', '');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_arch_replication_m1sb1s2', 'df_serv_upsql_upproxy_swm_subserv_upsql', '主备2从', 'M:1#SB:1#S:2', 'replication', '4', '4', '100', '80', '70', '\0', '');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_arch_replication_m1sb1s3', 'df_serv_upsql_upproxy_swm_subserv_upsql', '主备3从', 'M:1#SB:1#S:3', 'replication', '5', '5', '100', '80', '70', '\0', '');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_arch_replication_m1sb1s4', 'df_serv_upsql_upproxy_swm_subserv_upsql', '主备4从', 'M:1#SB:1#S:4', 'replication', '6', '6', '100', '80', '70', '\0', '');
INSERT INTO `tbl_definition_subserv_arch` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_arch_replication_m1sb1s5', 'df_serv_upsql_upproxy_swm_subserv_upsql', '主备5从', 'M:1#SB:1#S:5', 'replication', '7', '7', '100', '80', '70', '\0', '');

-- ----------------------------
-- Table structure for tbl_definition_subserv_relation
-- ----------------------------
DROP TABLE IF EXISTS `tbl_definition_subserv_relation`;
CREATE TABLE `tbl_definition_subserv_relation` (
  `id` varchar(64) NOT NULL COMMENT '主键，子服务关系定义ID',
  `definition_serv_code` varchar(64) NOT NULL COMMENT '所属服务定义ID',
  `from_definition_subserv_name` varchar(64) DEFAULT NULL COMMENT '子服务关系起点',
  `to_definition_subserv_name` varchar(64) DEFAULT NULL COMMENT '子服务关系终点',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='子服务关系定义，用于描述子服务多对多关系';

-- ----------------------------
-- Records of tbl_definition_subserv_relation
-- ----------------------------
INSERT INTO `tbl_definition_subserv_relation` VALUES ('1', 'upsql_upproxy_swm', 'switch_manager', 'upproxy');
INSERT INTO `tbl_definition_subserv_relation` VALUES ('2', 'upsql_upproxy_swm', 'upproxy', 'upsql');
INSERT INTO `tbl_definition_subserv_relation` VALUES ('3', 'upredis_urproxy_sentinel', 'sentinel', 'urproxy');
INSERT INTO `tbl_definition_subserv_relation` VALUES ('4', 'upredis_urproxy_sentinel', 'urproxy', 'upredis');

-- ----------------------------
-- Table structure for tbl_definition_subserv_software
-- ----------------------------
DROP TABLE IF EXISTS `tbl_definition_subserv_software`;
CREATE TABLE `tbl_definition_subserv_software` (
  `id` varchar(64) NOT NULL,
  `definition_subserv_name` varchar(64) NOT NULL COMMENT '所属子服务定义ID',
  `major_version` int(11) NOT NULL COMMENT '主版本号',
  `minor_version` int(11) NOT NULL COMMENT '次版本号'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='子服务软件定义表';

-- ----------------------------
-- Records of tbl_definition_subserv_software
-- ----------------------------
INSERT INTO `tbl_definition_subserv_software` VALUES ('upproxy1.2', 'upproxy', '1', '2');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upsql2.0', 'upsql', '2', '0');
INSERT INTO `tbl_definition_subserv_software` VALUES ('switch_manager2.0', 'switch_manager', '2', '0');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upredis1.2', 'upredis', '1', '2');
INSERT INTO `tbl_definition_subserv_software` VALUES ('urproxy1.1', 'urproxy', '1', '1');
INSERT INTO `tbl_definition_subserv_software` VALUES ('sentinel1.2', 'sentinel', '1', '2');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upproxy2.0', 'upproxy', '2', '0');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upproxy1.4', 'upproxy', '1', '4');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upproxy1.5', 'upproxy', '1', '5');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upproxy2.1', 'upproxy', '2', '1');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upproxy2.2', 'upproxy', '2', '2');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upproxy2.3', 'upproxy', '2', '3');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upproxy1.3', 'upproxy', '1', '3');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upsql2.4', 'upsql', '2', '4');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upsql2.3', 'upsql', '2', '3');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upsql2.2', 'upsql', '2', '2');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upsql2.1', 'upsql', '2', '1');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upsql2.5', 'upsql', '2', '5');
INSERT INTO `tbl_definition_subserv_software` VALUES ('switch_manager2.1', 'switch_manager', '2', '1');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upredis1.3', 'upredis', '1', '3');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upredis1.4', 'upredis', '1', '4');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upredis1.5', 'upredis', '1', '5');
INSERT INTO `tbl_definition_subserv_software` VALUES ('urproxy1.2', 'urproxy', '1', '2');
INSERT INTO `tbl_definition_subserv_software` VALUES ('urproxy1.3', 'urproxy', '1', '3');
INSERT INTO `tbl_definition_subserv_software` VALUES ('urproxy1.4', 'urproxy', '1', '4');
INSERT INTO `tbl_definition_subserv_software` VALUES ('sentinel1.3', 'sentinel', '1', '3');
INSERT INTO `tbl_definition_subserv_software` VALUES ('sentinel1.4', 'sentinel', '1', '4');
INSERT INTO `tbl_definition_subserv_software` VALUES ('sentinel1.5', 'sentinel', '1', '5');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upsql1.0', 'upsql', '1', '0');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upsql1.4', 'upsql', '1', '4');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upsql1.3', 'upsql', '1', '3');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upsql1.2', 'upsql', '1', '2');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upsql1.1', 'upsql', '1', '1');
INSERT INTO `tbl_definition_subserv_software` VALUES ('upsql1.5', 'upsql', '1', '5');

-- ----------------------------
-- Table structure for tbl_definition_subserv_unit_scale
-- ----------------------------
DROP TABLE IF EXISTS `tbl_definition_subserv_unit_scale`;
CREATE TABLE `tbl_definition_subserv_unit_scale` (
  `id` varchar(128) NOT NULL COMMENT '主键',
  `definition_subserv_id` varchar(64) NOT NULL COMMENT '所属子服务定义名称',
  `name` varchar(64) NOT NULL,
  `sequence` int(11) NOT NULL,
  `cpu_num` int(11) NOT NULL COMMENT 'cpu数量',
  `mem_size` bigint(20) NOT NULL COMMENT '内存容量，单位G',
  `io_weight` int(11) NOT NULL COMMENT '磁盘IO权重',
  `default` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='子服务单元规模定义表(使用后禁止修改和删除)';

-- ----------------------------
-- Records of tbl_definition_subserv_unit_scale
-- ----------------------------
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_sentinel_scale_0c0g', 'df_serv_upredis_urproxy_sentinel_subserv_sentinel', '0核0G', '1', '0', '0', '1000', '');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_upredis_scale_0c1g', 'df_serv_upredis_urproxy_sentinel_subserv_upredis', '1G', '0', '0', '1073741824', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_upredis_scale_2c16g', 'df_serv_upredis_urproxy_sentinel_subserv_upredis', '16G', '2', '2', '17179869184', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_upredis_scale_2c24g', 'df_serv_upredis_urproxy_sentinel_subserv_upredis', '24G', '3', '2', '25769803776', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_upredis_scale_2c32g', 'df_serv_upredis_urproxy_sentinel_subserv_upredis', '32G', '4', '2', '34359738368', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_upredis_scale_2c8g', 'df_serv_upredis_urproxy_sentinel_subserv_upredis', '8G', '1', '2', '8589934592', '1000', '');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_urproxy_scale_2c10g', 'df_serv_upredis_urproxy_sentinel_subserv_urproxy', '2核10G', '1', '2', '10737418240', '1000', '');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_urproxy_scale_4c20g', 'df_serv_upredis_urproxy_sentinel_subserv_urproxy', '4核20G', '2', '4', '21474836480', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upredis_urproxy_sentinel_subserv_urproxy_scale_6c30g', 'df_serv_upredis_urproxy_sentinel_subserv_urproxy', '6核30G', '3', '6', '32212254720', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_swm_scale_0c0g', 'df_serv_upsql_upproxy_swm_subserv_swm', '0核0G', '1', '0', '0', '1000', '');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upproxy_scale_2c10g', 'df_serv_upsql_upproxy_swm_subserv_upproxy', '2核10G', '1', '2', '10737418240', '1000', '');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upproxy_scale_4c20g', 'df_serv_upsql_upproxy_swm_subserv_upproxy', '4核20G', '2', '4', '21474836480', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upproxy_scale_6c30g', 'df_serv_upsql_upproxy_swm_subserv_upproxy', '6核30G', '3', '6', '32212254720', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_0c1g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '0核1G', '0', '0', '1073741824', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_10c30g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '10核30G', '17', '10', '32212254720', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_10c40g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '10核40G', '18', '10', '42949672960', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_10c50g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '10核50G', '19', '10', '53687091200', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_10c60g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '10核60G', '20', '10', '64424509440', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_12c36g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '12核36G', '21', '12', '38654705664', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_12c48g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '12核48G', '22', '12', '51539607552', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_12c60g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '12核60G', '23', '12', '64424509440', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_12c72g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '12核72G', '24', '12', '77309411328', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_2c10g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '2核10G', '3', '2', '10737418240', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_2c12g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '2核12G', '4', '2', '12884901888', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_2c6g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '2核6G', '1', '2', '6442450944', '1000', '');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_2c8g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '2核8G', '2', '2', '8589934592', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_4c12g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '4核12G', '5', '4', '12884901888', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_4c16g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '4核16G', '6', '4', '17179869184', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_4c20g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '4核20G', '7', '4', '21474836480', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_4c24g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '4核24G', '8', '4', '25769803776', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_6c18g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '6核18G', '9', '6', '19327352832', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_6c24g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '6核24G', '10', '6', '25769803776', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_6c30g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '6核30G', '11', '6', '32212254720', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_6c36g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '6核36G', '12', '6', '38654705664', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_8c24g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '8核24G', '13', '8', '25769803776', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_8c32g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '8核32G', '14', '8', '34359738368', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_8c40g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '8核40G', '15', '8', '42949672960', '1000', '\0');
INSERT INTO `tbl_definition_subserv_unit_scale` VALUES ('df_serv_upsql_upproxy_swm_subserv_upsql_scale_8c48g', 'df_serv_upsql_upproxy_swm_subserv_upsql', '8核48G', '16', '8', '51539607552', '1000', '\0');

-- ----------------------------
-- Table structure for tbl_definition_subtask_config
-- ----------------------------
DROP TABLE IF EXISTS `tbl_definition_subtask_config`;
CREATE TABLE `tbl_definition_subtask_config` (
  `module` varchar(32) NOT NULL COMMENT '子任务模块',
  `action` varchar(32) NOT NULL COMMENT '子任务动作',
  `timeout` int(11) NOT NULL COMMENT '超时时间，单位毫秒',
  `search_frequency` int(11) NOT NULL COMMENT '查询频率',
  `search_retry_cnt` int(11) NOT NULL COMMENT '查询重试次数',
  `search_retry_interval_time` int(11) NOT NULL COMMENT '查询重试时间间隔',
  PRIMARY KEY (`module`,`action`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='子任务表';

-- ----------------------------
-- Records of tbl_definition_subtask_config
-- ----------------------------
INSERT INTO `tbl_definition_subtask_config` VALUES ('host', 'input', '1800000', '10000', '20', '30000');
INSERT INTO `tbl_definition_subtask_config` VALUES ('software_image', 'create', '1200000', '10000', '20', '30000');
INSERT INTO `tbl_definition_subtask_config` VALUES ('subserv', 'create', '300000', '10000', '20', '30000');
INSERT INTO `tbl_definition_subtask_config` VALUES ('subserv', 'image_update', '300000', '10000', '20', '30000');
INSERT INTO `tbl_definition_subtask_config` VALUES ('subserv', 'link', '300000', '10000', '20', '30000');
INSERT INTO `tbl_definition_subtask_config` VALUES ('subserv', 'scale_up', '300000', '10000', '20', '30000');
INSERT INTO `tbl_definition_subtask_config` VALUES ('subserv', 'start', '300000', '5000', '20', '30000');
INSERT INTO `tbl_definition_subtask_config` VALUES ('subserv', 'stop', '300000', '5000', '20', '30000');
INSERT INTO `tbl_definition_subtask_config` VALUES ('subserv', 'update', '300000', '10000', '20', '30000');
INSERT INTO `tbl_definition_subtask_config` VALUES ('unit', 'add_slave', '300000', '10000', '20', '30000');
INSERT INTO `tbl_definition_subtask_config` VALUES ('unit', 'backup', '82800000', '30000', '20', '30000');
INSERT INTO `tbl_definition_subtask_config` VALUES ('unit', 'link', '300000', '10000', '20', '30000');
INSERT INTO `tbl_definition_subtask_config` VALUES ('unit', 'migrate', '300000', '10000', '20', '30000');
INSERT INTO `tbl_definition_subtask_config` VALUES ('unit', 'rebuild', '300000', '10000', '20', '30000');
INSERT INTO `tbl_definition_subtask_config` VALUES ('unit', 'restore', '82800000', '30000', '20', '30000');
INSERT INTO `tbl_definition_subtask_config` VALUES ('unit', 'start', '300000', '5000', '20', '30000');
INSERT INTO `tbl_definition_subtask_config` VALUES ('unit', 'stop', '300000', '5000', '20', '30000');

-- ----------------------------
-- Table structure for tbl_dict
-- ----------------------------
DROP TABLE IF EXISTS `tbl_dict`;
CREATE TABLE `tbl_dict` (
  `dict_type_code` varchar(32) NOT NULL COMMENT '所属字典类型代码',
  `code` varchar(32) NOT NULL COMMENT '主键',
  `name` varchar(255) NOT NULL COMMENT '名称',
  `sequence` int(11) NOT NULL,
  PRIMARY KEY (`dict_type_code`,`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='字典表';

-- ----------------------------
-- Records of tbl_dict
-- ----------------------------
INSERT INTO `tbl_dict` VALUES ('backup_storage_type', 'nfs', 'NFS', '0');
INSERT INTO `tbl_dict` VALUES ('backup_type', 'full', '全备', '0');
INSERT INTO `tbl_dict` VALUES ('backup_type', 'tables', '导表备份', '0');
INSERT INTO `tbl_dict` VALUES ('character_set', 'gbk', 'GBK', '2');
INSERT INTO `tbl_dict` VALUES ('character_set', 'latin1', 'Latin1', '0');
INSERT INTO `tbl_dict` VALUES ('character_set', 'utf8', 'UTF-8', '1');
INSERT INTO `tbl_dict` VALUES ('data_dir_type', 'local_hdd', '本地硬盘', '1');
INSERT INTO `tbl_dict` VALUES ('data_dir_type', 'local_ssd', '本地固态盘', '2');
INSERT INTO `tbl_dict` VALUES ('data_dir_type', 'san', '外置存储', '3');
INSERT INTO `tbl_dict` VALUES ('data_scope', 'all', '所有数据', '3');
INSERT INTO `tbl_dict` VALUES ('data_scope', 'oneself', '仅本人数据', '1');
INSERT INTO `tbl_dict` VALUES ('host_status', 'disable', '停用', '0');
INSERT INTO `tbl_dict` VALUES ('host_status', 'enable', '启用', '0');
INSERT INTO `tbl_dict` VALUES ('host_status', 'input_no', '未入库', '0');
INSERT INTO `tbl_dict` VALUES ('log_dir_type', 'local_hdd', '本地硬盘', '0');
INSERT INTO `tbl_dict` VALUES ('log_dir_type', 'local_ssd', '本地固态盘', '0');
INSERT INTO `tbl_dict` VALUES ('monitor_alarm', 'switch', 'on', '0');
INSERT INTO `tbl_dict` VALUES ('monitor_threshold', 'host', '80', '0');
INSERT INTO `tbl_dict` VALUES ('network_bandwidth', '0', '无限制', '1');
INSERT INTO `tbl_dict` VALUES ('network_bandwidth', '1000', '1000M', '3');
INSERT INTO `tbl_dict` VALUES ('network_bandwidth', '500', '500M', '2');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'add', '新增', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'add_slave', '加从', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'alarm_disable', '告警停用', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'alarm_enable', '告警开启', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'approve', '审核', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'backup', '备份', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'cancel', '撤销', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'create', '创建', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'deregister', '注销', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'disable', '停用', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'enable', '启用', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'execute', '执行', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'image_update', '版本变更', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'input', '入库', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'intervaltime_update', '更新监控采集间隔', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'isolate', '隔离', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'login', '登录', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'migrate', '迁移', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'output', '出库', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'rebuild', '重建', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'recover', '回切', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'recover_slave', '加从', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'register', '注册', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'remove', '删除', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'reset_pwd', '密码重置', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'restore', '还原', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'scale_up', '扩容', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'start', '启动', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'stop', '停止', '0');
INSERT INTO `tbl_dict` VALUES ('operate_action', 'update', '编辑', '0');
INSERT INTO `tbl_dict` VALUES ('operate_model', 'area', '区域管理', '0');
INSERT INTO `tbl_dict` VALUES ('operate_model', 'backup_storage', '备份存储管理', '0');
INSERT INTO `tbl_dict` VALUES ('operate_model', 'business_subsystem', '业务子系统管理', '0');
INSERT INTO `tbl_dict` VALUES ('operate_model', 'business_system', '业务系统管理', '0');
INSERT INTO `tbl_dict` VALUES ('operate_model', 'cluster', '集群管理', '0');
INSERT INTO `tbl_dict` VALUES ('operate_model', 'dict', '字典管理', '0');
INSERT INTO `tbl_dict` VALUES ('operate_model', 'host', '主机管理', '0');
INSERT INTO `tbl_dict` VALUES ('operate_model', 'login', '登录', '0');
INSERT INTO `tbl_dict` VALUES ('operate_model', 'monitor_event', '事件', '0');
INSERT INTO `tbl_dict` VALUES ('operate_model', 'monitor_metric', '监控', '0');
INSERT INTO `tbl_dict` VALUES ('operate_model', 'networking', '网段管理', '0');
INSERT INTO `tbl_dict` VALUES ('operate_model', 'order', '工单管理', '0');
INSERT INTO `tbl_dict` VALUES ('operate_model', 'rg', 'RG管理', '0');
INSERT INTO `tbl_dict` VALUES ('operate_model', 'san', 'SAN管理', '0');
INSERT INTO `tbl_dict` VALUES ('operate_model', 'serv', '服务管理', '0');
INSERT INTO `tbl_dict` VALUES ('operate_model', 'site', '站点管理', '0');
INSERT INTO `tbl_dict` VALUES ('operate_model', 'software_image', '软件镜像管理', '0');
INSERT INTO `tbl_dict` VALUES ('operate_model', 'subserv_user', '子服务用户管理', '0');
INSERT INTO `tbl_dict` VALUES ('operate_model', 'unit', '单元管理', '0');
INSERT INTO `tbl_dict` VALUES ('order_status', 'approved', '审批通过', '0');
INSERT INTO `tbl_dict` VALUES ('order_status', 'executed', '已执行', '0');
INSERT INTO `tbl_dict` VALUES ('order_status', 'unapprove', '审批拒绝', '0');
INSERT INTO `tbl_dict` VALUES ('order_status', 'unapproved', '未审批', '0');
INSERT INTO `tbl_dict` VALUES ('region', 'BJ', '北京', '0');
INSERT INTO `tbl_dict` VALUES ('region', 'SH', '上海', '0');
INSERT INTO `tbl_dict` VALUES ('serv_status', 'critical', 'critical', '0');
INSERT INTO `tbl_dict` VALUES ('serv_status', 'passing', 'passing', '0');
INSERT INTO `tbl_dict` VALUES ('serv_status', 'unknown', '未知', '0');
INSERT INTO `tbl_dict` VALUES ('serv_status', 'warning', 'warning', '0');
INSERT INTO `tbl_dict` VALUES ('serv_user_auth_type', 'dbpm', 'DBPM验证', '2');
INSERT INTO `tbl_dict` VALUES ('serv_user_auth_type', 'password', '密码验证', '1');
INSERT INTO `tbl_dict` VALUES ('serv_user_model', 'read_only', '只读从库', '2');
INSERT INTO `tbl_dict` VALUES ('serv_user_model', 'rw', '读写主库', '1');
INSERT INTO `tbl_dict` VALUES ('serv_user_model', 'rw_split', '读写分离', '3');
INSERT INTO `tbl_dict` VALUES ('status_enabled', 'false', '否', '0');
INSERT INTO `tbl_dict` VALUES ('status_enabled', 'true', '是', '0');
INSERT INTO `tbl_dict` VALUES ('status_hs', 'critical', '异常', '0');
INSERT INTO `tbl_dict` VALUES ('status_hs', 'passing', '正常', '0');
INSERT INTO `tbl_dict` VALUES ('status_hs', 'warning', '告警', '0');
INSERT INTO `tbl_dict` VALUES ('status_mgm', 'critical', '异常', '0');
INSERT INTO `tbl_dict` VALUES ('status_mgm', 'passing', '正常', '0');
INSERT INTO `tbl_dict` VALUES ('status_mgm', 'warning', '告警', '0');
INSERT INTO `tbl_dict` VALUES ('storage_type', 'local_hdd', '本地硬盘', '0');
INSERT INTO `tbl_dict` VALUES ('storage_type', 'local_ssd', '本地固态盘', '0');
INSERT INTO `tbl_dict` VALUES ('storage_type', 'san', '外置存储', '0');
INSERT INTO `tbl_dict` VALUES ('strategy_type', 'auto', '自动分配', '0');
INSERT INTO `tbl_dict` VALUES ('strategy_type', 'manual', '指定主机', '1');
INSERT INTO `tbl_dict` VALUES ('subserv_status', 'critical', 'critical', '0');
INSERT INTO `tbl_dict` VALUES ('subserv_status', 'passing', 'passing', '0');
INSERT INTO `tbl_dict` VALUES ('subserv_status', 'unknown', '未知', '0');
INSERT INTO `tbl_dict` VALUES ('subserv_status', 'warning', 'warning', '0');
INSERT INTO `tbl_dict` VALUES ('task_action_type', 'add_slave', '加从', '0');
INSERT INTO `tbl_dict` VALUES ('task_action_type', 'backup', '备份', '0');
INSERT INTO `tbl_dict` VALUES ('task_action_type', 'create', '创建', '0');
INSERT INTO `tbl_dict` VALUES ('task_action_type', 'disable', '停用', '0');
INSERT INTO `tbl_dict` VALUES ('task_action_type', 'enable', '启用', '0');
INSERT INTO `tbl_dict` VALUES ('task_action_type', 'image_update', '版本变更', '0');
INSERT INTO `tbl_dict` VALUES ('task_action_type', 'input', '入库', '0');
INSERT INTO `tbl_dict` VALUES ('task_action_type', 'isolate', '隔离', '0');
INSERT INTO `tbl_dict` VALUES ('task_action_type', 'migrate', '迁移', '0');
INSERT INTO `tbl_dict` VALUES ('task_action_type', 'output', '出库', '0');
INSERT INTO `tbl_dict` VALUES ('task_action_type', 'rebuild', '重建', '0');
INSERT INTO `tbl_dict` VALUES ('task_action_type', 'recover', '回切', '0');
INSERT INTO `tbl_dict` VALUES ('task_action_type', 'recover_slave', '加从回切', '0');
INSERT INTO `tbl_dict` VALUES ('task_action_type', 'remove', '删除', '0');
INSERT INTO `tbl_dict` VALUES ('task_action_type', 'restore', '还原', '0');
INSERT INTO `tbl_dict` VALUES ('task_action_type', 'scale_up', '扩容', '0');
INSERT INTO `tbl_dict` VALUES ('task_action_type', 'start', '启动', '0');
INSERT INTO `tbl_dict` VALUES ('task_action_type', 'stop', '停止', '0');
INSERT INTO `tbl_dict` VALUES ('task_obj_type', 'host', '主机', '0');
INSERT INTO `tbl_dict` VALUES ('task_obj_type', 'serv', '服务', '0');
INSERT INTO `tbl_dict` VALUES ('task_obj_type', 'software_image', '软件镜像', '0');
INSERT INTO `tbl_dict` VALUES ('task_obj_type', 'unit', '单元', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'add_slave_failure', '加从失败', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'add_slave_running', '加从中', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'add_slave_success', '加从成功', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'backup_failure', '备份失败', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'backup_running', '备份中', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'backup_success', '备份成功', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'create_failure', '创建失败', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'create_running', '创建中', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'create_success', '创建成功', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'disable_failure', '停用失败', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'disable_running', '停用中', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'disable_success', '停用成功', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'enable_failure', '启用失败', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'enable_running', '启用中', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'enable_success', '启用成功', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'image_update_failure', '版本变更失败', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'image_update_running', '版本变更中', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'image_update_success', '版本变更成功', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'input_failure', '入库失败', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'input_running', '入库中', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'input_success', '入库成功', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'isolate_failure', '隔离失败', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'isolate_running', '隔离中', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'isolate_success', '隔离成功', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'migrate_failure', '迁移失败', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'migrate_running', '迁移中', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'migrate_success', '迁移成功', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'output_failure', '出库失败', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'output_running', '出库中', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'output_success', '出库成功', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'rebuild_failure', '重建失败', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'rebuild_running', '重建中', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'rebuild_success', '重建成功', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'recover_failure', '回切失败', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'recover_running', '回切中', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'recover_slave_failure', '加从回切失败', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'recover_slave_running', '加从回切中', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'recover_slave_success', '加从回切成功', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'recover_success', '回切成功', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'remove_failure', '删除失败', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'remove_running', '删除中', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'remove_success', '删除成功', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'restore_failure', '还原失败', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'restore_running', '还原中', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'restore_success', '还原成功', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'scale_up_failure', '扩容失败', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'scale_up_running', '扩容中', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'scale_up_success', '扩容成功', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'start_failure', '启动失败', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'start_running', '启动中', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'start_success', '启动成功', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'stop_failure', '停止失败', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'stop_running', '停止中', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'stop_success', '停止成功', '0');
INSERT INTO `tbl_dict` VALUES ('task_status', 'unknown', '未知', '0');
INSERT INTO `tbl_dict` VALUES ('unit_status', 'critical', 'critical', '0');
INSERT INTO `tbl_dict` VALUES ('unit_status', 'passing', 'passing', '0');
INSERT INTO `tbl_dict` VALUES ('unit_status', 'unknown', '未知', '0');

-- ----------------------------
-- Table structure for tbl_dict_type
-- ----------------------------
DROP TABLE IF EXISTS `tbl_dict_type`;
CREATE TABLE `tbl_dict_type` (
  `code` varchar(32) NOT NULL,
  `name` varchar(16) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_dict_type
-- ----------------------------
INSERT INTO `tbl_dict_type` VALUES ('backup_storage_type', '备份存储类型');
INSERT INTO `tbl_dict_type` VALUES ('backup_type', '备份类型');
INSERT INTO `tbl_dict_type` VALUES ('character_set', '字符集');
INSERT INTO `tbl_dict_type` VALUES ('data_dir_type', '数据目录类型');
INSERT INTO `tbl_dict_type` VALUES ('data_scope', '数据范围');
INSERT INTO `tbl_dict_type` VALUES ('host_status', '主机状态');
INSERT INTO `tbl_dict_type` VALUES ('log_dir_type', '日志目录类型');
INSERT INTO `tbl_dict_type` VALUES ('monitor_alarm', '告警开关');
INSERT INTO `tbl_dict_type` VALUES ('monitor_threshold', '监控阀值');
INSERT INTO `tbl_dict_type` VALUES ('network_bandwidth', '网络带宽');
INSERT INTO `tbl_dict_type` VALUES ('operate_action', '操作动作');
INSERT INTO `tbl_dict_type` VALUES ('operate_model', '操作模块');
INSERT INTO `tbl_dict_type` VALUES ('order_status', '订单状态');
INSERT INTO `tbl_dict_type` VALUES ('region', '地域');
INSERT INTO `tbl_dict_type` VALUES ('serv_status', '服务状态');
INSERT INTO `tbl_dict_type` VALUES ('serv_user_auth_type', '用户验证方式');
INSERT INTO `tbl_dict_type` VALUES ('serv_user_model', '用户模式');
INSERT INTO `tbl_dict_type` VALUES ('status_enabled', '启用状态');
INSERT INTO `tbl_dict_type` VALUES ('status_hs', 'hs状态');
INSERT INTO `tbl_dict_type` VALUES ('status_mgm', 'mgm状态');
INSERT INTO `tbl_dict_type` VALUES ('storage_type', '存储类型');
INSERT INTO `tbl_dict_type` VALUES ('strategy_type', '迁移/重建策略');
INSERT INTO `tbl_dict_type` VALUES ('subserv_status', '子服务状态');
INSERT INTO `tbl_dict_type` VALUES ('task_action_type', '任务动作类型');
INSERT INTO `tbl_dict_type` VALUES ('task_obj_type', '任务对象类型');
INSERT INTO `tbl_dict_type` VALUES ('task_status', '任务状态');
INSERT INTO `tbl_dict_type` VALUES ('unit_status', '子服务单元状态');

-- ----------------------------
-- Table structure for tbl_host
-- ----------------------------
DROP TABLE IF EXISTS `tbl_host`;
CREATE TABLE `tbl_host` (
  `id` varchar(32) NOT NULL COMMENT '主键，主机ID',
  `cluster_id` varchar(32) NOT NULL COMMENT '所属集群ID',
  `name` varchar(64) NOT NULL COMMENT '主机名称',
  `ssh_ip` varchar(15) NOT NULL COMMENT 'ssh登陆IP地址',
  `ssh_user` varchar(64) NOT NULL COMMENT 'ssh登陆用户',
  `ssh_password` varchar(32) NOT NULL COMMENT 'ssh登陆密码',
  `port` int(11) NOT NULL,
  `room` varchar(64) NOT NULL COMMENT '所在机房',
  `seat` varchar(64) NOT NULL COMMENT '所在机位',
  `max_container` int(11) NOT NULL COMMENT '主机上可容纳最大容器的数量',
  `hdd_dev` varchar(64) DEFAULT NULL COMMENT '机械磁盘设备名',
  `ssd_dev` varchar(64) DEFAULT NULL COMMENT '固态磁盘设备名',
  `san_id` varchar(32) DEFAULT NULL COMMENT '所链SAN存储ID',
  `relate_id` varchar(64) DEFAULT NULL COMMENT '关联ID, 由于事务处理需要所以可以为空',
  `status` varchar(64) NOT NULL,
  `description` varchar(256) DEFAULT NULL COMMENT '区域描述',
  `create_datetime` datetime NOT NULL COMMENT '创建时间',
  `create_user_login_name` varchar(32) NOT NULL COMMENT '创建者',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unite_unique_index` (`cluster_id`,`name`,`ssh_ip`) USING BTREE,
  UNIQUE KEY `relate_id_UNIQUE` (`relate_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='主集表';

-- ----------------------------
-- Records of tbl_host
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_menu
-- ----------------------------
DROP TABLE IF EXISTS `tbl_menu`;
CREATE TABLE `tbl_menu` (
  `code` varchar(32) NOT NULL COMMENT '菜单代码',
  `name` varchar(16) NOT NULL COMMENT '菜单名称',
  `sequence` int(11) NOT NULL COMMENT '显示优先级',
  `level` int(11) NOT NULL COMMENT '菜单级别\n0	1级菜单\n1	2级菜单\n以此类推',
  `icon` varchar(64) DEFAULT NULL COMMENT '菜单图标文件名称',
  `action` varchar(255) DEFAULT NULL COMMENT '菜单动作，存放跳转到页面文件名称',
  `parent_code` varchar(32) NOT NULL COMMENT '父菜单代码',
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='菜单表';

-- ----------------------------
-- Records of tbl_menu
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_menu_resource
-- ----------------------------
DROP TABLE IF EXISTS `tbl_menu_resource`;
CREATE TABLE `tbl_menu_resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键，菜单资源ID',
  `menu_code` varchar(32) NOT NULL COMMENT '所属菜单代码',
  `control_type` varchar(16) NOT NULL COMMENT '控件类型',
  `control_id` varchar(32) NOT NULL COMMENT '控件ID',
  `control_name` varchar(16) DEFAULT NULL COMMENT '控件名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='菜单资源表';

-- ----------------------------
-- Records of tbl_menu_resource
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_monitor_event
-- ----------------------------
DROP TABLE IF EXISTS `tbl_monitor_event`;
CREATE TABLE `tbl_monitor_event` (
  `id` varchar(128) NOT NULL,
  `level` varchar(16) NOT NULL COMMENT '事件的级别(critical,warning,normal,info)',
  `value` varchar(128) NOT NULL COMMENT '某个级别采集的值(0-10,critical,passing....)',
  `alarm` bit(1) NOT NULL COMMENT '级别是否需要告警(0代表不是告警;1代表告警)',
  `send` bit(1) NOT NULL COMMENT '是否发送告警(0.没有发送的告警;1.发送的告警)',
  `send_timestap` timestamp NULL DEFAULT NULL,
  `create_timestamp` timestamp NOT NULL COMMENT '事件产生的时间(时间戳)',
  `metric` varchar(128) NOT NULL COMMENT '监控项的名称',
  `obj` varchar(128) NOT NULL COMMENT '对象的名称（主机,容器,实例）',
  `obj_type` varchar(16) NOT NULL COMMENT '监控的对象的类型（host,container,unit[unit_mysql,unit_redis,....]）',
  `obj_host_relate_id` varchar(128) DEFAULT NULL COMMENT '对象所属的主机名称',
  `obj_owner` varchar(64) DEFAULT NULL,
  `business_system_id` varchar(128) DEFAULT NULL,
  `business_subsystem_id` varchar(128) DEFAULT NULL,
  `serv_id` varchar(128) DEFAULT NULL,
  `cluster_id` varchar(128) DEFAULT NULL,
  `site_id` varchar(128) DEFAULT NULL,
  `area_id` varchar(128) DEFAULT NULL,
  `auto_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`auto_id`),
  UNIQUE KEY `UNIQUE_INDEX_id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=180352 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_monitor_event
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_monitor_resource
-- ----------------------------
DROP TABLE IF EXISTS `tbl_monitor_resource`;
CREATE TABLE `tbl_monitor_resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `site_id` varchar(32) NOT NULL,
  `host_cnt` int(11) NOT NULL,
  `container_cnt` int(11) NOT NULL,
  `serv_cnt` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5301 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_monitor_resource
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_networking
-- ----------------------------
DROP TABLE IF EXISTS `tbl_networking`;
CREATE TABLE `tbl_networking` (
  `id` varchar(32) NOT NULL COMMENT '主键，网段ID',
  `site_id` varchar(32) NOT NULL COMMENT '所属集群',
  `name` varchar(64) NOT NULL COMMENT '网段名称',
  `start_ip` varchar(15) NOT NULL COMMENT '起始IP地址',
  `end_ip` varchar(15) NOT NULL COMMENT '结束IP地址',
  `vlan_id` int(11) NOT NULL COMMENT '标记vlanID',
  `prefix` int(11) NOT NULL COMMENT 'IP 掩码，0～32',
  `gateway` varchar(15) NOT NULL COMMENT '网关IP',
  `enabled` bit(1) NOT NULL DEFAULT b'1' COMMENT '0:停用\n1:启用',
  `description` varchar(256) DEFAULT NULL COMMENT '区域描述',
  `create_datetime` datetime NOT NULL COMMENT '创建时间',
  `create_user_login_name` varchar(32) NOT NULL COMMENT '创建者',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='网段表';

-- ----------------------------
-- Records of tbl_networking
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_operate_log
-- ----------------------------
DROP TABLE IF EXISTS `tbl_operate_log`;
CREATE TABLE `tbl_operate_log` (
  `id` varchar(32) NOT NULL COMMENT '主键，操作日志ID',
  `model_name` varchar(32) DEFAULT NULL COMMENT '操作模块名称',
  `action` varchar(32) NOT NULL COMMENT '操作动作',
  `obj_id` varchar(32) NOT NULL COMMENT '操作对象ID',
  `obj_name` varchar(64) NOT NULL COMMENT '操作对象名称',
  `create_datetime` datetime NOT NULL COMMENT '创建时间',
  `create_user_login_name` varchar(32) NOT NULL COMMENT '创建者',
  `auto_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`auto_id`),
  UNIQUE KEY `UNIQUE_INDEX_id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10655 DEFAULT CHARSET=utf8 COMMENT='操作日志表';

-- ----------------------------
-- Records of tbl_operate_log
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_order
-- ----------------------------
DROP TABLE IF EXISTS `tbl_order`;
CREATE TABLE `tbl_order` (
  `id` varchar(32) NOT NULL COMMENT '主键，订单ID',
  `definition_serv_code` varchar(64) NOT NULL COMMENT '所属服务定义ID',
  `serv_name` varchar(64) NOT NULL,
  `no` int(11) DEFAULT NULL,
  `area_id` varchar(32) NOT NULL COMMENT '所属区域ID',
  `type` varchar(16) NOT NULL COMMENT '订单类型',
  `status` varchar(16) NOT NULL COMMENT '订单状态',
  `msg` varchar(255) DEFAULT NULL,
  `owner` varchar(255) NOT NULL,
  `sharding` bit(1) NOT NULL,
  `associate_order_id` varchar(32) DEFAULT NULL COMMENT '关联订单ID',
  `create_datetime` datetime NOT NULL COMMENT '创建时间',
  `create_user_login_name` varchar(32) NOT NULL COMMENT '创建者',
  PRIMARY KEY (`id`),
  KEY `definition_serv_id_INDEX` (`definition_serv_code`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单表';

-- ----------------------------
-- Records of tbl_order
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_port
-- ----------------------------
DROP TABLE IF EXISTS `tbl_port`;
CREATE TABLE `tbl_port` (
  `id` varchar(32) NOT NULL,
  `site_id` varchar(32) NOT NULL,
  `port_value` int(11) NOT NULL COMMENT '主键，网段ID',
  `enabled` bit(1) NOT NULL,
  `used` bit(1) NOT NULL COMMENT '网段名称',
  `subserv_id` varchar(32) DEFAULT NULL,
  `create_datetime` datetime NOT NULL COMMENT '创建时间',
  `create_user_login_name` varchar(32) NOT NULL COMMENT '创建者',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_INDEX_subserv_id` (`subserv_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='端口表';

-- ----------------------------
-- Records of tbl_port
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_privilege
-- ----------------------------
DROP TABLE IF EXISTS `tbl_privilege`;
CREATE TABLE `tbl_privilege` (
  `code` varchar(64) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `enabled` bit(1) NOT NULL,
  `sequence` int(11) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of tbl_privilege
-- ----------------------------
INSERT INTO `tbl_privilege` VALUES ('ALTER', 'ALTER', '', '5');
INSERT INTO `tbl_privilege` VALUES ('ALTER ROUTINE', 'ALTER ROUTINE', '', '11');
INSERT INTO `tbl_privilege` VALUES ('CREATE', 'CREATE', '', '7');
INSERT INTO `tbl_privilege` VALUES ('CREATE ROUTINE', 'CREATE ROUTINE', '', '10');
INSERT INTO `tbl_privilege` VALUES ('CREATE TEMPORARY TABLES', 'CREATE TEMPORARY TABLES', '', '99');
INSERT INTO `tbl_privilege` VALUES ('CREATE USER', 'CREATE USER', '\0', '99');
INSERT INTO `tbl_privilege` VALUES ('CREATE VIEW', 'CREATE VIEW', '\0', '99');
INSERT INTO `tbl_privilege` VALUES ('DELETE', 'DELETE', '', '4');
INSERT INTO `tbl_privilege` VALUES ('DROP', 'DROP', '', '8');
INSERT INTO `tbl_privilege` VALUES ('EVENT', 'EVENT', '', '99');
INSERT INTO `tbl_privilege` VALUES ('EXECUTE', 'EXECUTE', '', '6');
INSERT INTO `tbl_privilege` VALUES ('FILE', 'FILE', '\0', '99');
INSERT INTO `tbl_privilege` VALUES ('GRANT OPTION', 'GRANT OPTION', '\0', '99');
INSERT INTO `tbl_privilege` VALUES ('INDEX', 'INDEX', '', '9');
INSERT INTO `tbl_privilege` VALUES ('INSERT', 'INSERT', '', '3');
INSERT INTO `tbl_privilege` VALUES ('LOCK TABLES', 'LOCK TABLES', '\0', '99');
INSERT INTO `tbl_privilege` VALUES ('PROCESS', 'PROCESS', '', '99');
INSERT INTO `tbl_privilege` VALUES ('REFERENCES', 'REFERENCES', '', '99');
INSERT INTO `tbl_privilege` VALUES ('REPLICATION SLAVE', 'REPLICATION SLAVE', '\0', '99');
INSERT INTO `tbl_privilege` VALUES ('SELECT', 'SELECT', '', '1');
INSERT INTO `tbl_privilege` VALUES ('SHOW DATABASES', 'SHOW DATABASES', '\0', '99');
INSERT INTO `tbl_privilege` VALUES ('SHOW VIEW', 'SHOW VIEW', '\0', '99');
INSERT INTO `tbl_privilege` VALUES ('SHUTDOWN', 'SHUTDOWN', '\0', '99');
INSERT INTO `tbl_privilege` VALUES ('SUPER', 'SUPER', '\0', '99');
INSERT INTO `tbl_privilege` VALUES ('TRIGGER', 'TRIGGER', '\0', '99');
INSERT INTO `tbl_privilege` VALUES ('UPDATE', 'UPDATE', '', '2');

-- ----------------------------
-- Table structure for tbl_san
-- ----------------------------
DROP TABLE IF EXISTS `tbl_san`;
CREATE TABLE `tbl_san` (
  `id` varchar(32) NOT NULL COMMENT '主键，SAN存储ID',
  `site_id` varchar(32) NOT NULL COMMENT '所属站点ID',
  `name` varchar(16) NOT NULL COMMENT 'SAN存储名称',
  `relate_id` varchar(64) DEFAULT NULL COMMENT '关联ID, 由于事务处理需要所以可以为空',
  `description` varchar(256) DEFAULT NULL COMMENT '区域描述',
  `san_vendor_id` varchar(64) NOT NULL,
  `create_datetime` datetime NOT NULL COMMENT '创建时间',
  `create_user_login_name` varchar(32) NOT NULL COMMENT '创建者',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='SAN存储表';

-- ----------------------------
-- Records of tbl_san
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_san_vendor
-- ----------------------------
DROP TABLE IF EXISTS `tbl_san_vendor`;
CREATE TABLE `tbl_san_vendor` (
  `id` varchar(64) NOT NULL,
  `code` varchar(64) NOT NULL,
  `name` varchar(255) NOT NULL,
  `version` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_san_vendor
-- ----------------------------
INSERT INTO `tbl_san_vendor` VALUES ('HITACHI_G600', 'HITACHI', '日立', 'G600');

-- ----------------------------
-- Table structure for tbl_serv
-- ----------------------------
DROP TABLE IF EXISTS `tbl_serv`;
CREATE TABLE `tbl_serv` (
  `id` varchar(32) NOT NULL COMMENT '主键，服务ID',
  `order_id` varchar(32) NOT NULL,
  `serv_name` varchar(128) NOT NULL,
  `create_success_flg` bit(1) NOT NULL DEFAULT b'0',
  `create_datetime` datetime NOT NULL,
  `create_user_login_name` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_INDEX_id` (`id`) USING BTREE,
  UNIQUE KEY `UNIQUE_INDEX_order_id` (`order_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='服务表';

-- ----------------------------
-- Records of tbl_serv
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_site
-- ----------------------------
DROP TABLE IF EXISTS `tbl_site`;
CREATE TABLE `tbl_site` (
  `id` varchar(32) NOT NULL COMMENT '主键，站点ID',
  `name` varchar(16) NOT NULL COMMENT '站点名称',
  `region_code` varchar(16) NOT NULL COMMENT '所属地域编码',
  `consul_ips` varchar(255) NOT NULL COMMENT 'consul集群地址，多个地址用“;”间隔\n例如：192.168.100.1;192.168.100.2',
  `consul_port` int(11) NOT NULL COMMENT 'consul集群端口',
  `consul_token` varchar(255) DEFAULT NULL COMMENT 'consul通讯令牌，用于安全认证，可以为空',
  `mgm_ca` varchar(255) DEFAULT NULL COMMENT '资源管理服务（mgm）认证证书，用于安全认证，可以为空',
  `horus_server_ca` varchar(255) DEFAULT NULL COMMENT '监控管理服务（horus server）认证证书，用于安全认证，可以为空',
  `mgm_prefix` varchar(128) NOT NULL COMMENT '资源管理过滤条件，用于从consul过滤查询服务信息使用',
  `horus_server_prefix` varchar(128) NOT NULL COMMENT '监控管理过滤条件，用于从consul过滤查询服务信息使用',
  `create_datetime` datetime NOT NULL COMMENT '创建时间',
  `create_user_login_name` varchar(32) NOT NULL COMMENT '创建者',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='站点表';

-- ----------------------------
-- Records of tbl_site
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_subcombo
-- ----------------------------
DROP TABLE IF EXISTS `tbl_subcombo`;
CREATE TABLE `tbl_subcombo` (
  `id` varchar(32) NOT NULL,
  `definition_subserv_arch_id` varchar(128) NOT NULL,
  `definition_subserv_unit_scale_id` varchar(128) NOT NULL,
  `data_dir_size` bigint(20) NOT NULL COMMENT '默认数据目录容量',
  `data_dir_device_type` varchar(32) CHARACTER SET utf8 NOT NULL COMMENT '默认数据目录设备类型(dictTypeCode=)',
  `log_dir_size` bigint(20) NOT NULL COMMENT '默认日志目录容量',
  `log_dir_device_type` varchar(32) CHARACTER SET utf8 NOT NULL COMMENT '日志目录设备类型',
  `network_bandwidth` int(11) DEFAULT NULL,
  `mixed` bit(1) NOT NULL,
  `high_available` bit(1) NOT NULL,
  `combo_id` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of tbl_subcombo
-- ----------------------------
INSERT INTO `tbl_subcombo` VALUES ('001', 'df_serv_upsql_upproxy_swm_subserv_upsql_arch_replication_m1', 'df_serv_upsql_upproxy_swm_subserv_upsql_scale_2c12g', '107374182400', 'local_hdd', '64424509440', 'local_hdd', '0', '', '\0', 'upsql_upproxy_swm_m1_2c12g');
INSERT INTO `tbl_subcombo` VALUES ('002', 'df_serv_upsql_upproxy_swm_subserv_upproxy_arch_clone_m1', 'df_serv_upsql_upproxy_swm_subserv_upproxy_scale_2c10g', '1073741824', 'local_hdd', '9663676416', 'local_hdd', '0', '', '\0', 'upsql_upproxy_swm_m1_2c12g');
INSERT INTO `tbl_subcombo` VALUES ('003', 'df_serv_upsql_upproxy_swm_subserv_swm_arch_clone_m1', 'df_serv_upsql_upproxy_swm_subserv_swm_scale_0c0g', '1073741824', 'local_hdd', '9663676416', 'local_hdd', '0', '', '\0', 'upsql_upproxy_swm_m1_2c12g');
INSERT INTO `tbl_subcombo` VALUES ('004', 'df_serv_upsql_upproxy_swm_subserv_upsql_arch_replication_m1', 'df_serv_upsql_upproxy_swm_subserv_upsql_scale_4c24g', '214748364800', 'local_hdd', '64424509440', 'local_hdd', '0', '', '\0', 'upsql_upproxy_swm_m1_4c24g');
INSERT INTO `tbl_subcombo` VALUES ('005', 'df_serv_upsql_upproxy_swm_subserv_upproxy_arch_clone_m1', 'df_serv_upsql_upproxy_swm_subserv_upproxy_scale_2c10g', '1073741824', 'local_hdd', '9663676416', 'local_hdd', '0', '', '\0', 'upsql_upproxy_swm_m1_4c24g');
INSERT INTO `tbl_subcombo` VALUES ('006', 'df_serv_upsql_upproxy_swm_subserv_swm_arch_clone_m1', 'df_serv_upsql_upproxy_swm_subserv_swm_scale_0c0g', '1073741824', 'local_hdd', '9663676416', 'local_hdd', '0', '', '\0', 'upsql_upproxy_swm_m1_4c24g');
INSERT INTO `tbl_subcombo` VALUES ('007', 'df_serv_upsql_upproxy_swm_subserv_upsql_arch_replication_m1sb1', 'df_serv_upsql_upproxy_swm_subserv_upsql_scale_2c12g', '107374182400', 'local_hdd', '64424509440', 'local_hdd', '0', '', '\0', 'upsql_upproxy_swm_m1sb1_2c12g');
INSERT INTO `tbl_subcombo` VALUES ('008', 'df_serv_upsql_upproxy_swm_subserv_upproxy_arch_clone_m2', 'df_serv_upsql_upproxy_swm_subserv_upproxy_scale_2c10g', '1073741824', 'local_hdd', '9663676416', 'local_hdd', '0', '', '\0', 'upsql_upproxy_swm_m1sb1_2c12g');
INSERT INTO `tbl_subcombo` VALUES ('009', 'df_serv_upsql_upproxy_swm_subserv_swm_arch_clone_m1', 'df_serv_upsql_upproxy_swm_subserv_swm_scale_0c0g', '1073741824', 'local_hdd', '9663676416', 'local_hdd', '0', '', '\0', 'upsql_upproxy_swm_m1sb1_2c12g');
INSERT INTO `tbl_subcombo` VALUES ('010', 'df_serv_upsql_upproxy_swm_subserv_upsql_arch_replication_m1sb1', 'df_serv_upsql_upproxy_swm_subserv_upsql_scale_4c24g', '214748364800', 'local_hdd', '64424509440', 'local_hdd', '0', '', '\0', 'upsql_upproxy_swm_m1sb1_4c24g');
INSERT INTO `tbl_subcombo` VALUES ('011', 'df_serv_upsql_upproxy_swm_subserv_upproxy_arch_clone_m2', 'df_serv_upsql_upproxy_swm_subserv_upproxy_scale_2c10g', '1073741824', 'local_hdd', '9663676416', 'local_hdd', '0', '', '\0', 'upsql_upproxy_swm_m1sb1_4c24g');
INSERT INTO `tbl_subcombo` VALUES ('012', 'df_serv_upsql_upproxy_swm_subserv_swm_arch_clone_m1', 'df_serv_upsql_upproxy_swm_subserv_swm_scale_0c0g', '1073741824', 'local_hdd', '9663676416', 'local_hdd', '0', '', '\0', 'upsql_upproxy_swm_m1sb1_4c24g');
INSERT INTO `tbl_subcombo` VALUES ('013', 'df_serv_upsql_upproxy_swm_subserv_upsql_arch_replication_m1sb1s1', 'df_serv_upsql_upproxy_swm_subserv_upsql_scale_2c12g', '107374182400', 'local_hdd', '64424509440', 'local_hdd', '0', '', '\0', 'upsql_upproxy_swm_m1sb1s1_2c12g');
INSERT INTO `tbl_subcombo` VALUES ('014', 'df_serv_upsql_upproxy_swm_subserv_upproxy_arch_clone_m2', 'df_serv_upsql_upproxy_swm_subserv_upproxy_scale_2c10g', '1073741824', 'local_hdd', '9663676416', 'local_hdd', '0', '', '\0', 'upsql_upproxy_swm_m1sb1s1_2c12g');
INSERT INTO `tbl_subcombo` VALUES ('015', 'df_serv_upsql_upproxy_swm_subserv_swm_arch_clone_m1', 'df_serv_upsql_upproxy_swm_subserv_swm_scale_0c0g', '1073741824', 'local_hdd', '9663676416', 'local_hdd', '0', '', '\0', 'upsql_upproxy_swm_m1sb1s1_2c12g');
INSERT INTO `tbl_subcombo` VALUES ('016', 'df_serv_upsql_upproxy_swm_subserv_upsql_arch_replication_m1sb1s1', 'df_serv_upsql_upproxy_swm_subserv_upsql_scale_4c24g', '214748364800', 'local_hdd', '64424509440', 'local_hdd', '0', '', '\0', 'upsql_upproxy_swm_m1sb1s1_4c24g');
INSERT INTO `tbl_subcombo` VALUES ('017', 'df_serv_upsql_upproxy_swm_subserv_upproxy_arch_clone_m3', 'df_serv_upsql_upproxy_swm_subserv_upproxy_scale_2c10g', '1073741824', 'local_hdd', '9663676416', 'local_hdd', '0', '', '\0', 'upsql_upproxy_swm_m1sb1s1_4c24g');
INSERT INTO `tbl_subcombo` VALUES ('018', 'df_serv_upsql_upproxy_swm_subserv_swm_arch_clone_m1', 'df_serv_upsql_upproxy_swm_subserv_swm_scale_0c0g', '1073741824', 'local_hdd', '9663676416', 'local_hdd', '0', '', '\0', 'upsql_upproxy_swm_m1sb1s1_4c24g');
INSERT INTO `tbl_subcombo` VALUES ('019', 'df_serv_upredis_urproxy_sentinel_subserv_upredis_arch_replication_m1', 'df_serv_upredis_urproxy_sentinel_subserv_upredis_scale_2c8g', '25769803776', 'local_hdd', '10737418240', 'local_hdd', '0', '', '\0', 'upredis_urproxy_sentinel_m1_2c8g');
INSERT INTO `tbl_subcombo` VALUES ('020', 'df_serv_upredis_urproxy_sentinel_subserv_urproxy_arch_clone_m2', 'df_serv_upredis_urproxy_sentinel_subserv_urproxy_scale_2c10g', '1073741824', 'local_hdd', '9663676416', 'local_hdd', '0', '', '\0', 'upredis_urproxy_sentinel_m1_2c8g');
INSERT INTO `tbl_subcombo` VALUES ('021', 'df_serv_upredis_urproxy_sentinel_subserv_sentinel_arch_clone_m3', 'df_serv_upredis_urproxy_sentinel_subserv_sentinel_scale_0c0g', '1073741824', 'local_hdd', '9663676416', 'local_hdd', '0', '', '\0', 'upredis_urproxy_sentinel_m1_2c8g');
INSERT INTO `tbl_subcombo` VALUES ('022', 'df_serv_upredis_urproxy_sentinel_subserv_upredis_arch_replication_m1', 'df_serv_upredis_urproxy_sentinel_subserv_upredis_scale_2c16g', '51539607552', 'local_hdd', '10737418240', 'local_hdd', '0', '', '\0', 'upredis_urproxy_sentinel_m1_2c16g');
INSERT INTO `tbl_subcombo` VALUES ('023', 'df_serv_upredis_urproxy_sentinel_subserv_urproxy_arch_clone_m2', 'df_serv_upredis_urproxy_sentinel_subserv_urproxy_scale_2c10g', '1073741824', 'local_hdd', '9663676416', 'local_hdd', '0', '', '\0', 'upredis_urproxy_sentinel_m1_2c16g');
INSERT INTO `tbl_subcombo` VALUES ('024', 'df_serv_upredis_urproxy_sentinel_subserv_sentinel_arch_clone_m3', 'df_serv_upredis_urproxy_sentinel_subserv_sentinel_scale_0c0g', '1073741824', 'local_hdd', '9663676416', 'local_hdd', '0', '', '\0', 'upredis_urproxy_sentinel_m1_2c16g');
INSERT INTO `tbl_subcombo` VALUES ('025', 'df_serv_upredis_urproxy_sentinel_subserv_upredis_arch_replication_m1s1', 'df_serv_upredis_urproxy_sentinel_subserv_upredis_scale_2c8g', '25769803776', 'local_hdd', '10737418240', 'local_hdd', '0', '', '\0', 'upredis_urproxy_sentinel_m1s1_2c8g');
INSERT INTO `tbl_subcombo` VALUES ('026', 'df_serv_upredis_urproxy_sentinel_subserv_urproxy_arch_clone_m2', 'df_serv_upredis_urproxy_sentinel_subserv_urproxy_scale_2c10g', '1073741824', 'local_hdd', '9663676416', 'local_hdd', '0', '', '\0', 'upredis_urproxy_sentinel_m1s1_2c8g');
INSERT INTO `tbl_subcombo` VALUES ('027', 'df_serv_upredis_urproxy_sentinel_subserv_sentinel_arch_clone_m3', 'df_serv_upredis_urproxy_sentinel_subserv_sentinel_scale_0c0g', '1073741824', 'local_hdd', '9663676416', 'local_hdd', '0', '', '\0', 'upredis_urproxy_sentinel_m1s1_2c8g');
INSERT INTO `tbl_subcombo` VALUES ('028', 'df_serv_upredis_urproxy_sentinel_subserv_upredis_arch_replication_m1s1', 'df_serv_upredis_urproxy_sentinel_subserv_upredis_scale_2c16g', '51539607552', 'local_hdd', '10737418240', 'local_hdd', '0', '', '\0', 'upredis_urproxy_sentinel_m1s1_2c16g');
INSERT INTO `tbl_subcombo` VALUES ('029', 'df_serv_upredis_urproxy_sentinel_subserv_urproxy_arch_clone_m2', 'df_serv_upredis_urproxy_sentinel_subserv_urproxy_scale_2c10g', '1073741824', 'local_hdd', '9663676416', 'local_hdd', '0', '', '\0', 'upredis_urproxy_sentinel_m1s1_2c16g');
INSERT INTO `tbl_subcombo` VALUES ('030', 'df_serv_upredis_urproxy_sentinel_subserv_sentinel_arch_clone_m3', 'df_serv_upredis_urproxy_sentinel_subserv_sentinel_scale_0c0g', '1073741824', 'local_hdd', '9663676416', 'local_hdd', '0', '', '\0', 'upredis_urproxy_sentinel_m1s1_2c16g');

-- ----------------------------
-- Table structure for tbl_suborder
-- ----------------------------
DROP TABLE IF EXISTS `tbl_suborder`;
CREATE TABLE `tbl_suborder` (
  `id` varchar(32) NOT NULL COMMENT '主键，子订单ID',
  `definition_subserv_id` varchar(64) NOT NULL,
  `subserv_software_image_id` varchar(32) NOT NULL COMMENT '所用子服务软件镜像ID\n用于获取子服务定义ID，子服务软件主版本，子服务软件镜像fix版本',
  `definition_subserv_arch_id` varchar(128) NOT NULL,
  `definition_subserv_unit_scale_id` varchar(128) NOT NULL,
  `network_bandwidth` int(11) NOT NULL,
  `data_dir_size` bigint(20) NOT NULL COMMENT '数据目录容量，单位G',
  `data_dir_device_type` varchar(32) NOT NULL COMMENT '数据目录设备类型',
  `log_dir_size` bigint(20) NOT NULL COMMENT '日志目录容量，单位G',
  `log_dir_device_type` varchar(32) NOT NULL COMMENT '日志目录设备类型',
  `mixed` bit(1) NOT NULL,
  `high_available` bit(1) NOT NULL,
  `associate_suborder_id` varchar(32) DEFAULT NULL,
  `order_id` varchar(32) NOT NULL COMMENT '所属订单ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='子订单表';

-- ----------------------------
-- Records of tbl_suborder
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_subserv
-- ----------------------------
DROP TABLE IF EXISTS `tbl_subserv`;
CREATE TABLE `tbl_subserv` (
  `id` varchar(32) NOT NULL COMMENT '主机',
  `serv_id` varchar(32) NOT NULL COMMENT '所属服务ID',
  `relate_id` varchar(32) DEFAULT NULL COMMENT '关联ID, 由于事务处理需要所以可以为空',
  `suborder_id` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_INDEX_id` (`id`) USING BTREE,
  UNIQUE KEY `UNIQUE_INDEX_suborder_id` (`suborder_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='子服务表';

-- ----------------------------
-- Records of tbl_subserv
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_subserv_config
-- ----------------------------
DROP TABLE IF EXISTS `tbl_subserv_config`;
CREATE TABLE `tbl_subserv_config` (
  `id` varchar(32) NOT NULL,
  `serv_id` varchar(32) NOT NULL,
  `subserv_type` varchar(32) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of tbl_subserv_config
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_subserv_software_image
-- ----------------------------
DROP TABLE IF EXISTS `tbl_subserv_software_image`;
CREATE TABLE `tbl_subserv_software_image` (
  `id` varchar(32) NOT NULL COMMENT '主键',
  `definition_subserv_software_id` varchar(64) NOT NULL COMMENT '所属子服务定义ID',
  `patch_version` int(11) NOT NULL COMMENT '修订版本号',
  `build_version` int(11) NOT NULL,
  `site_id` varchar(32) NOT NULL COMMENT '所属站点ID',
  `relate_id` varchar(64) DEFAULT NULL COMMENT '关联ID, 由于事务处理需要所以可以为空',
  `enabled` bit(1) NOT NULL DEFAULT b'1' COMMENT '是否可用\n0	fasle\n1	true',
  `description` varchar(256) DEFAULT NULL COMMENT '区域描述',
  `create_datetime` datetime NOT NULL COMMENT '创建时间',
  `create_user_login_name` varchar(32) NOT NULL COMMENT '创建者',
  PRIMARY KEY (`id`),
  UNIQUE KEY `relate_id_UNIQUE` (`relate_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_subserv_software_image
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_subtask
-- ----------------------------
DROP TABLE IF EXISTS `tbl_subtask`;
CREATE TABLE `tbl_subtask` (
  `id` varchar(32) NOT NULL COMMENT '主键，子任务ID',
  `obj_type` varchar(32) NOT NULL COMMENT '操作对象类型',
  `obj_id` varchar(32) NOT NULL COMMENT '操作对象ID',
  `obj_name` varchar(64) NOT NULL,
  `action_type` varchar(32) NOT NULL COMMENT '操作动作类型',
  `async` bit(1) NOT NULL,
  `timeout` int(11) NOT NULL,
  `start_datetime` datetime DEFAULT NULL COMMENT '开始时间',
  `end_datetime` datetime DEFAULT NULL COMMENT '结束时间',
  `status` varchar(32) NOT NULL COMMENT '子任务状态',
  `url` varchar(255) DEFAULT NULL,
  `method_type` varchar(32) NOT NULL,
  `param` text,
  `relate_task_id` varchar(64) DEFAULT NULL COMMENT '关联任务编码',
  `relate_task_status` int(11) DEFAULT NULL COMMENT '关联任务状态',
  `relate_task_msg` text COMMENT '子任务执行信息',
  `priority` int(11) NOT NULL COMMENT '优先级',
  `task_id` varchar(32) NOT NULL COMMENT '所属任务ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='子任务表';

-- ----------------------------
-- Records of tbl_subtask
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_sys_config
-- ----------------------------
DROP TABLE IF EXISTS `tbl_sys_config`;
CREATE TABLE `tbl_sys_config` (
  `alert_udp_ip` varchar(16) NOT NULL,
  `alert_udp_port` varchar(16) NOT NULL,
  PRIMARY KEY (`alert_udp_ip`,`alert_udp_port`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of tbl_sys_config
-- ----------------------------
INSERT INTO `tbl_sys_config` VALUES ('144.0.32.56', '20166');

-- ----------------------------
-- Table structure for tbl_task
-- ----------------------------
DROP TABLE IF EXISTS `tbl_task`;
CREATE TABLE `tbl_task` (
  `id` varchar(32) NOT NULL COMMENT '主键，任务ID',
  `site_id` varchar(32) NOT NULL,
  `obj_type` varchar(32) NOT NULL COMMENT '操作对象类型',
  `obj_id` varchar(32) NOT NULL COMMENT '操作对象ID',
  `obj_name` varchar(64) DEFAULT NULL,
  `action_type` varchar(32) NOT NULL COMMENT '操作动作类型',
  `start_datetime` datetime NOT NULL COMMENT '开始时间',
  `end_datetime` datetime DEFAULT NULL COMMENT '结束时间',
  `status` varchar(32) NOT NULL DEFAULT '' COMMENT '任务状态',
  `msg` text COMMENT '任务执行信息',
  `owner` varchar(32) NOT NULL,
  `operate_log_id` varchar(32) DEFAULT NULL COMMENT '执行任务的操作日志ID，可获取操作日志信息',
  `create_user_login_name` varchar(32) NOT NULL COMMENT '创建者',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_INDEX_id` (`id`) USING BTREE,
  KEY `NORMAL_INDEX_obj_id` (`obj_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='任务表';

-- ----------------------------
-- Records of tbl_task
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_unit
-- ----------------------------
DROP TABLE IF EXISTS `tbl_unit`;
CREATE TABLE `tbl_unit` (
  `id` varchar(32) NOT NULL,
  `relate_id` varchar(64) DEFAULT NULL COMMENT '关联ID, 由于事务处理需要所以可以为空',
  `relate_name` varchar(64) DEFAULT NULL,
  `subserv_id` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_INDEX_id` (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_unit
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_user
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE `tbl_user` (
  `username` varchar(32) NOT NULL COMMENT '用户名',
  `password` varchar(32) DEFAULT NULL COMMENT '密码(SSO认证时，不需要此密码)',
  `name` varchar(32) DEFAULT NULL COMMENT '姓名',
  `telephone` varchar(255) DEFAULT NULL COMMENT '电话号码',
  `email` varchar(32) DEFAULT NULL COMMENT '电子邮箱',
  `company` varchar(255) DEFAULT NULL COMMENT '所属单位',
  `user_group_id` varchar(32) DEFAULT NULL COMMENT '组编码',
  `user_role_code` varchar(32) NOT NULL COMMENT '角色代码',
  `enabled` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否有效',
  `auth_type` varchar(64) NOT NULL COMMENT '认证方式，分为本地认证和SSO认真',
  `auto_approve` bit(1) NOT NULL COMMENT '自动审批',
  `alternate_contact` varchar(32) DEFAULT NULL COMMENT '备用联系人',
  `alternate_contact_telephone` varchar(255) DEFAULT NULL COMMENT '备用联系人电话',
  `tag` varchar(255) DEFAULT NULL COMMENT '保留字段',
  `create_datetime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of tbl_user
-- ----------------------------
INSERT INTO `tbl_user` VALUES ('admin', '670b14728ad9902aecba32e22fa4f6bd', '管理员', '13800000000', 'admin@email.com', '信息中心', '1d557a34fd9342cea5e9ebeb21fb4454', 'admin', '', 'native', '\0', null, null, null, '2017-10-12 09:32:57');
INSERT INTO `tbl_user` VALUES ('user', '670b14728ad9902aecba32e22fa4f6bd', '用户一', '13800000002', 'user@email.com', '信息中心', '1d557a34fd9342cea5e9ebeb21fb4454', 'tenant', '', 'native', '\0', null, null, null, '2017-10-12 09:32:57');

-- ----------------------------
-- Table structure for tbl_user_group
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user_group`;
CREATE TABLE `tbl_user_group` (
  `id` varchar(32) NOT NULL,
  `name` varchar(32) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `area_id` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户组别表';

-- ----------------------------
-- Records of tbl_user_group
-- ----------------------------
INSERT INTO `tbl_user_group` VALUES ('1d557a34fd9342cea5e9ebeb21fb4454', '组别一', null, null);

-- ----------------------------
-- Table structure for tbl_user_role
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user_role`;
CREATE TABLE `tbl_user_role` (
  `code` varchar(32) NOT NULL COMMENT '主键，角色代码',
  `name` varchar(16) NOT NULL COMMENT '角色名称',
  `level` int(11) NOT NULL COMMENT '角色级别\n值越小级别越高，级别高的用户可以级别低的用户进行授权',
  `data_scope` varchar(64) NOT NULL,
  `description` varchar(256) DEFAULT NULL COMMENT '角色描述',
  PRIMARY KEY (`code`),
  UNIQUE KEY `name_UNIQUE` (`name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户角色表';

-- ----------------------------
-- Records of tbl_user_role
-- ----------------------------
INSERT INTO `tbl_user_role` VALUES ('admin', '管理员', '1', 'all', null);
INSERT INTO `tbl_user_role` VALUES ('tenant', '租户', '2', 'oneself', null);
