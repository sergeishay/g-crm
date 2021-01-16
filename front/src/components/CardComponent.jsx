import React from 'react'
import { Card, Avatar, Row } from 'antd';
import 'antd/dist/antd.css';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;



export default function CardComponent(props) {

    console.log(props.clients)
    const clients = props.clients

    if (clients.length > 0) {
        return (

            clients.map((client, i) => {
                return (
                    <div key={i} className="cardComp">
                        <Card
                            style={{ width: 300, margin: 4 }}
                            title={client.clientName}
                            cover={
                                <img
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                            actions={[
                                <EditOutlined key="edit" />,
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>


                    </div>
                )
            })

        )
    } else {
        return (
            <div>
                cant post yet
            </div>
        )
    }

}

// export default CardComponent


