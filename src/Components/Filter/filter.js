import React from 'react';
import styles from './filter.module.scss';

import { useSearch } from '../../Contexts/SearchContext';

export const FilterComponent = () => {
  const { priceRange, setPriceRange, handleFilter } = useSearch();

  const handleSliderChange = event => {
    setPriceRange([parseInt(event.target.value, 10), priceRange[1]]);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.firstContainer}>
        <h1>FILTER</h1>
        <label htmlFor="priceRange"></label>
        <div>
          <span>Price: Rs.{priceRange[0]}</span>
        </div>
        <input
          type="range"
          id="priceRange"
          min="1"
          max="1100"
          step="1"
          value={priceRange[0]}
          onChange={handleSliderChange}
        />
        <h2>Category</h2>
      </div>

      <div className={styles.checkboxContainer}>
        <label htmlFor="men">
          <input type="checkbox" id="men" onChange={() => handleFilter(0)} />
          <span>Men's Clothing</span>
        </label>

        <label htmlFor="women">
          <input type="checkbox" id="women" onChange={() => handleFilter(1)} />
          <span>Women's Clothing</span>
        </label>

        <label htmlFor="jewel">
          <input type="checkbox" id="jewel" onChange={() => handleFilter(2)} />
          <span>Jewelery</span>
        </label>

        <label htmlFor="electronic">
          <input type="checkbox" id="electronic" onChange={() => handleFilter(3)} />
          <span>Electronics</span>
        </label>
      </div>
    </div>
  );
};
