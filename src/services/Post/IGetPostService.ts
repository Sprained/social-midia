import { Post } from '../../entities/post/Post'

export interface IGetPostService {
  execute(postId: string): Promise<Post>
}
