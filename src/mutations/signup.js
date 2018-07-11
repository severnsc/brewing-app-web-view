import gql from "graphql-tag"

export const UPDATE_SIGNUP_ERROR = gql`
  mutation updateSignupError($error: String!) {
    updateSignupError(error: $error) @client
  }
`

export const UPDATE_SIGNUP_USERNAME_ERROR = gql`
  mutation updateSignupUsernameError($bool: Boolean!) {
    updateSignupUsernameError(bool: $bool) @client
  }
`