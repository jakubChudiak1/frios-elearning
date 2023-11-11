import backdrop from "../../assets/images/coding_backdrop.jpg";
import BackdropImage from "./BackdropImage";
import StartLesson from "./StartLesson";

const SubjectItemDetails = ({ subjectDetails }) => {
  return (
    <div className="relative">
      <div className=" z-10 flex flex-col">
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
  );
};
export default SubjectItemDetails;