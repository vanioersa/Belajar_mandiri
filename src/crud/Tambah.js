import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";

function TambahProduk() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(""); 
  const [category, setCategory] = useState(""); 
  const [stock, setStock] = useState(0); 
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !description || !category || !stock) {
      setErrorMessage("Semua formulir harus diisi");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3030/products", {
        title,
        price,
        description,
        category,
        stock
      });
      if (response.status === 201) {
        setSuccessMessage("Produk berhasil ditambahkan");
        setTitle("");
        setPrice("");
        setDescription(""); 
        setCategory(""); 
        setStock(0); 
        setErrorMessage(""); 
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      setErrorMessage("Gagal menambahkan produk");
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tambah Produk</h2>
      <Form onSubmit={handleSubmit} className="form-style">
        <Form.Group controlId="formTitle">
          <Form.Label>
            <FontAwesomeIcon icon={faTag} className="mr-2" />
            Title
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan judul produk"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPrice">
          <Form.Label>
            <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
            Price
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan harga produk"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Deskripsi</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Masukkan deskripsi produk"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control 
            as="select" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Pilih kategori...</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            {/* Tambahkan opsi lainnya sesuai kebutuhan */}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formStock">
          <Form.Label>Stock</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Masukkan jumlah stok" 
            value={stock} 
            onChange={(e) => setStock(e.target.value)}
          />
        </Form.Group>
        {errorMessage && (
          <Alert variant="danger" className="mt-3">{errorMessage}</Alert>
        )}
        {successMessage && (
          <Alert variant="success" className="mt-3">{successMessage}</Alert>
        )}
        <Button variant="primary" type="submit" className="mt-3 submit-btn">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default TambahProduk;
