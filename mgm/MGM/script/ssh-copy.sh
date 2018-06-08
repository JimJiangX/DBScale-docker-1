if [ ! -e .ssh/id_rsa.pub ]; then
	ssh-keygen -t rsa
fi

ssh-copy-id -i $HOME/.ssh/id_rsa.pub root@{{getv "/docker/reg/ip"}}
