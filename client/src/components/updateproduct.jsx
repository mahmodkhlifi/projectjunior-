import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

function UpdateProduct({ fetch }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const product = state?.product;

  const [name, setName] = useState(product?.name || '');
  const [imagUrl, setimageUrl] = useState(product?.imagUrl || '');
  const [price, setPrice] = useState(product?.price || '');
  const [description, setdescription] = useState(product?.description || '');
  const [errorMessage, setErrorMessage] = useState('');

  const updateProduct = (id, obj) => {
    axios.put(`http://localhost:2200/api/product/uptade/${id}`, obj)
      .then(() => {
        fetch();
        navigate("/"); 
      })
      .catch((error) => {
        setErrorMessage('Failed to update product');
        console.error(error);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2 className="text-center mb-4">Update Product</h2>
          
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={imagUrl}
                onChange={(e) => setimageUrl(e.target.value)}
                placeholder="Product Image URL"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                placeholder="Product Description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Product Price"
              />
            </Form.Group>

            <Button
              variant="primary"
              className="w-100"
              onClick={() => updateProduct(product.id, { name, imagUrl, price, description })}
            >
              Update Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UpdateProduct;
