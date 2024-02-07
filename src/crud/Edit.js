import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faDollarSign } from "@fortawesome/free-solid-svg-icons";

function Edit() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [originalDescription, setOriginalDescription] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3030/products/${id}`);
      const { title, price, description } = response.data;
      setTitle(title);
      setOriginalTitle(title);
      setPrice(price);
      setOriginalPrice(price);
      setDescription(description);
      setOriginalDescription(description);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title && !price && !description) {
      setErrorMessage("Setidaknya salah satu data harus diubah");
      return;
    }
    let numberOfChanges = 0;
    if (title !== originalTitle) numberOfChanges++;
    if (price !== originalPrice) numberOfChanges++;
    if (description !== originalDescription) numberOfChanges++;

    if (numberOfChanges === 0) {
      setErrorMessage("Setidaknya salah satu data harus diubah");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3030/products/${id}`, {
        title,
        price,
        description,
      });
      if (response.status === 200) {
        setSuccessMessage("Produk berhasil diubah");
        setErrorMessage("");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      setErrorMessage("Gagal mengubah produk");
      console.error("Error editing product:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Edit Produk</h2>
      <Form onSubmit={handleSubmit} className="form-style">
        <Form.Group controlId="formTitle">
          <Form.Label>
            <FontAwesomeIcon icon={faTag} className="mr-2" />
            Title
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
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
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        {errorMessage && (
          <Alert variant="danger" className="mt-3">
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert variant="success" className="mt-3">
            {successMessage}
          </Alert>
        )}
        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Edit;
