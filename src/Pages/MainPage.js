import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";

import { getTodos } from '../Redux/Actions/ActionTodos';

const MainPage = () => {
  const [data, setData] = useState([])
  const [dataDetail, setDataDetail] = useState({})
  const [show, setShow] = useState(false);

  const dispatch = useDispatch()
  
  // Get Todos
  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])
  
  // select data from store
  const dataTodos = useSelector((state) => state.getTodos)

  // set data to state
  useEffect(() => {
    setData(dataTodos.data)
  }, [dataTodos])

  // handle modal
  const handleClose = () => setShow(false);
  const handleShow = (val) => {
    setShow(true)
    setDataDetail(val)
  };
  return (
    <>
    <p>Pelamar: Rubi Anggoro</p>
      <Container fluid>
        <Row>
          <h1 className='text-center'>Todo List</h1>
          <div>
            <Button>Tambah Data</Button>
          </div>
          <Col>
            <h3 className='text-success text-center'>Sudah Selesai</h3>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Tanggal</th>
                  <th>Titile</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
              {data && data.map((val, idx) => {
                return (
                    <tr>
                      <td>{val.id}</td>
                      <td>{val.createdAt}</td>
                      <td>{val.title}</td>
                      <td>{val.status}</td>
                      <td>{val.description}</td>
                      <td><Button onClick={() => handleShow(val)}>Detail</Button></td>
                    </tr>
                  )
                }
              )}
              </tbody>
            </Table>
          </Col>

          <Col>
            <h3 className='text-danger text-center'>Belum Selesai</h3>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Tanggal</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
              {data && data.map((val, idx) => {
                return (
                    <tr>
                      <td>{val.id}</td>
                      <td>{val.createdAt}</td>
                      <td>{val.title}</td>
                      <td>{val.status}</td>
                      <td>{val.description}</td>
                      <td><Button onClick={() => handleShow(val)}>Detail</Button></td>
                    </tr>
                  )
                }
              )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      {/* Modal Detail */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Data Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Id: {dataDetail.id}</p>
          <p>Tanggal: {dataDetail.createdAt}</p>
          <p>Title: {dataDetail.title}</p>
          <p>Status: {dataDetail.status}</p>
          <p>Description: {dataDetail.description}</p>
          <div>
            <Button variant="outline-danger" className='me-2'>Delete</Button>
            <Button>Update</Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}


export default MainPage