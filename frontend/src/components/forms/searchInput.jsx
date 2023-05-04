import { useState } from "react";

export default function SearchInput({ name, placeholder, queryCallback }) {
  const [search, updateSearch] = useState("");
  const [suggestions, updateSuggestions] = useState([
    "Fun",
    "Science",
    "Nature",
    "Cinema",
    "Architecture",
  ]);

  const _updateSuggestions = async (e) => {
    updateSearch(e.target.value);
    // let results = await queryCallback();
    // updateSuggestions(JSON.stringify(results));
    if (suggestions) {
      e.target.nextSibling.classList.remove("hidden");
    } else {
      e.target.nextSibling.classList.add("hidden");
    }
  };
  return (
    <form className="mt-4 py-4 relative">
      <label className="sr-only" htmlFor="search">
        {placeholder}
      </label>
      <input
        value={search}
        type="text"
        id={name}
        placeholder={placeholder}
        onChange={_updateSuggestions}
        className="h-12 border px-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark lg:w-1/2 w-full"
      />
      <div className="absolute rounded mt-2 hidden bg-white w-full lg:w-1/2 z-20 border border-gray-100  divide-y-2 divide-gray-100">
        {suggestions.map((val, idx) => (
          <div
            className="px-2 cursor-pointer py-2 hover:bg-primary-default/70 hover:text-white transition duration-200"
            key={idx}
          >
            {val}
          </div>
        ))}
      </div>
    </form>
  );
}
