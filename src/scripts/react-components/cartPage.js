import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { getTemplate, manipulateClasses, scrollTo, delegateEvent, basicURI } from '../utils/utils';

export class CartPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {products: [], totalPrice: 0, totalQuantity: 0}
    } 
    componentDidMount(){
        var products = [];
        var totalPrice = 0;
        var totalQuantity = 0;
        var data = JSON.parse(localStorage.getItem('cat-shop-cart'));
        for (var prop in data){
            products.push(
                <div className="cart__product" data-id={prop} key={prop}>
                    <div className="cart__img-container">
                        <img src={basicURI + '/' + data[prop].img} className="cart__img" alt="good" />
                    </div>
                    <div className="cart__name">
                        <Link to={"/product/" + prop}>{data[prop].title}</Link>
                    </div>
                    <div className="cart__quantity">
                        Quantity <input className="cart__quantity-input" type="number" min="1" value={data[prop].quantity} onChange={this.onQuantityChange.bind(this)}/>
                    </div>
                    <div className="cart__info">
                        <div className="cart__price">
                            $ {data[prop].price}
                        </div>
                        <div className="cart__remove">
                            <a className="cart__remove-button" onClick={this.removeProductFromCart.bind(this)}href="#">Remove</a>
                        </div>
                    </div>
                </div>
            );
            totalPrice += Number(data[prop].price) * Number(data[prop].quantity);
            totalQuantity += Number(data[prop].quantity);
        };
        var b = 0;
        for (var key in data){
            b++;
        }
        if (!data  || !b){
            products.push('There is no products in your cart. Go and get some cool stuff');
        }
        this.setState({products: products});
        this.setState({totalPrice: totalPrice});
        this.setState({totalQuantity: totalQuantity});
    }
    onQuantityChange(e){
        var target = e.target;
        var parent = target.parentNode.parentNode;
        var idOfProductToChange = parent.getAttribute('data-id');
        var newQuantity = parent.querySelector('.cart__quantity-input').value;
        var dataFromLocalStorage = JSON.parse(localStorage.getItem('cat-shop-cart'));
        dataFromLocalStorage[idOfProductToChange].quantity = newQuantity;
        localStorage.setItem('cat-shop-cart', JSON.stringify(dataFromLocalStorage));
        this.componentDidMount();
    }
    removeProductFromCart(e){
        var target = e.target;
        var parent = target.parentNode.parentNode.parentNode;
        console.log(parent);
        var idOfProductToRemove = parent.getAttribute('data-id');
        var dataFromLocalStorage = JSON.parse(localStorage.getItem('cat-shop-cart'));
        delete dataFromLocalStorage[idOfProductToRemove];
        console.log(dataFromLocalStorage);
        localStorage.setItem('cat-shop-cart', JSON.stringify(dataFromLocalStorage));
        this.componentDidMount();
    }
    changePageTitle() {
        document.title = 'Cart – Cat Shop';
    }
    render(){
        this.changePageTitle();
        return(
            <div className="page__cart">
                <div className="cart">
                    <h1 className="cart__header">Cart</h1>
                    <div className="cart__basket-summary">
                        <div className="basket-summary">
                            <div className="basket-summary__text">
                                Basket Summary
                            </div>
                            <div className="basket-summary__quantity">
                                <span className="total-quantity">{this.state.totalQuantity}</span> item(s)
                            </div>
                            <hr className="basket-summary__splitter"/>
                            <div className="basket-summary__price">
                                $ <span className="total-price" id="total-price">{this.state.totalPrice}</span>
                            </div>
                            <Link type="submit" className="basket-summary__button" to="/contacts">Proceed to chekout</Link>
                        </div>
                    </div>
                    <div className="cart__content">
                        {this.state.products}
                        <div className="cart__summary-bottom">
                            <div className="cart__summary-line cart__summary-price">
                                Total: $ <span>{this.state.totalPrice}</span>
                            </div>
                            <div className="cart__summary-line">
                                <Link className="cart__summary-button" to="/">Continue shopping</Link>
                                <Link className="cart__summary-button" to="/contacts">Proceed to chekout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}