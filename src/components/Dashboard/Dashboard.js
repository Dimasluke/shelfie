import React, { Component } from 'react';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Dashboard extends Component {
    deleteProduct = value => {
        axios.delete(`/api/inventory/${value}`).then(this.props.getInventory())
    }

    render () {
    const { products, selectedProduct } = this.props
    const mappedProducts = products.map(product => {
        return <Product product={product} deleteProduct={this.deleteProduct} selectedProduct={selectedProduct} />
    })
        
        return (
            <div>
                Dashboard
                {mappedProducts}
                {/* <Link to="/addProduct">Form</Link> */}
            </div>
        )
    }
}

export default Dashboard