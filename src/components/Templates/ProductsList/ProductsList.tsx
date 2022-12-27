import React from "react";
import { ProductI } from '../../../services/FakeStoreService/FakeStoreService.utils';
import ProductItem from "../../Molecules/ProductItem/ProductItem";

import './ProductsList.scss';

interface ProductsListI {
    products: ProductI[];
}

const ProductsList = ({ products }: ProductsListI) => {
    return (
        <div className="product-list-container">
            {products?.length > 0 && products.map((product: ProductI) => {
                return (
                    <ProductItem key={product.title} product={product} />
                );
            })}
        </div>
    );
}

export default ProductsList;