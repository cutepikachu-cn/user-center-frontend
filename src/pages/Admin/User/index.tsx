import { UserOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Avatar, message, Tag } from 'antd';
import React, { useRef } from 'react';
import { listUser, removeUser, updateUser } from '@/services/ant-design-pro/userAPI';

const handleUpdate = async (body: API.User) => {
  const hide = message.loading('正在保存');
  try {
    const res: API.UserUpdateResult = await updateUser(body);
    if (res.code !== 0) {
      throw new Error();
    }
    hide();
    message.success('编辑成功');
    return true;
  } catch (error) {
    hide();
    message.error('编辑失败，请重试!');
    return false;
  }
};

const handleRemove = async (userId: number) => {
  const hide = message.loading('正在删除');
  if (!userId) return true;
  try {
    const res = await removeUser({
      userId,
    });
    if (res.code !== 0) {
      throw new Error();
    }
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const columns: ProColumns<API.User>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    valueType: 'digit',
    editable: false,
  },
  {
    title: '账户',
    dataIndex: 'account',
    ellipsis: true,
    editable: false,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    ellipsis: true,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    ellipsis: true,
    valueType: 'avatar',
    render: (_, record) => (
      <Avatar
        src={record.avatarUrl ? record.avatarUrl : null}
        icon={record.avatarUrl ? <UserOutlined /> : null}
      />
    ),
  },
  {
    title: '个人介绍',
    dataIndex: 'profile',
    ellipsis: true,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    ellipsis: true,
    valueType: 'select',
    align: 'center',
    fieldProps: {
      options: [
        { label: '男', value: true },
        { label: '女', value: false },
      ],
    },
  },
  {
    title: '年龄',
    dataIndex: 'age',
    ellipsis: true,
    valueType: 'digit',
    align: 'center',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    ellipsis: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    ellipsis: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    ellipsis: true,
    valueType: 'select',
    align: 'center',
    fieldProps: {
      options: [{ label: <Tag color="green">正常</Tag>, value: 0 }],
    },
  },
  {
    title: '注册时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    ellipsis: true,
    editable: false,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    valueType: 'dateTime',
    ellipsis: true,
    editable: false,
  },
  {
    title: '角色',
    dataIndex: 'role',
    ellipsis: true,
    valueType: 'select',
    align: 'center',
    fieldProps: {
      options: [
        { label: <Tag color="green">普通用户</Tag>, value: 0 },
        { label: <Tag color="blue">管理员</Tag>, value: 1 },
      ],
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
    ],
  },
];

function diffUser(oldUser: API.User, newUser: API.User): API.User {
  const result: API.User = { id: oldUser.id };

  for (const key in oldUser) {
    if (!newUser.hasOwnProperty(key) || oldUser[key] !== newUser[key]) {
      result[key] = newUser[key];
    }
  }

  for (const key in newUser) {
    if (!oldUser.hasOwnProperty(key)) {
      result[key] = newUser[key];
    }
  }

  return result;
}

const UserManageTable: React.FC = () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.User>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params: API.PageParams) => {
        const result = await listUser(params);
        const userPage = result.data;
        if (!userPage) {
          return {
            success: false,
          };
        }
        return {
          data: userPage?.records,
          success: true,
          total: userPage?.total,
        };
      }}
      editable={{
        type: 'multiple',
        onSave: async (key, record, originRow) => {
          console.log(diffUser(originRow, record));
          return handleUpdate(diffUser(originRow, record));
        },
        onDelete: async (key) => {
          console.log(key);
          return handleRemove(key as number);
        },
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 5,
        pageSizeOptions: [5, 10],
      }}
      dateFormatter="string"
      headerTitle="用户管理"
    />
  );
};

export default UserManageTable;
