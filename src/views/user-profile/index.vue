<template>
  <div class="user-profile">
    <van-nav-bar
      class="page-nav-bar"
      title="个人资料"
      left-arrow
      @click-left="$router.go(-1)"
      />
      <input type="file" hidden ref="file" @change="onFile">
      <van-cell title="头像" is-link class="cell-image" @click="$refs.file.click()">
        <van-image
          class="profile-image"
          round
          fit="cover"
          :src="userProfile.photo"
        />
      </van-cell>
      <van-cell title="昵称" is-link :value="userProfile.name" @click="isNameShow = true"/>
      <van-cell title="性别" is-link :value="userProfile.gender === 0 ? '男' : '女'" @click="isGenderShow = true" />
      <van-cell title="生日" is-link :value="userProfile.birthday" @click="isBirthdayShow = true"/>
      <van-popup v-if="isNameShow" v-model="isNameShow" position="bottom" :style="{ height: '100%' }">
        <UpdataName @close="isNameShow = false" v-model="userProfile.name"/>
      </van-popup>
      <van-popup v-model="isGenderShow" position="bottom" >
        <UpdataGender v-if="isGenderShow" @close="isGenderShow = false" v-model="userProfile.gender" />
      </van-popup>
      <van-popup v-if="isBirthdayShow" v-model="isBirthdayShow" position="bottom" >
        <UpdataBirthday @close="isBirthdayShow = false" v-model="userProfile.birthday" />
      </van-popup>
      <van-popup v-model="isPhotoShow" position="bottom" :style="{ height: '100%' }">
        <UpdataImg v-if="isPhotoShow" @close="isPhotoShow = false" :photo="img" @update-photo="userProfile.photo = $event"/>
      </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdataName from './components/updata-name'
import UpdataGender from './components/updata-gender'
import UpdataBirthday from './components/updata-birthday'
import UpdataImg from './components/updata-img'
export default {
  // 组件名称
  name: 'UserProfile',
  // 局部注册的组件
  components: {
    UpdataName,
    UpdataGender,
    UpdataBirthday,
    UpdataImg
  },
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data () {
    return {
      userProfile: {},
      isNameShow: false,
      isGenderShow: false,
      isBirthdayShow: false,
      isPhotoShow: false,
      img: null
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
  created () {
    this.loadUserProfile()
  },
  /**
  * el 被新创建的 vm.el 替换，并挂载到实例上去之后调用该钩子。
  * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.el 也在文档内。
  */
  mounted () {},
  // 组件方法
  methods: {
    async loadUserProfile () {
      try {
        const res = await getUserProfile()
        this.userProfile = res.data.data
      } catch (err) {
        this.$toast('获取信息失败')
      }
    },
    onFile () {
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      this.isPhotoShow = true
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  /deep/.van-icon-arrow-left {
    color: #fff;
  }
  .cell-image {
    display: flex;
    justify-content: center;
    align-items: center;
    .van-cell__value {
      height: 40px;
      line-height: 40px;
      padding-top: 5px;
      box-sizing: border-box;
    }
    .profile-image {
    width: 30px;
    height: 30px;
    }
  }
  .van-popup {
    background: #f5f7f9;
  }
}
</style>
