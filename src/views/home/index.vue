<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
      >搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!--
      使用的组件属性说明:
        通过v-model绑定当前激活标签对应的索引值，默认情况下启用第一个标签
        通过animated属性可以开启切换标签内容时的转场动画
        通过swipeable属性可以开启滑动切换标签页
    -->
    <van-tabs swipe-threshold="3" class="channel-tabs" v-model="active" animated swipeable>
        <van-tab :title="channels.name" v-for="channels in myChannels" :key="channels.id">
        <ArticleList :channels="channels" />
        </van-tab>
        <div slot="nav-right" class="placeholder"></div>
        <div slot="nav-right" class="hamburger-btn" @click="isChannelEditShow = true">
            <i class="toutiao toutiao-gengduo"></i>
        </div>
    </van-tabs>
    <van-popup
      v-model="isChannelEditShow"
      closeable
      round
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
    <ChannelEdit :myChannel="myChannels" :active="active" @updata-active="updataActive"></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './component/article-list'
import ChannelEdit from './component/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  // 组件名称
  name: 'HomeIndex',
  // 局部注册的组件
  components: {
    ArticleList,
    ChannelEdit
  },
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data () {
    return {
      // 借助这个变量 来 标识当前所选中的频道
      active: 0,
      myChannels: [],
      isChannelEditShow: false
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
    this.loadUserChannels()
  },
  /**
  * el 被新创建的 vm.el 替换，并挂载到实例上去之后调用该钩子。
  * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.el 也在文档内。
  */
  mounted () {},
  // 组件方法
  methods: {
    async loadUserChannels () {
      try {
        let channels = []
        if (this.user) {
          const res = await getUserChannels()
          channels = res.data.data.channels
        } else {
          const localChannel = getItem('TOUTIAO_CHANNELS')
          if (localChannel) {
            channels = localChannel
          } else {
            const res = await getUserChannels()
            channels = res.data.data.channels
          }
        }
        this.myChannels = channels
      } catch (err) {
        this.$toast('获取频道失败，请稍后重试')
      }
    },
    updataActive (index, isChannelEditShow = true) {
      this.active = index
      this.isChannelEditShow = isChannelEditShow
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-bottom: 50px;
  padding-top: 87px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 270px;
    height: 30px;
    background-color: #5babfb;
    border: none;
    font-size: 14px;
    .van-icon {
      font-size: 16px;
    }
  }
  /deep/ .channel-tabs {
      .van-tabs__wrap {
        height: 40px;
        position: fixed;
        top: 45px;
        left: 0;
        right: 0;
        z-index: 1;
        width: 100%;
      }
      .van-tab {
        min-width: 100px;
        border-right: 1px solid #edeff3;
        font-size: 15px;
        color: #777777;
      }
      .van-tab--active {
        color: #333333;
      }
      .van-tabs__nav {
        padding-bottom: 0;
      }
      .van-tabs__line {
        bottom: 4px;
        width: 15px !important;
        height: 3px;
        background: #3296fa;
      }
      .placeholder {
        flex-shrink: 0;
        width: 33px;
        height: 40px;
      }
      .hamburger-btn {
        position: fixed;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 33px;
        height: 40px;
        background-color: #fff;
        opacity: 0.902;
        i.toutiao {
          font-size: 16px;
        }
        &:before {
          content: "";
          position: absolute;
          left: 0;
          width: 1px;
          height: 29px;
          background-image: url(~@/assets/gradient-gray-line.png);
          background-size: contain;
        }
      }
  }
}
</style>
