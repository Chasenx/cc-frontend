<script setup>
  import { ref, watch } from 'vue';
  import { route_table } from '../options';
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'

  const router = useRouter()
  const goto = (path) => {
    router.push(path)
  }

  // 父组件传进来的 active_key
  const props = defineProps(["active_key"])

  // 导航栏
  import { TreeApplicationShape } from 'bkui-vue/lib/icon';
  const collapse = ref(true);
  const navigationType = ref('top-bottom');
  const handleCollapse = (v) => {
    collapse.value = !v;
  }
  const handleMenuClick = (key) => {
    goto(route_table[key.key])
  }

  // 国际化
  const { t, locale } = useI18n({ useScope: 'global' })
  // 从本地存储中获取保存的语言
  const savedLang = localStorage.getItem('language');
  if (savedLang) {
    locale.value = savedLang;
  }
  const language = ref(locale.value === 'zh' ? false : true)

  const change_lang = () => {
    if (language.value) {
      locale.value = 'en'
    } else {
      locale.value = 'zh'
    }
    title.value = t('title')
  }

  const title = ref(t('title'))

  watch(locale, (newVal) => {
    localStorage.setItem('language', newVal);
  })

</script>

<template>
  <div class="navigation-demo">

    <bk-navigation
      class="navigation-demo-content"
      :default-open="collapse"
      :navigation-type="navigationType"
      :side-title="title"
      @toggle="handleCollapse"
    >
      <template #menu>
        <bk-menu
          :collapse="collapse"
          :active-key="props.active_key"
          @click="handleMenuClick"
        >
          <bk-menu-item key="index">
            {{ $t('host.item_name') }}
          </bk-menu-item>
        
          <bk-menu-item key="search">
            {{ $t('search.item_name') }}
          </bk-menu-item>

          <bk-menu-item key="backup">
            {{ $t('backup.item_name') }}
          </bk-menu-item>

        </bk-menu>
      </template>
      <!-- 先把图标注释掉 -->
      <!-- <template #side-icon>
        <tree-application-shape />
      </template> -->
      <div class="content-demo">
        <!-- 内容 -->
        <slot></slot>
        <!-- 内容结尾 -->
      </div>
      <template #header>
        <div style="color:white;" > 
          {{ $t('lang') }}
          <bk-switcher
            v-model="language"
            show-text
            @change="change_lang"
          />
        </div>

      </template>
    </bk-navigation>
  </div>
</template>

<style scoped>

  .navigation-demo {
    &-radio {
      margin: 10px 0 20px 0;
    }

    &-content {
      border: 1px solid #ddd;

      .content-demo {
        font-size: 24px;
      }

      .header-demo {
        margin-right: auto;
        font-size: 20px;
      }
    }
  }
</style>