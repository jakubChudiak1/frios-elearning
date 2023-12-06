import { Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import StartLesson from "./StartLesson";
import { KeyboardBackspace } from "@mui/icons-material";
import { motion } from "framer-motion";

const SubjectItemDetails = ({ subjectDetails }) => {
  return (
    <>
      {subjectDetails && (
        <div className="relative">
          <div className=" z-10 flex flex-col">
            <Link to={"/"} className="block cursor-pointer md:hidden">
              <motion.div
                className="flex items-center capitalize text-[#a855f7]"
                whileHover={{ x: -5 }}
              >
                <KeyboardBackspace fontSize="large" />
                <p className="text-[16px]">späť</p>
              </motion.div>
            </Link>
            <h2 className="uppercase">{subjectDetails?.name}</h2>
            <div className="my-2 flex flex-col items-baseline gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-1">
                <p className="font-semibold capitalize">vytvoril:</p>
                <p>{subjectDetails?.creators_name}</p>
              </div>
              <div className="flex items-center gap-1">
                <p className="font-semibold capitalize">kategória:</p>
                <p>{subjectDetails?.category_name}</p>
              </div>
              <div className="flex items-center gap-1">
                <p className="font-semibold capitalize">počet kapitol:</p>
                <p>{subjectDetails?.chapter_count}</p>
              </div>
            </div>
            <p className="break-words">{subjectDetails?.description}</p>
            <StartLesson subjectDetails={subjectDetails} />
          </div>
        </div>
      )}
    </>
  );
};
export default SubjectItemDetails;
