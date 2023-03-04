<template>
  <div>
    <el-form :rules="mobilePhoneRules" label-width="80px" :model="mobilePhone">
      <el-form-item label="手机号" prop="name">
        <el-input
          v-model="mobilePhone.phone"
          placeholder="请输入手机号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="password">
        <div style="display: flex; align-items: center">
          <el-input v-model="mobilePhone.code" clearable></el-input>
          <el-button style="margin-left: 4px" type="primary"
            >获取验证码</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { mobilePhoneRules } from '../config/rules-config'
export default defineComponent({
  setup() {
    const mobilePhone = reactive({
      phone: '',
      code: ''
    })
    return {
      mobilePhone,
      mobilePhoneRules
    }
  }
})
</script>

<style scoped lang="less"></style>
