import PostMongo from '../../../entities/post/implementations/PostMongo'
import { IPostRepository } from '../IPostRepository'
import { Post } from '../../../entities/post/Post'

class PostRepositoryMongo implements IPostRepository {
  async save(post: Post): Promise<void> {
    await PostMongo.create(post)
  }
}

export default new PostRepositoryMongo()
