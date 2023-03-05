import { Module } from 'vuex'
import { ISystemState } from './types'
import { IRootState } from '@/store/types'
import {
  getPageListData,
  deletePageDataById,
  createPageData,
  editPageData
} from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      roleList: [],
      goodsList: [],
      menuList: [],
      usersCount: 0,
      roleCount: 0,
      goodsCount: 0,
      menuCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
        // switch (pageName) {
        //   case 'users':
        //     return state.usersList
        //   case 'role':
        //     return state.roleList
        // }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      try {
        // console.log(payload)

        // 获取pageUrl
        const pageName = payload.pageName
        const pageUrl = `/${pageName}/list`

        // 页面发起请求
        const pageResult = await getPageListData(pageUrl, payload.queryInfo)
        // console.log(pageResult)

        // 数据存储到state中
        const { list, totalCount } = pageResult.data

        commit(
          `change${pageName.slice(0, 1).toUpperCase() + pageName.slice(1)}List`,
          list
        )
        commit(
          `change${
            pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
          }Count`,
          totalCount
        )
      } catch (error) {
        console.log(error)
      }
    },

    async deletePageDataAction({ dispatch }, payload: any) {
      try {
        // 拼接url
        const { pageName, id } = payload
        const pageUrl = `/${pageName}/${id}`

        // 删除
        await deletePageDataById(pageUrl)

        // 刷新
        dispatch('getPageListAction', {
          pageName,
          queryInfo: {
            offset: 0,
            size: 10
          }
        })
      } catch (error) {
        console.log(error)
      }
    },

    async createPageDataAction({ dispatch }, payload: any) {
      try {
        const { pageName, newData } = payload
        const pageUrl = `/${pageName}`
        await createPageData(pageUrl, newData)

        // 刷新
        dispatch('getPageListAction', {
          pageName,
          queryInfo: {
            offset: 0,
            size: 10
          }
        })
      } catch (error) {
        console.log(error)
      }
    },

    async editPageDataAction({ dispatch }, payload: any) {
      try {
        const { pageName, editData, id } = payload
        const pageUrl = `/${pageName}/${id}`
        await editPageData(pageUrl, editData)

        // 刷新
        dispatch('getPageListAction', {
          pageName,
          queryInfo: {
            offset: 0,
            size: 10
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export default systemModule
