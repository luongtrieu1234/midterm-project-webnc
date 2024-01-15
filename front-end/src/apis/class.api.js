import instance from 'utils/axios/instance.axios';
import { CLASS } from './_constants';

export const getUserRole = (classId) =>
  instance.get(CLASS.GET_USER_ROLE, { params: { classId: classId } });
export const inviteTeacherToClass = (body = {}) => instance.post(CLASS.POST_INVITE_TEACHER, body);
export const inviteStudentToClass = (body = {}) => instance.post(CLASS.POST_INVITE_STUDENT, body);
export const getAllClass = () => instance.get(CLASS.GET_ALL_CLASS);
export const getAllClassesOfUser = () => instance.get(CLASS.GET_ALL_CLASSES_OF_USER);
