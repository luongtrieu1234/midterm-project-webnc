export const USER = {
  LOGIN: '/users/login',
  SIGNUP: '/users/signup',
  ME: '/users/me',
  UPDATE: '/users/update',
  LOGIN_FACEBOOK: '/users/facebook',
  GET_LIST_NOTIFICATIONS: '/users/list-notifications',
};

export const CLASS = {
  GET_USER_ROLE: '/class/user-role',
  POST_INVITE_TEACHER: '/class/invite-tearcher',
  POST_INVITE_STUDENT: '/class/invite-student',
  GET_ALL_CLASS: '/class/all',
  GET_ALL_CLASSES_OF_USER: '/class/all-classes-of-user',
};
export const ADMIN = {
  POST_UPLOAD_FILE_USER_LIST: '/admin/upload-file-grade',
};

export const GRADE = {
  GET_GRADE_STRUCTURE: '/grade/grade-structure',
  POST_ADD_GRADE_COMPOSITION: '/grade/add-grade-composition',
  PATCH_UPDATE_GRADE_COMPOSITION: '/grade/update-grade-composition',
  POST_DELETE_GRADE_COMPOSITION: '/grade/delete-grade-composition',
  GET_EXCEL_TEMPLATE_LIST: '/grade/excel-template-list',
  GET_EXCEL_TEMPLATE_GRADE: '/grade/excel-template-grade',
  GET_EXPORT_FILE_GRADE: '/grade/export-file-grade',
  POST_UPLOAD_FILE_LIST: '/grade/upload-file-list',
  POST_UPLOAD_FILE_GRADE: '/grade/upload-file-grade',
  GET_READ_FILE: '/grade/read-file',
  GET_CLASS_GRADES: '/grade/class-grades',
  POST_ADD_GRADE: '/grade/add-grade',
  POST_UPDATE_GRADE: '/grade/update-grade',
  POST_MARK_GRADE_COMPOSITION_FINAL: '/grade/mark-grade-composition-final',
  GET_GRADE_OF_STUDENT: '/grade/grade-of-student',
  GET_GRADE_COMPOSITION_DETAIL_BY_ID: '/grade/grade-composition-detail-by-id',
  POST_COMMENT: '/grade/comment',
  POST_REVIEW_REQUEST: '/grade/review-request',
  GET_LIST_REVIEW_REQUEST: '/grade/list-review-request',
};
