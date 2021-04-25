run_nginx:
	docker run --rm -v $$HOME/projects/twitch/request-status:/usr/share/nginx/html:ro -p 80:80 nginx
