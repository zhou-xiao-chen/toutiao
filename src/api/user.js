import requset from '@/utils/requset'

export const login = data => {
  return requset({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

export const sendSms = mobile => {
  return requset({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

export const getUserTnfo = () => {
  return requset({
    method: 'GET',
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

export const getUserChannels = () => {
  return requset({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

export const addFollow = target => {
  return requset({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

export const deleteFollow = target => {
  return requset({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}

export const getUserProfile = () => {
  return requset({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

export const updataUserProfile = data => {
  return requset({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

export const updateUserPhoto = data => {
  return requset({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
