'use client'

import { Card, Table, Button, Modal, Form, Input, Select, message } from 'antd'
import { useState } from 'react'

const { Option } = Select

interface SubAccount {
  id: string
  username: string
  name: string
  role: string
  status: string
  lastLogin: string
}

export default function SubAccounts() {
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingAccount, setEditingAccount] = useState<SubAccount | null>(null)

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '最后登录时间',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: SubAccount) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record)}>
            删除
          </Button>
        </span>
      ),
    },
  ]

  const mockData: SubAccount[] = [
    {
      id: '1',
      username: 'user1',
      name: '张三',
      role: '产品管理员',
      status: '正常',
      lastLogin: '2024-04-02 10:00:00',
    },
    {
      id: '2',
      username: 'user2',
      name: '李四',
      role: '客服',
      status: '正常',
      lastLogin: '2024-04-02 09:30:00',
    },
  ]

  const handleAdd = () => {
    setEditingAccount(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (account: SubAccount) => {
    setEditingAccount(account)
    form.setFieldsValue(account)
    setIsModalVisible(true)
  }

  const handleDelete = (account: SubAccount) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除账号 ${account.username} 吗？`,
      onOk() {
        message.success('删除成功')
      },
    })
  }

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      console.log('Success:', values)
      message.success(editingAccount ? '更新成功' : '添加成功')
      setIsModalVisible(false)
    })
  }

  return (
    <Card title="子账号管理">
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        添加子账号
      </Button>

      <Table columns={columns} dataSource={mockData} rowKey="id" />

      <Modal
        title={editingAccount ? '编辑子账号' : '添加子账号'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select>
              <Option value="product">产品管理员</Option>
              <Option value="service">客服</Option>
              <Option value="operation">运营</Option>
            </Select>
          </Form.Item>

          {!editingAccount && (
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </Card>
  )
} 