import React from "react";
import { Link, useParams } from "react-router-dom";
import HtmlParser from "react-html-parser";
import { KeyboardBackspace } from "@mui/icons-material";
import { motion } from "framer-motion";
const ChapterItemDetails = ({ chapterDetails }) => {
  const { subject_id } = useParams();
  return (
    <div className="flex flex-col">
      <Link to={`/subject/${subject_id}`} className="block cursor-pointer">
        <motion.div
          className="flex items-center capitalize text-[#a855f7]"
          whileHover={{
            x: -5,
          }}
        >
          <KeyboardBackspace fontSize="large" />
          <p className="text-[16px]">späť</p>
        </motion.div>
      </Link>
      <h2 className="capitalize">{chapterDetails?.name}</h2>
      <div className="flex flex-col">{HtmlParser(chapterDetails?.content)}</div>
    </div>
  );
};

export default ChapterItemDetails;
