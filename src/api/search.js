import requset from '@/utils/requset'

export const getSearchHint = q => {
  return requset({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const getSearchResults = params => {
  return requset({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
