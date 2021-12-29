import React, {useState} from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { InputNumberProps } from 'antd/lib/input-number'

import {
    Input,
    Select,
    Row,
    Col,
    Space,
    InputNumber
} from 'antd';
const {Option} = Select;


const PriceInput = (props:InputNumberProps) => {
  let {value,onChange}=props
    const selectAfter = (
        <Select defaultValue="USD"
            style={
                {width: 60}
        }>
            <Option value="USD">$</Option>
            <Option value="EUR">€</Option>
            <Option value="GBP">£</Option>
            <Option value="CNY">¥</Option>
        </Select>
    );

    return (
                <Space direction="vertical">
                    <InputNumber addonAfter={selectAfter}
                        defaultValue={0} onChange={onChange} onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }} value={value}/>

                </Space>
    );
};
export default PriceInput;
