import {
  validateUsernamePresenter,
  createUserPresenter
} from "./presenter"
import {
  isUsernameUnique,
  createUser
} from "./adapters/userAdapter"

export const validateUsernameAsync = validateUsernamePresenter(isUsernameUnique)

export const createUserAsync = createUserPresenter(createUser)