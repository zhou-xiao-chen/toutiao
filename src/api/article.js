import requset from '@/utils/requset'

export const getArticles = params => {
  return requset({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}
