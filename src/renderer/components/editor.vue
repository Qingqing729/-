<template>
    <div class="editor">
        <el-form ref="form" :model="form" label-width="80px" size="small" :rules="rules">
            <el-form-item label="标题" prop="title">
                <el-input type="text"  v-model="form.title" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="time">
                <el-date-picker
                        v-model="form.time"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        style="width: 300px;"
                        placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="简单描述" prop="desc">
                <el-input type="textarea" v-model="form.desc" style="width: 500px;"></el-input>
            </el-form-item>
        </el-form>
        <div ref="editor" style="text-align:left"></div>
        <div class="editor-footer">
            <el-button @click="getContent">查看内容</el-button>
            <el-button type="primary" @click="submitForm">保存日记</el-button>
        </div>
    </div>
</template>

<script>
  import E from 'wangeditor'
  import DB from '../utils/DB'
  let db
  export default {
    name: 'editor',
    data () {
      return {
        form: {
          title: '',
          time: '',
          desc: '',
          editorContent: ''
        },
        rules: {
          title: {required: true, message: '请输入标题'},
          time: {required: true, message: '请输入创建时间'},
          desc: {required: true, message: '请输入简单描述'}
        },
        id: null
      }
    },
    methods: {
      getContent: function () {
        alert(this.form.editorContent)
      },
      submitForm () {
        this.$refs.form.validate(valid => {
          if (valid) {
            if (this.id) {
              db.update(this.form).then(() => {
                this.$message('修改任务成功')
                setTimeout(() => {
                  this.$router.push({ name: 'index' })
                }, 1000)
              }).catch(() => {
                this.$message({
                  msg: '修改任务失败',
                  type: 'error'
                })
              })
            } else {
              db.add(this.form).then(() => {
                this.$message('日记保存成功')
                setTimeout(() => {
                  this.$router.push({ name: 'index' })
                }, 1000)
              }).catch(() => {
                this.$message({
                  msg: '日记保存失败',
                  type: 'error'
                })
              })
            }
          }
        })
      }
    },
    mounted () {
      db = new DB('diary', 1)
      let editor = new E(this.$refs.editor)
      editor.customConfig.onchange = (html) => {
        this.form.editorContent = html
      }
      editor.customConfig.zIndex = 100
      editor.create()
      this.id = Number(this.$route.query.id)
      db.onReady().then(() => {
        if (this.id) {
          db.readAll().then(list => {
            this.form = list.find(item => item.id === this.id)
            editor.txt.html(this.form.editorContent)
          })
        }
      })
    }
  }
</script>

<style lang="scss">
    .editor-footer{
        display: flex;
        justify-content: center;
        margin: 30px;
    }
</style>