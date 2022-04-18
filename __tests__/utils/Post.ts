import PostMongo from '../../src/entities/post/implementations/PostMongo'
import { Post } from '../../src/entities/post/Post'

export const createFakePost = async (userId: string) => {
  let post = new Post({ text: 'text', user: userId })

  post = await PostMongo.create(post)

  return post
}
