import PostRepositoryMongo from '../../repositories/Post/implementations/PostRepositoryMongo'
import { UserNotPermissionDeletePost } from '../../errors/Post/UserNotPermissionDeletePost'
import { IPostRepository } from '../../repositories/Post/IPostRepository'
import { IDeletePostDto } from '../../dto/post/DeletePost'
import { IDeletePostService } from './IDeletePostService'

class DeletePostService implements IDeletePostService {
  constructor(private postRepository: IPostRepository) {}

  async execute(data: IDeletePostDto): Promise<void> {
    const post = await this.postRepository.findOneById(data.postId)

    if (post.user.toString() !== data.userId) {
      throw new UserNotPermissionDeletePost()
    }

    await this.postRepository.delete(data.postId)
  }
}

export default new DeletePostService(PostRepositoryMongo)
