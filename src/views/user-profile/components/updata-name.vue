<template>
  <div class="updata-name">
    <van-nav-bar
      title="编辑昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="updataName"
      />
      <van-field
        class="filed-name"
        v-model.trim="username"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
  </div>
</template>

<script>
import { updataUserProfile } from '@/api/user'
export default {
  // 组件名称
  name: 'UpdataName',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    value: {
      type: String,
      required: true
    }
  },
  // 组件状态值
  data () {
    return {
      username: this.value
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
    async updataName () {
      const upname = this.username
      if (!upname) {
        this.$toast('昵称不能为空')
        return
      }
      try {
        await updataUserProfile({
          name: upname
        })
        this.$emit('close')
        this.$emit('input', upname)
        this.$toast('更新成功')
      } catch (err) {
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.updata-name {
  .filed-name {
    width: 355px;
    margin: 10px;
    box-sizing: border-box;
  }
}
</style>
