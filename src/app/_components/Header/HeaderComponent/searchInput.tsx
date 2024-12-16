"use client";
import DropDownMenu from "../Nav/dropDownNav";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Define the type for suggestion items
interface Suggestion {
  id: number;
  name: string;
}

const SearchInput: React.FC<{ className?: string }> = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const router = useRouter();

  // Prefetch search page
  useEffect(() => {
    router.prefetch("/search");
  }, [router]);

  // Handle search navigation
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      setSearchTerm("");
      router.push(`/search?term=${searchTerm}`);
    }
  };

  // Fetch suggestions based on the search term
  const handleSuggest = async () => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_PRODUCT}/search/suggest?search=${searchTerm}`
      );
      const json: Suggestion[] = await res.json();
      setSuggestions(json);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  // Debounce function to reduce API calls
  const debounce = (func: () => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => func(), delay);
    };
  };

  // Debounced suggestion handler
  const debouncedHandleSuggest = debounce(handleSuggest, 300);

  return (
    <div className={`flex justify-center ${className || ""}`}>
      <DropDownMenu />
      <input
        type="search"
        placeholder="Search..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          debouncedHandleSuggest();
        }}
      />
      <button onClick={handleSearch} className="search-btn">
        Search
      </button>
      {suggestions.length > 0 && (
        <ul className="w-full list-none mt-4 bg-white">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => {
                setSearchTerm(suggestion.name);
                router.push(`/search?term=${suggestion.name}`);
                setSuggestions([]);
              }}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;