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
        "width": 100,
        "fixed": true
    },
    {
        "label": "名称/内网IP",
        "field": "ip",
        "minWidth": 200,
        "fixed": true
    },
    {
        "label": "来源",
        "field": "source",
        "filter": true,
        "minWidth": 200
    },
    {
        "label": "创建者",
        "field": "create_by",
        "width": 200
    },
    {
        "label": "更新时间",
        "field": "create_time",
        "width": 200
    },
    {
        "label": "状态",
        "field": "status",
        "width": 180,
        "fixed": "right"
    },
    {
        "label": "操作",
        "width": 180,
        "fixed": "right"
    }
]