<script setup>
  import axios from 'axios'
  import { reactive, ref } from 'vue';
  import { DATA_BACKUP_COLUMNS, myUrl } from '../options';
  import Sidebar from "../components/sidebar.vue"

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


</script>

<template>
  <Sidebar active_key="backup">
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
  </Sidebar>
</template>

<style scoped>

  .bk-select {
    display: inline-block;
    width: 200px;
    margin-right: 20px;
  }

</style>