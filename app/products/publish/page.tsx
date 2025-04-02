'use client'

import { Card, Form, Input, Select, Button, Upload, InputNumber, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd/es/upload/interface'
import { useState } from 'react'

const { TextArea } = Input
const { Option } = Select

export default function ProductPublish() {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const onFinish = (values: any) => {
    console.log('Success:', values)
    message.success('产品发布成功')
  }

  return (
    <Card title="产品发布">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="产品名称"
          name="name"
          rules={[{ required: true, message: '请输入产品名称' }]}
        >
          <Input placeholder="请输入产品名称" />
        </Form.Item>

        <Form.Item
          label="产品分类"
          name="category"
          rules={[{ required: true, message: '请选择产品分类' }]}
        >
          <Select placeholder="请选择产品分类">
            <Option value="electronics">电子产品</Option>
            <Option value="textiles">纺织品</Option>
            <Option value="furniture">家具</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="产品图片"
          name="images"
          rules={[{ required: true, message: '请上传产品图片' }]}
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
          label="产品价格"
          name="price"
          rules={[{ required: true, message: '请输入产品价格' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="请输入产品价格"
            min={0}
            precision={2}
          />
        </Form.Item>

        <Form.Item
          label="最小起订量"
          name="minOrder"
          rules={[{ required: true, message: '请输入最小起订量' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="请输入最小起订量"
            min={1}
          />
        </Form.Item>

        <Form.Item
          label="产品描述"
          name="description"
          rules={[{ required: true, message: '请输入产品描述' }]}
        >
          <TextArea rows={4} placeholder="请输入产品描述" />
        </Form.Item>

        <Form.Item
          label="规格参数"
          name="specifications"
        >
          <TextArea rows={4} placeholder="请输入规格参数" />
        </Form.Item>

        <Form.Item
          label="产品认证"
          name="certifications"
        >
          <Select mode="multiple" placeholder="请选择产品认证">
            <Option value="ce">CE认证</Option>
            <Option value="rohs">RoHS认证</Option>
            <Option value="iso">ISO认证</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            发布产品
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
} 