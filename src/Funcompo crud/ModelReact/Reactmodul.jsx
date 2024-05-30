import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Reactmodul() {
 
    const [lgShow, setLgShow] = useState(false);
    const [count,setcount] = useState(false);

    const show = () =>{
         setLgShow(true)
         setcount(true)
    }
    const Hide1 = () =>{
         setLgShow(false);
         setcount(false);
    }
  return (
    <div>
          <Button onClick={show}>Large modal</Button>
    {count &&  <Modal
        size="lg"
        show={lgShow}
        onHide={Hide1}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
             ......
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>} 
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas in facilis excepturi sed nemo. Consequatur aliquam quaerat nulla! Commodi animi explicabo natus quo reiciendis dolore ratione exercitationem! Corporis, officia itaque.</p>
    </div>
  )
}

export default Reactmodul
