import gql from "graphql-tag"

export const UPDATE_TIMERS_TABLE_FILTER = gql`
  mutation updateTimersTableFilter($value: String!) {
    updateTimersTableFilter(value: $value) @client
  }
`

export const UPDATE_TIMERS_TABLE_SORT = gql`
  mutation updateTimersTableSort($cellName: String!) {
    updateTimersTableSort(cellName: $cellName) @client
  }
`

export const UPDATE_TIMERS_TABLE_ITEM_LIMIT = gql`
  mutation updateTimersTableItemLimit($value: Number!) {
    updateTimersTableItemLimit(value: $value) @client
  }
`

export const UPDATE_TIMERS_TABLE_PAGE_NUMBER = gql`
  mutation updateTimersTablePageNumber($type: String!) {
    updateTimersTablePageNumber(type: $type) @client
  }
`