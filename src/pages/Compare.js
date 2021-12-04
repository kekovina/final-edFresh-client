import React, {useEffect, useState} from 'react';
import { inject, observer } from 'mobx-react'
import { Table, Row, Col } from 'antd';

const Compare = inject('store')(observer(({ store }) => {
    const [ comparedProjects, setComparedProjects ] = useState([])
    const [ properties, setProperties ] = useState([])
    const [ typeCompare, setTypeCompare ] = useState('store')
    
    useEffect(() => {
        if(!store.compare.lenght){
            setTypeCompare('localStorage')
        }
        const storage = typeCompare == 'localStorage' ? JSON.parse(localStorage.getItem('compare')) : store.compare
        store.getManyProjects(storage).then(data => {
            const ar = data.map(item => Object.keys(item).length)
            const index = ar.indexOf(Math.max(...ar))
            setComparedProjects(data)
            setProperties(Object.keys(data[index]))
        })
    }, [])
    const columns = [
        {
          title: 'Критерии',
          dataIndex: 'properties',
          key: 'name',
        },
    ]     
    comparedProjects.map(item => {
        columns.push({
            title: item.name,
            dataIndex: item.name.toLowerCase(),
            key: item.name.toLowerCase(),
        })
    }) 
    const data = properties.map((item, index) => {
        const datas = comparedProjects.map( d => {
            const a = {}
            if(typeof d[item] == 'object'){
                a[d.name.toLowerCase()] = 'dd'
                // a.children = {}
                // a.children[d.name.toLowerCase()] = d[item]
            } else {
                a[d.name.toLowerCase()] = d[item]
            }
            return a;
        })
        return {
            properties: item,
            ...Object.assign([], ...datas)
        }
    })
    return (
        <Row justify='center'>
            <Col sm={22} md={18} xxl={18}>
                <Table columns={columns} dataSource={data} />
            </Col>
        </Row>
    );
}))

export default Compare;
