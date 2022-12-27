import React, { useEffect, useState } from "react";
import { Skeleton } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../../components/Organisms/Navbar/Navbar";
import FakeStoreService from "../../services/FakeStoreService/FakeStoreService";
import { ProductI } from "../../services/FakeStoreService/FakeStoreService.utils";
import ProductsList from '../../components/Templates/ProductsList/ProductsList';

import './ProductSearchList.scss';
import Breadcrumb from "../../components/Atoms/Breadcrumb/Breadcrumb";

const INIT_BREADCRUMB = [{
    text: 'Resultado Búsqueda',
}];

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ProductSearchList = () => {
    const [breadcrumb, setBreadcrumb] = useState(INIT_BREADCRUMB);
    const [productsList, setProductsList] = useState<ProductI[]>([]);
    const [productToShow, setProductToShow] = useState<ProductI[]>([]);
    const navigate = useNavigate();
    let query = useQuery();
    
    useEffect(() => {
        if (productsList.length === 0) {
            getProductsList();
        } 
    }, []);
    
    const findProductsBySearch = (query: string, products: ProductI[]) => {
        const result: any[] = [];
        if (products.length > 0) {
            products.forEach((product: ProductI) => {
                if (product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
                    result.push(product);
                }
            });
        }
        setBreadcrumb([
            ...INIT_BREADCRUMB,
            { text: query }
        ]);
        return result.slice(0, 4);
    }

    const getProductsList = async () => {
        const response = await FakeStoreService.getProducts();
        if (response.statusCode === 200 && response.data) {
            setProductsList(response.data);
            setProductToShow(findProductsBySearch(query.get('search') || '', response.data));
        }
    }

    const searchOnClick = async (value: string) => {
        if (value) {
            const productId = value.split('--')[0];
            const response = await FakeStoreService.getProductById(Number.parseInt(productId));
            if (response.statusCode === 200 && response.data) {
                setProductToShow(response.data);
            }
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
                {productToShow.length > 0
                    ? <ProductsList products={productToShow} /> : <Skeleton active />}
            </main>
        </React.Fragment>
    );
};

export default ProductSearchList;