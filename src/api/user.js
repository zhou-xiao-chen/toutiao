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
