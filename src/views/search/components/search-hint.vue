<template>
  <div class="search-hint">
    <van-cell  v-for="(text, index) in searchReminder" :key="index" icon="search" @click="$emit('searchRes', text)">
      <div slot="title" v-html="hightLinght(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchHint } from '@/api/search'
import { debounce } from 'lodash'
export default {
  // 组件名称
  name: 'SearchHint',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  // 组件状态值
  data () {
    return {
      searchReminder: []
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {
    searchText: {
      // handler (val) {
      //   this.loadSearchHint(val)
      // },
      handler: debounce(function (val) {
        this.loadSearchHint(val)
      }, 300),
      immediate: true
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
    async loadSearchHint (q) {
      try {
        const res = await getSearchHint(q)
        this.searchReminder = res.data.data.options
      } catch (err) {
        this.$toast('获取相关内容失败')
      }
    },
    hightLinght (text) {
      if (!text) return
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, `<span style="color:blue">${this.searchText}</span>`)
    }
  }
}
</script>

<style scoped lang="less">

</style>
