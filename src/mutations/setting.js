import gql from "graphql-tag"

export const CREATE_SETTING = gql`
	mutation createSetting($userId: String!, $name: String!, $value: String!) {
		createSetting(userId: $userId, name: $name, value: $value) {
			id
		}
	}
`

export const UPDATE_SETTING = gql`
	mutation updateSetting($id: String!, $value: String!) {
		updateSetting(id: $id, value: $value) {
			id
		}
	}
`