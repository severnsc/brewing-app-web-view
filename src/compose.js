import {
  validateUsernamePresenter,
  createUserPresenter,
  loginUserPresenter
} from "./presenter"
import {
  isUsernameUnique,
  createUser,
  loginUser
} from "./adapters/userAdapter"

export const validateUsernameAsync = validateUsernamePresenter(isUsernameUnique)

export const createUserAsync = createUserPresenter(createUser)

export const loginUserAsync = loginUserPresenter(loginUser)