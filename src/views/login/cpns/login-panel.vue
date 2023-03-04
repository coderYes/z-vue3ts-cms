<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs
      type="border-card"
      class="login-tabs"
      :stretch="true"
      v-model="currentTab"
    >
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <User style="width: 1rem; height: 1rem" />
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <Iphone style="width: 1rem; height: 1rem" />
            <span>手机登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="account_control">
      <el-checkbox v-model="isKeepPassword" label="记住密码" />
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button class="login_btn" type="primary" @click="handleLogClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login_account.vue'
import LoginPhone from './login_phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref(false)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref<string>('account')

    const handleLogClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginActon(isKeepPassword.value)
      } else {
        console.log('phoneRef')
      }
    }
    return {
      isKeepPassword,
      accountRef,
      currentTab,
      phoneRef,
      handleLogClick
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 120px;
  width: 320px;
  padding: 20px 30px;
  border-radius: 20px;
  backdrop-filter: blur(8px);
  .title {
    text-align: center;
    color: #fff;
  }
  .login-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }
  .login-tabs .custom-tabs-label {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-tabs .custom-tabs-label span {
    vertical-align: middle;
    margin-left: 4px;
  }
  .account_control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 4px;
  }
  .login_btn {
    width: 100%;
    margin-top: 4px;
  }
}
</style>
