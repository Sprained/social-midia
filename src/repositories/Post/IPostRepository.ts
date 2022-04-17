import { ListPostDto } from '../../dto/post/ListPost'
import { Post } from '../../entities/post/Post'

export interface IPostRepository {
  save(post: Post): Promise<void>
  delete(postId: string): Promise<void>
  findOneById(postId: string): Promise<Post>
  list(data: ListPostDto): Promise<Post[]>
  count(): Promise<number>
}
