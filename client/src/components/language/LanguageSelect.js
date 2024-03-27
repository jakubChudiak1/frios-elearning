import React from "react";
import { useGetLanguagesQuery } from "../../api/endpoints/languagesEndpoints";

const LanguageSelect = ({ onBlur, onChange, defaultValue }) => {
  const { data: languages } = useGetLanguagesQuery();
  return (
    <select
      name="language_id"
      onBlur={onBlur}
      onChange={onChange}
      className="border border-black px-1 py-2 capitalize outline-none "
      defaultValue={defaultValue}
    >
      {languages?.map((language) => (
        <option key={language?.language_id} value={language?.language_id}>
          {language?.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelect;
