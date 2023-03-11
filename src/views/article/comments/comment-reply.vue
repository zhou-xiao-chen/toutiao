<template>
  <div class="comment-reply">
    <van-nav-bar :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'">
    <van-icon
     slot="left"
     name="cross"
     @click="$emit('close')"
    />
    </van-nav-bar>
    <CommentItem :comment="comment"/>
    <van-cell title="全部回复" />
    <CommentList :list="commentList" type="c" :source="comment.com_id"></CommentList>
    <div class="post-wrap">
      <van-button class="comment-btn" @click="isPostShow = true" type="default" round size="small"
        >写评论
      </van-button>
      <van-popup v-model="isPostShow" position="bottom">
        <CommentContent :target="comment.com_id" @onPostSuccess="onPostSuccess"></CommentContent>
      </van-popup>
    </div>
  </div>
</template>

<script>
import CommentItem from '@/components/comment-item'
import CommentList from '@/components/comment-list'
import CommentContent from './comment-content.vue'
export default {
  // 组件名称
  name: 'CommentReply',
  // 局部注册的组件
  components: {
    CommentItem,
    CommentList,
    CommentContent
  },
  // 组件参数 接收来自父组件的数据
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  // 组件状态值
  data () {
    return {
      isPostShow: false,
      commentList: []
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
    onPostSuccess (data) {
      // 更新回复的数量
      this.comment.reply_count++
      // 关闭弹层
      this.isPostShow = false
      // 将最新回复的内容展示到列表的顶部
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.comment-reply {
  .post-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 60%;
    }
  }
}
</style>
