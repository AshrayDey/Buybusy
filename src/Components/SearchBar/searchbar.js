import React from 'react';
import styles from './searchbar.module.scss';

import { useSearch } from '../../Contexts/SearchContext';

export const Searchbar = () => {
  const { setQuery, query } = useSearch();

  const handleSearch = event => {
    const inputValue = event.target.value;
    setQuery(inputValue);
  };

  return (
    <div className={styles.container}>
      <div className={styles.Inputs}>
        <input type="text" placeholder="Search" onChange={handleSearch} value={query} />
      </div>
      <div className={styles.dataResult}></div>
    </div>
  );
};
