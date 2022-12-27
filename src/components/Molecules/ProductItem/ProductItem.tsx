import React from 'react';

import './ProductItem.scss';
import { ProductI } from '../../../services/FakeStoreService/FakeStoreService.utils';
import Divider from '../../Atoms/Divider/Divider';
import { Link } from 'react-router-dom';
import { Rate } from 'antd';

interface ProductItemI {
    product: ProductI;
}
const ProductItem = ({ product }: ProductItemI) => {
    const {
        id,
        title,
        image,
        price,
        category,
        rating,
    } = product;

    return (
        <React.Fragment>  
                    <div className="product-item-container">
                            <img className="product-item-img" src={image} alt={title} />
                            <div className="product-item-description">
                                <Link to={`/items/${id}`}>
                                    <h2 className="price-text">$ {price}</h2>
                                </Link>
                                <Link to={`/items/${id}`}>
                                    <h3 className="title-text">{title}</h3>
                                </Link>
                            </div>
                            <div className="product-item-extra-info">
                                <p className="category-text">{category}</p>
                                <div className='rate-container'>
                                    <Rate value={rating.rate} disabled allowHalf />
                                    {rating.rate ? <span className="ant-rate-text">{rating.rate}</span> : ''}
                                </div>
                            </div>
                    </div>
            <Divider />
        </React.Fragment>
    );
};

export default ProductItem;