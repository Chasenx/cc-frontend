import { watch } from 'vue';
import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    title: 'CC SEARCH SYSTEM',
    lang: 'Language',
    host: {
      item_name: 'HOST SRARCH',
      index: 'Index',
      business: 'Business',
      set: 'Set',
      module: 'Module',
      search: 'Search',
      sync: 'Sync Now',
      index: 'Index',
      host_name: 'Host Name',
      host_innerip: 'Inner IP',
      host_outerip: 'Outer IP',
      biz_name: 'Business',
      set_name: 'Set',
      module_name: 'Module',
      operator: 'Operator',
      bak_operator: 'Backup Operator',
      cloud_vendor: 'Cloud Vendor',
    },
    search: {
      item_name: 'FILES SEARCH',
      host_ip: 'Host IP',
      dir: 'Directory',
      suffix: 'File Suffix',
      search_btn: 'Search',
      index: 'Index',
      ip_address: 'IP',
      file_list: 'File List',
      file_count: 'File Count',
      file_size: 'Total File Size',
      operation: 'Operation',
    },
    backup: {
      item_name: 'BACKUP RECORDS',
      index: 'Index',
      host_ip: 'IP',
      dir: 'Directory',
      suffix: 'Suffix',
      backup_person: 'Backup Person',
      backup_time: 'Backup Time',
      backup_files: 'Backup Files',
      job_link: 'Job Link',
    },
  },
  zh: {
    title: 'CC简易查询系统',
    lang: '语言',
    host: {
      item_name: '主机查询',
      index: '序号',
      business: '业务',
      set: '集群',
      module: '模块',
      search: '查找',
      sync: '同步最新',
      host_name: '主机名',
      host_innerip: '内网IP',
      host_outerip: '外网IP',
      biz_name: '业务',
      set_name: '集群',
      module_name: '模块',
      operator: '负责人',
      bak_operator: '备份负责人',
      cloud_vendor: '云厂商',
    },
    search: {
      item_name: '文件查询',
      host_ip: '主机IP',
      dir: '目录',
      suffix: '文件后缀',
      search_btn: '立即查询',
      index: '序号',
      ip_address: 'IP地址',
      file_list: '文件列表',
      file_count: '文件数量',
      file_size: '文件总大小',
      operation: '操作',
    },
    backup: {
      item_name: '备份记录',
      index: '序号',
      host_ip: 'IP',
      dir: '文件目录',
      suffix: '文件后缀名',
      backup_person: '备份人',
      backup_time: '备份时间',
      backup_files: '备份文件',
      job_link: 'JOB链接',
    }
  }
};

// 加载默认语言
let locale = 'zh'
const savedLang = localStorage.getItem('language');
if (savedLang) {
  locale = savedLang;
}

const i18n = createI18n({
  locale: locale, // 设置默认语言
  fallbackLocale: 'en', // 设置备用语言
  globalInjection: true,
  legacy: false,
  messages,
});

export default i18n
