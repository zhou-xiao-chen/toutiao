<template>
  <div class="article-list">
    <van-pull-refresh v-model="isLoading" :success-text="successText" @refresh="onRefresh">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
      >
      <ArticleItem v-for="(article, index) in list" :key="index" :articles="article" />
      <!-- <van-cell v-for="(article, index) in list" :key="index" :title="article.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  // 组件名称
  name: 'ArticleList',
  // 局部注册的组件
  components: {
    ArticleItem
  },
  // 组件参数 接收来自父组件的数据
  props: {
    channels: {
      type: Object,
      required: true
    }
  },
  // 组件状态值
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false,
      successText: ''
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
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const res = await getArticles({
          channel_id: this.channels.id,
          timestamp: this.timestamp || Date.now()
        })
        this.list.push(...res.data.data.results)
        this.loading = false
        if (res.data.data.results.length) {
          this.timestamp = res.data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        console.log('数据加载失败', err)
        this.loading = false
        this.error = true
      }
    },
    async onRefresh () {
      try {
        const res = await getArticles({
          channel_id: this.channels.id,
          timestamp: Date.now()
        })
        this.list.unshift(...res.data.data.results)
        this.isLoading = false
        this.successText = '更新成功'
      } catch (err) {
        this.isLoading = false
        this.successText = '刷新失败'
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
    height: 79vh;
    overflow-y: auto;
}
</style>
