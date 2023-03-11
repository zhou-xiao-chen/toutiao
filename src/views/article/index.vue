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
      <div ref="loadingWrap" class="loading-wrap" v-if="isLoadingShow">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleDetalis.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleDetalis.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleDetalis.aut_photo"
          />
          <div slot="title" class="user-name">{{ articleDetalis.aut_name }}</div>
          <div slot="label" class="publish-date">{{ articleDetalis.pubdate | relativeTime }}</div>
          <followShow class="follow-btn" v-model="articleDetalis.is_followed" :articleAutId="articleDetalis.aut_id"/>
          <!-- <van-button
          v-if="articleDetalis.is_followed"
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
            >关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div ref="article-content" class="article-content markdown-body" v-html="articleDetalis.content"></div>
        <van-divider>正文结束</van-divider>
        <CommentList :list="allComment" :source="articleDetalis.art_id" @onReply="onReplyShow"/>
        <!-- 底部区域 -->
        <div v-show="articleDetalis.title" class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small" @click="isCommentContent = true"
            >写评论
          </van-button>
          <van-icon class="comment-icon" name="comment-o" :badge="articleDetalis.comm_count" />
          <!-- <van-button class="btn-item" icon="star-o" /> -->
          <collectArticle v-model="articleDetalis.is_collected" :articleAutId="articleDetalis.art_id" class="btn-item"/>
          <LikeArticle v-model="articleDetalis.attitude" :articleAutId="articleDetalis.art_id" class="btn-item"/>
          <!-- <van-button  class="btn-item" icon="good-job-o" /> -->
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <van-popup v-model="isCommentContent" position="bottom" >
          <CommentContent :target="articleDetalis.art_id" @onPostSuccess="successComment"/>
        </van-popup>
        <van-popup v-model="isReplyShow" position="bottom" :style="{ height: '80%' }" >
          <CommentReply v-if="isReplyShow" :comment="replyComment"  @close="isReplyShow = false"></CommentReply>
        </van-popup>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { getArticleId } from '@/api/article'
import { ImagePreview } from 'vant'
// import { addFollow, deleteFollow } from '@/api/user'
import followShow from '@/components/follow-item'
import collectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import CommentList from '@/components/comment-list'
import CommentContent from './comments/comment-content'
import CommentReply from './comments/comment-reply.vue'

export default {
  name: 'ArticleIndex',
  components: {
    followShow,
    collectArticle,
    LikeArticle,
    CommentList,
    CommentContent,
    CommentReply
  },
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      articleDetalis: {},
      isLoadingShow: true,
      errStatus: 0,
      isCommentContent: false,
      allComment: [],
      isReplyShow: false,
      replyComment: {}
      // isFollowShow: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle(this.articleId)
  },
  mounted () {},
  methods: {
    async loadArticle (id) {
      this.isLoadingShow = true
      try {
        const res = await getArticleId(id)
        this.articleDetalis = res.data.data
        // console.log(this.$refs['article-content'])
        setTimeout(() => {
          this.previewImage()
        }, 0)
        // this.previewImage()
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        console.log(err)
        this.$toast('获取文章失败')
      }
      this.isLoadingShow = false
    },
    previewImage () {
      const imges = this.$refs['article-content'].querySelectorAll('img')
      const images = []
      imges.forEach((img, index) => {
        images.push(img.src)
        img.addEventListener('click', function () {
          ImagePreview({
            images,
            startPosition: index
          })
        })
      })
    },
    successComment (data) {
      this.isCommentContent = false
      this.allComment.unshift(data.new_obj)
      this.articleDetalis.comm_count++
    },
    onReplyShow (comment) {
      this.isReplyShow = true
      this.replyComment = comment
    }
    // async onFollow () {
    //   this.isFollowShow = true
    //   try {
    //     if (this.articleDetalis.is_followed) {
    //       await deleteFollow(this.articleDetalis.aut_id)
    //       this.$toast('取关成功')
    //     } else {
    //       await addFollow(this.articleDetalis.aut_id)
    //       this.$toast('关注成功')
    //     }
    //     this.articleDetalis.is_followed = !this.articleDetalis.is_followed
    //   } catch (err) {
    //     if (err.response && err.response.status === 400) {
    //       this.$toast('不能关注自己')
    //     }
    //     this.$toast('请求失败，请稍后重试')
    //   }
    //   this.isFollowShow = false
    // }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
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
        box-sizing: border-box;
        padding: 27px 16px;
        font-size: 18px;
        word-break: break-all;
        overflow: auto;
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
