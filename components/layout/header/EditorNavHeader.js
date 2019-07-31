import React from "react";
import { Layout, Button } from "antd";
import Link from "next/link";
import "./nav_header.scss";
import getConfig from "next/config";
const {publicRuntimeConfig} = getConfig();
const {DASHBOARD_PATH} = publicRuntimeConfig;

const { Header } = Layout;

const EditorNavHeader = () => {

    return (
      <Header className="editor_nav_header">
        <div className="left">
          <Link href={DASHBOARD_PATH}><Button type="danger">Cancel</Button></Link>
        </div>
        <div className="right">
          <Button type="primary">Publish</Button>
          <Button style={{ marginLeft: "5px" }} type="ghost">Preview</Button>
        </div>
      </Header>
    );
};

export default EditorNavHeader;
