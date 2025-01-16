import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

function ProductList({ products, fetch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const deleteproduct = (id) => {
    axios.delete(`http://localhost:2200/api/product/delete/${id}`)
      .then(() => {
        fetch();
      })
      .catch((error) => {
        setErrorMessage("An error occurred while deleting the product.");
      });
  };

  const handleSearch = () => {
    let filteredProducts = products;

    if (searchQuery.trim()) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter((product) =>
        product.CategoryId === selectedCategory
      );
    }

    return filteredProducts;
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:2200/api/category/getall");
      setCategories(response.data);
    } catch (error) {
      setErrorMessage("Error fetching categories.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container className="my-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Dour/Echri</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#" onClick={() => navigate("/add")}>Add Products</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category
                </a>
                <ul className="dropdown-menu">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <a className="dropdown-item" href="#" onClick={() => setSelectedCategory(category.id)}>
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search by name"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-outline-secondary" type="button" onClick={() => handleSearch()}>Search</button>
            </form>
          </div>
        </div>
      </nav>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Row className="justify-content-center g-4">
        {handleSearch().map((el, index) => (
          <Col xs={12} sm={6} md={4} lg={3} key={index}>
            <Card className="shadow-sm rounded" style={{ maxWidth: '18rem', width: '100%' }}>
              <Card.Img
                variant="top"
                src={el.imageUrl || "https://cdn.vectorstock.com/i/500p/46/50/missing-picture-page-for-website-design-or-mobile-vector-27814650.jpg"}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>{el.name}</Card.Title>
                <Card.Text>{el.description}</Card.Text>
                <Card.Text><strong>Price:</strong> {el.price}</Card.Text>
                <Button 
                  variant="outline-danger" 
                  style={{ borderRadius: "0" }} 
                  onClick={() => deleteproduct(el.id)}
                >
                  Delete
                </Button>
                <Button 
                  variant="outline-primary" 
                  style={{ borderRadius: "0" }} 
                  onClick={() => navigate("/update", { state: { product: el } })}
                >
                  Update
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
