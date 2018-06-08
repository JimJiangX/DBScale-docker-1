#!/bin/bash
wget https://github.com/kelseyhightower/confd/releases/download/v0.16.0/confd-0.16.0-linux-amd64
mv confd-0.16.0-linux-amd64 /usr/bin/confd
chmod +x /usr/bin/confd
export PATH="$PATH:/usr/bin"
echo "export PATH=$PATH:/usr/bin" >> /etc/profile
source /etc/profile
confd -version
