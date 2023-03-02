<template>
  <div class="search-container">
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <search-results :searchText="searchText" v-if="isResultShow"></search-results>
    <search-hint @searchRes="onSearch" :searchText="searchText" v-else-if="searchText"></search-hint>
    <search-history v-else :searchHistories="searchHistories" @deleteAllSearch="searchHistories = []" @searchItem="onSearch"></search-history>
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchHint from './components/search-hint'
import SearchResults from './components/search-results'
import { setItem, getItem } from '@/utils/storage'
export default {
  // 组件名称
  name: 'SearchIndex',
  // 局部注册的组件
  components: {
    SearchHistory,
    SearchHint,
    SearchResults
  },
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: getItem('TOUTIAO_SEARCH_ALL') || []
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {
    searchHistories (val) {
      setItem('TOUTIAO_SEARCH_ALL', val)
    }
  },
  // 生命周期钩子   注：没用到的钩子请自行删除
  /**
  * 组件实例创建完成，属性已绑定，但DOM还未生成，el属性还不存在
  */
  created () {},
  /**
  * el 被新创建的 vm.el 替换，并挂载到实例上去之后调用该钩子。
  * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.el 也在文档内。
  */
  mounted () {},
  // 组件方法
  methods: {
    onSearch (val) {
      this.searchText = val
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 54px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
