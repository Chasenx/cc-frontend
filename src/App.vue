<script setup>
  import axios from 'axios'

  import { reactive, ref } from 'vue';

  import { DATA_FIX_COLUMNS } from './options';


  const tableData = new Array(Math.ceil(Math.random() * 50) + 50).fill('')
    .map((_, index) => ({
      ip: `${index}--192.168.0.x`,
      source: `${index}_QQ`,
      create_by: `user-admin-${index}`,
      create_time: `2018-05-25 15:02:24.${index}`,
    }));

  const pagination = ref({ count: tableData.length, limit: 10 });
  const columns = DATA_FIX_COLUMNS.map(item => ({ ...item }));

  const handleRowSelect = (arg) => {
    console.log('handleRowSelect', arg);
  }

  const activeRowInfo = reactive({})
  const ipinfo = ref(true)
  
  const handleRowClick = (e, row, index, rows, source) => {
    Object.assign(activeRowInfo, { e, row, index, rows, source });
    console.log('selected ip is', row.ip);
    ipinfo.value = !ipinfo.value
    console.log(ipinfo.value)
  }

  const fakeData = reactive({
    name: 'fake',
    url: 'fake.com',
  })

  const changeData = () => {
    axios.defaults.baseURL = '/stag--cc-project'
    const api='/test-json/'

    axios.get(api).then((res)=>{
      console.log(res.data)
      fakeData.name = res.data.name
      fakeData.url = res.data.url
    }).catch((err)=>{
      console.log(err)
    })
  }

    // data for search
    const datasource = reactive([
    {
      value: 'climbing',
      label: '爬山',
    },
    {
      value: 'running',
      label: '跑步',
    },
    {
      value: 'fitness',
      label: '健身',
    },
  ])
  const selectedValue = ref('running');
  const selectChange = (value) => {
    console.log('selectChange', value);
  }

  const textData = ref('search');

</script>

<template>
  <div style="width: 95%; margin: auto;">
    <h3>CC简易查询系统</h3>
    <div>
      <bk-select
        v-model="selectedValue"
        class="bk-select"
        @change="selectChange">
        <bk-option
          v-for="(item, index) in datasource"
          :id="item.value"
          :key="index"
          :name="item.label"/>
      </bk-select>
      <bk-input v-model="textData"/>
    </div>
    <div style="width: 100%; height: 100%;">
      <bk-table
        :columns="columns"
        :data="tableData"
        :pagination="pagination"
        :pagination-heihgt="60"
        @row-click="handleRowClick"
        @select="handleRowSelect"
        show-overflow-tooltip
        height="100%"
      />
    </div>
    <hr>
    <bk-button @click="changeData">Change</bk-button>
    <h3>{{ fakeData.name }} + {{ fakeData.url }}</h3>
  </div>

</template>

<style scoped>
  .style-demo {
    display: flex;
  }

  .bk-select {
    width: 200px;
    margin-right: 20px;
  }
</style>