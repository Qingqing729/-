<template>
   <div>
      <div class="diary-detail-title">
         <h3>新建日记</h3>
         <el-button @click="goBack" size="mini">返回</el-button>
      </div>
      <editor></editor>
   </div>
</template>

<script>
   import editor from '../../components/editor.vue'
   export default {
     data () {
       return {}
     },
     methods: {
       goBack () {
         this.$router.push({ name: 'index' })
       }
     },
     components: { editor }
   }
</script>
<style lang="scss" scoped>
   .diary-detail-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 30px;
      color: #f17037;
   }
</style>
