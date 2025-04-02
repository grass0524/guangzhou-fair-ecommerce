'use client'

import { Layout, Menu, Button } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  BookOutlined,
  BarsOutlined,
  HomeOutlined,
} from '@ant-design/icons'

const { Sider, Content, Header } = Layout

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  const menuItems = [
    {
      key: '/products/publish',
      icon: <AppstoreOutlined />,
      label: '产品发布',
    },
    {
      key: '/products/manage',
      icon: <UnorderedListOutlined />,
      label: '产品管理',
    },
    {
      key: '/products/catalog',
      icon: <BookOutlined />,
      label: '产品目录',
    },
    {
      key: '/products/categories',
      icon: <BarsOutlined />,
      label: '分类管理',
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        background: '#fff', 
        padding: '0 24px', 
        display: 'flex', 
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        <Button 
          type="link" 
          icon={<HomeOutlined />} 
          onClick={() => router.push('/')}
          style={{ fontSize: '16px' }}
        >
          返回主菜单
        </Button>
      </Header>
      <Layout style={{ marginTop: 64 }}>
        <Sider 
          width={200} 
          theme="light"
          style={{ 
            position: 'fixed',
            left: 0,
            top: 64,
            bottom: 0,
            overflow: 'auto',
            zIndex: 999,
            boxShadow: '2px 0 8px rgba(0,0,0,0.06)'
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
            onClick={({ key }) => router.push(key)}
          />
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Content style={{ 
            background: '#fff', 
            padding: 24, 
            margin: '24px',
            minHeight: 280,
            overflow: 'auto'
          }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
} 