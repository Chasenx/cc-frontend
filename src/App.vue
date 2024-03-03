<script setup>

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

</script>

<template>
  <h3>简易CC查询系统</h3>
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
</template>

<style scoped>

</style>