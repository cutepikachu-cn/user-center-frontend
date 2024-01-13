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
