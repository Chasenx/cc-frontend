export const DATA_FIX_COLUMNS = [
    {
        "type": "selection",
        "width": 20,
        "minWidth": 20,
        "fixed": true,
        "showOverflowTooltip": {
            "mode": "static"
        }
    },
    {
        "label": "序号",
        "type": "index",
        "sort": true,
        "width": 80,
        "fixed": true
    },
    {
        "label": "主机名",
        "field": "host_name",
        "fixed": true
    },
    {
        "label": "内网IP",
        "field": "host_innerip",
        "fixed": true,
        "sort": true,
    },
    {
        "label": "外网IP",
        "field": "host_outerip",
        "sort": true,
    },
    {
        "label": "业务",
        "field": "biz_name",
        "sort": true,
    },
    {
        "label": "集群",
        "field": "set_name",
        "sort": true,
    },
    {
        "label": "模块",
        "field": "module_name",
        "fixed": "right",
        "sort": true,
    },
    {
        "label": "负责人",
        "field": "operator",
        "fixed": "right"
    },
    {
        "label": "备份负责人",
        "field": "bak_operator",
        "fixed": "right"
    },
    {
        "label": "云厂商",
        "field": "cloud_vendor",
        "fixed": "right"
    }
]