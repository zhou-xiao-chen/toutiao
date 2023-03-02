<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
      title="每日头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">这是文章标题</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div slot="title" class="user-name">黑马头条号</div>
          <div slot="label" class="publish-date">14小时前</div>
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            >关注</van-button
          >
          <!-- <van-button
              class="follow-btn"
              round
              size="small"
            >已关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content">这是文章内容</div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small"
        >写评论
      </van-button>
      <van-icon class="comment-icon" name="comment-o" badge="123" />
      <van-button class="btn-item" icon="star-o" />
      <van-button class="btn-item" icon="good-job-o" />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.article-container {
  .page-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    /deep/.van-icon-arrow-left {
      color: skyblue
    }
  }
  .article-bottom {
    position: fixed;
    display: flex;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    .comment-btn {
      width: 135px;
    }
    .btn-item {
      border: none;
      padding: 0;
    }
  }
  .main-wrap {
    margin-top: 46px;
    margin-bottom: 45px;
    .loading-wrap {
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .article-detail {
      .article-title {
        font-size: 20px;
        color: #3a3a3a;
        margin-left: 20px;
      }
      .user-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .avatar {
          width: 35px;
          height: 35px;
          margin-right: 8px;
        }
        .user-name {
          font-size: 12px;
        }
        .van-cell__label {
          margin: 0;
          font-size: 11px;
        }
        .follow-btn {
          width: 70px;
          height: 30px;
        }
      }
      .article-content {
        padding: 27px 16px;
        font-size: 20px;
      }
    }
    .error-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 300px;
      .van-icon-failure {
        font-size: 60px;
        color: #b4b4b4;
      }
      .text {
        font-size: 15px;
        color: #666666;
        margin: 16px 0 23px;
      }
    }
  }
}
</style>
