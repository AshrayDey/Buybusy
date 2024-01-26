import React from "react";
import styles from "./home.module.scss";

import { Item } from "../Items/items";
import { useEffect } from "react";
import { Searchbar } from "../SearchBar/searchbar";
import { FilterComponent } from "../Filter/filter";
import { Loader } from "../Loader/Loader";

import { useSearch } from "../../Contexts/searchContext";
import { useAuth } from "../../Contexts/authContext";

export default function Home() {
  const { items, setItems, checkboxes, priceRange, query, applyFilter } =
    useSearch();
  const { loading, setLoading } = useAuth();
  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData("https://fakestoreapi.com/products");
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Searchbar />
          <div className={styles.container}>
            <div className={styles.filter}>
              <FilterComponent />
            </div>
            <div className={styles.itemContainer}>
              {items
                .filter((i) =>
                  i.title.toLowerCase().includes(query.toLowerCase())
                )
                .filter((i) => i.price < priceRange[0])
                .filter(
                  (i) =>
                    applyFilter === "All" ||
                    (checkboxes[0] && i.category === "men's clothing") ||
                    (checkboxes[1] && i.category === "women's clothing") ||
                    (checkboxes[2] && i.category === "jewelery") ||
                    (checkboxes[3] && i.category === "electronics")
                )
                .map((item) => (
                  <Item item={item} />
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
