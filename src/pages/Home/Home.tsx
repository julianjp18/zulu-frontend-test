import React, { useEffect, useState } from "react";
import { Skeleton } from 'antd';
import Navbar from "../../components/Organisms/Navbar/Navbar";
import FakeStoreService from "../../services/FakeStoreService/FakeStoreService";
import { ProductI } from "../../services/FakeStoreService/FakeStoreService.utils";
import ProductsList from '../../components/Templates/ProductsList/ProductsList';

import './Home.scss';
import Breadcrumb from "../../components/Atoms/Breadcrumb/Breadcrumb";
import { useNavigate } from 'react-router-dom';

const INIT_BREADCRUMB = [{
    text: 'Todos los productos',
}];

const Home = () => {
    const [breadcrumb, setBreadcrumb] = useState(INIT_BREADCRUMB);
    const [productsList, setProductsList] = useState<ProductI[]>([]);
    const [productToShow, setProductToShow] = useState<ProductI[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (productsList.length === 0) {
            getProductsList();
        }
    }, []);
    
    const getProductsList = async () => {
        const response = await FakeStoreService.getProducts();
        if (response.statusCode === 200 && response.data) {
            setProductsList(response.data);
        }
    }

    const searchOnClick = async (value: string) => {
        if (value) {
            navigate(`/items?search=${value}`);
        }
    };

    const searchOnSelect = async (value: string) => {
        if (value) {
            const productId = value.split('--')[0];
            const response = await FakeStoreService.getProductById(Number.parseInt(productId));
            if (response.statusCode === 200 && response.data) {
                setProductToShow(response.data);
            }
        }
    };

    return (
        <React.Fragment>
            <Navbar productsList={productsList} searchOnSelect={searchOnSelect} searchOnClick={searchOnClick} />
            <main>
                <Breadcrumb items={breadcrumb} />
                {productsList.length > 0
                    ? <ProductsList products={productsList} /> : <Skeleton active />}
            </main>
        </React.Fragment>
    );
};

export default Home;