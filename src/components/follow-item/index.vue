<template>
    <van-button
    v-if="value"
    class="follow-btn"
    round
    :loading="isFollowShow"
    size="small"
    @click="onFollow"
    >已关注</van-button>
    <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    :loading="isFollowShow"
    size="small"
    icon="plus"
    @click="onFollow"
    >关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  // 组件名称
  name: 'followShow',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleAutId: {
      type: [Number, String, Object],
      required: true
    }
  },
  // 组件状态值
  data () {
    return {
    //   isLoadingShow: true,
      isFollowShow: false
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
    async onFollow () {
      this.isFollowShow = true
      try {
        if (this.value) {
          await deleteFollow(this.articleAutId)
          this.$toast('取关成功')
        } else {
          await addFollow(this.articleAutId)
          this.$toast('关注成功')
        }
        this.$emit('input', !this.value)
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast('不能关注自己')
        }
        this.$toast('请求失败，请稍后重试')
      }
      this.isFollowShow = false
    }
  }
}
</script>

<style scoped lang="less">

</style>
