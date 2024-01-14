import request from '@/plugins/request';

export async function listTeam(params: API.PageParams, options?: Record<string, any>) {
  return request<API.ListTeamResult>('/admin/team/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateTeam(body: API.Team, options?: Record<string, any>) {
  return request<API.TeamUpdateResult>('/admin/team/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function removeTeam(params: { teamId: number }, options?: Record<string, any>) {
  return request<API.BaseResponse<any>>('/admin/team/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
