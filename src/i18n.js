import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    title: 'CC SEARCH SYSTEM',
    lang: 'Language',
    host: {
      item_name: 'HOST SRARCH',
      index: 'Index',
    },
    search: {
      item_name: 'FILES SEARCH',
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
    },
    search: {
      item_name: '文件查询',
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
