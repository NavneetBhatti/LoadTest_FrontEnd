import React , {useState , useEffect } from 'react'
import Layout, { Header, Content, Footer } from 'antd/lib/layout/layout';
import { Table, Row, Col } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
// import Example from './NewUserForm';

const Details = () =>{
  const [data, setdata] = useState([]);
  const [modaldata, setmodaldata] = useState([]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'uname',
    },
    {
      title: 'Email',
      dataIndex: 'emailss',
      key: 'uemail',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'uaddress',
    },
    {
      title: 'Edit User',
      dataIndex: 'id',
      key: 'id',
      render: (index, record) => (
        <Button type="primary" onClick={() => showModal(record)}>
          Edit
        </Button>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    setdata(
      res.data.map((row) => ({
        id: row.id,
        name: row.name,
        emailss: row.email,
        address: row.address.city,
      }))
    );
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (record) => {
    console.log(record);
    setmodaldata(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <Header>Header 1</Header>
      <Content style={{ padding: 50 }}>
        <Row>
          <Col span={3} />
          <Col span={18}>
            <Table dataSource={data} columns={columns} />
          </Col>
          <Col span={3} />
        </Row>
      </Content>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Name: {modaldata.name}</p>
        <p>Email: {modaldata.emailss}</p>
        <p>Address: {modaldata.address}</p>
      </Modal>
      <Footer></Footer>
    </Layout>
  );
};

export default Details;
