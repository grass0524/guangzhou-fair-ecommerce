'use client'

import { Card, Form, Input, Select, Button, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd/es/upload/interface'
import { useState } from 'react'

const { TextArea } = Input

export default function StoreInfo() {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const onFinish = (values: any) => {
    console.log('Success:', values)
    message.success('保存成功')
  }

  return (
    <Card title="店铺信息">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          storeName: '',
          companyName: '',
          location: '',
          type: '',
          mainCategory: '',
          mainProducts: '',
          factoryArea: '',
          productionModel: '',
          qualityControl: '',
          productionProcess: '',
        }}
      >
        <Form.Item
          label="店铺名称"
          name="storeName"
          rules={[{ required: true, message: '请输入店铺名称' }]}
        >
          <Input placeholder="请输入店铺名称" />
        </Form.Item>

        <Form.Item
          label="公司名称"
          name="companyName"
          rules={[{ required: true, message: '请输入公司名称' }]}
        >
          <Input placeholder="请输入公司名称" />
        </Form.Item>

        <Form.Item
          label="所在地"
          name="location"
          rules={[{ required: true, message: '请选择所在地' }]}
        >
          <Select placeholder="请选择所在地">
            <Select.Option value="guangzhou">广州</Select.Option>
            <Select.Option value="shenzhen">深圳</Select.Option>
            <Select.Option value="dongguan">东莞</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="企业类型"
          name="type"
          rules={[{ required: true, message: '请选择企业类型' }]}
        >
          <Select placeholder="请选择企业类型">
            <Select.Option value="manufacturer">制造商</Select.Option>
            <Select.Option value="trader">贸易商</Select.Option>
            <Select.Option value="both">制造商+贸易商</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="主营类目"
          name="mainCategory"
          rules={[{ required: true, message: '请选择主营类目' }]}
        >
          <Select placeholder="请选择主营类目">
            <Select.Option value="electronics">电子产品</Select.Option>
            <Select.Option value="textiles">纺织品</Select.Option>
            <Select.Option value="furniture">家具</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="主营产品"
          name="mainProducts"
          rules={[{ required: true, message: '请输入主营产品' }]}
        >
          <TextArea rows={4} placeholder="请输入主营产品" />
        </Form.Item>

        <Form.Item
          label="工厂面积"
          name="factoryArea"
        >
          <Input placeholder="请输入工厂面积（平方米）" />
        </Form.Item>

        <Form.Item
          label="生产模式"
          name="productionModel"
        >
          <Select placeholder="请选择生产模式">
            <Select.Option value="oem">OEM</Select.Option>
            <Select.Option value="odm">ODM</Select.Option>
            <Select.Option value="obm">OBM</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="质检人员"
          name="qualityControl"
        >
          <Input placeholder="请输入质检人员数量" />
        </Form.Item>

        <Form.Item
          label="生产工艺"
          name="productionProcess"
        >
          <TextArea rows={4} placeholder="请描述生产工艺" />
        </Form.Item>

        <Form.Item
          label="营业执照"
          name="license"
        >
          <Upload
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>上传文件</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
} 