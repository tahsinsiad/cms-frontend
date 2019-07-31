import {
    Form,
    Input,
    Button,
    AutoComplete, message,
} from "antd";
import { useContext, useState } from "react";
import React from "react";
// SCSS
import "./ProjectForm.scss";

import Link from "next/link";
import { useMutation } from "graphql-hooks";
import { redirectTo } from "../../common/Redirect";
import getConfig from "next/config";
import {DataStoreContext} from "../../../contexts/DataStoreContextProvider";
import * as PropTypes from "prop-types";
const { publicRuntimeConfig } = getConfig();
const { DASHBOARD_PATH } = publicRuntimeConfig;

const AutoCompleteOption = AutoComplete.Option;
const FormItem = Form.Item;

const CREATE_PROJECT = `
mutation createProject($title: String!, $description: String, $websiteUrl: String!) {
  createProject(title: $title, description: $description, websiteUrl: $websiteUrl) {
    id
    title
    description
    websiteUrl
    createdAt
  }
}`;

const ProjectCreateForm = (props) => {

    const [createProject, project] = useMutation(CREATE_PROJECT);
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    const dataStoreContext = useContext(DataStoreContext);

    const handleSubmit = e => {
        e.preventDefault();

        props.form.validateFieldsAndScroll(async (err, values) => {

            if (!err) {
                const result = await createProject({
                    variables: values
                });
                if (!result.error) {
                    dataStoreContext.setProjectListUpdated(true);
                    return await redirectTo(DASHBOARD_PATH, { status: 200 });
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

    const { getFieldDecorator } = props.form;

    const websiteUrlOptions = autoCompleteResult.map(websiteUrl => (
      <AutoCompleteOption key={websiteUrl}>{websiteUrl}</AutoCompleteOption>
    ));

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
                })(<Input />)}
        </FormItem>
        <FormItem label="Description">
          {getFieldDecorator("description", {
                    rules: [
                        {
                            required: false,
                        }
                    ],
                })(<Input.TextArea />)}
        </FormItem>
        <FormItem label="Website URL" extra="Used to create canonical URL.">
          {getFieldDecorator("websiteUrl", {
                    rules: [{ required: true, message: "Please input website!" }],
                })(
                  <AutoComplete
                    dataSource={websiteUrlOptions}
                    onChange={handleWebsiteUrlChange}
                    placeholder="website"
                    >
                    <Input />
                  </AutoComplete>,
                )}
        </FormItem>

        <FormItem>
          <Link href={DASHBOARD_PATH}><Button type="secondary">Cancel</Button></Link>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 8 }}>Create</Button>
        </FormItem>
      </Form>
    );
};
ProjectCreateForm.propTypes = {
    form: PropTypes.object
};
const WrappedProjectCreateForm = Form.create({ name: "register" })(ProjectCreateForm);

export default WrappedProjectCreateForm;
