<template>
  <!--
  :to="'/article/' + article.art_id"
  :to="`/article/${article.art_id}`"
   -->
  <van-cell class="article-item"
    :to="{
      name: 'article',
      params: {
        articleId: articles.art_id
      }
    }">
    <div slot="title" class="title van-multi-ellipsis--l2" >{{ articles.title }}</div>
    <div slot="label">
      <div v-if="articles.cover.type === 3" class="cover-wrap">
        <div class="cover-item" v-for="(img, index) in articles.cover.images" :key="index">
          <van-image
          class="cover-item-img"
          :src="img"
          />
        </div>
      </div >
      <div class="label-info-wrap">
        <span>{{ articles.aut_name }}</span>
        <span>{{ articles.comm_count }}评论</span>
        <span>{{ articles.pubdate | relativeTime}}</span>
      </div>
    </div>
    <van-image
    class="right-cover"
    slot="default"
    v-if="articles.cover.type === 1"
    :src="articles.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  // 组件名称
  name: 'ArticleItem',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    articles: {
      type: Object,
      required: true
    }
  },
  // 组件状态值
  data () {
    return {

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
  methods: {}
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    padding-left: 12px;
  }

  .right-cover {
    width: 116px;
    height: 73px;
  }

  .label-info-wrap span {
    font-size: 11px;
    color: #b4b4b4;
    margin-right: 12px;
  }

  .cover-wrap {
    display: flex;
    padding: 15px 0;
    .cover-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 2px;
      }
      .cover-item-img {
        width: 100%;
        height: 73px;
      }
    }
  }
}
</style>
