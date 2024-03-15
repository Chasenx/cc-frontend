export const myUrl = 'http://dev.bkpaas.ce.bktencent.com:8000/'
// export const myUrl = '/stag--cc-project/'

export const route_prefix = '/stag--cc-project/'
export const route_table = {
    index: route_prefix,
    search: route_prefix + 'search',
    backup: route_prefix + 'backup'
  }


export const DATA_FIX_COLUMNS = [
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

export const DATA_SEARCH_COLUMNS = [
    {
        "label": "序号",
        "type": "index",
        // "sort": true,
        "width": 80,
        "fixed": true
    },
    {
        "label": "IP",
        "field": "ip",
    },
    {
        "label": "文件列表",
        "field": "filenames",
    },
    {
        "label": "文件数量",
        "field": "file_count",
    },
    {
        "label": "文件总大小",
        "field": "size",
    },
    {
        "label": "操作",
        "field": "operation",
    },
]

export const DATA_BACKUP_COLUMNS = [
    {
        "label": "序号",
        "type": "index",
        "width": 80,
        "fixed": true
    },
    {
        "label": "IP",
        "field": "host_ip",
    },
    {
        "label": "文件目录",
        "field": "dir",
    },
    {
        "label": "文件名后缀",
        "field": "suffix",
        
    },
    {
        "label": "备份人",
        "field": "backup_user",
    },
    {
        "label": "备份时间",
        "field": "backup_time",
    },
    {
        "label": "备份文件名",
        "field": "backup_files",
    },
    {
        "label": "JOB链接",
        "field": "job_link",
        "width": 400,
        "fixed": true
    },
]