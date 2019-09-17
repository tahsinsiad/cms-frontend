import React from "react";
import { Modal, Input, Collapse, Icon, Select } from "antd";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

const { Panel } = Collapse;
const { Option } = Select;

const JsonComponentList = ({ visible, handleOk, handleCancel }) => {
    return (
        <div>
            <Modal
                title="Component Lists"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Collapse
                    accordion
                    expandIcon={({ isActive }) => (
                        <Icon type="caret-right" rotate={isActive ? 270 : 90} />
                    )}
                >
                    <Panel header="Json Data" key="1">
                        <JSONInput
                            id="a_unique_id"
                            locale={locale}
                            height="300px"
                            width="450px"
                        />
                    </Panel>
                </Collapse>

                <Select defaultValue="Model" style={{ width: 470 }}>
                    <Option value="Option 1">Option 1</Option>
                    <Option value="Option 2">Option 2</Option>
                    <Option value="Option 3">Option 3</Option>
                </Select>
            </Modal>
        </div>
    );
};

export default JsonComponentList;
