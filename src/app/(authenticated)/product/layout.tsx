"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Layout, Menu, theme, Breadcrumb } from "antd";
import HeaderNav from "./_components/HeaderNav/HeaderNav";
import { FileDoneOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient()); // ensure that the QueryClient instance is created only once

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            color: "black",
            justifyContent: "space-between",
          }}
        >
          <h1 className="text-2xl font-semibold">Logos</h1>

          <HeaderNav />
        </Header>
        <Layout>
          <Sider
            width={200}
            breakpoint="lg"
            collapsedWidth="0"
            style={{ height: "auto" }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100vh",
                backgroundColor: "#101c64",
                padding: "12px 0",
              }}
              items={[
                {
                  key: 1,
                  label: "Menu 1",
                  icon: <FileDoneOutlined />,
                },
                {
                  key: 2,
                  label: "Menu 2",
                  icon: <FileDoneOutlined />,
                },
                {
                  key: 3,
                  label: "Menu 3",
                  icon: <FileDoneOutlined />,
                },
              ]}
            />
          </Sider>
          <Layout style={{ padding: "0 24px", height: "fit-content" }}>
            <Breadcrumb
              style={{ margin: "16px 0" }}
              items={[
                {
                  title: "Master Data",
                },
                {
                  title: "Material",
                },
              ]}
            ></Breadcrumb>
            <Content
              style={{
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default ProductLayout;
