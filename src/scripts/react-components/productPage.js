import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { getTemplate, manipulateClasses, scrollTo, delegateEvent, basicURI } from '../utils/utils';
import { BreadCrumbs } from './product/bread-crumbs.js';
import { Slider } from './product/slider.js';

export class ProductPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {title: '', description: '', price: '', id: '', imgs: [{imgPath: ''}]}
    }
    componentDidMount(){
      this.updateComponent(this.props.match.params.productId);
    }
    getData(parameter){
        return fetch(basicURI + '/products/' + parameter)
            .then((result) => {
                return result.json();
            })
    }
    updateComponent(parameter){
         this.getData(parameter)
        .then((data) => {

        this.setState({title:data.title});
        this.setState({description: data.description});
        this.setState({price: data.price});
        this.setState({id: data.id});
        this.setState({imgs: data.imgs});
        this.changePageTitle(data.title);
        });
    }
    componentWillReceiveProps(newProps){
        this.updateComponent(newProps.match.params.productId);
    }
    changePageTitle(title) {
        document.title = title;
    }
    addToCart(e){
        var cart = JSON.parse(localStorage.getItem('cat-shop-cart')) || {};
        var target = e.target;
        var parentEl = target.parentNode.parentNode;
        console.log(parentEl);
        var cartItem = {};
        var key = parentEl.getAttribute('data-id');
        cartItem.title = parentEl.querySelector('.product__name').innerHTML;
        cartItem.price = parentEl.querySelector('#product-price').innerHTML;
        cartItem.quantity = Number(parentEl.querySelector('.product__quantity-input').value);
        cartItem.img = parentEl.getAttribute('data-img');
        console.log(cartItem.quantity + 1);
        if (cart[key]){
            cartItem.quantity += Number(cart[key].quantity);
        }
        cart[key] = cartItem;
        localStorage.setItem('cat-shop-cart', JSON.stringify(cart));
        console.log(JSON.parse(localStorage.getItem('cat-shop-cart')));
        console.log(Number(cart[key].quantity) + 1);
        alert('product was added to your cart');
    }
    render(){
        return(
            <div>
                <BreadCrumbs />
                <div className="page__product">
                    <div className="product">
                        <Slider path={this.props.match.params.productId}/>
                        <section className="product__about" data-id={this.state.id} data-img={this.state.imgs[0].imgPath}>
                            <h1 className="product__name">{this.state.title}</h1>
                            <p className="product__desc">
                                {this.state.description}
                            </p>
                            <div className="product__price">
                                Price: $<span id='product-price'>{this.state.price}</span>
                            </div>
                            <div className="product__inputs">
                                <label className="product__quantity">Quantity:<br/> <input className ="product__quantity-input" type="number" min="1" placeholder="1" /></label>
                                <button className="product__add-to-cart" type="submit" onClick={this.addToCart}> Add to cart</button>
                            </div>
                            <div className="product__share">
                                <div className="product__social-icon product__social-icon--facebook"></div>
                                <div className="product__social-icon product__social-icon--twitter"></div>
                                <div className="product__social-icon product__social-icon--google"></div>
                                <div className="product__social-icon product__social-icon--vk"></div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}