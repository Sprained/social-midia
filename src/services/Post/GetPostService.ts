import PostRepositoryMongo from '../../repositories/Post/implementations/PostRepositoryMongo'
import { IPostRepository } from '../../repositories/Post/IPostRepository'
import { IGetPostService } from './IGetPostService'
import { Post } from '../../entities/post/Post'

class GetPostService implements IGetPostService {
  constructor(private postRepository: IPostRepository) {}

  async execute(postId: string): Promise<Post> {
    let post = await this.postRepository.findOneById(postId, { createdAt: 0, updatedAt: 0, __v: 0 })

    post = await this.postRepository.populatePost(post, { path: 'user', select: 'name' })

    return post
  }
}

export default new GetPostService(PostRepositoryMongo)
