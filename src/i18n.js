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
    },
    search: {
      item_name: 'FILES SEARCH',
      host_ip: 'Host IP',
      dir: 'Directory',
      suffix: 'File Suffix',
      search_btn: 'Search',
    },
    backup: {
      item_name: 'BACKUP RECORDS',
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
    },
    search: {
      item_name: '文件查询',
      host_ip: '主机IP',
      dir: '目录',
      suffix: '文件后缀',
      search_btn: '立即查询',
    },
    backup: {
      item_name: '备份记录',
    }
  }
};

const i18n = createI18n({
  locale: 'zh', // 设置默认语言
  fallbackLocale: 'en', // 设置备用语言
  globalInjection: true,
  legacy: false,
  messages,
});

export default i18n
