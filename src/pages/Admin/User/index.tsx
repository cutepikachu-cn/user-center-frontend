import { listUser, removeUser, updateUser } from '@/services/ant-design-pro/userAPI';
import { UserOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Avatar, message, Tag } from 'antd';
import React, { useRef } from 'react';
import type { FormValueType } from './components/UpdateForm';

/**
 * @en-US Update user
 * @zh-CN 更新用户
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateUser({});
    hide();
    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.User[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeUser({
      id: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
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
    title: '是否删除',
    dataIndex: 'isDelete',
    ellipsis: true,
    valueType: 'select',
    fieldProps: {
      options: [
        { label: <Tag color="green">正常</Tag>, value: false },
        { label: <Tag color="red">已删除</Tag>, value: true },
      ],
    },
  },
  {
    title: '角色',
    dataIndex: 'role',
    ellipsis: true,
    valueType: 'select',
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
        onSave: async (key, record) => {
          console.log(record);
          return updateUser(record);
        },
        onDelete: async (key) => {
          console.log(key);
          return removeUser({ id: key as number });
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
