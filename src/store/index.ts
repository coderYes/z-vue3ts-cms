import { createStore, Store, useStore as useVueStore } from 'vuex'
import login from './login/login'
import system from './main/system/system'
import dashboard from './main/dashboard/dashboard'
import { IRootState, IStoreType } from './types'
import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootState>({
  state: {
    entireDepartment: [],
    entireRole: [],
    entireMenu: []
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      try {
        // 请求部门和角色数据
        const departmentResult = await getPageListData('/department/list', {
          offset: 0,
          size: 1000
        })
        const { list: departmentList } = departmentResult.data
        const roleResult = await getPageListData('/role/list', {
          offset: 0,
          size: 1000
        })
        const { list: roleList } = roleResult.data
        const menuResult = await getPageListData('/menu/list', {})
        const { list: menuList } = menuResult.data

        //保存
        commit('changeEntireDepartment', departmentList)
        commit('changeEntireRole', roleList)
        commit('changeEntireMenu', menuList)
      } catch (error) {
        console.log(error)
      }
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
  return useVueStore()
}

export default store
