FROM registry.access.redhat.com/rhel:7.4-164

# Proxy settings if necessary
# ENV http_proxy=http://proxy:8080
# ENV https_proxy=http://proxy:8080
# ENV no_proxy="127.0.0.1,localhost,.mydomain.com"
# Update system
#RUN yum -y update
# Install Couchbase
USER root
ENV CB_VERSION 2.2.0
ENV CB_USER couchbase
RUN rm -rf /etc/yum.repos.d/*
COPY rhel7-211.repo /etc/yum.repos.d/
RUN  yum clean all && yum repolist

WORKDIR /
copy SetENV.sh /
CMD  sh /SetENV.sh
copy confd-0.16.0-linux-amd64 /
RUN mv confd-0.16.0-linux-amd64 confd && chmod +x confd && ./confd -version
RUN yum -y install http://packages.couchbase.com/releases/${CB_VERSION}/couchbase-server-community_${CB_VERSION}_x86_64.rpm
USER $CB_USER
COPY run.sh /

COPY confd /
RUN ./confd -confdir=/confd/ -config-file=/confd/confd.toml

# Set default command
CMD /run.sh
EXPOSE 8091 8092 11209 11210 11211
