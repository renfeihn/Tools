curl -H "Content-Type: application/json" -XPUT 'http://localhost:9200/_template/asda-applog' -d '
{
  "order": 0,
  "index_patterns": [ "applog*" ],
  "settings": {
    "index.number_of_replicas" : "2",
    "index.number_of_shards" : "9",
    "index.refresh_interval" : "10s",
    "index.translog.durability": "async",
    "index.translog.sync_interval": "30s",
    "index.translog.flush_threshold_size": "1G",
    "index.merge.scheduler.max_thread_count": 1,
    "index.indexing.slowlog.threshold.index.debug" : "2s",
    "index.indexing.slowlog.threshold.index.info" : "5s",
    "index.indexing.slowlog.threshold.index.trace" : "500ms",
    "index.indexing.slowlog.threshold.index.warn" : "10s",
    "index.search.slowlog.threshold.fetch.debug" : "500ms",
    "index.search.slowlog.threshold.fetch.info" : "800ms",
    "index.search.slowlog.threshold.fetch.trace" : "200ms",
    "index.search.slowlog.threshold.fetch.warn" : "1s",
    "index.search.slowlog.threshold.query.debug" : "2s",
    "index.search.slowlog.threshold.query.info" : "5s",
    "index.search.slowlog.threshold.query.trace" : "500ms",
    "index.search.slowlog.threshold.query.warn" : "10s",
    "analysis": {"analyzer":{"default":{"type":"ik_max_word"}}}
  },
  "mappings": {
    "asda": {
      "_source": { "enabled": true, "excludes":["__context__.__log__"] },
      "properties": {
        "start": {"type": "date"},
        "stop": {"type": "date"},
        "duration": {"type": "long"},
        "sysdate": {"type": "date"},
        "_head_.hostip": { "type": "keyword" },
        "_head_.sourceid": { "type": "keyword" },
        "_head_.file": { "type": "text", "norms":{"enabled":false}, "fields": {"keyword": {"type": "keyword", "ignore_above": 255}} },
        "_head_.filesize": { "type": "long" },
        "_head_.filetime": { "type": "date" },
        "_head_.sourcename": { "type": "keyword" },
        "_head_.appid": { "type": "keyword" },
        "_head_.appname": { "type": "keyword" },
        "_head_.objectid": { "type": "keyword" },
        "_head_.category1": { "type": "keyword" },
        "_head_.category2": { "type": "keyword" },
        "_head_.category3": { "type": "keyword" },
        "_head_.logid": { "type": "keyword" },
        "_head_.type": { "type": "keyword" },
        "_head_.logsn": { "type": "keyword" },
        "__context__":{
          "properties": {
            "__acqtime__": {"type": "long"},
            "__eventsize__": {"type": "long"},
            "__logtime__": {"type": "date"},
            "__level__": {"type": "keyword"},
            "__eid__": {"type": "keyword"},
            "__log__": {"type": "text", "norms":{"enabled":false}}
          }
        },
        "logjoin": { "type": "join", "relations": { "struct":"context" } }
      }
    }
  },
  "aliases": {}
}'