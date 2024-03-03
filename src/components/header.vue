<script setup>
    const emits = defineEmits(["getWeb", "userAdd"])
    emits("getWeb", {name: "test", url: "baidu.com"})
    console.log('emit')

    const userAdd = () => {
        emits("userAdd", 10)
    }
</script>

<template>
    <h3>header</h3>
    <button @click="userAdd">添加用户</button>
</template>

<style scoped>

</style>