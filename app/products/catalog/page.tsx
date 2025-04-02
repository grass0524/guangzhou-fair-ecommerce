'use client'

import { Card, Row, Col, Tree, List, Avatar, Tag, Button, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'

interface Product {
  id: string
  name: string
  category: string
  price: number
  minOrder: number
  image: string
}

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searchText, setSearchText] = useState('')

  const treeData = [
    {
      title: '电子产品',
      key: 'electronics',
      children: [
        { title: '手机', key: 'electronics-phone' },
        { title: '电脑', key: 'electronics-computer' },
        { title: '配件', key: 'electronics-accessories' },
      ],
    },
    {
      title: '纺织品',
      key: 'textiles',
      children: [
        { title: '服装', key: 'textiles-clothing' },
        { title: '面料', key: 'textiles-fabric' },
        { title: '家纺', key: 'textiles-home' },
      ],
    },
    {
      title: '家具',
      key: 'furniture',
      children: [
        { title: '办公家具', key: 'furniture-office' },
        { title: '家居家具', key: 'furniture-home' },
        { title: '户外家具', key: 'furniture-outdoor' },
      ],
    },
  ]

  const mockProducts: Product[] = [
    {
      id: '1',
      name: '智能手机',
      category: 'electronics-phone',
      price: 2999,
      minOrder: 100,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: '棉质T恤',
      category: 'textiles-clothing',
      price: 29.9,
      minOrder: 500,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      name: '办公椅',
      category: 'furniture-office',
      price: 599,
      minOrder: 50,
      image: 'https://via.placeholder.com/150',
    },
  ]

  const handleCategorySelect = (selectedKeys: React.Key[]) => {
    setSelectedCategory(selectedKeys[0] as string)
  }

  const handleSearch = () => {
    console.log('Search:', { searchText, selectedCategory })
  }

  return (
    <Card title="产品目录">
      <Row gutter={16}>
        <Col span={6}>
          <Card title="产品分类">
            <Tree
              treeData={treeData}
              onSelect={handleCategorySelect}
              defaultExpandAll
            />
          </Card>
        </Col>
        <Col span={18}>
          <Card>
            <Input
              placeholder="搜索产品"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 200, marginBottom: 16 }}
              suffix={<SearchOutlined />}
            />
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={mockProducts}
              renderItem={item => (
                <List.Item>
                  <Card
                    hoverable
                    cover={<Avatar size={150} src={item.image} />}
                  >
                    <Card.Meta
                      title={item.name}
                      description={
                        <>
                          <div>价格: ¥{item.price}</div>
                          <div>最小起订量: {item.minOrder}</div>
                          <Tag color="blue">{item.category}</Tag>
                        </>
                      }
                    />
                    <Button type="primary" style={{ marginTop: 16 }}>
                      查看详情
                    </Button>
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  )
} 