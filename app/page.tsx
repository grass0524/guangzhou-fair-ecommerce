'use client'

import { Layout, Menu, Card, Form, Input, Select, Button, Upload, InputNumber, message, Table, Space, Tag, Row, Col, Tree, List, Avatar, Modal, Dropdown, Breadcrumb, Tabs, Popconfirm, Spin, Statistic, Badge, Radio } from 'antd'
import type { MenuProps } from 'antd'
import { useRouter } from 'next/navigation'
import {
  ShopOutlined,
  AppstoreOutlined,
  MessageOutlined,
  TeamOutlined,
  FileSearchOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  PlusOutlined,
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  SwapOutlined,
  BarChartOutlined,
  LoadingOutlined,
  VideoCameraOutlined,
  PictureOutlined,
} from '@ant-design/icons'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { UploadFile } from 'antd/es/upload/interface'
import { DatePicker } from 'antd'
import { TreeSelect } from 'antd'
import { Typography } from 'antd'

const { Header, Sider, Content } = Layout
const { TextArea } = Input
const { Option } = Select

// 产品管理相关接口
interface Product {
  id: string
  name: string
  category: string
  price: number
  minOrder: number
  status: string
  createTime: string
  image?: string
}

interface Category {
  id: string
  name: string
  parentId: string | null
  level: number
  sort: number
  createTime: string
}

export default function Home() {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKey, setSelectedKey] = useState('overview')
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [searchText, setSearchText] = useState('')
  const [category, setCategory] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [contentVisible, setContentVisible] = useState(true)
  const [loading, setLoading] = useState(false)
  const [tableLoading, setTableLoading] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  const menuItems = [
    {
      key: 'overview',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: 'store',
      icon: <ShopOutlined />,
      label: '店铺管理',
      children: [
        { key: 'store-info', label: '店铺信息' },
        { key: 'store-decoration', label: '店铺装修' },
        { key: 'sub-accounts', label: '子账号管理' },
        { key: 'certificates', label: '证书管理' },
      ],
    },
    {
      key: 'products',
      icon: <AppstoreOutlined />,
      label: '产品管理',
      children: [
        { key: 'products/manage', label: '产品管理' },
        { key: 'products/catalog', label: '产品目录' },
      ],
    },
    {
      key: 'trade',
      icon: <SwapOutlined />,
      label: '贸易配对',
      children: [
        { key: 'rfq', label: 'RFQ管理' },
        { key: 'inquiries', label: '定向询盘' },
      ],
    },
    {
      key: 'account',
      icon: <TeamOutlined />,
      label: '账号管理',
      children: [
        { key: 'profile', label: '企业信息' },
        { key: 'membership', label: '会员管理' },
      ],
    },
    {
      key: 'statistics',
      icon: <BarChartOutlined />,
      label: '数据统计',
    },
  ]

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人信息',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '账号设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ]

  const handleMenuClick = ({ key }: { key: string }) => {
    setContentVisible(false)
    setTimeout(() => {
      setSelectedKey(key)
      setContentVisible(true)
    }, 300)
  }

  const handleUserMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'profile':
        setSelectedKey('profile')
        break
      case 'settings':
        setSelectedKey('settings')
        break
      case 'logout':
        message.success('退出成功')
        break
    }
  }

  // 产品发布表单提交
  const onProductPublishFinish = (values: any) => {
    console.log('Success:', values)
    message.success('产品发布成功')
  }

  // 产品管理相关函数
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

  // 产品目录相关函数
  const handleCategorySelect = (selectedKeys: React.Key[]) => {
    setSelectedCategory(selectedKeys[0] as string)
  }

  // 分类管理相关函数
  const handleAddCategory = () => {
    setEditingCategory(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    form.setFieldsValue(category)
    setIsModalVisible(true)
  }

  const handleDeleteCategory = (category: Category) => {
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

  // 产品管理表格列定义
  const productColumns = [
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

  // 分类管理表格列定义
  const categoryColumns = [
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
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEditCategory(record)}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDeleteCategory(record)}>
            删除
          </Button>
        </span>
      ),
    },
  ]

  // 模拟数据
  const mockProducts: Product[] = [
    {
      id: '1',
      name: '智能手机',
      category: 'electronics',
      price: 2999,
      minOrder: 100,
      status: 'approved',
      createTime: '2024-04-02 10:00:00',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: '棉质T恤',
      category: 'textiles',
      price: 29.9,
      minOrder: 500,
      status: 'pending',
      createTime: '2024-04-02 09:30:00',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      name: '办公椅',
      category: 'furniture',
      price: 599,
      minOrder: 50,
      status: 'approved',
      createTime: '2024-04-02 08:30:00',
      image: 'https://via.placeholder.com/150',
    },
  ]

  const mockCategories: Category[] = [
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

  const handleSubmit = async (values: any) => {
    setLoading(true)
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      messageApi.success('保存成功')
    } catch (error) {
      messageApi.error('操作失败,请重试')
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (info: any) => {
    if (info.file.status === 'uploading') {
      setUploadLoading(true)
      return
    }
    if (info.file.status === 'done') {
      setUploadLoading(false)
      messageApi.success(`${info.file.name} 上传成功`)
    } else if (info.file.status === 'error') {
      setUploadLoading(false)
      messageApi.error(`${info.file.name} 上传失败`)
    }
  }

  const renderContent = () => {
    switch (selectedKey) {
      case 'store-info':
        return (
          <Card title="店铺信息">
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                name: '广州某某贸易有限公司',
                type: 'manufacturer',
                location: '广东省广州市',
                mainCategory: 'electronics',
                factoryArea: 5000,
                productionModel: 'OEM',
                qualityControl: 'ISO9001',
              }}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="店铺名称"
                    name="name"
                    rules={[{ required: true, message: '请输入店铺名称' }]}
                  >
                    <Input placeholder="请输入店铺名称" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="公司名称"
                    name="companyName"
                    rules={[{ required: true, message: '请输入公司名称' }]}
                  >
                    <Input placeholder="请输入公司名称" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="店铺类型"
                    name="type"
                    rules={[{ required: true, message: '请选择店铺类型' }]}
                  >
                    <Select placeholder="请选择店铺类型">
                      <Option value="manufacturer">制造商</Option>
                      <Option value="trader">贸易商</Option>
                      <Option value="both">制造商+贸易商</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="所在地区"
                    name="location"
                    rules={[{ required: true, message: '请选择所在地区' }]}
                  >
                    <Select placeholder="请选择所在地区">
                      <Option value="guangdong">广东省</Option>
                      <Option value="fujian">福建省</Option>
                      <Option value="zhejiang">浙江省</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="主营类目"
                name="mainCategory"
                rules={[{ required: true, message: '请选择主营类目' }]}
              >
                <Select placeholder="请选择主营类目">
                  <Option value="electronics">电子产品</Option>
                  <Option value="textiles">纺织品</Option>
                  <Option value="furniture">家具</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="主营产品"
                name="mainProducts"
                rules={[{ required: true, message: '请输入主营产品' }]}
              >
                <Select mode="tags" placeholder="请输入主营产品">
                  <Option value="smartphone">智能手机</Option>
                  <Option value="laptop">笔记本电脑</Option>
                  <Option value="tablet">平板电脑</Option>
                </Select>
              </Form.Item>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="工厂面积(平方米)"
                    name="factoryArea"
                    rules={[{ required: true, message: '请输入工厂面积' }]}
                  >
                    <InputNumber style={{ width: '100%' }} min={0} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="生产模式"
                    name="productionModel"
                    rules={[{ required: true, message: '请选择生产模式' }]}
                  >
                    <Select placeholder="请选择生产模式">
                      <Option value="OEM">OEM</Option>
                      <Option value="ODM">ODM</Option>
                      <Option value="OBM">OBM</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="质量控制"
                name="qualityControl"
                rules={[{ required: true, message: '请选择质量控制' }]}
              >
                <Select mode="multiple" placeholder="请选择质量控制">
                  <Option value="ISO9001">ISO9001</Option>
                  <Option value="ISO14001">ISO14001</Option>
                  <Option value="OHSAS18001">OHSAS18001</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="生产流程"
                name="productionProcess"
                rules={[{ required: true, message: '请上传生产流程' }]}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={({ fileList }) => setFileList(fileList)}
                  beforeUpload={() => false}
                >
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>上传</div>
                  </div>
                </Upload>
              </Form.Item>

              <Form.Item
                label="营业执照"
                name="businessLicense"
                rules={[{ required: true, message: '请上传营业执照' }]}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={({ fileList }) => setFileList(fileList)}
                  beforeUpload={() => false}
                >
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>上传</div>
                  </div>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  保存
                </Button>
              </Form.Item>
            </Form>
          </Card>
        )
      case 'store-decoration':
        return (
          <Card title="店铺装修">
            <Tabs
              defaultActiveKey="home"
              items={[
                {
                  key: 'home',
                  label: '首页',
                  children: (
                    <Form layout="vertical">
                      <Form.Item
                        label="店铺Banner"
                        name="banner"
                        rules={[{ required: true, message: '请上传店铺Banner' }]}
                      >
                        <Upload
                          listType="picture-card"
                          fileList={fileList}
                          onChange={({ fileList }) => setFileList(fileList)}
                          beforeUpload={() => false}
                        >
                          <div>
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>上传</div>
                          </div>
                        </Upload>
                      </Form.Item>

                      <Form.Item
                        label="店铺简介"
                        name="description"
                        rules={[{ required: true, message: '请输入店铺简介' }]}
                      >
                        <TextArea rows={4} placeholder="请输入店铺简介" />
                      </Form.Item>

                      <Form.Item
                        label="产品展示方式"
                        name="displayMode"
                        rules={[{ required: true, message: '请选择产品展示方式' }]}
                      >
                        <Select placeholder="请选择产品展示方式">
                          <Option value="grid">网格展示</Option>
                          <Option value="list">列表展示</Option>
                        </Select>
                      </Form.Item>
                    </Form>
                  ),
                },
                {
                  key: 'product',
                  label: '产品页',
                  children: (
                    <Form layout="vertical">
                      <Form.Item
                        label="产品页模板"
                        name="template"
                        rules={[{ required: true, message: '请选择产品页模板' }]}
                      >
                        <Select placeholder="请选择产品页模板">
                          <Option value="template1">模板一</Option>
                          <Option value="template2">模板二</Option>
                        </Select>
                      </Form.Item>

                      <Form.Item
                        label="产品详情页布局"
                        name="layout"
                        rules={[{ required: true, message: '请选择产品详情页布局' }]}
                      >
                        <Select placeholder="请选择产品详情页布局">
                          <Option value="layout1">布局一</Option>
                          <Option value="layout2">布局二</Option>
                        </Select>
                      </Form.Item>
                    </Form>
                  ),
                },
                {
                  key: 'company',
                  label: '公司介绍',
                  children: (
                    <Form layout="vertical">
                      <Form.Item
                        label="公司介绍"
                        name="companyIntro"
                        rules={[{ required: true, message: '请输入公司介绍' }]}
                      >
                        <TextArea rows={6} placeholder="请输入公司介绍" />
                      </Form.Item>

                      <Form.Item
                        label="公司图片"
                        name="companyImages"
                        rules={[{ required: true, message: '请上传公司图片' }]}
                      >
                        <Upload
                          listType="picture-card"
                          fileList={fileList}
                          onChange={({ fileList }) => setFileList(fileList)}
                          beforeUpload={() => false}
                        >
                          <div>
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>上传</div>
                          </div>
                        </Upload>
                      </Form.Item>
                    </Form>
                  ),
                },
              ]}
            />
          </Card>
        )
      case 'sub-accounts':
        return (
          <Card title="子账号管理">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
              style={{ marginBottom: 16 }}
            >
              添加子账号
            </Button>

            <Table
              columns={[
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
                  render: (role: string) => {
                    const roleMap = {
                      admin: '管理员',
                      editor: '编辑',
                      viewer: '查看者',
                    }
                    return roleMap[role as keyof typeof roleMap]
                  },
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => (
                    <Tag color={status === 'active' ? 'green' : 'red'}>
                      {status === 'active' ? '启用' : '禁用'}
                    </Tag>
                  ),
                },
                {
                  title: '最后登录时间',
                  dataIndex: 'lastLoginTime',
                  key: 'lastLoginTime',
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (_: any, record: any) => (
                    <Space size="middle">
                      <Button type="link" icon={<EditOutlined />}>
                        编辑
                      </Button>
                      <Button type="link" danger icon={<DeleteOutlined />}>
                        删除
                      </Button>
                    </Space>
                  ),
                },
              ]}
              dataSource={[
                {
                  key: '1',
                  username: 'admin001',
                  name: '张三',
                  role: 'admin',
                  status: 'active',
                  lastLoginTime: '2024-04-02 10:00:00',
                },
                {
                  key: '2',
                  username: 'editor001',
                  name: '李四',
                  role: 'editor',
                  status: 'active',
                  lastLoginTime: '2024-04-02 09:30:00',
                },
              ]}
            />

            <Modal
              title="添加子账号"
              open={isModalVisible}
              onOk={() => setIsModalVisible(false)}
              onCancel={() => setIsModalVisible(false)}
            >
              <Form layout="vertical">
                <Form.Item
                  label="用户名"
                  name="username"
                  rules={[{ required: true, message: '请输入用户名' }]}
                >
                  <Input placeholder="请输入用户名" />
                </Form.Item>

                <Form.Item
                  label="姓名"
                  name="name"
                  rules={[{ required: true, message: '请输入姓名' }]}
                >
                  <Input placeholder="请输入姓名" />
                </Form.Item>

                <Form.Item
                  label="角色"
                  name="role"
                  rules={[{ required: true, message: '请选择角色' }]}
                >
                  <Select placeholder="请选择角色">
                    <Option value="admin">管理员</Option>
                    <Option value="editor">编辑</Option>
                    <Option value="viewer">查看者</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="密码"
                  name="password"
                  rules={[{ required: true, message: '请输入密码' }]}
                >
                  <Input.Password placeholder="请输入密码" />
                </Form.Item>
              </Form>
            </Modal>
          </Card>
        )
      case 'certificates':
        return (
          <Card title="证书管理">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
              style={{ marginBottom: 16 }}
            >
              添加证书
            </Button>

            <Table
              columns={[
                {
                  title: '证书名称',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: '证书编号',
                  dataIndex: 'number',
                  key: 'number',
                },
                {
                  title: '发证日期',
                  dataIndex: 'issueDate',
                  key: 'issueDate',
                },
                {
                  title: '有效期至',
                  dataIndex: 'expireDate',
                  key: 'expireDate',
                },
                {
                  title: '发证机构',
                  dataIndex: 'issuer',
                  key: 'issuer',
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => (
                    <Tag color={status === 'valid' ? 'green' : 'red'}>
                      {status === 'valid' ? '有效' : '已过期'}
                    </Tag>
                  ),
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (_: any, record: any) => (
                    <Space size="middle">
                      <Button type="link" icon={<EditOutlined />}>
                        编辑
                      </Button>
                      <Button type="link" danger icon={<DeleteOutlined />}>
                        删除
                      </Button>
                    </Space>
                  ),
                },
              ]}
              dataSource={[
                {
                  key: '1',
                  name: 'ISO9001质量管理体系认证',
                  number: 'ISO9001-2024-001',
                  issueDate: '2024-01-01',
                  expireDate: '2027-01-01',
                  issuer: '中国质量认证中心',
                  status: 'valid',
                },
                {
                  key: '2',
                  name: 'CE认证',
                  number: 'CE-2024-001',
                  issueDate: '2024-02-01',
                  expireDate: '2025-02-01',
                  issuer: 'TÜV南德意志集团',
                  status: 'valid',
                },
              ]}
            />

            <Modal
              title="添加证书"
              open={isModalVisible}
              onOk={() => setIsModalVisible(false)}
              onCancel={() => setIsModalVisible(false)}
            >
              <Form layout="vertical">
                <Form.Item
                  label="证书名称"
                  name="name"
                  rules={[{ required: true, message: '请输入证书名称' }]}
                >
                  <Input placeholder="请输入证书名称" />
                </Form.Item>

                <Form.Item
                  label="证书编号"
                  name="number"
                  rules={[{ required: true, message: '请输入证书编号' }]}
                >
                  <Input placeholder="请输入证书编号" />
                </Form.Item>

                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label="发证日期"
                      name="issueDate"
                      rules={[{ required: true, message: '请选择发证日期' }]}
                    >
                      <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="有效期至"
                      name="expireDate"
                      rules={[{ required: true, message: '请选择有效期' }]}
                    >
                      <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="发证机构"
                  name="issuer"
                  rules={[{ required: true, message: '请输入发证机构' }]}
                >
                  <Input placeholder="请输入发证机构" />
                </Form.Item>

                <Form.Item
                  label="证书文件"
                  name="file"
                  rules={[{ required: true, message: '请上传证书文件' }]}
                >
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={({ fileList }) => setFileList(fileList)}
                    beforeUpload={() => false}
                  >
                    <div>
                      <UploadOutlined />
                      <div style={{ marginTop: 8 }}>上传</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Form>
            </Modal>
          </Card>
        )
      case 'products/manage':
        return (
          <div>
            <Card>
              <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Space>
                  <Input.Search
                    placeholder="搜索产品"
                    allowClear
                    onSearch={(value) => {
                      setTableLoading(true)
                      // 模拟搜索
                      setTimeout(() => setTableLoading(false), 500)
                    }}
                    style={{ width: 200 }}
                  />
                  <Select
                    placeholder="产品分类"
                    style={{ width: 150 }}
                    allowClear
                    onChange={() => {
                      setTableLoading(true)
                      // 模拟筛选
                      setTimeout(() => setTableLoading(false), 500)
                    }}
                  >
                    <Option value="electronics">电子产品</Option>
                    <Option value="furniture">家具</Option>
                  </Select>
                </Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                  发布产品
                </Button>
              </div>
              <Table
                loading={tableLoading}
                columns={[
                  {
                    title: '产品名称',
                    dataIndex: 'name',
                    key: 'name',
                    sorter: true,
                  },
                  {
                    title: '产品分类',
                    dataIndex: 'category',
                    key: 'category',
                    filters: [
                      { text: '电子产品', value: 'electronics' },
                      { text: '家具', value: 'furniture' },
                    ],
                  },
                  {
                    title: '价格',
                    dataIndex: 'price',
                    key: 'price',
                    sorter: true,
                  },
                  {
                    title: '库存',
                    dataIndex: 'stock',
                    key: 'stock',
                    sorter: true,
                  },
                  {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status: string) => (
                      <Tag color={status === 'active' ? 'green' : 'red'}>
                        {status === 'active' ? '已上架' : '已下架'}
                      </Tag>
                    ),
                    filters: [
                      { text: '已上架', value: 'active' },
                      { text: '已下架', value: 'inactive' },
                    ],
                  },
                  {
                    title: '操作',
                    key: 'action',
                    render: (_: any, record: any) => (
                      <Space size="middle">
                        <Button type="link" icon={<EditOutlined />}>
                          编辑
                        </Button>
                        <Popconfirm
                          title="确定要删除这个产品吗?"
                          onConfirm={() => {
                            setTableLoading(true)
                            // 模拟删除
                            setTimeout(() => {
                              setTableLoading(false)
                              messageApi.success('删除成功')
                            }, 500)
                          }}
                          okText="确定"
                          cancelText="取消"
                        >
                          <Button type="link" danger icon={<DeleteOutlined />}>
                            删除
                          </Button>
                        </Popconfirm>
                      </Space>
                    ),
                  },
                ]}
                dataSource={[
                  {
                    key: '1',
                    name: '产品A',
                    category: '电子产品',
                    price: '￥999',
                    stock: 100,
                    status: 'active',
                  },
                  {
                    key: '2',
                    name: '产品B',
                    category: '家具',
                    price: '￥1999',
                    stock: 50,
                    status: 'inactive',
                  },
                ]}
                onChange={(pagination, filters, sorter) => {
                  setTableLoading(true)
                  // 模拟数据加载
                  setTimeout(() => setTableLoading(false), 500)
                }}
              />

              <Modal
                title="发布产品"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={800}
              >
                <Form 
                  layout="vertical"
                  onFinish={(values) => {
                    handleSubmit(values)
                    setIsModalVisible(false)
                  }}
                >
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        label="产品名称"
                        name="name"
                        rules={[{ required: true, message: '请输入产品名称' }]}
                        tooltip="产品的完整名称"
                      >
                        <Input placeholder="请输入产品名称" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="产品分类"
                        name="category"
                        rules={[{ required: true, message: '请选择产品分类' }]}
                        tooltip="选择产品所属的分类"
                      >
                        <TreeSelect
                          treeData={[
                            {
                              title: '电子产品',
                              value: 'electronics',
                              children: [
                                {
                                  title: '手机',
                                  value: 'phone',
                                },
                                {
                                  title: '电脑',
                                  value: 'computer',
                                },
                              ],
                            },
                            {
                              title: '家具',
                              value: 'furniture',
                            },
                          ]}
                          placeholder="请选择产品分类"
                          showSearch
                          treeDefaultExpandAll
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        label="产品价格"
                        name="price"
                        rules={[{ required: true, message: '请输入产品价格' }]}
                        tooltip="产品的销售价格"
                      >
                        <InputNumber
                          style={{ width: '100%' }}
                          min={0}
                          placeholder="请输入产品价格"
                          formatter={(value: number | undefined) => value ? `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}
                          parser={(value: string | undefined) => value ? Number(value.replace(/\￥\s?|(,*)/g, '')) : 0}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="库存数量"
                        name="stock"
                        rules={[{ required: true, message: '请输入库存数量' }]}
                        tooltip="当前可售库存数量"
                      >
                        <InputNumber
                          style={{ width: '100%' }}
                          min={0}
                          placeholder="请输入库存数量"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    label="产品描述"
                    name="description"
                    rules={[{ required: true, message: '请输入产品描述' }]}
                    tooltip="详细的产品介绍信息"
                  >
                    <Input.TextArea 
                      rows={4} 
                      placeholder="请输入产品描述"
                      showCount
                      maxLength={500}
                    />
                  </Form.Item>

                  <Form.Item
                    label="产品图片"
                    name="images"
                    rules={[{ required: true, message: '请上传产品图片' }]}
                    tooltip="支持jpg、png格式，建议尺寸800x800px"
                  >
                    <Upload
                      listType="picture-card"
                      fileList={fileList}
                      onChange={handleUpload}
                      beforeUpload={() => false}
                    >
                      {fileList.length >= 8 ? null : (
                        <div>
                          {uploadLoading ? <LoadingOutlined /> : <UploadOutlined />}
                          <div style={{ marginTop: 8 }}>上传</div>
                        </div>
                      )}
                    </Upload>
                  </Form.Item>

                  <Form.Item>
                    <Space>
                      <Button type="primary" htmlType="submit" loading={loading}>
                        发布
                      </Button>
                      <Button onClick={() => {
                        form.resetFields()
                        setFileList([])
                      }}>
                        重置
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </Modal>
            </Card>
          </div>
        )
      case 'products/catalog':
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
      case 'rfq':
        return <h1>RFQ管理</h1>
      case 'inquiries':
        return <h1>定向询盘</h1>
      case 'profile':
        return <h1>企业信息</h1>
      case 'membership':
        return <h1>会员管理</h1>
      case 'overview':
        return (
          <div>
            <Row gutter={[24, 24]}>
              <Col span={16}>
                <Card title="店铺体检" extra={<span style={{ color: '#999' }}>数据更新于 2025-03-25 20:46:47</span>}>
                  <Row gutter={[16, 16]}>
                    <Col span={16}>
                      <List
                        dataSource={[
                          { status: 'success', text: '基础信息完成度优于均值', action: '去完善 >' },
                          { status: 'success', text: '公司存在风险 (来自第三方检测机构)', action: '去查看 >' },
                          { status: 'error', text: '店铺尚未开通负责人配置', action: '去配置 >' },
                          { status: 'error', text: '客服余额不足', action: '去处理 >' },
                          { status: 'error', text: '店铺活跃度低', action: '去处理 >' },
                          { status: 'error', text: '询价回复速度低于均值', action: '去查看 >' },
                        ]}
                        renderItem={item => (
                          <List.Item
                            actions={[
                              <Button type="link" key="action">
                                {item.action}
                              </Button>
                            ]}
                          >
                            <List.Item.Meta
                              avatar={
                                <div style={{ 
                                  width: 6, 
                                  height: 6, 
                                  borderRadius: '50%', 
                                  background: item.status === 'success' ? '#52c41a' : '#ff4d4f',
                                  marginTop: 8
                                }} />
                              }
                              title={item.text}
                            />
                          </List.Item>
                        )}
                      />
                      <div style={{ marginTop: 24 }}>
                        <div style={{ fontWeight: 'bold', marginBottom: 16 }}>运营建议</div>
                        <List
                          dataSource={[
                            '常更新产品，保持店铺活跃，以提升搜索排名',
                            '店铺处于初始运营阶段，可适当购买广告升级套餐引流',
                            '需求报价及是否完善，可提升采购询价回应度',
                            '多参与平台活动，增加店铺曝光',
                            '保持IM在线，及时回复采购询价问题',
                          ]}
                          renderItem={item => (
                            <List.Item>
                              <Typography.Text>• {item}</Typography.Text>
                            </List.Item>
                          )}
                        />
                      </div>
                    </Col>
                    <Col span={8}>
                      <Card title="店铺体检报告">
                        <div style={{ position: 'relative', width: '100%', height: 200 }}>
                          {/* 这里可以使用Ant Design Charts或其他图表库绘制雷达图 */}
                          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                            <div style={{ fontSize: 24, fontWeight: 'bold', color: '#1890ff' }}>V4</div>
                            <div>当前等级</div>
                          </div>
                        </div>
                        <div style={{ marginTop: 16 }}>
                          <Row justify="space-between" align="middle">
                            <Col>
                              <div>138届线下展位费</div>
                              <div style={{ fontSize: 20, fontWeight: 'bold' }}>500<span style={{ fontSize: 14, color: '#999' }}>元抵扣券</span></div>
                            </Col>
                            <Col>
                              <div>线上会员续费</div>
                              <div style={{ fontSize: 20, fontWeight: 'bold' }}>100<span style={{ fontSize: 14, color: '#999' }}>元抵扣券</span></div>
                            </Col>
                          </Row>
                          <Button type="primary" block style={{ marginTop: 16 }}>{`更多权益 >`}</Button>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="广交会线上平台" extra={<Tag color="blue">经营套餐</Tag>}>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ color: '#999' }}>2024/09/16 - 2025/03/15 有效</div>
                    <Button type="link" style={{ padding: 0 }}>{`立即升级 >`}</Button>
                  </div>
                  <List
                    split={false}
                    dataSource={[
                      { label: '可展示展品数', value: '6/6' },
                      { label: '直播间数', value: '0/2' },
                      { label: '可用账号总数', value: '2/6' },
                      { label: '可使用云空间大小 (GB)', value: '18/20' },
                    ]}
                    renderItem={item => (
                      <List.Item>
                        <Row justify="space-between" style={{ width: '100%' }}>
                          <Col>{item.label}</Col>
                          <Col>{item.value}</Col>
                        </Row>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
              <Col span={24}>
                <Card title="店铺数据">
                  <Row gutter={24}>
                    {[
                      { label: '上架产品数', value: '18', change: '+23天前更新' },
                      { label: '询应价次数', value: '7', change: '2天前处理' },
                      { label: '收到多少枚', value: '1,102', change: '昨日新增: 14 ↑' },
                      { label: '客户总数', value: '158', change: '昨日新增: 2 ↑' },
                      { label: '店铺总浏览量', value: '12,693', change: '昨日新增: 258 ↓' },
                      { label: '店铺浏览人次', value: '9,512', change: '昨日新增: 139 ↑' },
                      { label: '店铺收收藏', value: '572', change: '昨日新增: 18 ↑' },
                      { label: '产品被收藏', value: '998', change: '昨日新增: 15 ↓' },
                    ].map((item, index) => (
                      <Col span={6} key={index}>
                        <Card bordered={false}>
                          <Statistic
                            title={item.label}
                            value={item.value}
                            formatter={value => <span style={{ fontSize: 24 }}>{value}</span>}
                          />
                          <div style={{ color: '#999', fontSize: 12, marginTop: 8 }}>{item.change}</div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
              <Col span={16}>
                <Card title="待处理" extra={<Badge count={6} />}>
                  <Row gutter={24}>
                    <Col span={6}>
                      <Card>
                        <div style={{ color: '#1890ff', marginBottom: 8 }}>贸易配对</div>
                        <div>单把单孔盆龙头</div>
                        <div style={{ color: '#999', fontSize: 12 }}>剩余执行时间：10小时</div>
                      </Card>
                    </Col>
                    <Col span={6}>
                      <Card>
                        <div style={{ color: '#722ed1', marginBottom: 8 }}>询盘</div>
                        <div>单把单孔盆龙头</div>
                        <div style={{ color: '#999', fontSize: 12 }}>剩余执行时间：1天10小时</div>
                      </Card>
                    </Col>
                    <Col span={6}>
                      <Card>
                        <div style={{ color: '#f5222d', marginBottom: 8 }}>审核驳回</div>
                        <div>店铺信息审核</div>
                        <div style={{ color: '#999', fontSize: 12 }}>经营范围与营业执照不符</div>
                      </Card>
                    </Col>
                    <Col span={6}>
                      <Card>
                        <div style={{ color: '#13c2c2', marginBottom: 8 }}>预约洽谈</div>
                        <div>计算器询价洽谈</div>
                        <div style={{ color: '#999', fontSize: 12 }}>2025/03/26 14:00-16:00</div>
                      </Card>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="快捷入口">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Button icon={<AppstoreOutlined />} block>发布产品</Button>
                    </Col>
                    <Col span={12}>
                      <Button icon={<VideoCameraOutlined />} block>发布短视频</Button>
                    </Col>
                    <Col span={12}>
                      <Button icon={<PictureOutlined />} block>素材库</Button>
                    </Col>
                    <Col span={12}>
                      <Button icon={<ShopOutlined />} block>商机库</Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
              <Col span={24}>
                <Card title="平台活动" extra={<Radio.Group defaultValue="all"><Radio.Button value="all">全部</Radio.Button></Radio.Group>}>
                  <List
                    dataSource={[
                      {
                        title: '广交会线上论坛——礼品及装饰品文创设计',
                        type: '行业论坛',
                        time: '4月25日 15:00-17:00',
                        status: '报名中',
                      },
                      {
                        title: '颠覆传统，预见风尚新纪元！"广交会"时尚包"新品发布活动',
                        type: '新品发布',
                        time: '4月25日 15:00-17:00',
                        status: '报名中',
                      },
                    ]}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <Button type="primary" key="join">报名</Button>
                        ]}
                      >
                        <List.Item.Meta
                          avatar={
                            <Image
                              src="/activity-banner.jpg"
                              alt="活动banner"
                              width={120}
                              height={80}
                              style={{ objectFit: 'cover' }}
                            />
                          }
                          title={item.title}
                          description={
                            <>
                              <Tag color="blue">{item.type}</Tag>
                              <span style={{ marginLeft: 8 }}>{item.time}</span>
                            </>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        )
      default:
        return <h1>欢迎使用广州交易会电商系统</h1>
    }
  }

  // 获取面包屑项
  const getBreadcrumbItems = () => {
    const items = []
    const findMenuItem = (key: string, items: any[]): any => {
      for (const item of items) {
        if (item.key === key) {
          return item
        }
        if (item.children) {
          const found = findMenuItem(key, item.children)
          if (found) {
            return found
          }
        }
      }
      return null
    }

    const currentItem = findMenuItem(selectedKey, menuItems)
    if (currentItem) {
      const parentItem = menuItems.find(item => 
        item.children?.some(child => child.key === selectedKey)
      )
      if (parentItem) {
        items.push({
          title: parentItem.label,
          icon: parentItem.icon,
          onClick: () => {
            setContentVisible(false)
            setTimeout(() => {
              setSelectedKey(parentItem.key)
              setContentVisible(true)
            }, 300)
          }
        })
      }
      items.push({
        title: currentItem.label,
        onClick: () => {
          setContentVisible(false)
          setTimeout(() => {
            setSelectedKey(currentItem.key)
            setContentVisible(true)
          }, 300)
        }
      })
    }

    return items
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {contextHolder}
      <Header style={{ 
        background: '#fff', 
        padding: 0, 
        display: 'flex', 
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        <div style={{ width: 200, height: 64, padding: '16px', display: 'flex', alignItems: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 'bold' }}>广交会电商平台</div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ marginRight: 24 }}>
          <Dropdown menu={{ items: userMenuItems, onClick: handleUserMenuClick }} placement="bottomRight">
            <Space style={{ cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} />
              <span>李小草</span>
              <Tag color="blue">店长</Tag>
            </Space>
          </Dropdown>
        </div>
      </Header>
      <Layout style={{ marginTop: 64 }}>
        <Sider 
          width={200} 
          style={{ 
            background: '#fff',
            position: 'fixed',
            left: 0,
            top: 64,
            bottom: 0,
            overflow: 'auto',
            zIndex: 999,
            boxShadow: '2px 0 8px rgba(0,0,0,0.06)'
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            defaultOpenKeys={['store']}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}>
          <Content style={{ 
            background: '#fff', 
            padding: 24, 
            margin: '24px',
            minHeight: 280,
            overflow: 'auto'
          }}>
            <div style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.3s ease-in-out'
            }}>
              <Breadcrumb 
                style={{ marginBottom: 16 }}
                items={getBreadcrumbItems()}
              />
              <Spin spinning={loading}>
                {renderContent()}
              </Spin>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
