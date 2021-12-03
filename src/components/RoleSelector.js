import React from 'react';
import { inject, observer } from 'mobx-react'
import '../scss/RoleSelector.scss'

import { Select } from 'antd';

const { Option } = Select;

const RoleSelector = inject('store')(observer(({ store }) => {
    return (
        <div className="role-selector">
            <div className="role-selector__wrapper">
                <Select defaultValue={store.role} style={{ width: 280 }} onChange={store.changeRole}>
                    {[{value: 'guest', title: 'Гость'}, 
                    {value: 'user', title: "Пользователь проекта"},
                    {value: 'company', title: "Компания"},
                    {value: 'admin', title: "Админ"}].map(({ value, title }) => {
                        return <Option value={value} key={value}>{title}</Option>
                    })}
                </Select>
            </div>
        </div>
    );
}))

export default RoleSelector;
