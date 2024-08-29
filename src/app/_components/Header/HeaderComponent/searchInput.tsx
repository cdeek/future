"use client";
import DropDownMenu from '../Nav/dropDownNav';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const SearchInput: React.FC<{
  className?: string
}> = props => {
  const { className } = props
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<T[]>([]);
  const router = useRouter();

  useEffect(() => {
   router.prefetch('/search');
  }, []);

  const handleSearch = () => {
   setSearchTerm('')
   router.push(`/search?term=${searchTerm}`);
  }

  const handleSuggest = async () => {
//   if (searchTerm.trim() !== '') {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRODUCT}/search/suggest?search=${searchTerm}`);
      const json = await res.json();
      setSuggestions(json);
    } catch (error) {
       console.error(error);
      }
   // } else {
   //  setSuggestions([]);
   // }
  };

  return(
       <div className={`text-center mx-auto ${className}`}>
           <DropDownMenu />
           <input 
             type="search" 
             placeholder="Search..." 
             className="search-input"
             value={searchTerm}
             onKeyDown={(e) => {
              setSearchTerm(e.target.value)
              handleSuggest()
             }}
           />
           <button onClick={handleSearch} className="search-btn">Search</button>
           { suggestions &&
            <ul className="w-full list-none mt-4 bg-white">
             {suggestions.map((suggestion, index) => (
               <li onClick={() => {
                handleSearch();
               }} key={index} className="p-2">
                 {suggestion}
               </li>
             ))}
           </ul>
           }
         </div>
    )
}

export default SearchInput;