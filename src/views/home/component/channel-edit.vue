<template>
  <div class="channel-edit">
    <van-cell :border="false" >
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" round size="mini" plain type="primary" @click="isEdit = !isEdit">{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
      class="grid-item"
        v-for="(channel, index) in myChannel"
        :key="index"
        @click="onMyChannels(channel, index)"
      >
      <van-icon v-show="isEdit && channel.name !== '推荐'" slot="icon" class="clear" name="clear"></van-icon>
      <span class="text" :class="{active:  index === active}" slot="text">{{ channel.name }}</span>
      </van-grid-item>
    </van-grid>
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
      class="grid-item"
        v-for="(channels, index) in recommendChannels"
        :key="index"
        icon='plus'
        :text="channels.name"
        @click="addMyChannels(channels)"
    />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addMyChannels, deletaMyChannels } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  // 组件名称
  name: 'ChannelEdit',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    myChannel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  // 组件状态值
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  // 计算属性
  computed: {
    recommendChannels () {
      return this.allChannels.filter(channel => {
        return !this.myChannel.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    },
    ...mapState(['user'])
  },
  // 侦听器
  watch: {},
  // 生命周期钩子   注：没用到的钩子请自行删除
  /**
  * 组件实例创建完成，属性已绑定，但DOM还未生成，el属性还不存在
  */
  created () {
    this.loadAllChannels()
  },
  /**
  * el 被新创建的 vm.el 替换，并挂载到实例上去之后调用该钩子。
  * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.el 也在文档内。
  */
  mounted () {},
  // 组件方法
  methods: {
    async loadAllChannels () {
      try {
        const res = await getAllChannels()
        this.allChannels = res.data.data.channels
      } catch (err) {
        this.$toast('获取频道失败')
      }
    },
    async addMyChannels (channel) {
      this.myChannel.push(channel)
      if (this.user) {
        try {
          await addMyChannels({
            id: channel.id,
            seq: this.myChannel.length
          })
          this.$toast('添加成功')
        } catch (err) {
          this.$toast('添加失败，请稍后重试')
        }
      } else {
        setItem('TOUTIAO_CHANNELS', this.myChannel)
      }
    },
    onMyChannels (channel, index) {
      if (this.isEdit) {
        if (channel.name === '推荐') {
          return
        }
        this.myChannel.splice(index, 1)
        if (index < this.active) {
          this.$emit('updata-active', this.active - 1, true)
        }
        this.deletaChannel(channel.id)
      } else {
        this.$emit('updata-active', index, false)
      }
    },
    async deletaChannel (channelID) {
      if (this.user) {
        try {
          await deletaMyChannels(channelID)
          this.$toast('删除成功')
        } catch (err) {
          this.$toast('删除失败，请稍后重试')
          console.log(err)
        }
      } else {
        setItem('TOUTIAO_CHANNELS', this.myChannel)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 42px 0;
  .title-text {
    font-size: 16px;
    color: #333333;
  }
  /deep/ .my-grid {
    .grid-item {
        .van-icon-clear {
            position: absolute;
            right: -5px;
            top: -5px;
            font-size: 15px;
            color: #cacaca;
            z-index: 2;
        }
    }
}
  .edit-btn {
    width: 60px;
    height: 24px;
    font-size: 13px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 80px;
    height: 43px;
    .van-grid-item__content {
        white-space: nowrap;
        background-color: #f4f5f6;
        .van-grid-item__text, .text {
            font-size: 14px;
            color: #222;
            margin-top: 0;
        }
        .active {
            color: blue;
        }
        .van-grid-item__icon-wrapper {
            position: unset;
            // .clear {
            //   position: absolute;
            //   right: -5px;
            //   top: -5px;
            //   font-size: 15px;
            //   color: #cacaca;
            //   z-index: 2;
            // }
        }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
        .van-grid-item__content {
            flex-direction: row;
            .van-icon-plus {
                font-size: 14px;
                margin-right: 3px;
            }
            // .van-grid-item__text {
            //     margin-top: 0;
            // }
        }
    }
}
}
</style>
