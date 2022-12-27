import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from "../../components/Atoms/Breadcrumb/Breadcrumb";
import Navbar from "../../components/Organisms/Navbar/Navbar";
import FakeStoreService from "../../services/FakeStoreService/FakeStoreService";
import { ProductI } from "../../services/FakeStoreService/FakeStoreService.utils";
import { Skeleton } from 'antd';

import './ProductDetail.scss';
import Button from "../../components/Atoms/Button/Button";

const INIT_BREADCRUMB = [{
    text: 'Todos los productos',
}];

const ProductDetail = () => {
    let { id } = useParams();
    const [breadcrumb, setBreadcrumb] = useState(INIT_BREADCRUMB);
    const [productsList, setProductsList] = useState<ProductI[]>([]);
    const [productToShow, setProductToShow] = useState<ProductI>();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (productsList.length === 0) {
            getProductsList();
        }
        if (id) getProductById();
    }, []);

    const getProductsList = async () => {
        const response = await FakeStoreService.getProducts();
        if (response.statusCode === 200 && response.data) {
            setProductsList(response.data);
        }
    }

    const getProductById = async () => {
        const response = await FakeStoreService.getProductById(Number.parseInt(`${id}`));
        if (response.statusCode === 200 && response.data) {
            setProductToShow(response.data[0]);
            setBreadcrumb([
                ...INIT_BREADCRUMB,
                { text: response.data[0].category},
                { text: response.data[0].title},
            ])
        }
    };

    const searchOnClick = async (value: string) => {
        if (value) {
            const response = await FakeStoreService.getProductById(Number.parseInt(`${id}`));
            if (response.statusCode === 200 && response.data) {
                setProductToShow(response.data[0]);
            }
        }
    };

    const searchOnSelect = async (value: string) => {
        if (value) {
            const productId = value.split('--')[0];
            const response = await FakeStoreService.getProductById(Number.parseInt(productId));
            if (response.statusCode === 200 && response.data) {
                setProductToShow(response.data[0]);
            }
        }
    };

    const buyProductOnClick = () => {
        console.log('clicked on buy product button');
    };

    return (
        <React.Fragment>
            <Navbar productsList={productsList} searchOnSelect={searchOnSelect} searchOnClick={searchOnClick} />
            <main>
                <Breadcrumb items={breadcrumb} />
                {productToShow ? (
                    <div className="product-detail-container">
                        <div className="main-container">
                            <div className="left-side-container">
                                <img src={productToShow.image} alt={productToShow.title} />
                                <div className="description-container">
                                    <h3 className="description-title">Descripción del producto</h3>
                                    <p className="description-text">{productToShow.description}</p>
                                </div>
                            </div>
                            <div className="main-description-container">
                                <h1 className="main-title">{productToShow.title}</h1>
                                <h2 className="main-price">$ {productToShow.price}</h2>
                                <div className="buy-button-container">
                                    <Button text="Comprar" onClick={buyProductOnClick} block />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (<Skeleton active />)}
            </main>
        </React.Fragment>
    );
};

export default ProductDetail;