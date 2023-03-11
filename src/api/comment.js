import requset from '@/utils/requset'

export const getComments = params => {
  return requset({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

export const addLikeComment = target => {
  return requset({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}

export const reLikeCommment = target => {
  return requset({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}

export const addCommentContent = data => {
  return requset({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
