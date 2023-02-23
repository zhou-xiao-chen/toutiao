import requset from '@/utils/requset'

export const login = data => {
  return requset({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
