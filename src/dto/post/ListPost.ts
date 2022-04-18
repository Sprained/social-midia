import { Post } from '../../entities/post/Post'

export interface ListPostDto {
  page: number
  limit: number
}

export interface ListPostReturnDto {
  results: Post[]
  count: number
}
