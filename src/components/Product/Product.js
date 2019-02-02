import React, { Component } from 'react';

export default function Product (props) {
    const { deleteProduct, selectedProduct } = props
    return (
        <div>
            <h1>{props.product.name}</h1>
            <p>{props.product.price}</p>
            <img className='formImage' src={props.product.img} />
            <button onClick={event => {deleteProduct(props.product.id)}} >Delete</button>
            <button onClick={event => {selectedProduct(props.product)}} >Edit</button>
        </div>
    )
}