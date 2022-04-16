import PostMongo from '../../../entities/post/implementations/PostMongo'
import { IPostRepository } from '../IPostRepository'
import { Post } from '../../../entities/post/Post'

class PostRepositoryMongo implements IPostRepository {
  async save(post: Post): Promise<void> {
    await PostMongo.create(post)
  }

  async delete(postId: string): Promise<void> {
    await PostMongo.deleteOne({ _id: postId })
  }

  async findOneById(postId: string): Promise<Post> {
    const post = await PostMongo.findById(postId)

    return post
  }
}

export default new PostRepositoryMongo()
