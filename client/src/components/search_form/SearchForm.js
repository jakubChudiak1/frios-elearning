import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { useTranslation } from "react-i18next";
const SearchForm = ({ onClose }) => {
  const [searchedText, setSearchedText] = useState("");
  const navigate = useNavigate();
  const searchHandler = (event) => {
    event.preventDefault();
    navigate(`subjects/search?q=${searchedText}`);
    setSearchedText("");
    onClose();
  };
  const { t } = useTranslation();
  return (
    <div className="mt-2 block w-full flex-grow overflow-hidden border bg-gray-100 py-1 lg:mt-0 lg:w-1/3 lg:rounded-2xl">
      <form
        className="flex h-full flex-row-reverse items-center"
        onSubmit={searchHandler}
      >
        <Input
          value={searchedText}
          placeholder={t("navbar.searchSubject")}
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
