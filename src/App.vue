<script setup>
  import axios from 'axios'

  import { reactive, ref } from 'vue';

  import { DATA_FIX_COLUMNS } from './options';

  const myUrl = 'http://dev.bkpaas.ce.bktencent.com:8000/'
  // const myUrl = '/stag--cc-project/'

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

</script>

<template>
  <div style="width: 95%; margin: auto;">
    <h3>CC简易查询系统</h3>
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
    <div>
      <!-- 业务下拉菜单 -->
      业务
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
      集群
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
      模块
      <bk-select
        v-model="selectedModule"
        class="bk-select">
        <bk-option
          v-for="(item, index) in modules"
          :id="item.module_id"
          :key="index"
          :name="item.module_name"/>
      </bk-select>
      <bk-button @click="getTableData">查找</bk-button>
      <!-- <bk-input v-model="textData"/> -->
    </div>
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
    <hr>
    <bk-button @click="updateCMDB">更新</bk-button>
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
</style>