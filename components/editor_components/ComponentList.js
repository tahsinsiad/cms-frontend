import React from 'react';
import { Modal, Button, Checkbox, Row, Col } from 'antd'
import { useState } from 'react'

const ComponentList = ({ visible, handleOk, handleCancel }) => {

  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  }
  return (
    <div>
      {/* <Button type="primary" onClick={showModal}>
            Open Modal
          </Button> */}

      <Modal
        title="Component Lists"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
          <Row>
            <Col span={8}>
              <Checkbox value="A">Div</Checkbox>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Checkbox value="B">Span</Checkbox>
            </Col>
            <Row>
              <Col span={8}>
                <Checkbox value="C">Button</Checkbox>
              </Col>
            </Row>
            <Col span={8}>
              <Checkbox value="D">Image</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="E">Menu</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Modal>

    </div>
  );

}

export default ComponentList