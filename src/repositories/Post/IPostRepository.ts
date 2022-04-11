import { Post } from '../../entities/post/Post'

export interface IPostRepository {
  save(post: Post): Promise<void>
}
