# grafana2ntfy
is a Grafana to notify translation layer.

the url grafana2ntfy is posted to is the channel to be used in ntfy.
```
grafana2ntfy_instance/channel_test -> ntfyinstance_instance/channel_test
```

can be run in docker, requires these environment variables to be set:
```
NTFY_INSTANCE=<url to your ntfy instance (+ port)>
NTFY_TOKEN=<Access-token to your ntfy instance>
```

grafanas `.state` is translated to ntfys `priority` header, grafanas `message` is used as the `data` and the `title` is used as `title`