import instance from 'utils/axios/instance.axios';
import { GRADE } from './_constants';

export const getGradeStructure = (classId) =>
  instance.get(GRADE.GET_GRADE_STRUCTURE, { params: { classId: classId } });

export const addGradeComposition = (body = {}) =>
  instance.post(GRADE.POST_ADD_GRADE_COMPOSITION, body);

export const getExcelTemplateList = (classId) =>
  instance.get(GRADE.GET_EXCEL_TEMPLATE_LIST, {
    params: { classId: classId },
    responseType: 'blob',
  });

export const postUploadFileList = (body = {}) => instance.post(GRADE.POST_UPLOAD_FILE_LIST, body);

export const getClassGrades = (classId) =>
  instance.get(GRADE.GET_CLASS_GRADES, {
    params: { classId: classId },
  });

export const updateGrade = (body = {}) => instance.post(GRADE.POST_UPDATE_GRADE, body);
