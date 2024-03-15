<script setup>
  import axios from 'axios'

  import { reactive, ref } from 'vue';

  import { DATA_SEARCH_COLUMNS, myUrl, route_table } from '../options';

  import { useRouter } from 'vue-router'
  const router = useRouter()
  const goto = (path) => {
    // console.log('goto', path)
    router.push(path)
  }

  // 获取 table 数据
  const tableData = reactive({
    host_data: []
  })

  const selectedBiz = ref('全部')
  const selectedSet = ref('全部')
  const selectedModule = ref('全部')

  const isShow = ref(false)
  const displayHost = ref({})

  const getTableData = () => {
    axios.defaults.baseURL = myUrl
    
    let queryData = {}
    if (selectedBiz.value !== '全部' && selectedBiz.value !== 0) {
      queryData.business = selectedBiz.value
    }
    if (selectedSet.value !== '全部' && selectedSet.value !== 0) {
      queryData.set = selectedSet.value
    }
    if (selectedModule.value !== '全部' && selectedModule.value !== 0) {
      queryData.module = selectedModule.value
    }
    const api = '/hosts?' + new URLSearchParams(queryData).toString()
    console.log(api)


    axios.get(api).then((res)=>{
      tableData.host_data = res.data.data
    }).catch((err)=>{
      console.log(err)
    })    
    
  }
  // getTableData()


  const pagination = ref({ count: tableData.length, limit: 10 });
  const columns = DATA_SEARCH_COLUMNS.map(item => ({ ...item }));

  const handleRowSelect = (arg) => {
    console.log('handleRowSelect', arg);
  }


  // 选中主机信息
  const activeRowInfo = reactive({})
  const activeHostInfo = ref({})
  
  const handleRowClick = (e, row, index, rows, source) => {
    axios.defaults.baseURL = myUrl
    let host_id = row.host_id

    const api=`host-info?host=${host_id}`
    axios.get(api).then((res)=>{
      activeHostInfo.value = res.data
    }).catch((err)=>{
      console.log(err)
    }) 
    // to  delete
    // Object.assign(activeRowInfo, { e, row, index, rows, source });
    displayHost.value = row
    // console.log('handleRowClick', displayHost.value);
    isShow.value = true
    // console.log(isShow.value)
  }


  // 导航栏
  import { TreeApplicationShape } from 'bkui-vue/lib/icon';
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

  const ip_address = ref('10.0.48.18,10.0.48.46')
  const dir = ref('/tmp')
  const suffix = ref('log')

  const search = () => {
    // console.log(ip_address.value)
    // console.log(dir.value)
    // console.log(suffix.value)

    axios.defaults.baseURL = myUrl
    
    let queryData = {
        dir: dir.value,
        suffix: suffix.value,
        hosts: ip_address.value.replace(/(\r\n|\n|\r)/gm, ","),
    }
    const api = '/search-files?' + new URLSearchParams(queryData).toString()
    console.log(api)

    // tableData.host_data = [{"ip": "10.0.48.46", "filenames": "yddaemon.log", "size": 51, "dir": "/tmp"}, {"ip": "10.0.48.32", "filenames": "", "size": 0, "dir": "/tmp"}, {"ip": "10.0.48.7", "filenames": "", "size": 0, "dir": "/tmp"}, {"ip": "10.0.48.48", "filenames": "", "size": 0, "dir": "/tmp"}, {"ip": "10.0.48.8", "filenames": "yddaemon.log", "size": 51, "dir": "/tmp"}, {"ip": "10.0.48.45", "filenames": "yddaemon.log", "size": 51, "dir": "/tmp"}, {"ip": "10.0.48.18", "filenames": "yddaemon.log", "size": 50, "dir": "/tmp"}, {"ip": "10.0.48.37", "filenames": "yddaemon.log", "size": 51, "dir": "/tmp"}]


    axios.get(api).then((res)=>{
      // console.log(res.data)
      if (res.data.data.length > 0) {
        tableData.host_data = res.data.data
        // 拼接出备份链接地址
        tableData.host_data.forEach((item) => {
          if (item.size > 0) {
            let backup_query = {
              dir: item.dir,
              files: item.filenames,
              hosts: item.ip,
            }
            const backup_api = '/backup-files?' + new URLSearchParams(backup_query).toString()
            item.operation = backup_api
          }
        })
      }
      // page_count.value = res.data.total
    }).catch((err)=>{
      console.log(err)
    })
  }

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
          active-key="search"
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
        <!-- 内容 -->
        
        <div style="width: 400px; display: inline-block;">
           主机IP
           <bk-input style="display: inline-block;"
            v-model="ip_address"
            type="textarea"
            placeholder="请输入主机IP"
            class="mb8"
            /> 
        </div>
        <br>
        <div style="width: 400px; display: inline-block;">
           目录
           <bk-input style="display: inline-block;"
            v-model="dir"
            type="textarea"
            placeholder="/tmp"
            class="mb8"
            /> 
        </div>
        <br>
        <div style="width: 400px; display: inline-block;">
           文件后缀
           <bk-input style="display: inline-block;"
            v-model="suffix"
            type="textarea"
            placeholder="log"
            class="mb8"
            /> 
        </div>
        <br>
        <bk-button @click="search" theme="success">立即查询</bk-button>

        <div style="width: 100%; height: 100%;">
          <bk-table
            :columns="columns"
            :data="tableData.host_data"
            :pagination="pagination"
            :pagination-heihgt="60"
            @row-click="handleRowClick"
            @select="handleRowSelect"
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