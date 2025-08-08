import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel, Spinner, Alert } from 'react-bootstrap';

const Slider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    axios.get('https://wscubetech.co/ecommerce-api/products.php')
      .then(res => {
        // adjust if JSON structure differs:
        const data = res.data.products || res.data.data || res.data;
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        setError(err.message || 'Error fetching products');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!products.length) return <Alert variant="info">No products found.</Alert>;

  return (
    <Carousel>
      {products.map((p, idx) => {
        const img = p.image || (p.images && p.images[0]) || '';
        const title = p.name || p.title || '';
        return (
          <Carousel.Item className='bg-primary' key={idx}>
            <img
              className="d-block w-100"
              src={img}
              alt={title}
              style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
            <Carousel.Caption>
              <h5>{title}</h5>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default Slider;
