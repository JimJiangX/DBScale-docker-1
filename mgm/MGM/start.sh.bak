#/bin/bash
set -o nounset

base_dir=<BASE_DIR>
# 本地主机IP地址
ip={{getv "/local/ip"}}

# 服务端口号
port=20152

# 本地consul agent 端口号
consul_port=8301
# 数据库IP地址
db_host={{getv "/mysql/ip"}}

# 数据库端口号
db_port=3306

# 用户名密码加密密钥
# echo -n "<username>:<password>" | openssl base64
db_auth=`echo -n "{{getv "/mysql/user"}}:{{getv "/mysql/pass"}}" | openssl base64`

# 数据库名称
db_name={{getv "/mgm/db/name"}}

# 分配策略
strategy=spread_v2

# 表名前缀
table_prefix=tbl

# 最大数据库空闲链接数
db_max_idle=10

# consul数据键名称
key={{getv "/consul/key"}}

# plugin server 地址:端口
configure_addr=${ip}:20155

# 
consul_dc={{getv "/consul/datacenter"}}


export CONSUL_HTTP_DATACENTER=${consul_dc}

# start mgm-plugin
nohup $base_dir/bin/mgm-plugin --debug cfg -H ${configure_addr} --script=./script/plugin/compose/ --mgmIP ${ip} --mgmPort ${port} consul://${ip}:${consul_port}/${key} > $base_dir/logs/mgm-plugin.log 2>&1 &

nohup $base_dir/bin/mgm --debug manage --cluster-driver garden --cluster-opt swarm.overcommit=0  --strategy ${strategy} --dbHost ${db_host} --dbPort ${db_port} --dbName ${db_name} --dbAuth ${db_auth} --dbTablePrefix ${table_prefix} --dbMaxIdle ${db_max_idle}  --replication --replication-ttl 20s -H ${ip}:${port} --advertise ${ip}:${port} --configureAddr ${configure_addr}  consul://${ip}:${consul_port}/${key} > $base_dir/logs/mgm.log 2>&1 &
