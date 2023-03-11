import requset from '@/utils/requset'

export const getArticles = params => {
  return requset({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}

export const getArticleId = articleId => {
  return requset({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}

export const collectArticle = target => {
  return requset({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

export const reCollectArticle = target => {
  return requset({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}

export const likeArticle = target => {
  return requset({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}

export const reLikeArticle = target => {
  return requset({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
