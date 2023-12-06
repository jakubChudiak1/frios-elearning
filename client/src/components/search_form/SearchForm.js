import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Button from "../UI/Button";
import Input from "../UI/Input";

const SearchForm = ({ onClose }) => {
  const [searchedText, setSearchedText] = useState("");
  const navigate = useNavigate();

  const searchHandler = (event) => {
    event.preventDefault();
    navigate(`/subjects/search?q=${searchedText}`);
    setSearchedText("");
    onClose();
  };

  return (
    <div className="mt-2 block w-full flex-grow overflow-hidden border bg-gray-100 py-1 md:mt-0 md:w-1/3 md:rounded-2xl">
      <form
        className="flex h-full flex-row-reverse items-center"
        onSubmit={searchHandler}
      >
        <Input
          value={searchedText}
          placeholder={"Hľadajte predmety"}
          className="w-full flex-1 bg-transparent pl-2 outline-none"
          onChange={(event) => {
            setSearchedText(event.target.value);
          }}
        />
        <Button disabled={searchedText.length === 0} className="pl-1">
          <SearchIcon />
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;
