import React, { ChangeEvent, FormEvent, useState } from 'react';
import { SearchInput } from '../../inputs/SearchInput/SearchInput';
import { ISearchFormProps } from './ISearchFormProps';

export const SearchForm: React.FC<ISearchFormProps> = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newSearch = event.target.value.trim();
    setSearch(newSearch);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSearch(search);
    console.log('Search value:', search);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SearchInput
        label="Search"
        placeholder="Type to search..."
        value={search}
        onChange={handleSearchChange}
        name="search"
      />
    </form>
  );
};
