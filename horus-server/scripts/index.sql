CREATE PRIMARY INDEX `#primary` ON `compress` USING GSI
CREATE PRIMARY INDEX `#primary` ON `monitor` USING GSI
CREATE INDEX `monitorindex` ON `monitor`(`endpoint`,`metric`,`timestamp`,`value`,`tags`,`history`)

