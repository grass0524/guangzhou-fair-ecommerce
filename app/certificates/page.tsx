'use client'

import { Card, Table, Button, Modal, Form, Input, DatePicker, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import dayjs from 'dayjs'

interface Certificate {
  id: string
  name: string
  number: string
  issueDate: string
  expireDate: string
  issuer: string
  status: string
}

export default function Certificates() {
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null)

  const columns = [
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
      title: '到期日期',
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
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Certificate) => (
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

  const mockData: Certificate[] = [
    {
      id: '1',
      name: 'ISO9001质量管理体系认证',
      number: 'ISO9001-2024-001',
      issueDate: '2024-01-01',
      expireDate: '2027-01-01',
      issuer: '中国质量认证中心',
      status: '有效',
    },
    {
      id: '2',
      name: 'CE认证',
      number: 'CE-2024-002',
      issueDate: '2024-02-01',
      expireDate: '2025-02-01',
      issuer: 'TÜV南德',
      status: '有效',
    },
  ]

  const handleAdd = () => {
    setEditingCertificate(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (certificate: Certificate) => {
    setEditingCertificate(certificate)
    form.setFieldsValue({
      ...certificate,
      issueDate: dayjs(certificate.issueDate),
      expireDate: dayjs(certificate.expireDate),
    })
    setIsModalVisible(true)
  }

  const handleDelete = (certificate: Certificate) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除证书 ${certificate.name} 吗？`,
      onOk() {
        message.success('删除成功')
      },
    })
  }

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      console.log('Success:', values)
      message.success(editingCertificate ? '更新成功' : '添加成功')
      setIsModalVisible(false)
    })
  }

  return (
    <Card title="证书管理">
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        添加证书
      </Button>

      <Table columns={columns} dataSource={mockData} rowKey="id" />

      <Modal
        title={editingCertificate ? '编辑证书' : '添加证书'}
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
            label="证书名称"
            rules={[{ required: true, message: '请输入证书名称' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="number"
            label="证书编号"
            rules={[{ required: true, message: '请输入证书编号' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="issueDate"
            label="发证日期"
            rules={[{ required: true, message: '请选择发证日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="expireDate"
            label="到期日期"
            rules={[{ required: true, message: '请选择到期日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="issuer"
            label="发证机构"
            rules={[{ required: true, message: '请输入发证机构' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="file"
            label="证书文件"
            rules={[{ required: true, message: '请上传证书文件' }]}
          >
            <Upload
              beforeUpload={() => false}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>上传文件</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  )
} 