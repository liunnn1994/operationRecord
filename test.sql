SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `test`;
CREATE TABLE `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL DEFAULT '' COMMENT '上报人',
  `ip` varchar(255) NOT NULL DEFAULT '' COMMENT '上报IP',
  `date` varchar(255) NOT NULL DEFAULT '' COMMENT '日期',
  `dataFile` varchar(255) NOT NULL DEFAULT '' COMMENT '数据文件',
  `msg` varchar(255) NOT NULL DEFAULT '' COMMENT '留言',
  `emotion` char(20) NOT NULL DEFAULT '' COMMENT '留言的情绪',
  `isReport` char(10) NOT NULL DEFAULT '' COMMENT '是否人为上报',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

BEGIN;
INSERT INTO `test` VALUES ('1', 'admin', '0.0.0.0', '1970-01-01', '','','0','0');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
