#! /bin/bash
set -e
rm -f /usr/local/apache2/logs/httpd.pid
/usr/sbin/httpd -DFOREGROUND
