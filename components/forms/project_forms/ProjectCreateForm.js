import {
    Form,
    Input,
    Icon,
    Row,
    Col,
    Button,
    AutoComplete, Upload, message,
} from 'antd';
import {Component, useState} from "react";
import React from "react";
import {beforeUpload, getBase64} from "../../../utils/uploadUtils";
// SCSS
import './ProjectCreateForm.scss';
import Link from "next/link";
import { useMutation } from 'graphql-hooks'
import {redirectTo} from "../../common/Redirect";
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig();
const {DASHBOARD_PATH} = publicRuntimeConfig;

const AutoCompleteOption = AutoComplete.Option;
const FormItem = Form.Item;

const CREATE_PROJECT = `
mutation createPost($title: String!, $description: String, $websiteUrl: String!) {
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
    const [confirmDirty, setDirty] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState(false);
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFieldsAndScroll(async (err, values) => {
            if (err) {
                console.error(err);
                message.error('Unexpected error!');
            }
            console.log('Received values of form: ', values);
            event.preventDefault();
            const result = await createProject({
                variables: values
            });
            console.log(result);
            redirectTo(DASHBOARD_PATH);
        });
    };

    const handleConfirmBlur = e => {
        const { value } = e.target;
        setDirty(confirmDirty || !!value);
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

    const handleUploadChange = info => {
        if (info.file.status === 'uploading') {
            setUploading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setUploading(false);
                setImageUrl(imageUrl);
            });
        }
    };

    const { getFieldDecorator } = props.form;

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    const websiteUrlOptions = autoCompleteResult.map(websiteUrl => (
        <AutoCompleteOption key={websiteUrl}>{websiteUrl}</AutoCompleteOption>
    ));

    // const uploadButton = (
    //     <div>
    //         <Icon type={uploading ? 'loading' : 'plus'} />
    //         <div className="ant-upload-text">Upload</div>
    //     </div>
    // );

    return (
        <Form {...formItemLayout} onSubmit={handleSubmit}>
            <FormItem label="Title">
                {getFieldDecorator('title', {
                    rules: [
                        {
                            required: true,
                            message: 'Please input your Project title!',
                        },
                    ],
                })(<Input />)}
            </FormItem>
            <FormItem label="Description">
                {getFieldDecorator('description', {
                    rules: [
                        {
                            required: false,
                        }
                    ],
                })(<Input.TextArea />)}
            </FormItem>
            <FormItem label="Website URL" extra="Used to create canonical URL.">
                {getFieldDecorator('websiteUrl', {
                    rules: [{ required: true, message: 'Please input website!' }],
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
            {/*<FormItem label="Brand Logo" extra="Used to create canonical URL.">*/}
            {/*{getFieldDecorator('website', {*/}
            {/*rules: [{ required: true, message: 'Please input website!' }],*/}
            {/*})(*/}
            {/*<Upload*/}
            {/*name="brandLogo"*/}
            {/*listType="picture-card"*/}
            {/*className="avatar-uploader"*/}
            {/*showUploadList={false}*/}
            {/*action="https://www.mocky.io/v2/5cc8019d300000980a055e76"*/}
            {/*beforeUpload={beforeUpload}*/}
            {/*onChange={handleUploadChange}*/}
            {/*>*/}
            {/*{imageUrl ? <img src={imageUrl} alt="project logo" /> : uploadButton}*/}
            {/*</Upload>*/}
            {/*)}*/}
            {/*</FormItem>*/}
            {/*<FormItem label="Captcha" extra="We must make sure that your are a human.">*/}
            {/*<Row gutter={8}>*/}
            {/*<Col span={12}>*/}
            {/*{getFieldDecorator('captcha', {*/}
            {/*rules: [{ required: true, message: 'Please input the captcha you got!' }],*/}
            {/*})(<Input />)}*/}
            {/*</Col>*/}
            {/*<Col span={12}>*/}
            {/*<Button>Get captcha</Button>*/}
            {/*</Col>*/}
            {/*</Row>*/}
            {/*</FormItem>*/}
            <FormItem {...tailFormItemLayout}>
                <Link href={DASHBOARD_PATH}><Button type='secondary'>Cancel</Button></Link>
                <Button type="primary" htmlType="submit" style={{marginLeft: 8}}>Create</Button>
            </FormItem>
        </Form>
    );
};

const WrappedProjectCreateForm = Form.create({ name: 'register' })(ProjectCreateForm);

export default WrappedProjectCreateForm;
