<template>
  <div class="comment-content">
    <van-field
    class="post-field"
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
    />
    <van-button :disabled="!message.length" plain class="post-btn" type="default" size="small" @click="onCommentContent">发布</van-button>
  </div>
</template>

<script>
import { addCommentContent } from '@/api/comment'
export default {
  // 组件名称
  name: 'CommentContent',
  // 局部注册的组件
  components: {},
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  // 组件参数 接收来自父组件的数据
  props: {
    target: {
      type: [Number, String],
      required: true
    }
  },
  // 组件状态值
  data () {
    return {
      message: ''
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
    async onCommentContent () {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认 2000，0 表示不关闭。
      })
      try {
        const res = await addCommentContent({
          target: this.target,
          content: this.message,
          art_id: this.articleId
        })
        this.message = ''
        this.$emit('onPostSuccess', res.data.data)
        this.$toast('发布成功！')
      } catch (err) {
        this.$toast('发布失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-content {
  display: flex;
  align-items: center;
  padding: 16px 0 16px 16px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 75px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    background: #fff;
    &::before {
      display: none;
    }
  }
}
</style>
