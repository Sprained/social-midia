import PostRepositoryMongo from '../../repositories/Post/implementations/PostRepositoryMongo'
import { IPostRepository } from '../../repositories/Post/IPostRepository'
import { ListPostDto, ListPostReturnDto } from '../../dto/post/ListPost'
import { IListPostService } from './IListPostService'

class ListPostService implements IListPostService {
  constructor(private postRepository: IPostRepository) {}

  async execute(data: ListPostDto): Promise<ListPostReturnDto> {
    const posts = await this.postRepository.list(data)

    const count = await this.postRepository.count()

    return {
      results: posts,
      count,
    }
  }
}

export default new ListPostService(PostRepositoryMongo)
