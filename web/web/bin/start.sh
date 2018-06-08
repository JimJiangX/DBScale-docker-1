#! /bin/bash
/usr/bin/confd -onetime -backend env
sleep 3
env
sleep 3
cd /WEB
ls
jar -cvfM0 upm_dao-0.0.1-SNAPSHOT.jar /WEB/upm_dao
sleep 3
mv /WEB/upm_dao-0.0.1-SNAPSHOT.jar  /WEB/upcdb_manager/WEB-INF/lib/upm_dao-0.0.1-SNAPSHOT.jar
jar -cfM0 upcdb_manager.war -C /WEB/upcdb_manager/ .
sleep 3
mv upcdb_manager.war  /usr/share/tomcat/webapps/
rm  -rf /WEB/upm_dao
rm  -rf /WEB/upcdb_manager
ls /WEB
sleep 3
mkdir -p /upm_log
chown tomcat.tomcat /upm_log
sleep 1
/usr/lib/jvm/jre/bin/java -classpath /usr/share/tomcat/bin/bootstrap.jar:/usr/share/tomcat/bin/tomcat-juli.jar:/usr/share/java/commons-daemon.jar -Dcatalina.base=/usr/share/tomcat -Dcatalina.home=/usr/share/tomcat -Djava.endorsed.dirs= -Djava.io.tmpdir=/var/cache/tomcat/temp -Djava.util.logging.config.file=/usr/share/tomcat/conf/logging.properties -Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager org.apache.catalina.startup.Bootstrap start

