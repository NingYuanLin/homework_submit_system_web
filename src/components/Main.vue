<script setup lang="ts">
import {ref} from "vue";
import {ElMessage} from 'element-plus'
import {UploadFilled, Search, Eleme} from '@element-plus/icons-vue'

import type {UploadRawFile} from "element-plus";
import {uploadFile, historySearch} from '../api'

let username = ref('')

let studentId = ref('')

let isSearchLoading = ref(false)


let historyTableData = ref([])

const beforeAvatarUpload = (file: UploadRawFile) => {
  console.log(file.type)
  const isRightFilePostfix = file.type === 'application/zip'
  const isLt100M = file.size / 1024 / 1024 < 100
  const isUsername = username.value != ''
  const isStudentId = studentId.value != ''

  if (!isRightFilePostfix) {
    ElMessage.error('请上传zip格式的文件!')
  } else if (!isLt100M) {
    ElMessage.error('文件大小不要超过 100MB!')
  } else if (!isUsername) {
    ElMessage.error('请输入您的姓名')
  } else if (!isStudentId) {
    ElMessage.error('请输入您的学号')
  }

  return isRightFilePostfix && isLt100M && isUsername && isStudentId
}

const startUploadFile = async (params: any) => {
  // console.log(params)
  ElMessage.info('正在上传文件，请稍等~')
  let uploadFileRet = await uploadFile(username.value, studentId.value, params.file)
  // console.log(uploadFileRet)
  const status_ = uploadFileRet.status
  const msg = uploadFileRet.msg
  if (status_ === 200){
    ElMessage.success(msg)
  }else{
    ElMessage.error(msg)
  }
}

const startHistorySearch = async () => {
  isSearchLoading.value = true
  // 验证
  const isUsername = username.value != ''
  const isStudentId = studentId.value != ''
  if (!isUsername) {
    ElMessage.error('请输入您的姓名')
  } else if (!isStudentId) {
    ElMessage.error('请输入您的学号')
  } else {
    let historySearchRet = await historySearch(username.value, studentId.value)
    console.log(historySearchRet)
    const status_ = historySearchRet.status
    console.log(status_)
    if (status_ === 200){
      let result = historySearchRet.result
      ElMessage.success("共查询出" + result.length + '条结果')
      historyTableData.value = historySearchRet.result
    }else{
      const msg = historySearchRet.msg
      ElMessage.error(msg)
    }

  }
  isSearchLoading.value = false
}


</script>

<template>
  <div class="main-div">
    <div style="justify-content: center">
      <h1>
        研究生科技论文写作课程
      </h1>
    </div>

    <div style="display:flex;width: 80%;align-items:center">
      <span style="white-space:nowrap">姓名：</span>
      <el-input v-model="username" placeholder="Please input"/>
    </div>

    <div style="display:flex;width: 80%;align-items:center;margin-top: 30px">
      <span style="white-space:nowrap">学号：</span>
      <el-input v-model="studentId" placeholder="Please input"/>
    </div>

    <!--    <div style="width: 80%;">-->
    <!--      <hr style="color: #eee;border: 1px solid #eee;margin-top: 30px"/>-->
    <!--    </div>-->
    <div style="margin-top: 30px">

    </div>

    <div
        style="display: flex;flex-direction: row;width: 80%;border-width: 1px 1px 1px 1px;border-style:solid;border-color:#eee;">
      <div
          style="width: 50%;border-width: 0 1px 0 0;border-style:solid;border-color:#eee;display: flex;align-items: center;flex-direction: column">
        <div>
          <h2>
            论文提交
          </h2>
        </div>

        <div style="margin-top: 5px">
          <el-upload
              class="upload-demo"
              drag
              action=""
              multiple
              :before-upload="beforeAvatarUpload"
              :http-request="startUploadFile"
          >
            <el-icon class="el-icon--upload">
              <upload-filled/>
            </el-icon>
            <div class="el-upload__text">
              Drop file here or <em>click to upload</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                文件不能大于100M,必须上传zip格式
              </div>
            </template>
          </el-upload>
        </div>

      </div>
      <div style="width: 50%;display: flex;align-items: center;flex-direction: column">
        <div>
          <h2>
            论文提交记录查询
          </h2>
        </div>
        <div>
          <el-button type="primary"
                     :icon="Search"
                     :loading-icon="Eleme"
                     :loading="isSearchLoading"
                     @click="startHistorySearch"
                     plain
          >
            Search
          </el-button>
        </div>
        <div style="margin-top: 10px">
          <el-table :data="historyTableData" style="width: 100%" v-if="historyTableData.length!==0">
            <el-table-column prop="date" label="上传日期" width="180"/>
            <el-table-column prop="filename" label="文件名" width="180"/>
          </el-table>
        </div>
      </div>
    </div>

    <div style="width: 80%;">
      <h2>使用指南：</h2>
      <div>
        首先输入姓名和学号，然后点击<b>论文提交</b>下面的大按钮进行作业提交
      </div>
      <div>
        提交完以后，也可以点击<b>论文提交记录查询</b>进行作业提交查询，系统会列出所有提交的版本
      </div>
      <div>
        注意，作业以<b>最后一次提交</b>为准
      </div>
      <h2>🎉前后端代码均已开源：</h2>
      <div>
        前端：<a href="https://github.com/NingYuanLin/homework_submit_system_web">https://github.com/NingYuanLin/homework_submit_system_web</a>
      </div>
      <div>
        后端：<a href="https://github.com/NingYuanLin/homework_submit_system_flask">https://github.com/NingYuanLin/homework_submit_system_flask</a>
      </div>
    </div>

  </div>

</template>

<style lang="scss" scoped>

.main-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px;
  align-items: center;
}
</style>
