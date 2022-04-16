import { IDeletePostDto } from '../../dto/post/DeletePost'

export interface IDeletePostService {
  execute(data: IDeletePostDto): Promise<void>
}
