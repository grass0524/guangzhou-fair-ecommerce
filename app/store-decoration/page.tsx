'use client'

import { Card, Tabs, Form, Input, Upload, Button, Select, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'

const { TextArea } = Input

export default function StoreDecoration() {
  const [form] = Form.useForm()
  const [activeTab, setActiveTab] = useState('1')

  const onFinish = (values: any) => {
    console.log('Success:', values)
    message.success('保存成功')
  }

  return (
    <Card title="店铺装修">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: '1',
            label: '首页',
            children: (
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
              >
                <Form.Item
                  label="店铺横幅"
                  name="banner"
                >
                  <Upload
                    listType="picture-card"
                    maxCount={1}
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
                >
                  <TextArea rows={4} placeholder="请输入店铺简介" />
                </Form.Item>

                <Form.Item
                  label="展示产品数量"
                  name="productCount"
                >
                  <Select defaultValue="12">
                    <Select.Option value="8">8个</Select.Option>
                    <Select.Option value="12">12个</Select.Option>
                    <Select.Option value="16">16个</Select.Option>
                    <Select.Option value="20">20个</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    保存
                  </Button>
                </Form.Item>
              </Form>
            ),
          },
          {
            key: '2',
            label: '产品页',
            children: (
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
              >
                <Form.Item
                  label="产品展示方式"
                  name="displayMode"
                >
                  <Select defaultValue="grid">
                    <Select.Option value="grid">网格</Select.Option>
                    <Select.Option value="list">列表</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="每页显示数量"
                  name="pageSize"
                >
                  <Select defaultValue="20">
                    <Select.Option value="12">12个</Select.Option>
                    <Select.Option value="20">20个</Select.Option>
                    <Select.Option value="24">24个</Select.Option>
                    <Select.Option value="32">32个</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    保存
                  </Button>
                </Form.Item>
              </Form>
            ),
          },
          {
            key: '3',
            label: '公司介绍',
            children: (
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
              >
                <Form.Item
                  label="公司简介"
                  name="companyIntro"
                >
                  <TextArea rows={6} placeholder="请输入公司简介" />
                </Form.Item>

                <Form.Item
                  label="发展历程"
                  name="history"
                >
                  <TextArea rows={6} placeholder="请输入发展历程" />
                </Form.Item>

                <Form.Item
                  label="企业文化"
                  name="culture"
                >
                  <TextArea rows={6} placeholder="请输入企业文化" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    保存
                  </Button>
                </Form.Item>
              </Form>
            ),
          },
        ]}
      />
    </Card>
  )
} 