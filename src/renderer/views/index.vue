<template>
    <div class="">
        <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in imgList" :key="item">
                <img :src="item" alt="">
            </el-carousel-item>
        </el-carousel>
        <el-divider content-position="left">日历列表 <el-button @click="toEdit" size="medium">写日记</el-button></el-divider>
        <div class="diary-list">
            <div @click="toDetail(item.id)" class="diary-box" v-for="(item, index) in diaryList" :key="index">
                <div class="diary-box-title">
                    <h3>{{ item.title }}</h3>
                    <el-button type="text" @click.stop="deleteDiary(item.id)">×</el-button>
                </div>
                <p class="diary-box-desc">{{ item.desc }}</p>
                <div class="diary-box-bottom">
                    <div class="flex">
                        <img src="https://static.veer.com/veer/static/resources/keyword/2019-05-20/077bd6d4143d4a239b370f2b42d63141.jpg" alt="">
                        <p>{{ item.time }}</p>
                    </div>
                    <el-button type="text" @click.stop="toEdit(item.id)">编辑日记</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import DB from '../utils/DB'
  let db
  export default {
    data () {
      return {
        imgList: [
          'https://static.veer.com/veer/static/resources/keyword/2018-05-25/14ac1a392b8347bbb7948e61d42ea611.jpg',
          'https://static.veer.com/veer/static/resources/keyword/2019-05-20/077bd6d4143d4a239b370f2b42d63141.jpg'
        ],
        diaryList: []
      }
    },
    methods: {
      toEdit (id) {
        this.$router.push({ name: 'edit', query: { id } })
      },
      toDetail (id) {
        this.$router.push({ name: 'detail', query: { id } })
      },
      deleteDiary (id) {
        db.delete(id).then(() => {
          this.$message('删除成功')
          db.readAll().then(list => { this.diaryList = list })
        }).catch(() => {
          this.$message({
            msg: '删除失败',
            type: 'error'
          })
        })
      }
    },
    mounted () {
      db = new DB('diary', 1)
      db.onReady().then(() => {
        db.readAll().then(list => { this.diaryList = list })
      })
    }
  }
</script>

<style lang="scss" scoped>
    *{
        padding: 0;
        margin: 0;
    }
    .el-carousel__item img {
        width: 100%;
    }
    .el-divider{
        margin: 30px 0;
        .el-divider__text {
            font-size: 20px !important;
            font-weight: 700;
        }
        .el-button {
            background-color: #f18218;
            color: #fff;
            padding: 4px 10px;
            font-size: 14px;
            border-color: #f18218;
        }
    }
    .diary-list {
        margin: 40px 30px 50px;
        .diary-box {
            border: 1px solid #dfdfdf;
            border-radius: 10px;
            margin-top: 20px;
            cursor: pointer;
            .diary-box-title {
                display: flex;
                justify-content: space-between;
                padding: 0 5px 0 20px;
                h3 {
                    font-size: 16px;
                    color: #f18218;
                    line-height: 40px;
                }
                .el-button {
                    font-size: 30px;
                    color: #333333;
                }
            }
            .diary-box-desc {
                padding: 0 20px 10px;
                font-size: 14px;
                line-height: 24px;
                text-align: justify;
            }
            .diary-box-bottom {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-top: 1px solid #dfdfdf;
                font-size: 12px;
                padding: 10px 20px;
                line-height: 40px;
                .flex {
                    display: flex;
                }
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-size: contain;
                    margin-right: 20px;
                }
            }
        }
    }
</style>
