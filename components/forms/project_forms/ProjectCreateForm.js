import {
    Form,
    Input,
    Icon,
    Row,
    Col,
    Button,
    AutoComplete, Upload,
} from 'antd';
import {Component} from "react";
import React from "react";
import {beforeUpload, getBase64} from "../../../utils/uploadUtils";
// SCSS
import './ProjectCreateForm.scss';
import {DASHBOARD_PATH} from "../../../constants/URLs";
import Link from "next/link";

const AutoCompleteOption = AutoComplete.Option;

class ProjectCreateForm extends Component {
    state = {
        confirmDirty: false,
        uploading: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };

    // handleUploadChange = info => {
    //     if (info.file.status === 'uploading') {
    //         this.setState({ uploading: true });
    //         return;
    //     }
    //     if (info.file.status === 'done') {
    //         // Get this url from response in real world.
    //         getBase64(info.file.originFileObj, imageUrl =>
    //             this.setState({
    //                 imageUrl,
    //                 uploading: false,
    //             }),
    //         );
    //     }
    // };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult, imageUrl } = this.state;

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

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        // const uploadButton = (
        //     <div>
        //         <Icon type={this.state.uploading ? 'loading' : 'plus'} />
        //         <div className="ant-upload-text">Upload</div>
        //     </div>
        // );

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="Title">
                    {getFieldDecorator('title', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your Project title!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Description">
                    {getFieldDecorator('description', {
                        rules: [
                            {
                                required: false,
                            }
                        ],
                    })(<Input.TextArea />)}
                </Form.Item>
                <Form.Item label="Website URL" extra="Used to create canonical URL.">
                    {getFieldDecorator('website', {
                        rules: [{ required: true, message: 'Please input website!' }],
                    })(
                        <AutoComplete
                            dataSource={websiteOptions}
                            onChange={this.handleWebsiteChange}
                            placeholder="website"
                        >
                            <Input />
                        </AutoComplete>,
                    )}
                </Form.Item>
                {/*<Form.Item label="Brand Logo" extra="Used to create canonical URL.">*/}
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
                            {/*onChange={this.handleUploadChange}*/}
                        {/*>*/}
                            {/*{imageUrl ? <img src={imageUrl} alt="project logo" /> : uploadButton}*/}
                        {/*</Upload>*/}
                    {/*)}*/}
                {/*</Form.Item>*/}
                {/*<Form.Item label="Captcha" extra="We must make sure that your are a human.">*/}
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
                {/*</Form.Item>*/}
                <Form.Item {...tailFormItemLayout}>
                    <Link href={DASHBOARD_PATH}><Button type='secondary'>Cancel</Button></Link>
                    <Button type="primary" htmlType="submit" style={{marginLeft: 8}}>Create</Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedProjectCreateForm = Form.create({ name: 'register' })(ProjectCreateForm);

export default WrappedProjectCreateForm;
