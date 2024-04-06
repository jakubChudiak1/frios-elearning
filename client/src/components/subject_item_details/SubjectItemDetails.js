import StartLesson from "./StartLesson";
import ArrowBack from "../UI/ArrowBack";
import { useSelector } from "react-redux";
import Editor from "../editor/Editor";
import { useGetIsSubjectEditableQuery } from "../../api/endpoints/accessesEndpoints";
import { useUpdateDescriptionMutation } from "../../api/endpoints/subjectsEndpoints";
import HtmlParser from "html-react-parser";
import { useParams } from "react-router-dom";
import SubjectUserButton from "./SubjectUserButton";
import { useTranslation } from "react-i18next";
const SubjectItemDetails = ({ subjectDetails }) => {
  const { editModeState } = useSelector((state) => state.editModeState);
  const { subject_id, lang } = useParams();
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
  const { t } = useTranslation();
  return (
    <>
      {subjectDetails && (
        <div className="relative">
          <div className=" z-10 flex flex-col">
            <ArrowBack link={`/${lang}`} showed={"hidden"} />
            <h2 className="uppercase">{subjectDetails?.name}</h2>
            <div className="my-2 flex flex-col items-baseline gap-3 capitalize sm:flex-col md:flex-row md:items-center">
              <div className="flex items-center gap-1">
                <p className="font-semibold capitalize">
                  {t("subjectDetails.createdBy")}:
                </p>
                <p>{subjectDetails?.creators_name}</p>
              </div>
              <div className="flex items-center gap-1">
                <p className="font-semibold capitalize">
                  {t("subjectDetails.category")}:
                </p>
                <p>{subjectDetails?.category_name}</p>
              </div>
              <div className="flex items-center gap-1">
                <p className="font-semibold capitalize">
                  {t("subjectDetails.chaptersCount")}:
                </p>
                <p>{subjectDetails?.chapter_count}</p>
              </div>
              <div className="flex items-center gap-1">
                <p className="font-semibold capitalize">
                  {t("subjectDetails.language")}:
                </p>
                <p>{subjectDetails?.language_name}</p>
              </div>
            </div>
            {editModeState && isEditable ? (
              <Editor
                data={subjectDetails?.description}
                isHandler={true}
                dataHandler={updateSubjectsDescriptionHandler}
                height="h-60"
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

            <div className="flex gap-2">
              <StartLesson subjectDetails={subjectDetails} />
              {editModeState && isEditable && !subjectDetails?.is_public && (
                <SubjectUserButton />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SubjectItemDetails;
