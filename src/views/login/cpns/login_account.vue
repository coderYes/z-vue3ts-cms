<template>
  <div class="login_account">
    <el-form
      ref="formRef"
      :rules="accountRules"
      label-width="60px"
      :model="account"
    >
      <el-form-item label="账号" prop="name">
        <el-input
          v-model="account.name"
          placeholder="请输入账号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="account.password"
          placeholder="请输入密码"
          clearable
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm, ElMessage } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { accountRules } from '../config/rules-config'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()

    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginActon = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (!valid) return ElMessage.error('请输入正确的账号和密码')
        if (isKeepPassword) {
          localCache.setCache('name', account.name)
          localCache.setCache('password', account.password)
        } else {
          localCache.deleteCache('name')
          localCache.deleteCache('password')
        }

        //登录验证
        store.dispatch('login/accountLoginAction', { ...account })
      })
    }

    return {
      account,
      accountRules,
      loginActon,
      formRef
    }
  }
})
</script>

<style scoped lang="less"></style>
