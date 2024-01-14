import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { message, Tag } from 'antd';
import React, { useRef } from 'react';
import { listTeam, removeTeam, updateTeam } from '@/services/ant-design-pro/teamAPI';

const handleUpdate = async (body: API.Team) => {
  const hide = message.loading('正在保存');
  try {
    const res: API.TeamUpdateResult = await updateTeam(body);
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

const handleRemove = async (teamId: number) => {
  const hide = message.loading('正在删除');
  if (!teamId) return true;
  try {
    const res = await removeTeam({
      teamId,
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

const columns: ProColumns<API.Team>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    valueType: 'digit',
    editable: false,
  },
  {
    title: '名称',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'description',
    ellipsis: true,
  },
  {
    title: '最大人数',
    dataIndex: 'maxNumber',
    ellipsis: true,
    valueType: 'digit',
    align: 'center',
  },
  {
    title: '过期时间',
    dataIndex: 'expireTime',
    ellipsis: true,
    valueType: 'dateTime',
  },
  {
    title: '队长ID',
    dataIndex: 'userId',
    ellipsis: true,
    editable: false,
  },
  {
    title: '创建人ID',
    dataIndex: 'createUserId',
    ellipsis: true,
    editable: false,
  },
  {
    title: '队伍类型',
    dataIndex: 'status',
    ellipsis: true,
    valueType: 'select',
    align: 'center',
    fieldProps: {
      options: [
        { label: <Tag color="default">公开</Tag>, value: 0 },
        { label: <Tag color="success">私密</Tag>, value: 1 },
        { label: <Tag color="purple">加密</Tag>, value: 2 },
      ],
    },
  },
  {
    title: '创建时间',
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

function diffTeam(oldTeam: API.Team, newTeam: API.Team): API.Team {
  const result: API.Team = { id: oldTeam.id };

  for (const key in oldTeam) {
    if (!newTeam.hasOwnProperty(key) || oldTeam[key] !== newTeam[key]) {
      result[key] = newTeam[key];
    }
  }

  for (const key in newTeam) {
    if (!oldTeam.hasOwnProperty(key)) {
      result[key] = newTeam[key];
    }
  }

  return result;
}

const TeamManageTable: React.FC = () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.Team>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params: API.PageParams) => {
        const result = await listTeam(params);
        const teamPage = result.data;
        if (!teamPage) {
          return {
            success: false,
          };
        }
        return {
          data: teamPage?.records,
          success: true,
          total: teamPage?.total,
        };
      }}
      editable={{
        type: 'multiple',
        onSave: async (key, record, originRow) => {
          console.log(diffTeam(originRow, record));
          return handleUpdate(diffTeam(originRow, record));
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
      headerTitle="队伍管理"
    />
  );
};

export default TeamManageTable;
