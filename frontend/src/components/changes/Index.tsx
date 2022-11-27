import Block from "../block/Index"
import { Input,Button,Space,Checkbox } from 'antd';
const { TextArea } = Input;
import React, { useState } from 'react';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';


const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];


const Changes = () => {

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);


  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const bottom =  <div style={{padding:12}}>
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Input placeholder="Title" />
      <TextArea rows={4} />
      <Button block type="primary">Commit To Branch</Button>
    </Space>
  </div>

  const action =  <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
      Check all
    </Checkbox>
  </Space>

    return (
        <Block title="Changes" bottom={bottom} action={action}>
          <div style={{padding:12}}>
            <p><Checkbox>mian.ts</Checkbox></p>
            <p><Checkbox>Changes.ts</Checkbox></p>
            <p><Checkbox>mian.ts</Checkbox></p>
            <p><Checkbox>Changes.ts</Checkbox></p><p><Checkbox>mian.ts</Checkbox></p>
            <p><Checkbox>Changes.ts</Checkbox></p>
            <p><Checkbox>mian.ts</Checkbox></p>
            <p><Checkbox>Changes.ts</Checkbox></p><p><Checkbox>mian.ts</Checkbox></p>
            <p><Checkbox>Changes.ts</Checkbox></p>
            <p><Checkbox>mian.ts</Checkbox></p>
            <p><Checkbox>Changes.ts</Checkbox></p><p><Checkbox>mian.ts</Checkbox></p>
            <p><Checkbox>Changes.ts</Checkbox></p>
            <p><Checkbox>mian.ts</Checkbox></p>
            <p><Checkbox>Changes.ts</Checkbox></p><p><Checkbox>mian.ts</Checkbox></p>
            <p><Checkbox>Changes.ts</Checkbox></p>
            <p><Checkbox>mian.ts</Checkbox></p>
            <p><Checkbox>Changes.ts</Checkbox></p>
          </div>

        </Block>
    );
};

export default Changes;
