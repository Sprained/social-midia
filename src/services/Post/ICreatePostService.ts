import { ICreatePostDto } from '../../dto/post/CreatePost'

export interface ICreatePostService {
  execute(data: ICreatePostDto): Promise<void>
}
