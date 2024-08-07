import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { SetStatusUser } from '../../api/user';



function ModalChangeStatusUser({ type, id }: any) {
    const [show, setShow] = useState(false);
    const [Type, setType] = useState(type)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function saveChange() {
        const element = document.querySelector('.form-select') as HTMLSelectElement
        let value = element.value

        SetStatusUser(id, value)
            .then((rs: any) => {
                if (rs) {
                    if (value == 'Approved') value = 'accept'
                    setType(value.toLowerCase())
                }
            })


        setShow(false);
    }

    return (
        <>
            {
                Type == 'enable' ? <button type="button" className="btn btn-success" onClick={handleShow}>Appcet</button> :
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
                                <option value="Enable">Enable</option>
                                <option value="Disable">Disable</option>
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

export default ModalChangeStatusUser;