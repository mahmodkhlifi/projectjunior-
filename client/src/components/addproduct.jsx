import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProduct({fetch}) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const fetchCategories = () => {
    axios.get("http://localhost:2200/api/category/getall")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        throw error;
      });
  };

  const fetchProducts = () => {
    axios.get("http://localhost:2200/api/product/getall")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        throw error;
      });
  };

  const addProduct = (obj) => {
    axios.post("http://localhost:2200/api/product/add", obj)
      .then(() => {
        fetch();
        navigate("/list");
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '500px' }}>
         <h1 className="text-center mb-4">Dour/Echri</h1>
        <h3 className="text-center mb-4">Add Product</h3>
        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Product Name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setImageUrl(e.target.value)}
              value={imageUrl}
              placeholder="Image URL"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Product Description"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              placeholder="Product Price"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              onChange={(e) => setCategoryId(e.target.value)}
              value={categoryId}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => addProduct({ name, imageUrl, price, description, CategoryId: categoryId })}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
