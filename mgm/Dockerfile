FROM  registry.access.redhat.com/rhel:7.4-164
# RedHat 官方image
ADD local.repo  /etc/yum.repos.d/local.repo  
# 本地yum源，如果网络良好可以考虑网络yum源
ENV CA_CRT=$(sed -n '1h;1!H;${g;s/\n/\\n/g;p;}' ../ca-create/cert/registry.dbscale.me.crt
RUN  yum -y install openssl  nfs-utils mysql
ADD  MGM /MGM	
ADD bin/confd /usr/bin/confd
RUN mkdir /etc/confd/;mkdir /etc/consul
ADD conf.d  /etc/confd/conf.d
ADD templates  /etc/confd/templates
ADD start   /usr/bin/start 
EXPOSE 8500
EXPOSE 8301
CMD /usr/bin/start
