<script setup>
    const props = defineProps({
        user:Number,
        url:String
    })
    console.log(props)
</script>

<template>
    <h3>footer</h3>
    <h3>{{ props.user }}</h3>
</template>

<style scoped>

</style>