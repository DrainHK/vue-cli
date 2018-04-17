<template>
    <div id="home">
        <header></header>
        <div id="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import header from 'comps/header/header.vue'
    export default {
        data() {
            return {}
        },
        methods: {},
        computed: {},
        components: {
            header
        },
        mounted() {
        }
    }
</script>

<style type="text/less" lang="less">
    #home{
        min-width: 1200px;
    }
</style>