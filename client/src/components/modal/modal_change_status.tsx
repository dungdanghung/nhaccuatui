import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
// import { baseURL } from '../../config/api';
import { SetStatusSong } from '../../api/music';
import { SetStatusMV } from '../../api/mv';

function ModalChangeStatus({ type_modal, type, id }: any) {
    const [show, setShow] = useState(false);
    const [Type, setType] = useState(type)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function saveChange() {
        const element = document.querySelector('.form-select') as HTMLSelectElement
        let value = element.value
        if (type_modal == 'song') {
            SetStatusSong(id, value)
                .then((rs: any) => {
                    if (rs) {
                        if (value == 'Approved') value = 'accept'
                        setType(value.toLowerCase())
                    }
                })
        } else if (type_modal == 'mv') {
            SetStatusMV(id, value)
                .then((rs: any) => {
                    if (rs) {
                        if (value == 'Approved') value = 'accept'
                        setType(value.toLowerCase())
                    }
                })
        }
        setShow(false);
    }

    return (
        <>
            {
                Type == 'pending' ?
                    <button type="button" className="btn btn-warning" onClick={handleShow}>Pending</button> :
                    Type == 'accept' ? <button type="button" className="btn btn-success" onClick={handleShow}>Appcet</button> :
                        <button type="button" className="btn btn-danger" onClick={handleShow}>Disable</button>
            }

            <Modal show={show} onHide={handleClose} style={{ fontSize: '18px' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Status*</Form.Label>
                            <input name='id' value={id} hidden />
                            <select className="form-select" aria-label="Default select example" name='status' style={{ fontSize: '16px' }}>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Cancelled">Disable</option>
                            </select>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} style={{ fontSize: '16px' }} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="btn-danger" onClick={handleClose} style={{ fontSize: '16px', height: '35px', fontWeight: '400' }}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit' onClick={saveChange} style={{ fontSize: '16px', height: '35px', fontWeight: '400' }}>
                        Save Changes
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    );
}

export default ModalChangeStatus;