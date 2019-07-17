import {
    Form,
    Input,
    Button,
    AutoComplete, message, Row, Col,
} from 'antd';
import { useContext, useState } from "react";
import React from "react";

// SCSS
import './ProjectForm.scss';

import { useMutation } from 'graphql-hooks'
import getConfig from 'next/config'
import {DataStoreContext} from "../../../contexts/DataStoreContextProvider";
const { publicRuntimeConfig } = getConfig();
const { DASHBOARD_PATH } = publicRuntimeConfig;

const AutoCompleteOption = AutoComplete.Option;
const FormItem = Form.Item;

const UPDATE_PROJECT = `
mutation UpdateProject($id: ID!, $title: String!, $description: String, $websiteUrl: String!, $icon: String, $siteTitle: String) {
  updateProject(id: $id, title: $title, description: $description, websiteUrl: $websiteUrl, icon: $icon, siteTitle: $siteTitle) {
    id
    title
    description
    websiteUrl
    createdAt
  }
}`;

const ProjectSettingForm = (props) => {

    const [updateProject, project] = useMutation(UPDATE_PROJECT);
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    const dataStoreContext = useContext(DataStoreContext);

    const handleSubmit = e => {
        e.preventDefault();

        props.form.validateFieldsAndScroll(async (err, values) => {

            if (!err) {
                values.id = "5d2d552c4d0fb61e9892d676";
                console.log(values);
                const result = await updateProject({
                    variables: values
                });

                if (!result.error) {
                    dataStoreContext.projectCreated(result.data.updateProject);
                } else {
                    message.error((result.httpError && result.httpError.statusText) ||
                        (result.graphQLErrors && result.graphQLErrors[0].message));
                }
            } else {
                console.error(err);
                message.error('Unexpected error!');
            }

        });
    };

    const handleWebsiteUrlChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        setAutoCompleteResult(autoCompleteResult);
    };

    const { getFieldDecorator } = props.form;

    const websiteUrlOptions = autoCompleteResult.map(websiteUrl => (
        <AutoCompleteOption key={websiteUrl}>{websiteUrl}</AutoCompleteOption>
    ));

    return (
        <Form className="pi_cms_form project_form" onSubmit={handleSubmit}>
            <FormItem label="Title">
                {getFieldDecorator('title', {
                    rules: [
                        {
                            required: true,
                            message: 'Please input your Project title!',
                        },
                    ],
                })(<Input placeholder="title" />)}
            </FormItem>
            <FormItem label="Description">
                {getFieldDecorator('description', {
                    rules: [
                        {
                            required: false,
                        }
                    ],
                })(<Input.TextArea placeholder="description" />)}
            </FormItem>
            <FormItem label="Website URL" extra="Used to create canonical URL.">
                {getFieldDecorator('websiteUrl', {
                    rules: [{ required: true, message: 'Please input website!' }],
                })(
                    <AutoComplete
                        dataSource={websiteUrlOptions}
                        onChange={handleWebsiteUrlChange}
                        placeholder="website URL"
                    >
                        <Input />
                    </AutoComplete>,
                )}
            </FormItem>

            <Row type="flex" justify="space-between">
                <Col span={11}>
                    <FormItem label="Icon">

                        {getFieldDecorator('icon', {
                            rules: [
                                {
                                    required: false,
                                }
                            ],
                        })(<Input placeholder="icon" />)}
                    </FormItem>

                </Col>
                <Col span={12}>
                    <FormItem label="Site Title">
                        {getFieldDecorator('siteTitle', {
                            rules: [
                                {
                                    required: false,
                                }
                            ],
                        })(<Input placeholder="site title" />)}
                    </FormItem>
                </Col>
            </Row>

            <FormItem label="Site Meta">
                {getFieldDecorator('siteMeta', {
                    rules: [
                        {
                            required: false,
                        }
                    ],
                })(<Input placeholder="sitemeta" />)}
            </FormItem>

            <FormItem>
                <Button type="primary" htmlType="submit">Save</Button>
            </FormItem>
        </Form>
    );
};

const WrappedProjectSettingForm = Form.create({ name: 'project_setting_form' })(ProjectSettingForm);

export default WrappedProjectSettingForm;
