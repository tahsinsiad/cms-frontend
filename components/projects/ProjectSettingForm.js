import {AutoComplete, Button, Col, Form, Input, message, Row,} from "antd";
import React, {useContext, useEffect, useState} from "react";
// SCSS
import "./ProjectForm.scss";

import {useMutation} from "graphql-hooks";
import getConfig from "next/config";
import {DataStoreContext} from "../../contexts/DataStoreContextProvider";
import * as PropTypes from "prop-types";

const {publicRuntimeConfig} = getConfig();
const {} = publicRuntimeConfig;

const AutoCompleteOption = AutoComplete.Option;
const FormItem = Form.Item;

const UPDATE_PROJECT = `
mutation UpdateProject($id: String!, $title: String!, $description: String, $websiteUrl: String!, $siteMeta: String, $brand: BrandInput) {
  updateProject(id: $id, title: $title, description: $description, websiteUrl: $websiteUrl, siteMeta: $siteMeta, brand: $brand) {
    id
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
                const result = await updateProject({
                    variables: {
                        id: currentProject.id,
                        title: values.title,
                        description: values.description,
                        websiteUrl: values.websiteUrl,
                        siteMeta: values.siteMeta,
                        brand: {
                            icon: values.icon,
                            siteTitle: values.siteTitle,
                        }
                    }
                });

                if (!result.error) {
                    dataStoreContext.setProjectUpdated(true);
                } else {
                    message.error((result.httpError && result.httpError.statusText) ||
                        (result.graphQLErrors && result.graphQLErrors[0].message));
                }
            } else {
                console.error(err);
                message.error("Unexpected error!");
            }

        });
    };

    const handleWebsiteUrlChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = [".com", ".org", ".net"].map(domain => `${value}${domain}`);
        }
        setAutoCompleteResult(autoCompleteResult);
    };

    const {getFieldDecorator, setFieldsValue} = props.form;

    const websiteUrlOptions = autoCompleteResult.map(websiteUrl => (
        <AutoCompleteOption key={websiteUrl}>{websiteUrl}</AutoCompleteOption>
    ));

    const {currentProject} = dataStoreContext;
    useEffect(() => {
        if (currentProject) {
            setFieldsValue({
                title: currentProject.title,
                description: currentProject.description,
                websiteUrl: currentProject.websiteUrl,
                siteMeta: currentProject.siteMeta,
                icon: currentProject.brand.icon,
                siteTitle: currentProject.brand.siteTitle,
            });
        }
    }, [currentProject]);

    return (
        <Form className="pi_cms_form project_form" onSubmit={handleSubmit}>
            <FormItem label="Title">
                {getFieldDecorator("title", {
                    rules: [
                        {
                            required: true,
                            message: "Please input your Project title!",
                        },
                    ],
                })(<Input placeholder="title"/>)}
            </FormItem>
            <FormItem label="Description">
                {getFieldDecorator("description", {
                    rules: [
                        {
                            required: false,
                        }
                    ],
                })(<Input.TextArea placeholder="description"/>)}
            </FormItem>
            <FormItem label="Website URL" extra="Used to create canonical URL.">
                {getFieldDecorator("websiteUrl", {
                    rules: [{required: true, message: "Please input website!"}],
                })(
                    <AutoComplete
                        dataSource={websiteUrlOptions}
                        onChange={handleWebsiteUrlChange}
                        placeholder="website URL"
                    >
                        <Input/>
                    </AutoComplete>,
                )}
            </FormItem>

            <Row type="flex" justify="space-between">
                <Col span={11}>
                    <FormItem label="Icon">

                        {getFieldDecorator("icon", {
                            rules: [
                                {
                                    required: false,
                                }
                            ],
                        })(<Input placeholder="icon"/>)}
                    </FormItem>

                </Col>
                <Col span={12}>
                    <FormItem label="Site Title">
                        {getFieldDecorator("siteTitle", {
                            rules: [
                                {
                                    required: false,
                                }
                            ],
                        })(<Input placeholder="site title"/>)}
                    </FormItem>
                </Col>
            </Row>

            <FormItem label="Site Meta">
                {getFieldDecorator("siteMeta", {
                    rules: [
                        {
                            required: false,
                        }
                    ],
                })(<Input placeholder="sitemeta"/>)}
            </FormItem>

            <FormItem>
                <Button type="primary" htmlType="submit">Save</Button>
            </FormItem>
        </Form>
    );
};

ProjectSettingForm.propTypes = {
    form: PropTypes.object
};

const WrappedProjectSettingForm = Form.create({name: "project_setting_form"})(ProjectSettingForm);

export default WrappedProjectSettingForm;
