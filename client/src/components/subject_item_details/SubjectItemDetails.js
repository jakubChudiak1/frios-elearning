import StartLesson from "./StartLesson";
import ArrowBack from "../UI/ArrowBack";
import { useSelector } from "react-redux";
import UpdateDescriptionForm from "./UpdateDescriptionForm";

const SubjectItemDetails = ({ subjectDetails }) => {
  const { editModeState } = useSelector((state) => state.editModeState);

  return (
    <>
      {subjectDetails && (
        <div className="relative">
          <div className=" z-10 flex flex-col">
            <ArrowBack link={"/"} showed={"hidden"} />
            <h2 className="uppercase">{subjectDetails?.name}</h2>
            <div className="my-2 flex flex-col items-baseline gap-3 capitalize sm:flex-row sm:items-center">
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
            {editModeState ? (
              <UpdateDescriptionForm subject={subjectDetails} />
            ) : (
              <p className="whitespace-pre break-words">
                {subjectDetails?.description}
              </p>
            )}

            <StartLesson subjectDetails={subjectDetails} />
          </div>
        </div>
      )}
    </>
  );
};
export default SubjectItemDetails;
