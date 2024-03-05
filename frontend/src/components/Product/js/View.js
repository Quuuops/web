import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Row, Col, Card} from 'react-bootstrap';
import DeleteProductButton from "./DeleteProduct";
import EditProductButton from "./EditProduct";
import productEndpoints from '../../Api/product';

function ProductDetail() {
    const {id} = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await productEndpoints.getProduct(id);
                setProduct(productData);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="my-4">{product.name}</h1>
                <div>
                    <EditProductButton product={product} />
                    <DeleteProductButton productId={id}/>
                </div>
            </div>
            <Row>
                <Col lg={4} md={6} sm={12}>
                    <Card className="mb-4">
                        <Card.Img className="card-img-top" variant="top" src={product.images}/>
                        <Card.Body>
                            <Card.Text>Description: {product.description}</Card.Text>
                            <Card.Text>Status: {product.status}</Card.Text>
                            <Card.Text>Price: {product.price}</Card.Text>
                            <Card.Text>Supplier: {product.supplier}</Card.Text>
                            <Card.Text>Brand: {product.brand}</Card.Text>
                            <Card.Text>Category: {product.category}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductDetail;