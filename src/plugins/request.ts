/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { message } from 'antd';
import { history } from '@@/core/history';
import { stringify } from 'querystring';

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  // 请求携带凭证（Cookie）
  credentials: 'include',
  prefix:
    process.env.NODE_ENV === 'production'
      ? 'http://localhost:8080/api'
      : 'http://localhost:8080/api',
  // requestType: 'form',
});

/**
 * 请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  console.log(`do request url = ${url}`);
  return {
    url,
    options: {
      ...options,
      headers: {},
    },
  };
});

/**
 * 响应拦截器
 */
request.interceptors.response.use(async (response, options): Promise<any> => {
  // const res = await response.clone().json();
  // if (res.code === 0) {
  //   return res;
  // }
  // if (res.code === 40100) {
  //   message.error('未登录');
  //   history.replace({
  //     pathname: '/user/login',
  //     search: stringify({
  //       redirect: location.pathname,
  //     }),
  //   });
  // }
  // message.error(res.message);
  return response;
});

export default request;
