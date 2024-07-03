import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalTextLyric({ text }: any) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="songs-item-right mobile-hiden" onClick={handleShow}>
                <span className="songs-item-right-more wrap_playlist js__main-color custom_btn_lyric_show">
                    <i className="fas fa-microphone-alt"></i>
                </span>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Lyric</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: '16px', textAlign: 'center', maxHeight: '600px', overflowY: 'scroll' }}>

                    <ul className="lyric_content">
                        <li className="highlight_lyric"></li>
                        {
                            text.map((item: any, index: number) => {
                                return (
                                    <li value={item['value']} key={index}>{item['text']}</li>
                                )
                            })
                        }
                    </ul>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="btn-danger" onClick={handleClose} style={{ fontSize: '16px', height: '35px', fontWeight: '400' }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalTextLyric;