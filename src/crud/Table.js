import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductsTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3030/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3030/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus produk:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-3">Daftar Produk</h2>
      <Button variant="success" href="/tambah">Tambah Produk</Button>
      <Table striped bordered hover responsive className="mt-3 text-center">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}.</td>
                <td>{product.title}</td>
                <td>RP.{product.price}</td>
                <td>{product.description}</td>
                <td>
                  <Link to={`/detail/${product.id}`}>
                    <Button variant="info" style={{ marginRight: "5px" }}>Detail</Button>
                  </Link>
                  <Button variant="primary" href={`edit/${product.id}`} style={{ marginRight: "5px" }}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(product.id)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">Tidak ada produk</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductsTable;
