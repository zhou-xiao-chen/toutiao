<template>
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :error.sync="error"
  error-text="请求失败，点击重新加载"
  @load="onLoad"
  >
  <CommentItem v-for="(item, index) in list" :key="index" :comment="item" @onReply="$emit('onReply', $event)"/>
</van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from '@/components/comment-item'
export default {
  // 组件名称
  name: 'CommentList',
  // 局部注册的组件
  components: {
    CommentItem
  },
  // 组件参数 接收来自父组件的数据
  props: {
    source: {
      type: [Number, String],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  // 组件状态值
  data () {
    return {
    //   list: [],
      loading: false,
      error: false,
      finished: false,
      offset: null,
      limit: 15
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
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
    async onLoad () {
      try {
        const res = await getComments({
          type: this.type,
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        this.list.push(...res.data.data.results)
        this.loading = false
        if (res.data.data.results.length) {
          this.offset = res.data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.loading = false
        this.err = true
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
