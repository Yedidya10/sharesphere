import { ISearchBar } from './SearchBar'

const base: ISearchBar = {
  setSearchQuery: function (query: string): void {
    throw new Error('Function not implemented.')
  }
}

export const mockSearchBarProps = {
  base,
}
