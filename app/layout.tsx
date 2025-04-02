import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "广州交易会电商系统",
  description: "供应商管理平台",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <ConfigProvider
          locale={zhCN}
          theme={{
            token: {
              colorPrimary: "#1890ff",
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
