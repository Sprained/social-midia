export interface ICreatePostDto {
  user: string
  text?: string
  filesUrls?: string[]
  likes?: string[]
  comments?: string[]
}
