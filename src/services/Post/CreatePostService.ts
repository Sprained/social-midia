import PostRepositoryMongo from '../../repositories/Post/implementations/PostRepositoryMongo'
import { IPostRepository } from '../../repositories/Post/IPostRepository'
import { ICreatePostDto } from '../../dto/post/CreatePost'
import { ICreatePostService } from './ICreatePostService'
import { Post } from '../../entities/post/Post'

class CreatePostService implements ICreatePostService {
  constructor(private postRepository: IPostRepository) {}

  async execute(data: ICreatePostDto): Promise<void> {
    const post = new Post(data)

    await this.postRepository.save(post)
  }
}

export default new CreatePostService(PostRepositoryMongo)
