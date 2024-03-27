import { createContext, useContext, useState } from "react";

export const searchContext = createContext();

export const useSearch = ()=>{
    const value = useContext(searchContext);
    return value;
}

export const SearchContextProvider = ({children}) =>{
    const [items, setItems] = useState([]);
    const [priceRange, setPriceRange] = useState([1100, 2000]);
    const [checkboxes, setCheckboxes] = useState([false,false,false,false])
    const [query,setQuery] = useState('');
    const [applyFilter,setApplyFilter] = useState("All");
    
    const checkboxChange = (index) =>{
        checkboxes[index]=!checkboxes[index];
        setCheckboxes(checkboxes);
    }
    
    const filterTrigger =(index)=>{
      if(checkboxes.every(value => value === false))
      {
        setApplyFilter("All");
      }
      else{
        setApplyFilter("Category");
      }
    }

    const handleFilter = (index) =>{
      checkboxChange(index);
      filterTrigger(index);
    }
    return (
        <searchContext.Provider value={{items,setItems,priceRange, setPriceRange,
        checkboxes, setCheckboxes,handleFilter,query,setQuery,applyFilter,setApplyFilter}}>
            {children}
        </searchContext.Provider>
    )
}
