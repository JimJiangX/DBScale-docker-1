FROM registry.access.redhat.com/rhel:7.4-164
LABEL   maintainer="Couchbase Docker Maintainer "zonxun@bsgchina.com"" \
        name="dbscale_couchbase" \
        version="v1.0.2" \
        summary="Couchbase:v1.0.2 images in docker"


# Proxy settings if necessary
# ENV http_proxy=http://proxy:8080
# ENV https_proxy=http://proxy:8080
# ENV no_proxy="127.0.0.1,localhost,.mydomain.com"
# Update system
#RUN yum -y update
# Install Couchbase
USER root
ENV CB_VERSION 2.2.0
ENV CB_USER=couchbase
ENV CB_ADMIN_PASS=222222
 
COPY rhel7-211.repo /etc/yum.repos.d/
CMD  /usr/sbin/init
RUN  yum -y --skip-broken install openssl hostname initscripts pkgconfig tar wget couchbase-server
WORKDIR /
COPY confd-0.16.0-linux-amd64 /
RUN mv confd-0.16.0-linux-amd64 confd && chmod +x confd && ./confd -version
USER $CB_USER
#COPY confd /etc/confd
#RUN ./confd -onetime -backend env
# Set default command
EXPOSE 8091 8092 11209 11210 11211
CMD /opt/couchbase/bin/couchbase-server start -- -noinput
