<template>
  <div class="nav-header">
    <el-icon :size="25" v-if="!isFold" @click="changeFoldClick">
      <component :is="'fold'" />
    </el-icon>
    <el-icon :size="25" v-else @click="changeFoldClick">
      <component :is="'expand'" />
    </el-icon>

    <div class="content">
      <nav-breadcrumb :breadcrumbs="breadcrumbs" />
      <div class="user_info">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar icon="UserFilled"></el-avatar>
            <span>某某用户</span>
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleExitClick"
                >退出登录</el-dropdown-item
              >
              <el-dropdown-item divided>用户信息</el-dropdown-item>
              <el-dropdown-item>系统管理</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import NavBreadcrumb from '@/components/breadcrumb'
import { pathMapBreadcrumb } from '@/utils/map-menus'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import localCache from '@/utils/cache'

export default defineComponent({
  emits: ['foldChange'],
  components: {
    NavBreadcrumb
  },
  setup(prop, { emit }) {
    const isFold = ref(false)
    const changeFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    const store = useStore()

    const breadcrumbs = computed(() => {
      const route = useRoute()
      const userMenus = store.state.login.userMenus
      const currentPath = route.path
      return pathMapBreadcrumb(userMenus, currentPath)
    })

    const router = useRouter()
    const handleExitClick = () => {
      localCache.deleteCache('token')
      router.push('/main')
    }

    return {
      isFold,
      breadcrumbs,
      changeFoldClick,
      handleExitClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  width: 100%;
  display: flex;
  align-items: center;
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    padding: 0 20px;
    .el-dropdown-link {
      display: flex;
      align-items: center;
      .el-avatar {
        margin-right: 8px;
      }
    }
  }
}
</style>
