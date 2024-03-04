import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import productEndpoints from '../../Api/product';
import {Link} from 'react-router-dom';
import AddProductButton from "./AddProductModal"; // Импортируем Link из react-router-dom

function ProductList() {
    const [products, setProducts] = useState([]); // Состояние для хранения списка продуктов

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productList = await productEndpoints.getAllProducts();
                setProducts(productList); // Устанавливаем полученные данные в состояние
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []); // Пустой массив зависимостей

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="my-4">Products</h1>
                <AddProductButton/>
            </div>
            <Row>
                {products && products.map(product => (
                    <Col key={product.id} lg={4} md={6} sm={12}>
                        <Link to={`/product/${product.id}`}>
                            <Card className="mb-4">
                                <Card.Img className="card-img-top" variant="top" src={product.images}/>
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>Description: {product.description}</Card.Text>
                                    <Card.Text>Status: {product.status}</Card.Text>
                                    <Card.Text>Price: {product.price}</Card.Text>
                                    <Card.Text>Supplier: {product.supplier}</Card.Text>
                                    <Card.Text>Brand: {product.brand}</Card.Text>
                                    <Card.Text>Category: {product.category}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ProductList;