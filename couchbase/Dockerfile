FROM registry.access.redhat.com/rhel:7.4-164
LABEL   maintainer="Couchbase Docker Maintainer "zonxun@bsgchina.com"" \
        name="dbscale_couchbase" \
        version="v1.0.2" \
        summary="Couchbase:v1.0.2 images in docker"

ENV CB_VERSION 2.2.0
ENV CB_USER=couchbase
ENV CB_ADMIN_PASS=222222
 
USER root
WORKDIR /COUCHBASE
EXPOSE 8091 8092 11209 11210 11211

COPY local.repo /etc/yum.repos.d/

CMD  /usr/sbin/init
RUN  yum clean all && \
     yum repolist  && \
     yum -y --skip-broken install openssl hostname initscripts pkgconfig tar wget couchbase-server

ADD confd-0.16.0-linux-amd64 /COUCHBASE/
RUN mv /COUCHBASE/confd-0.16.0-linux-amd64 /usr/bin/confd
ADD confd /etc/confd
ADD couchbase.confd.sh /COUCHBASE/bin/couchbase.confd.sh
#CMD /COUCHBASE/bin/couchbase.confd.sh
CMD /opt/couchbase/bin/couchbase-server start -- -noinput
