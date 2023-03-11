<template>
  <div class="updata-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="this.value"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>

<script>
import { updataUserProfile } from '@/api/user'
export default {
  // 组件名称
  name: 'UptadaGender',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  // 组件状态值
  data () {
    return {
      columns: ['男', '女'],
      usergender: this.value
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
    async onConfirm (value, index) {
      const usergender = this.usergender
      try {
        await updataUserProfile({
          gender: usergender
        })
        this.$emit('close')
        this.$emit('input', usergender)
        this.$toast('更新成功')
      } catch (err) {
        this.$toast('更新失败')
      }
    },
    onChange (picker, value, index) {
      this.usergender = index
    }
  }
}
</script>

<style scoped lang="less">

</style>
