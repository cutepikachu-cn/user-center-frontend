// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    id?: number;
    account?: string;
    nickname?: string;
    avatarUrl?: string;
    profile?: string;
    gender?: boolean;
    age?: number;
    phone?: string;
    email?: string;
    createTime?: Record<string, unknown>;
    role?: number;
    tags?: Record<string, unknown>[];
  };
  type User = {
    id?: number;
    account?: string;
    nickname?: string;
    avatarUrl?: string;
    profile?: string;
    gender?: boolean;
    age?: number;
    phone?: string;
    email?: string;
    status?: number;
    createTime?: Record<string, unknown>;
    updateTime?: Record<string, unknown>;
    isDelete?: boolean;
    role?: number;
    tags?: Record<string, unknown>[];
  };
  type Team = {
    id: number;
    name: string;
    description: string;
    maxNumber: number;
    expireTime: Record<string, unknown>;
    userId: number;
    createUserId: number;
    status: number;
    tags: Record<string, unknown>[];
    createTime: Record<string, unknown>;
    updateTime: Record<string, unknown>;
    isDelete: boolean;
  };

  type Page<T> = {
    size: number;
    records: T[];
    current: number;
    total: number;
    pages: number;
  };
  type BaseResponse<T> = {
    code?: number;
    message?: string;
    data?: T;
  };

  type PageParams = {
    current?: number;
    size?: number;
  };
  type LoginParams = {
    account?: string;
    password?: string;
  };

  type LoginResult = BaseResponse<CurrentUser>;
  type ListUserResult = BaseResponse<Page<User>>;
  type ListTeamResult = BaseResponse<Page<Team>>;

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
