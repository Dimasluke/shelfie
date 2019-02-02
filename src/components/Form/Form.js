import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

class Form extends Component {
    constructor (props) {
        super(props);
       
        this.state = {
            name: '',
            price: props.selectedProduct.price || 0,
            img: props.img || 'https://images.unsplash.com/photo-1543349823-729e19b44e31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
            selectedProduct: null
        }
        this.clearForm = this.clearForm.bind(this);
        this.imageCheck = this.imageCheck.bind(this)
        this.updateProduct = this.updateProduct.bind(this)
    }

    componentDidUpdate (prevProps, prevState) {
        if (this.props.selectedProduct.name != prevProps.selectedProduct.name){
            this.setState({
                name: this.props.selectedProduct.name,
                price: this.props.selectedProduct.price,
                img: this.props.selectedProduct.img,
                selectedProduct: this.props.selectedProduct.id
            })

        }
    }

    updateProduct (productInfo, id) {
        axios.put(`/api/inventory/${id}`, productInfo).then((response) => {
            this.props.getInventory();
        })
    }

    updateName (value) {
        this.setState({
            name: value
        })
    }

    updatePrice (value) {
        this.setState({
            price: value
        })
    }

    updateImage (value) {
        this.setState({
            img: value
        })
    }

    imageCheck () {
        if (this.state.img === ''){
            this.setState({
                img: 'https://images.unsplash.com/photo-1543349823-729e19b44e31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
            })
        }
    }

    clearForm () {
        this.setState({
            name: '',
            price: 0,
            img: 'https://images.unsplash.com/photo-1543349823-729e19b44e31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
            selectedProduct: null
        })
    }


    render () {
        const { name, price, img, selectedProduct } = this.state
        const productInfo = { name, price, img }    
        const buttonCheck = ( ) => {
            if (this.state.selectedProduct === null) {
                return <button onClick={event => this.props.addProduct(productInfo)}>Add to Inventory</button>
            } else {
                return <button onClick={event => this.updateProduct(productInfo, selectedProduct )}>Save Changes</button>
            }
        }
        return (
            <div>
                Form
                <img className="formImage" src={this.state.img} />
                <input value={this.state.name} onChange={event => {this.updateName(event.target.value)}} />
                <input value={this.state.price} onChange={event => {this.updatePrice(event.target.value)}} />
                <input value={this.state.img} onChange={event => {this.updateImage(event.target.value)}} onBlur={this.imageCheck} />
                <button onClick={event => this.clearForm()}>Cancel</button>
                {buttonCheck()}
                {/* <button onClick={event => this.props.addProduct(productInfo)}>Add to Inventory</button>
                <button onClick={event => this.updateProduct(productInfo, selectedProduct )}>Save Changes</button> */}
                {/* <Link to="/products" >Dashboard</Link> */}
            </div>
        )
    }
}

export default Form