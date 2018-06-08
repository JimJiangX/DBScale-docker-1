FROM  registry.access.redhat.com/rhel:7.4-164
LABEL maintainer="yum Docker Maintainer "dongliheng@bsgchina.com"" \
      name="dbscale_yum-agent" \
      version="3.4.3" \
      summary="yum:3.4.3 image in docker"
ADD local.repo  /etc/yum.repos.d/local.repo  
RUN yum -y install httpd createrepo &&\
    mkdir /var/www/html/rhel
EXPOSE 80
VOLUME /var/www/html/rhel/
ADD start.sh /usr/bin/start 
CMD /usr/bin/start
