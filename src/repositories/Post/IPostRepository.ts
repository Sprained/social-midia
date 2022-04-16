import { Post } from '../../entities/post/Post'

export interface IPostRepository {
  save(post: Post): Promise<void>
  delete(postId: string): Promise<void>
  findOneById(postId: string): Promise<Post>
}
