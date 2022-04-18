import { IPopulatePostDto } from '../../dto/post/PopulatePost'
import { ISelectFieldDto } from '../../utils/Interfaces'
import { ListPostDto } from '../../dto/post/ListPost'
import { Post } from '../../entities/post/Post'

export interface IPostRepository {
  save(post: Post): Promise<void>
  delete(postId: string): Promise<void>
  findOneById(postId: string, selectField?: ISelectFieldDto): Promise<Post>
  list(data: ListPostDto, selectField?: ISelectFieldDto): Promise<Post[]>
  count(): Promise<number>
  populatePost(posts: Post | Post[], populate: IPopulatePostDto | IPopulatePostDto[]): Promise<any>
}
