import React, { useEffect} from 'react';
import '../scss/Filter.scss'
import { inject, observer } from 'mobx-react'
import { Menu, Radio, Divider, Spin} from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import CustomButton from '../components/Button'
import axios from 'axios'
import { serverURL } from '../config'

const { SubMenu } = Menu

// submenu keys of first level
const rootSubmenuKeys = ['status', 'state_of_ready', 'members'];

const Filter = inject('store')(observer(({ store, match }) => {
    const [openKeys, setOpenKeys] = React.useState([]);
    const [loading, setLoading] = React.useState(false)

    const [status, setStatus] = React.useState();
    const [statuses, setStatuses] = React.useState([]);
    const [stage, setStage] = React.useState();
    const [stages, setStages] = React.useState([]);
    // const [status, setStatus] = React.useState();
    // const [statuses, setStatuses] = React.useState([]);


    const onOpenChange = keys => {
      const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
      if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKeys(keys);
      } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      }
      if(keys == 'status'){

      }
    };
    useEffect(() => {
        if(openKeys.indexOf('status') != -1 && !statuses.length){
            setLoading(true)
            getStatuses().then(data => {
                setStatuses(data.data)
                setLoading(false)
            })
        } else if(openKeys.indexOf('stages_of_ready') != -1 && !stages.length){
            setLoading(true)
            getStagesOfReady().then(data => {
                setStages(data.data)
                setLoading(false)
            })
        }
    }, [openKeys])
    const filterQuery = () => {
        store.dropProjects()
        return axios.get(`${serverURL}/api/projects`, {
            params: {
                'stages': stage ? [ stage ] : null,
                'statuses': status ? [ status ] : null,
            }
        }).then(data => {
            if(data.status == 200){
                if(data.data){
                    store.setProjects(data.data)
                }
            }
        })
    }
    const getStatuses = () => {
        return axios.get(`${serverURL}/api/projectStatuses`)
    }
    const getStagesOfReady = () => {
        return axios.get(`${serverURL}/api/stagesOfReady`)
    }
    const onChangeStatus = (e) => setStatus(e.target.value)
    const onChangeStage = (e) => setStage(e.target.value)
    return (
        <div className="filter">
            <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} >
            <SubMenu key="status" icon={<MailOutlined />} title="Статус">
                <Spin spinning={loading}>
                    <Radio.Group onChange={onChangeStatus} value={status} style={{display: 'flex', flexDirection: 'column'}}>
                        {statuses.map(status => {
                            return <Radio value={status.id} key={status.id}>{status.name}</Radio>
                        })}
                    </Radio.Group>
                </Spin>
            </SubMenu>
            <SubMenu key="stages_of_ready" icon={<AppstoreOutlined />} title="Стадия готовности" >
                <Spin spinning={loading}>
                    <Radio.Group onChange={onChangeStage} value={stage} style={{display: 'flex', flexDirection: 'column'}}>
                        {stages.map(stage => {
                            return <Radio value={stage.id} key={stage.id}>{stage.name}</Radio>
                        })}
                    </Radio.Group>
                </Spin>
            </SubMenu>
            </Menu>
            <Divider/>
            <CustomButton transparent onClick={filterQuery}>Применить</CustomButton>
        </div>
    );
}))

export default Filter;
