<script setup>
  import axios from 'axios'
  import Sidebar from "../components/sidebar.vue"
  import { reactive, ref } from 'vue';
  import { DATA_FIX_COLUMNS, myUrl } from '../options'
 

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
  getTableData()


  const pagination = ref({ count: tableData.length, limit: 10 });
  const columns = DATA_FIX_COLUMNS.map(item => ({ ...item }));

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

  // const fakeData = reactive({
  //   name: 'fake',
  //   url: 'fake.com',
  // })


  // data for search
  const textData = ref('search');
  

  // 业务选项

  const bizs = reactive([])

  function getBizs(){
    axios.defaults.baseURL = myUrl
    const api='business/'

    axios.get(api).then((res)=>{
      const new_data = res.data.data
      new_data.unshift({biz_id: 0, biz_name: '全部'})
      bizs.splice(0, bizs.length, ...new_data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  getBizs()

  // 集群选项
  const sets = reactive([])

  function getSets() {
    axios.defaults.baseURL = myUrl
    let biz_id = selectedBiz.value

    const api=`set?business=${biz_id}`
    axios.get(api).then((res)=>{
      const new_data = res.data.data
      new_data.unshift({set_id: 0, set_name: '全部'})
      sets.splice(0, sets.length, ...new_data)
    }).catch((err)=>{
      console.log(err)
    })    
  }

  // 模块选项
  const modules = reactive([])
  function getModules() {
    axios.defaults.baseURL = myUrl
    let set_id = selectedSet.value

    const api=`module?set=${set_id}`
    axios.get(api).then((res)=>{
      const new_data = res.data.data
      new_data.unshift({module_id: 0, module_name: '全部'})
      modules.splice(0, modules.length, ...new_data)
    }).catch((err)=>{
      console.log(err)
    })    
  }

  // 业务下拉菜单改变
  const bizChange = (value) => {
    console.log('selectChange', value)
    getSets()
    selectedSet.value = '全部'
    selectedModule.value = '全部'
  }

  // 集群下拉菜单改变
  const setChange = (value) => {
    console.log('selectChange', value)
    getModules()
    selectedModule.value = '全部'
  }

  // 更新 CMDB 数据
  const updateCMDB = () => {
    console.log('update CMDB')
    axios.defaults.baseURL = myUrl
    const api='/sync-cmdb/'
    axios.get(api).then((res)=>{
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }

  // 树结构
  // const treeData = reactive(
  //   [
  //     {
  //         "name": "第一个业务",
  //         "isOpen": true,
  //         "id": "/",
  //         "children": [
  //             {
  //                 "name": "集群一",
  //                 "children": []
  //             },
  //             {
  //                 "name": "集群二",
  //                 "children": [
  //                   {
  //                     "name": "模块一",
  //                     "children": []
  //                   },
  //                   {
  //                     "name": "模块二",
  //                     "children": []
  //                   },
  //                 ]
  //             },
  //             {
  //                 "name": "集群三",
  //                 "children": []
  //             }
  //         ]
  //     },
  //     {
  //         "name": "第二个业务",
  //         "id": "//",
  //         "children": [
  //             {
  //                 "name": "集群四",
  //                 "children": []
  //             },
  //             {
  //                 "name": "集群五",
  //                 "children": []
  //             },
              
  //         ]
  //     },
  //   ]
  // )
  const treeData = reactive(
    [{"bk_inst_id": 3, "bk_inst_name": "demo\u4f53\u9a8c\u4e1a\u52a1", "bk_obj_id": "biz", "bk_obj_name": "\u4e1a\u52a1", "default": 0, "child": [{"bk_inst_id": 3, "bk_inst_name": "agent\u53ef\u7528\u73af\u5883", "bk_obj_id": "environment", "bk_obj_name": "\u73af\u5883", "default": 0, "child": [{"bk_inst_id": 6, "bk_inst_name": "\u81ea\u5b9a\u4e49\u5c42\u7ea7", "bk_obj_id": "subsystem", "bk_obj_name": "\u5b50\u7cfb\u7edf", "default": 0, "child": [{"bk_inst_id": 17, "bk_inst_name": "\u901a\u8fc7\u96c6\u7fa4\u6a21\u677f\u521b\u5efa\u7684", "bk_obj_id": "set", "bk_obj_name": "\u96c6\u7fa4", "default": 0, "child": [{"bk_inst_id": 76, "bk_inst_name": "gamesvr", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}, {"bk_inst_id": 1897, "bk_inst_name": "nginx", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}, {"bk_inst_id": 77, "bk_inst_name": "websvr", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}]}, {"bk_inst_id": 18, "bk_inst_name": "\u76f4\u63a5\u521b\u5efa\u7684\u96c6\u7fa4", "bk_obj_id": "set", "bk_obj_name": "\u96c6\u7fa4", "default": 0, "child": [{"bk_inst_id": 1893, "bk_inst_name": "aa", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}, {"bk_inst_id": 78, "bk_inst_name": "gamesvr", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}, {"bk_inst_id": 1845, "bk_inst_name": "logsvr", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}, {"bk_inst_id": 79, "bk_inst_name": "websvr", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}, {"bk_inst_id": 80, "bk_inst_name": "windows_svr", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}]}]}]}, {"bk_inst_id": 119, "bk_inst_name": "\u6d4b\u8bd5\u73af\u5883", "bk_obj_id": "environment", "bk_obj_name": "\u73af\u5883", "default": 0, "child": [{"bk_inst_id": 120, "bk_inst_name": "\u8ba2\u5355", "bk_obj_id": "subsystem", "bk_obj_name": "\u5b50\u7cfb\u7edf", "default": 0, "child": [{"bk_inst_id": 147, "bk_inst_name": "\u6d4b\u8bd5\u7cfb\u7edf\u96c6\u7fa4", "bk_obj_id": "set", "bk_obj_name": "\u96c6\u7fa4", "default": 0, "child": [{"bk_inst_id": 585, "bk_inst_name": "\u6d4b\u8bd5\u4e1a\u52a1", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}]}]}]}, {"bk_inst_id": 493, "bk_inst_name": "test", "bk_obj_id": "environment", "bk_obj_name": "\u73af\u5883", "default": 0, "child": [{"bk_inst_id": 494, "bk_inst_name": "test-1", "bk_obj_id": "subsystem", "bk_obj_name": "\u5b50\u7cfb\u7edf", "default": 0, "child": [{"bk_inst_id": 466, "bk_inst_name": "test-\u96c6\u7fa4", "bk_obj_id": "set", "bk_obj_name": "\u96c6\u7fa4", "default": 0, "child": [{"bk_inst_id": 1931, "bk_inst_name": "test-\u6a21\u5757", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}]}, {"bk_inst_id": 468, "bk_inst_name": "test-\u96c6\u7fa42", "bk_obj_id": "set", "bk_obj_name": "\u96c6\u7fa4", "default": 0, "child": [{"bk_inst_id": 1933, "bk_inst_name": "test-jqmysql", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}, {"bk_inst_id": 1932, "bk_inst_name": "test-web", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}]}, {"bk_inst_id": 469, "bk_inst_name": "test-\u96c6\u7fa43", "bk_obj_id": "set", "bk_obj_name": "\u96c6\u7fa4", "default": 0, "child": [{"bk_inst_id": 1935, "bk_inst_name": "test-jqmysql", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}, {"bk_inst_id": 1934, "bk_inst_name": "test-web", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}]}, {"bk_inst_id": 470, "bk_inst_name": "test-\u96c6\u7fa44", "bk_obj_id": "set", "bk_obj_name": "\u96c6\u7fa4", "default": 0, "child": [{"bk_inst_id": 1937, "bk_inst_name": "test-jqmysql", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}, {"bk_inst_id": 1936, "bk_inst_name": "test-web", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}]}]}]}, {"bk_inst_id": 495, "bk_inst_name": "\u4e1a\u52a1\u62d3\u6251-\u65b0\u5efa", "bk_obj_id": "environment", "bk_obj_name": "\u73af\u5883", "default": 0, "child": [{"bk_inst_id": 496, "bk_inst_name": "\u4e1a\u52a1\u62d3\u6251-\u5c42\u7ea71", "bk_obj_id": "subsystem", "bk_obj_name": "\u5b50\u7cfb\u7edf", "default": 0, "child": [{"bk_inst_id": 471, "bk_inst_name": "\u4e1a\u52a1\u62d3\u6251-\u5173\u8054\u96c6\u7fa4\u6a21\u677f", "bk_obj_id": "set", "bk_obj_name": "\u96c6\u7fa4", "default": 0, "child": [{"bk_inst_id": 1938, "bk_inst_name": "\u670d\u52a1\u6a21\u677f", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}]}]}]}, {"bk_inst_id": 126, "bk_inst_name": "\u6b63\u5f0f\u73af\u5883", "bk_obj_id": "environment", "bk_obj_name": "\u73af\u5883", "default": 0, "child": [{"bk_inst_id": 157, "bk_inst_name": "\u95e8\u6237\u7f51\u7ad9", "bk_obj_id": "subsystem", "bk_obj_name": "\u5b50\u7cfb\u7edf", "default": 0, "child": [{"bk_inst_id": 447, "bk_inst_name": "33", "bk_obj_id": "set", "bk_obj_name": "\u96c6\u7fa4", "default": 0, "child": [{"bk_inst_id": 1889, "bk_inst_name": "mysql", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}, {"bk_inst_id": 1890, "bk_inst_name": "testtt", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}]}, {"bk_inst_id": 448, "bk_inst_name": "testt", "bk_obj_id": "set", "bk_obj_name": "\u96c6\u7fa4", "default": 0, "child": [{"bk_inst_id": 1892, "bk_inst_name": "test", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}, {"bk_inst_id": 1891, "bk_inst_name": "testtt", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}]}, {"bk_inst_id": 164, "bk_inst_name": "\u7f51\u7ad9\u96c6\u7fa41", "bk_obj_id": "set", "bk_obj_name": "\u96c6\u7fa4", "default": 0, "child": [{"bk_inst_id": 629, "bk_inst_name": "mysql", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}, {"bk_inst_id": 628, "bk_inst_name": "nginx", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}, {"bk_inst_id": 630, "bk_inst_name": "php", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}, {"bk_inst_id": 635, "bk_inst_name": "redis", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}]}, {"bk_inst_id": 165, "bk_inst_name": "\u7f51\u7ad9\u96c6\u7fa42", "bk_obj_id": "set", "bk_obj_name": "\u96c6\u7fa4", "default": 0, "child": [{"bk_inst_id": 632, "bk_inst_name": "mysql", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}, {"bk_inst_id": 631, "bk_inst_name": "nginx", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}, {"bk_inst_id": 633, "bk_inst_name": "php", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}, {"bk_inst_id": 634, "bk_inst_name": "redis", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}]}, {"bk_inst_id": 464, "bk_inst_name": "\u7f51\u7ad9\u96c6\u7fa43", "bk_obj_id": "set", "bk_obj_name": "\u96c6\u7fa4", "default": 0, "child": [{"bk_inst_id": 1925, "bk_inst_name": "mysql", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}, {"bk_inst_id": 1924, "bk_inst_name": "nginx", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}, {"bk_inst_id": 1926, "bk_inst_name": "php", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}, {"bk_inst_id": 1927, "bk_inst_name": "redis", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}]}]}]}, {"bk_inst_id": 491, "bk_inst_name": "\u8fd9\u662f\u4e00\u4e2a\u73af\u5883", "bk_obj_id": "environment", "bk_obj_name": "\u73af\u5883", "default": 0, "child": [{"bk_inst_id": 492, "bk_inst_name": "\u8fd9\u662f\u4e00\u4e2a\u5c42\u7ea7", "bk_obj_id": "subsystem", "bk_obj_name": "\u5b50\u7cfb\u7edf", "default": 0, "child": [{"bk_inst_id": 465, "bk_inst_name": "\u8fd9\u662f\u4e00\u4e2a\u96c6\u7fa4", "bk_obj_id": "set", "bk_obj_name": "\u96c6\u7fa4", "default": 0, "child": [{"bk_inst_id": 1928, "bk_inst_name": "\u8fd9\u662f\u4e00\u4e2a\u6a21\u5757", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}]}, {"bk_inst_id": 467, "bk_inst_name": "\u8fd9\u662f\u96c6\u7fa4\u6a21\u677f\u521b\u5efa\u7684\u96c6\u7fa4", "bk_obj_id": "set", "bk_obj_name": "\u96c6\u7fa4", "default": 0, "child": [{"bk_inst_id": 1930, "bk_inst_name": "dbserver", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}, {"bk_inst_id": 1929, "bk_inst_name": "webserver", "bk_obj_id": "module", "bk_obj_name": "\u6a21\u5757", "default": 0, "child": []}]}]}]}]}]
  )
  const getPrefixIcon = () => 'default'
  const getPrefixIcon2 = (item, renderType) => {
    const { isRoot } = item;
    if (renderType === 'node_action') {
      return 'default';
    }

    if (isRoot) {
      return null;
    }

    return '';
  }

  const click_tree_node = (node, instance) => {
    console.log('click_tree_node', node, instance);
  }

</script>

<template>
  <Sidebar active_key="index">
    <!-- 内容 -->
    <bk-sideslider
      v-model:isShow="isShow"
      title="主机信息"
      width="50%"
      quick-close>
      <template #default>
        <div style="height: 1200px;">
          <!-- <h3>主机信息</h3> -->
          <!-- {{ displayHost }}
          <h3>IP信息</h3> -->
          <div v-for="value in activeHostInfo.data" style="margin-left: 40px;">
            <p>{{ value.bk_property_name }}:  {{ value.bk_property_value }}</p>
          </div>

        </div>
      </template>
    </bk-sideslider>
    <div class="search_filed">
      <!-- 业务下拉菜单 -->
      {{ $t('host.business') }}
      <bk-select
        v-model="selectedBiz"
        class="bk-select"
        @change="bizChange">
        <bk-option
          v-for="(item, index) in bizs"
          :id="item.biz_id"
          :key="index"
          :name="item.biz_name"/>
      </bk-select>
      <!-- 集群下拉菜单 -->
      {{ $t('host.set') }}
      <bk-select
        v-model="selectedSet"
        class="bk-select"
        @change="setChange">
        <bk-option
          v-for="(item, index) in sets"
          :id="item.set_id"
          :key="index"
          :name="item.set_name"/>
      </bk-select>
      <!-- 模块下拉菜单 -->
      {{ $t('host.module') }}
      <bk-select
        v-model="selectedModule"
        class="bk-select">
        <bk-option
          v-for="(item, index) in modules"
          :id="item.module_id"
          :key="index"
          :name="item.module_name"/>
      </bk-select>
      <bk-button @click="getTableData" theme="primary">{{ $t('host.search') }}</bk-button>
      <div style="width: 40px; display: inline-block;"></div> 
      <bk-button @click="updateCMDB" theme="success">{{ $t('host.sync') }}</bk-button>
      <!-- <bk-input v-model="textData"/> -->
    </div>

    <div class="container">
      <div class="left">
        <!-- 树结构 -->
        <bk-tree
            :data="treeData"
            level-line
            :prefix-icon="getPrefixIcon"
            label="bk_inst_name"
            children="child"
            @node-click="click_tree_node"
        />
        <!-- 树结束 -->
      </div>
      <div class="right">
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
    </div>
    <!-- <bk-button @click="updateCMDB">更新</bk-button> -->
    <!-- 内容结尾 -->
  </Sidebar>
</template>

<style scoped>

  .bk-select {
    display: inline-block;
    width: 200px;
    margin-right: 20px;
  }

  .container {
    display: flex;
  }

  .left {
    width: 238px;
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: 15px;
  }

  .right {
    flex-grow: 1;
  }

  .search_filed {
    margin-bottom: 20px;
  }

</style>