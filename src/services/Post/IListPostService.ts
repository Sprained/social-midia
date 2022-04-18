import { ListPostDto, ListPostReturnDto } from '../../dto/post/ListPost'

export interface IListPostService {
  execute(data: ListPostDto): Promise<ListPostReturnDto>
}
