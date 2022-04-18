import PostRepositoryMongo from '../../repositories/Post/implementations/PostRepositoryMongo'
import { IPostRepository } from '../../repositories/Post/IPostRepository'
import { ListPostDto, ListPostReturnDto } from '../../dto/post/ListPost'
import { IListPostService } from './IListPostService'

class ListPostService implements IListPostService {
  constructor(private postRepository: IPostRepository) {}

  async execute(data: ListPostDto): Promise<ListPostReturnDto> {
    let posts = await this.postRepository.list(data, { createdAt: 0, updatedAt: 0, __v: 0 })

    posts = await this.postRepository.populatePost(posts, { path: 'user', select: 'name' })

    const count = await this.postRepository.count()

    return {
      results: posts,
      count,
    }
  }
}

export default new ListPostService(PostRepositoryMongo)
