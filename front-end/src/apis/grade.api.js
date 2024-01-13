import instance from 'utils/axios/instance.axios';
import { GRADE } from './_constants';

export const getGradeStructure = (classId) =>
  instance.get(GRADE.GET_GRADE_STRUCTURE, { params: { classId: classId } });

export const addGradeComposition = (body = {}) =>
  instance.post(GRADE.POST_ADD_GRADE_COMPOSITION, body);
export const updateGradeComposition = (body = {}) =>
  instance.patch(GRADE.PATCH_UPDATE_GRADE_COMPOSITION, body);
export const deleteGradeComposition = (body = {}) =>
  instance.post(
    GRADE.POST_DELETE_GRADE_COMPOSITION,
    {},
    { params: { gradeCompositionId: body.gradeCompositionId } }
  );

export const getExcelTemplateList = (classId) =>
  instance.get(GRADE.GET_EXCEL_TEMPLATE_LIST, {
    params: { classId: classId },
    responseType: 'blob',
  });

export const getExcelTemplateGrade = (gradeCompositionId) =>
  instance.get(GRADE.GET_EXCEL_TEMPLATE_GRADE, {
    params: { gradeCompositionId: gradeCompositionId },
    responseType: 'blob',
  });

export const exportFileGrade = (classId) =>
  instance.get(GRADE.GET_EXPORT_FILE_GRADE, {
    params: { classId: classId },
    responseType: 'blob',
  });

export const postUploadFileList = (body = {}) => instance.post(GRADE.POST_UPLOAD_FILE_LIST, body);
export const uploadFileGrade = (body = {}) => instance.post(GRADE.POST_UPLOAD_FILE_GRADE, body);

export const getClassGrades = (classId) =>
  instance.get(GRADE.GET_CLASS_GRADES, {
    params: { classId: classId },
  });
export const getGradeOfStudent = (classId, userId) =>
  instance.get(GRADE.GET_GRADE_OF_STUDENT, {
    params: { classId: classId, userId: userId },
  });

export const updateGrade = (body = {}) => instance.post(GRADE.POST_UPDATE_GRADE, body);

export const markGradeCompositionFinal = (body = {}) =>
  instance.post(
    GRADE.POST_MARK_GRADE_COMPOSITION_FINAL,
    {},
    {
      params: { gradeCompositionId: body.gradeCompositionId },
    }
  );

export const getGradeCompositionDetailById = (gradeId) =>
  instance.get(GRADE.GET_GRADE_COMPOSITION_DETAIL_BY_ID, {
    params: { gradeId: gradeId },
  });

export const postComment = (body = {}) => instance.post(GRADE.POST_COMMENT, body);
export const postReviewRequest = (body = {}) => instance.post(GRADE.POST_REVIEW_REQUEST, body);
