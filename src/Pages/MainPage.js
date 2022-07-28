import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";

import { getTodos } from '../Redux/Actions/ActionTodos';

const MainPage = () => {
  const [data, setData] = useState([])
  const [dataDetail, setDataDetail] = useState({})
  const [show, setShow] = useState(false);
  const [showCreate, setShowCreate] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)

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


  // filtered selesai
  const filterSelesai = () => {
    let result = []
    let filtered = data.filter(val => val.status === 1)

    // how to sort desc
    result = filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt))

    return result
  }

  // filtered belum selesai
  const filterBelumSelesai = () => {
    let result = []
    let filtered = data.filter(val => val.status === 0)

    // how to sort asc
    result = filtered.sort((a, b) => a.createdAt.localeCompare(b.createdAt))

    return result
  }

  // handle modal
  const handleClose = () => {
    setShow(false)
    setShowCreate(false)
    setShowUpdate(false)
  };

  const handleShow = (val) => {
    setShow(true)
    setDataDetail(val)
  };

  const handleShowCreate = () => {
    setShowCreate(true)
  }

  const handleShowUpdate = () => {
    setShow(false)
    setShowUpdate(true)
  }

  // Declare payload create
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState(0)
  const [description, setDescription] = useState('')

  // How to get current date and time
  const dateNow = () => {
    var currentdate = new Date(); 
    var datetime = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() 
    return datetime
  }

  // functional Create
  const submitCreate = () => {
    const lastId = data[data.length - 1].id
    const payload = {
      id: lastId + 1,
      title,
      createdAt: dateNow(),
      status: parseInt(status),
      description
    }

    const newData = data.concat(payload)
    setData(newData)
    handleClose()
  }

  const onChangeUpdate = (value, key) => {
    setDataDetail({
      ...dataDetail, [key]: value
    })
  }

  // functional update
  const submitUpdate = () => {
    const payload = {
      id: dataDetail.id,
      title: dataDetail.title,
      createdAt: dateNow(),
      status: parseInt(dataDetail.status),
      description: dataDetail.description
    }

    setData(prevState => {
      const newState = prevState.map(obj => {
        if(obj.id === payload.id) {
          return {...obj, ...payload}
        }
        return obj;
      })
      return newState
    })

    handleClose()
  }

  // functional delete
  const deleteData = () => {
    var removeIndex = data.map(item => item.id).indexOf(dataDetail.id);
    const newData =  data.splice(removeIndex, 1);
    
    handleClose()
    return newData
  }

  return (
    <>
    <p>Pelamar: Rubi Anggoro</p>
      <Container fluid>
        <Row>
          <h1 className='text-center'>Todo List</h1>
          <div>
            <Button onClick={handleShowCreate}>Tambah Data</Button>
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
              {filterSelesai() && filterSelesai().map((val, idx) => {
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
              {filterBelumSelesai() && filterBelumSelesai().map((val, idx) => {
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
          <p><strong>Id:</strong> {dataDetail.id}</p>
          <p><strong>Tanggal:</strong> {dataDetail.createdAt}</p>
          <p><strong>Title:</strong> {dataDetail.title}</p>
          <p><strong>Status:</strong> {dataDetail.status}</p>
          <p><strong>Description:</strong> {dataDetail.description}</p>
          <div>
            {dataDetail.status !== 1 && (
              <Button variant="outline-danger" className='me-2' onClick={deleteData}>Delete</Button>
            )}
            <Button onClick={handleShowUpdate}>Update</Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Create */}
      <Modal show={showCreate} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Masukkan title" onChange={(e) => setTitle(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Status</Form.Label>
            <Form.Select aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
              <option>Pilih Status</option>
              <option value={0}>Belum Selesai</option>
              <option value={1}>Selesai</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)}/>
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
          <Button variant="secondary" onClick={submitCreate}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Update */}
      <Modal show={showUpdate} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput11">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Masukkan title" value={dataDetail.title} onChange={(e) => onChangeUpdate(e.target.value, 'title')}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput33">
            <Form.Label>Status</Form.Label>
            <Form.Select aria-label="Default select example" value={dataDetail.status} onChange={(e) => onChangeUpdate(e.target.value, 'status')}>
              <option>Pilih Status</option>
              <option value={0}>Belum Selesai</option>
              <option value={1}>Selesai</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea11">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={dataDetail.description} onChange={(e) => onChangeUpdate(e.target.value, 'description')}/>
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
          <Button variant="secondary" onClick={submitUpdate}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}


export default MainPage