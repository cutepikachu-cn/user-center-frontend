// @ts-ignore
/* eslint-disable */
import request from '@/plugins/request';

export async function currentUser(options?: { [key: string]: any }) {
  return request<API.LoginResult>('/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function outLogin(options?: { [key: string]: any }) {
  return request<API.BaseResponse<any>>('/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function listUser(params: API.PageParams, options?: { [key: string]: any }) {
  return request<API.ListUserResult>('/admin/user/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateUser(body: API.User, options?: { [key: string]: any }) {
  return request<API.UserUpdateResult>('/admin/user/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function removeUser(params: { userId: number }, options?: { [key: string]: any }) {
  return request<API.BaseResponse<any>>('/admin/user/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
