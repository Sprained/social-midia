import PostMongo from '../../../entities/post/implementations/PostMongo'
import { ListPostDto } from '../../../dto/post/ListPost'
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

  async list(data: ListPostDto): Promise<Post[]> {
    const posts: Post[] = await PostMongo.find({}, { createdAt: 0, updatedAt: 0, __v: 0 })
      .sort({ createdAt: -1 })
      .skip(data.page * data.limit)
      .lean(data.limit)
      .populate({ path: 'user', select: 'name' })

    return posts
  }

  async count(): Promise<number> {
    const countDocument = await PostMongo.countDocuments()

    return countDocument
  }
}

export default new PostRepositoryMongo()
