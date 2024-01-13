import instance from 'utils/axios/instance.axios';
import { CLASS } from './_constants';

export const inviteTeacherToClass = (body = {}) => instance.post(CLASS.POST_INVITE_TEACHER, body);
export const inviteStudentToClass = (body = {}) => instance.post(CLASS.POST_INVITE_STUDENT, body);
export const getAllClass = () => instance.get(CLASS.GET_ALL_CLASS);
