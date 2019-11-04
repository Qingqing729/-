<template>
    <div>
        <div class="diary-detail-title">
            <b>{{ diaryList.title }}</b>
            <el-button @click="goBack" size="mini"> 返回</el-button>
        </div>
        <div class="diary-detail-desc" v-html="diaryList.editorContent"></div>
        <div class="diary-detail-footer">
            <img src="https://static.veer.com/veer/static/resources/keyword/2018-05-25/14ac1a392b8347bbb7948e61d42ea611.jpg" alt="">
            <p>{{ diaryList.time }}</p>
        </div>
    </div>
</template>

<script>
  import DB from '../../utils/DB'
  export default {
    data () {
      return {
        diaryList: {
          title: '',
          time: '',
          desc: '',
          editorContent: ''
        }
      }
    },
    methods: {
      goBack () {
        this.$router.push({ name: 'index' })
      }
    },
    mounted () {
      const db = new DB('diary', 1)
      db.onReady().then(() => {
        db.readAll().then(list => {
          this.diaryList = list.find(item => item.id === Number(this.$route.query.id))
        })
      })
    }
  }
</script>

<style lang="scss" scoped>
    .diary-detail-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 30px 20px 40px 20px;
        font-size: 24px;
        color: #f18218;
    }
    .diary-detail-desc {
        line-height: 24px;
        text-align: justify;
        padding: 0 20px 30px;
    }
    .diary-detail-footer {
        font-size: 12px;
        border-top: 1px solid #dfdfdf;
        display: flex;
        align-items: center;
        padding: 20px 30px;
        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 20px;
        }
    }
</style>
