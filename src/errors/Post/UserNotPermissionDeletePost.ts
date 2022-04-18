import { Handler } from '../handler'

export class UserNotPermissionDeletePost extends Handler {
  constructor() {
    super(403, `User doesn't have permission to delete the post`)
  }
}
