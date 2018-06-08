{
  "protocol": 3,
  "bootstrap_expect": 3,
  "server": true,
  "datacenter": "$DC",
  "ui_dir": "/etc/consul-server/ui",
  "data_dir": "/etc/consul-server/data",
  "node_name": "<HOSTNAME>",
  "disable_update_check": true,
  "log_level": "INFO",
  "addresses": {
    "http": ""
  },
  "start_join": [
    "$S1","$S2","$S3" 
 ]
}
