import PostMongo from '../../../entities/post/implementations/PostMongo'
import { IPopulatePostDto } from '../../../dto/post/PopulatePost'
import { ISelectFieldDto } from '../../../utils/Interfaces'
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

  async findOneById(postId: string, selectField?: ISelectFieldDto): Promise<Post> {
    const post = await PostMongo.findById(postId, selectField)

    return post
  }

  async list(data: ListPostDto, selectField?: ISelectFieldDto): Promise<Post[]> {
    const posts: Post[] = await PostMongo.find({}, selectField)
      .sort({ createdAt: -1 })
      .skip(data.page * data.limit)
      .lean(data.limit)

    return posts
  }

  async count(): Promise<number> {
    const countDocument = await PostMongo.countDocuments()

    return countDocument
  }

  async populatePost(
    posts: Post | Post[],
    populate: IPopulatePostDto | IPopulatePostDto[]
  ): Promise<any> {
    const populatePosts = await PostMongo.populate(posts, populate)

    return populatePosts
  }
}

export default new PostRepositoryMongo()
