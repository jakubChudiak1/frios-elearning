import StartLesson from "./StartLesson";
import ArrowBack from "../UI/ArrowBack";
import { useSelector } from "react-redux";
import Editor from "../editor/Editor";
import { useGetIsSubjectEditableQuery } from "../../api/endpoints/accessesEndpoints";
import { useUpdateDescriptionMutation } from "../../api/endpoints/subjectsEndpoints";
import HtmlParser from "html-react-parser";
import { useParams } from "react-router-dom";
const SubjectItemDetails = ({ subjectDetails }) => {
  const { editModeState } = useSelector((state) => state.editModeState);
  const { subject_id } = useParams();
  const { data: isEditable } = useGetIsSubjectEditableQuery(subject_id, {
    skip: !editModeState,
  });
  const [updateDescription] = useUpdateDescriptionMutation();

  const updateSubjectsDescriptionHandler = async (data) => {
    await updateDescription({
      subjectId: subject_id,
      description: data,
    });
  };

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
            {editModeState && isEditable ? (
              <Editor
                data={subjectDetails?.description}
                isHandler={true}
                dataHandler={updateSubjectsDescriptionHandler}
                height="h-36"
              />
            ) : (
              <div className="chapter-content whitespace-pre break-words">
                {HtmlParser(
                  subjectDetails?.description
                    ? subjectDetails?.description
                    : "",
                )}
              </div>
            )}

            <StartLesson subjectDetails={subjectDetails} />
          </div>
        </div>
      )}
    </>
  );
};
export default SubjectItemDetails;
