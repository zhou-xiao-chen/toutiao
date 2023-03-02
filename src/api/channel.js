import requset from '@/utils/requset'

export const getAllChannels = () => {
  return requset({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

export const addMyChannels = channels => {
  return requset({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channels]
    }
  })
}

export const deletaMyChannels = channelID => {
  return requset({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelID}`
  })
}
