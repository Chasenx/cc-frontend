<script setup>
  import axios from 'axios'

  import { reactive, ref } from 'vue';

  import { DATA_BACKUP_COLUMNS, myUrl, route_table } from '../options';

  import { useRouter } from 'vue-router'

  const router = useRouter()
  const goto = (path) => {
    router.push(path)
  }


  // 获取 table 数据
  const tableData = reactive({
    host_data: [],
  })


  // 获取备份日志
  const getTableData = (start, limit) => {
    axios.defaults.baseURL = myUrl
    
    let queryData = {
        start: start,
        limit: limit,
    }
    const api = '/backup-records?' + new URLSearchParams(queryData).toString()
    // console.log(api)


    axios.get(api).then((res)=>{
      tableData.host_data = res.data.data
      page_count.value = res.data.total
    }).catch((err)=>{
      console.log(err)
    })    
    
  }
  getTableData(1, 10)

  const page_count = ref(0)
  const page_current = ref(1)
  const page_limit = ref(10)
  const pagination = reactive({ count: page_count, limit: page_limit, current: page_current});
  const columns = DATA_BACKUP_COLUMNS.map(item => ({ ...item }));


  const handlePageValueChange = (value) => {
    page_current.value = value
    // console.log('current is:', page_current.value, 'limit is:', page_limit.value)
    getTableData(page_current.value, page_limit.value)
  }
  const handlePageLimitChange = (limit) => {
    page_limit.value = limit
    // console.log('current is:', page_current.value, 'limit is:', page_limit.value)
    getTableData(page_current.value, page_limit.value)
  }


  // 导航栏
  const collapse = ref(true);
  const navigationType = ref('top-bottom');
  const handleCollapse = (v) => {
    collapse.value = !v;
  }
  const handleMenuClick = (key) => {
    // const table = {
    //   index: '/',
    //   search: '/search',
    //   backup: '/backup'
    // }
    // console.log('handleMenuClick', key.key)
    goto(route_table[key.key])
  };


</script>

<template>
  <div class="navigation-demo">

    <bk-navigation
      class="navigation-demo-content"
      :default-open="collapse"
      :navigation-type="navigationType"
      side-title="CC简易查询系统"
      @toggle="handleCollapse"
    >
      <template #menu>
        <bk-menu
          :collapse="collapse"
          active-key="backup"
          @click="handleMenuClick"
        >
          <bk-menu-item key="index">
            主机查询
          </bk-menu-item>
        
          <bk-menu-item key="search">
            文件查询
          </bk-menu-item>

          <bk-menu-item key="backup">
            备份记录
          </bk-menu-item>

        </bk-menu>
      </template>
      <!-- 先把图标注释掉 -->
      <!-- <template #side-icon>
        <tree-application-shape />
      </template> -->
      <div class="content-demo">
        <!-- 内容  :pagination="pagination" -->
        <div style="width: 100%; height: 100%;">
          <bk-table
            :columns="columns"
            :data="tableData.host_data"
            :pagination="pagination"
            
            :remote-pagination="true"
            @page-value-change="handlePageValueChange"
            @page-limit-change="handlePageLimitChange"
            show-overflow-tooltip
            height="100%"
          />
        </div>
        <!-- 内容结尾 -->
      </div>
      <!-- <template #header>
        <div
          class="header-demo"
        >
          这里是头部导航
        </div>
      </template> -->
    </bk-navigation>
  </div>
</template>

<style scoped>
  .style-demo {
    display: flex;
  }

  .bk-select {
    display: inline-block;
    width: 200px;
    margin-right: 20px;
  }

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