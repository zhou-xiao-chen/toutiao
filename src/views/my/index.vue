<template>
  <div class="my-container">
    <div class="my-info" v-if="user">
      <div class="my-top">
        <div class="left">
          <van-image
            class="my-image"
            fit="cover"
            :src="userInfo.photo"
            round
          />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button class="right-btn" size="mini" round plain hairline type="default">编辑资料</van-button>
        </div>
      </div>
      <div class="my-bottom">
        <div class="my-data">
          <span class="data-count">{{ userInfo.art_count }}</span>
          <span class="data-container">头条</span>
        </div>
        <div class="my-data">
          <span class="data-count">{{ userInfo.follow_count }}</span>
          <span class="data-container">关注</span>
        </div>
        <div class="my-data">
          <span class="data-count">{{ userInfo.fans_count }}</span>
          <span class="data-container">粉丝</span>
        </div>
        <div class="my-data">
          <span class="data-count">{{ userInfo.like_count }}</span>
          <span class="data-container">获赞</span>
        </div>
      </div>
    </div>
    <div class="my-headr" v-else>
      <div class="my-user" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="">
        <span>登录 / 注册</span>
      </div>
    </div>
    <div class="my-jilu">
      <van-grid :column-num="2" clickable>
        <van-grid-item>
          <i slot="icon" class="toutiao toutiao-shoucang"></i>
          <span slot="text">收藏</span>
        </van-grid-item>
        <van-grid-item>
          <i slot="icon" class="toutiao toutiao-lishi"></i>
          <span slot="text">历史</span>
        </van-grid-item>
      </van-grid>
    </div>
    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell v-if="user" class="logout-cell" clickable title="退出登录" @click="backBtn"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserTnfo } from '@/api/user'
export default {
  // 组件名称
  name: 'MyIndex',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data () {
    return {
      userInfo: {}
    }
  },
  // 计算属性
  computed: {
    ...mapState(['user'])
  },
  // 侦听器
  watch: {},
  // 生命周期钩子   注：没用到的钩子请自行删除
  /**
  * 组件实例创建完成，属性已绑定，但DOM还未生成，el属性还不存在
  */
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  /**
  * el 被新创建的 vm.el 替换，并挂载到实例上去之后调用该钩子。
  * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.el 也在文档内。
  */
  mounted () {},
  // 组件方法
  methods: {
    backBtn () {
      this.$dialog.confirm({
        title: '确认退出码？'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', '')
        })
        .catch(() => {
          // on cancel
          console.log('取消')
        })
    },
    async loadUserInfo () {
      try {
        const res = await getUserTnfo()
        this.userInfo = res.data.data
      } catch (err) {
        this.$toast('获取信息失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .my-headr {
    height: 180px;
    background-image: url('~@/assets/banner.png');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .my-user {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        height: 60px;
        width: 60px;
        margin-bottom: 7px;
      }
      span {
        font-size: 14px;
        color: #fff;
      }
    }
  }
  .my-info {
    height: 180px;
    background-image: url('~@/assets/banner.png');
    background-size: cover;
    .my-top {
      display: flex;
      justify-content: space-between;
      padding: 36px 15px 11px;
      box-sizing: border-box;
      align-items: center;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        .my-image {
          width: 60px;
          height: 60px;
          margin-right: 12px;
        }
        span {
          font-size: 22px;
          color: #fff;
        }
      }
      .right {
        .right-btn {
          width: 80px;
        }
      }
    }
    .my-bottom {
      display: flex;
      .my-data {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .data-count {
          color: #fff;
          font-size: 22px;
        }
        .data-container {
          color: pink;
          font-size: 18px;
        }
      }
    }
  }
  .my-jilu {
    margin-bottom: 5px;
    .toutiao {
      font-size: 22px;
    }
    span {
      font-size: 18px;
    }
  }
  .logout-cell {
    margin-top: 5px;
    text-align: center;
  }
}
</style>
