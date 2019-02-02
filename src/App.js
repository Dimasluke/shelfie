import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Form from './components/Form/Form';
import Header from './components/Header/Header';
import Product from './components/Product/Product';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      products: [],
      selectedProduct: {}
    }
    this.addProduct = this.addProduct.bind(this)
    this.getInventory = this.getInventory.bind(this)
    this.selectedProduct = this.selectedProduct.bind(this)
  }

  componentDidMount () {
    this.getInventory();
  }

  getInventory (){
    axios.get('/api/inventory').then((response) => {
      this.setState({
        products: response.data
      })
    })
  }

  addProduct (productInfo) {
    axios.post('api/product', {productInfo})
    .then((response) => {
        this.setState({
        products: response.data
        })
    })
  }

  selectedProduct (value) {
    this.setState({
      selectedProduct: value
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Dashboard products={this.state.products} getInventory={this.getInventory} selectedProduct={this.selectedProduct} />
        <Form addProduct={this.addProduct} selectedProduct={this.state.selectedProduct} getInventory={this.getInventory}/>
      </div>
    );
  }
}

export default App;
