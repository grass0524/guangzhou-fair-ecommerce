'use client'

import { Card, Table, Input, Select, Button, Space, Tag, message } from 'antd'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'

const { Option } = Select

interface Product {
  id: string
  name: string
  category: string
  price: number
  minOrder: number
  status: string
  createTime: string
}

export default function ProductManage() {
  const [searchText, setSearchText] = useState('')
  const [category, setCategory] = useState<string>('')

  const columns = [
    {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => {
        const categoryMap = {
          electronics: '电子产品',
          textiles: '纺织品',
          furniture: '家具',
        }
        return categoryMap[category as keyof typeof categoryMap] || category
      },
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `¥${price.toFixed(2)}`,
    },
    {
      title: '最小起订量',
      dataIndex: 'minOrder',
      key: 'minOrder',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          pending: { color: 'gold', text: '待审核' },
          approved: { color: 'green', text: '已上架' },
          rejected: { color: 'red', text: '已下架' },
        }
        const { color, text } = statusMap[status as keyof typeof statusMap]
        return <Tag color={color}>{text}</Tag>
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Product) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  const mockData: Product[] = [
    {
      id: '1',
      name: '智能手机',
      category: 'electronics',
      price: 2999,
      minOrder: 100,
      status: 'approved',
      createTime: '2024-04-02 10:00:00',
    },
    {
      id: '2',
      name: '棉质T恤',
      category: 'textiles',
      price: 29.9,
      minOrder: 500,
      status: 'pending',
      createTime: '2024-04-02 09:30:00',
    },
  ]

  const handleEdit = (record: Product) => {
    console.log('Edit:', record)
    message.info('编辑功能开发中')
  }

  const handleDelete = (record: Product) => {
    console.log('Delete:', record)
    message.success('删除成功')
  }

  const handleSearch = () => {
    console.log('Search:', { searchText, category })
  }

  return (
    <Card title="产品管理">
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="搜索产品名称"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          placeholder="选择分类"
          value={category}
          onChange={value => setCategory(value)}
          style={{ width: 120 }}
          allowClear
        >
          <Option value="electronics">电子产品</Option>
          <Option value="textiles">纺织品</Option>
          <Option value="furniture">家具</Option>
        </Select>
        <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
          搜索
        </Button>
      </Space>

      <Table columns={columns} dataSource={mockData} rowKey="id" />
    </Card>
  )
} 