-- MySQL dump 10.13  Distrib 5.7.17, for Linux (x86_64)
--
-- Host: localhost    Database: horus
-- ------------------------------------------------------
-- Server version	5.7.17-upsql-2.0.0-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- Table structure for table `tb_agent`
--

DROP TABLE IF EXISTS `tb_agent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_agent` (
  `id` varchar(128) NOT NULL COMMENT '随机生成id',
  `ip_addr` varchar(45) NOT NULL COMMENT '连接主机的ip地址',
  `port` varchar(45) NOT NULL DEFAULT '8123' COMMENT 'horus-agent的端口号',
  `check_type` varchar(45) NOT NULL COMMENT 'horus-agent的检查方式\ncheck \nhealth \nkv',
  `enable` tinyint(1) NOT NULL COMMENT 'agent的状态\n1	启用\n0	停用',
  `register_at` datetime DEFAULT NULL COMMENT '注册时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_cleanup`
--

DROP TABLE IF EXISTS `tb_cleanup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_cleanup` (
  `id` varchar(128) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `time` tinyint(16) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_component`
--

DROP TABLE IF EXISTS `tb_component`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_component` (
  `id` varchar(128) NOT NULL COMMENT '随机生成的id',
  `name` varchar(128) NOT NULL COMMENT '组件名字',
  `host_name` varchar(128) NOT NULL COMMENT '所属主机名称',
  `tag` varchar(128) NOT NULL,
  `type` varchar(128) NOT NULL,
  `check_type` varchar(128) NOT NULL,
  `register_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_container`
--

DROP TABLE IF EXISTS `tb_container`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_container` (
  `id` varchar(128) NOT NULL COMMENT '随机生成的id',
  `host_id` varchar(128) NOT NULL COMMENT '所属主机ID',
  `name` varchar(128) NOT NULL COMMENT '容器名字',
  `metric_class` varchar(45) NOT NULL COMMENT '监控项类别',
  `interval_time` int(11) NOT NULL DEFAULT '60' COMMENT '采样间隔时间 单位秒 s',
  `script_file` varchar(45) NOT NULL COMMENT '执行脚本文件路径',
  `exec_args` varchar(128) DEFAULT NULL COMMENT '执行脚本参数',
  `enable` tinyint(4) NOT NULL COMMENT '是否启用\n0	停用\n1	启用',
  `register_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_event`
--

DROP TABLE IF EXISTS `tb_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_event` (
  `id` varchar(128) NOT NULL,
  `level` varchar(128) NOT NULL,
  `value` varchar(128) NOT NULL,
  `alarm` tinyint(4) NOT NULL,
  `send` tinyint(4) NOT NULL,
  `createstamp` bigint(64) NOT NULL,
  `metric` varchar(128) NOT NULL,
  `obj_name` varchar(128) NOT NULL,
  `obj_type` varchar(128) NOT NULL,
  `obj_container_name` varchar(128) NOT NULL,
  `obj_host_name` varchar(128) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_host`
--

DROP TABLE IF EXISTS `tb_host`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_host` (
  `id` varchar(128) NOT NULL,
  `agent_id` varchar(128) NOT NULL COMMENT '所属agent ID',
  `name` varchar(128) NOT NULL COMMENT '主机名字,唯一标识符',
  `metric_class` varchar(45) NOT NULL COMMENT '监控项类别',
  `interval_time` int(11) NOT NULL DEFAULT '60' COMMENT '采样间隔时间 单位秒 s',
  `script_file` varchar(45) NOT NULL COMMENT '执行脚本文件路径',
  `exec_args` varchar(128) DEFAULT NULL COMMENT '执行脚本参数',
  `enable` tinyint(1) NOT NULL COMMENT '是否启用\n0 停用\n1 启用',
  `register_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_metric_event`
--

DROP TABLE IF EXISTS `tb_metric_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_metric_event` (
  `id` varchar(128) NOT NULL COMMENT '主键',
  `metric_id` varchar(128) NOT NULL,
  `level` varchar(45) NOT NULL COMMENT '事件级别,例如:critical,warning,normal,info',
  `enable` tinyint(1) NOT NULL COMMENT '是否启用\n',
  `alarm_enable` tinyint(1) DEFAULT NULL COMMENT '告警是否启用\n1.启用\n0.停用',
  `value_range` varchar(45) DEFAULT NULL COMMENT '触发事件的监控项值的范围',
  `counter` int(11) DEFAULT NULL COMMENT '事件计数值,防止事件风暴,例如:15,为同一监控项同一告警级别在15次之内不重复产生事件',
  `event` tinyint(1) DEFAULT NULL COMMENT 'metric是否需要产生事件\n1.产生事件\n0.不产生事件',
  `event_type` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_metrics`
--

DROP TABLE IF EXISTS `tb_metrics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_metrics` (
  `id` varchar(128) NOT NULL COMMENT '主键',
  `name` varchar(45) NOT NULL COMMENT '监控项名称',
  `metric_object_id` varchar(128) NOT NULL COMMENT '所属监控对象ID',
  `metric_object_type` varchar(45) NOT NULL COMMENT '所属监控对象类型,例如:host,container,component,unit_mysql,unit_redis,unit_couchbase',
  `metric_class` varchar(45) NOT NULL COMMENT '所属监控类别',
  `value_type` varchar(45) NOT NULL COMMENT '监控项值的类型',
  `history` tinyint(4) DEFAULT NULL COMMENT 'metric是否需要历史数据\n1.需要历史数据\n0.不需要历史数据',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_monitor`
--

DROP TABLE IF EXISTS `tb_monitor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_monitor` (
  `id` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL,
  `object_name` varchar(128) DEFAULT NULL,
  `metric` varchar(128) DEFAULT NULL,
  `value` varchar(128) DEFAULT NULL,
  `timestamp` bigint(64) DEFAULT NULL,
  `history` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_object_template`
--

DROP TABLE IF EXISTS `tb_object_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_object_template` (
  `id` varchar(128) NOT NULL COMMENT '自增长id',
  `metric_class` varchar(45) NOT NULL COMMENT '监控项类别',
  `object_type` varchar(45) NOT NULL COMMENT '监控项类别对象类型',
  `interval_time` int(11) DEFAULT '60' COMMENT '脚本采集间隔时间',
  `script_file` varchar(45) NOT NULL COMMENT '脚本文件路径',
  `exec_args` varchar(45) DEFAULT NULL COMMENT '脚本文件需要的参数',
  `enable` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1表示开启\n0表示关闭',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `metric_class_UNIQUE` (`metric_class`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_object_template_metric_event`
--

DROP TABLE IF EXISTS `tb_object_template_metric_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_object_template_metric_event` (
  `id` varchar(128) NOT NULL COMMENT '自增长id',
  `metric_id` varchar(128) NOT NULL COMMENT '监控项id,可以根据这个id查找tb_object_template_metrics表里面的数据',
  `level` varchar(45) NOT NULL COMMENT '监控项级别,例如:critical或者warning等',
  `value_range` varchar(45) DEFAULT NULL COMMENT '级别的范围值,例如:“80-90”',
  `alarm_enable` tinyint(1) DEFAULT '1' COMMENT '告警是否启用\n1.启用\n0停用',
  `counter` varchar(45) DEFAULT NULL COMMENT '事件计数值,防止事件风暴,例如:15,为同一监控项同一告警级别在15次之内不重复产生事件',
  `event` tinyint(1) DEFAULT '1' COMMENT '是否产生事件\n1产生事件\n0不产生事件',
  `event_type` varchar(45) DEFAULT NULL COMMENT '事件类型,data_type或string_type',
  `event_level_enable` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_object_template_metrics`
--

DROP TABLE IF EXISTS `tb_object_template_metrics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_object_template_metrics` (
  `id` varchar(128) NOT NULL COMMENT '自增长id',
  `metric` varchar(45) NOT NULL COMMENT '监控项',
  `metric_class_id` varchar(128) NOT NULL COMMENT '监控项类别id,可以根据这个id去查找tb_object_template表中的数据',
  `value_type` varchar(45) NOT NULL COMMENT '监控项采集值的类型,例如:是data_type或者string_type',
  `history` tinyint(1) NOT NULL COMMENT 'metric是否需要历史数据\n1.需要历史数据\n0.不需要历史数据',
  PRIMARY KEY (`id`),
  UNIQUE KEY `metric_UNIQUE` (`metric`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_unit`
--

DROP TABLE IF EXISTS `tb_unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_unit` (
  `id` varchar(128) NOT NULL COMMENT '随机生成的id',
  `container_id` varchar(128) NOT NULL COMMENT '所属容器ID',
  `name` varchar(128) NOT NULL COMMENT '服务单元名称',
  `metric_class` varchar(45) NOT NULL COMMENT '监控项类别',
  `interval_time` int(11) NOT NULL DEFAULT '60' COMMENT '脚本采集的间隔时间,单位s',
  `mon_user` varchar(45) DEFAULT NULL COMMENT '监控用户名，可以为空',
  `mon_pwd` varchar(45) DEFAULT NULL COMMENT '监控用户密码，可以为空',
  `script_file` varchar(128) NOT NULL COMMENT '执行脚本的文件路径',
  `exec_args` varchar(128) DEFAULT NULL COMMENT '执行脚本的参数',
  `enable` tinyint(4) NOT NULL COMMENT '是否启用\n0 停用\n1 启用',
  `type` varchar(45) NOT NULL,
  `tag` varchar(128) NOT NULL,
  `register_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-15 14:38:49
