import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";

function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3030/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      setErrorMessage("Error fetching product detail");
      console.error("Error fetching product detail:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Product Detail</h2>
      {product ? (
        <Card className="mx-auto shadow p-3 mb-5 bg-body rounded" style={{ maxWidth: "500px" }}>
          <Card.Img variant="top" src={product.image} />
          <Card.Body>
            <Card.Title className="text-center">{product.title}</Card.Title>
            <Card.Text className="text-center fs-5 text-muted mb-3">
              <strong>Price:</strong> RP.{product.price}
            </Card.Text>
            <Card.Text className="text-center fs-6 mb-4">
              <strong>Description:</strong> {product.description}
            </Card.Text>
            <div className="text-center">
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="danger" className="mt-3">
          {errorMessage}
        </Alert>
      )}
    </div>
  );
}

export default Detail;
