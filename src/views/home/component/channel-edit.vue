<template>
  <div class="channel-edit">
    <van-cell :border="false" >
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" round size="mini" plain type="primary">编辑</van-button>
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
      class="grid-item"
        v-for="(channel, index) in myChannel"
        :key="index"
        icon="clear"
      >
      <span class="text" :class="{active:  index === active}" slot="text">{{ channel.name }}</span>
      </van-grid-item>
    </van-grid>
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
      class="grid-item"
        v-for="value in 8"
        :key="value"
        icon='plus'
        text="文字"
    />
    </van-grid>
  </div>
</template>

<script>
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
