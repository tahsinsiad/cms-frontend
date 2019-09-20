import React, { Fragment } from "react";
import {
    Tabs,
    Button,
    Row,
    Col,
    Form,
    Input,
    Avatar,
    Upload,
    Icon,
    Select
} from "antd";

const { TextArea } = Input;
const { Option } = Select;
const InputGroup = Input.Group;

const BasicSetting = () => {
    const handleChange = value => {
        console.log(`selected ${value}`);
    };
    return (
        <Fragment>
            <Row>
                <Col span={18} push={8}>
                    <Avatar size={160} icon="user" /> <br />
                    <Upload>
                        <Button style={{ marginTop: 10, marginLeft: 5 }}>
                            <Icon type="upload" /> Change Avatar
                        </Button>
                    </Upload>
                    ,
                </Col>
                <Col span={6} pull={18}>
                    <Form layout="horizontal">
                        <Form.Item label="Change User Name:">
                            <Input placeholder="Change your name" />
                        </Form.Item>
                        <Form.Item label="Change Email Address:" type="email">
                            <Input placeholder="Chnage your email address" />
                        </Form.Item>
                        <Form.Item label="Update Bio:">
                            <TextArea
                                rows={4}
                                placeholder="Write your bio here"
                            />
                        </Form.Item>
                        <Form.Item label="Country/Region:">
                            <Select
                                defaultValue="Select Region"
                                style={{ width: 180 }}
                                onChange={handleChange}
                            >
                                <Option value="Bangladesh">Bangladesh</Option>
                                <Option value="India">India</Option>
                                <Option value="Pakistan">Pakistan</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Province or city:">
                            <InputGroup compact>
                                <Select
                                    defaultValue="Select Region"
                                    style={{ width: "50%" }}
                                    onChange={handleChange}
                                >
                                    <Option value="Bangladesh">
                                        Bangladesh
                                    </Option>
                                    <Option value="India">India</Option>
                                    <Option value="Pakistan">Pakistan</Option>
                                </Select>
                                <Select
                                    defaultValue="Select Region"
                                    style={{ width: "50%" }}
                                    onChange={handleChange}
                                >
                                    <Option value="Bangladesh">
                                        Bangladesh
                                    </Option>
                                    <Option value="India">India</Option>
                                    <Option value="Pakistan">Pakistan</Option>
                                </Select>
                            </InputGroup>
                        </Form.Item>
                        <Form.Item label="Phone No.:">
                            <InputGroup compact>
                                <Select
                                    defaultValue="+880"
                                    style={{ width: "25%" }}
                                    onChange={handleChange}
                                >
                                    <Option value="+880">+880</Option>
                                    <Option value="+991">+991</Option>
                                    <Option value="+24">+24</Option>
                                </Select>
                                <Input
                                    style={{ width: "75%" }}
                                    placeholder="17xxxxxxxx"
                                />
                            </InputGroup>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">Update Information</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Fragment>
    );
};

export default BasicSetting;
