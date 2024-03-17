// export const myUrl = 'http://dev.bkpaas.ce.bktencent.com:8000/'
export const myUrl = '/stag--cc-project/'

export const route_prefix = '/stag--cc-project/'
export const route_table = {
    index: route_prefix,
    search: route_prefix + 'search',
    backup: route_prefix + 'backup'
  }

// 国际化
import i18n from './i18n'
const { t } = i18n.global

export const DATA_FIX_COLUMNS = [
    {
        "label": t('host.index'),
        "type": "index",
        "sort": true,
        "width": 80,
        "fixed": true
    },
    {
        "label": t('host.host_name'),
        "field": "host_name",
        "fixed": true
    },
    {
        "label": t('host.host_innerip'),
        "field": "host_innerip",
        "fixed": true,
        "sort": true,
    },
    {
        "label": t('host.host_outerip'),
        "field": "host_outerip",
        "sort": true,
    },
    {
        "label": t('host.biz_name'),
        "field": "biz_name",
        "sort": true,
    },
    {
        "label": t('host.set_name'),
        "field": "set_name",
        "sort": true,
    },
    {
        "label": t('host.module_name'),
        "field": "module_name",
        "fixed": "right",
        "sort": true,
    },
    {
        "label": t('host.operator'),
        "field": "operator",
        "fixed": "right"
    },
    {
        "label": t('host.bak_operator'),
        "field": "bak_operator",
        "fixed": "right"
    },
    {
        "label": t('host.cloud_vendor'),
        "field": "cloud_vendor",
        "fixed": "right"
    }
]

export const DATA_SEARCH_COLUMNS = [
    {
        "label": t('search.index'),
        "type": "index",
        // "sort": true,
        "width": 80,
        "fixed": true
    },
    {
        "label": t('search.ip_address'),
        "field": "ip",
    },
    {
        "label": t('search.file_list'),
        "field": "filenames",
    },
    {
        "label": t('search.file_count'),
        "field": "file_count",
    },
    {
        "label": t('search.file_size'),
        "field": "size",
    },
    {
        "label": t('search.operation'),
        "field": "operation",
        "width": 600,
        "fixed": true,
    },
]

export const DATA_BACKUP_COLUMNS = [
    {
        "label": t('backup.index'),
        "type": "index",
        "width": 80,
        "fixed": true
    },
    {
        "label": t('backup.host_ip'),
        "field": "host_ip",
    },
    {
        "label": t('backup.dir'),
        "field": "dir",
    },
    {
        "label": t('backup.suffix'),
        "field": "suffix",
        
    },
    {
        "label": t('backup.backup_person'),
        "field": "backup_user",
    },
    {
        "label": t('backup.backup_time'),
        "field": "backup_time",
    },
    {
        "label": t('backup.backup_files'),
        "field": "backup_files",
    },
    {
        "label": t('backup.job_link'),
        "field": "job_link",
        "width": 400,
        "fixed": true
    },
]