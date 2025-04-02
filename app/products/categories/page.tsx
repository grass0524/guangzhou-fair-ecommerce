'use client'

import { Card, Table, Button, Modal, Form, Input, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'

interface Category {
  id: string
  name: string
  parentId: string | null
  level: number
  sort: number
  createTime: string
}

export default function ProductCategories() {
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '层级',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Category) => (
        <span>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
            删除
          </Button>
        </span>
      ),
    },
  ]

  const mockData: Category[] = [
    {
      id: '1',
      name: '电子产品',
      parentId: null,
      level: 1,
      sort: 1,
      createTime: '2024-04-02 10:00:00',
    },
    {
      id: '2',
      name: '手机',
      parentId: '1',
      level: 2,
      sort: 1,
      createTime: '2024-04-02 10:00:00',
    },
    {
      id: '3',
      name: '纺织品',
      parentId: null,
      level: 1,
      sort: 2,
      createTime: '2024-04-02 10:00:00',
    },
  ]

  const handleAdd = () => {
    setEditingCategory(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    form.setFieldsValue(category)
    setIsModalVisible(true)
  }

  const handleDelete = (category: Category) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除分类"${category.name}"吗？`,
      onOk() {
        console.log('Delete:', category)
        message.success('删除成功')
      },
    })
  }

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      console.log('Success:', values)
      message.success(editingCategory ? '更新成功' : '添加成功')
      setIsModalVisible(false)
    })
  }

  return (
    <Card title="产品分类管理">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        添加分类
      </Button>

      <Table columns={columns} dataSource={mockData} rowKey="id" />

      <Modal
        title={editingCategory ? '编辑分类' : '添加分类'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="分类名称"
            rules={[{ required: true, message: '请输入分类名称' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="parentId"
            label="父级分类"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="level"
            label="层级"
            rules={[{ required: true, message: '请输入层级' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="sort"
            label="排序"
            rules={[{ required: true, message: '请输入排序' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  )
} 