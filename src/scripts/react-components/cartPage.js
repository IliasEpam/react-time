import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { getTemplate, manipulateClasses, scrollTo, delegateEvent, basicURI } from '../utils/utils';

export class CartPage extends React.Component {

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
                                <span className="total-quantity">2</span> item(s)
                            </div>
                            <hr className="basket-summary__splitter"/>
                            <div className="basket-summary__price">
                                $ <span className="total-price" id="total-price">20</span>
                            </div>
                            <Link type="submit" className="basket-summary__button" to="/contacts'">Proceed to chekout</Link>
                        </div>
                    </div>
                    <div className="cart__content">
                        <div className="cart__product">
                            <div className="cart__img-container">
                                <img src="img/logo.jpg" className="cart__img" alt="good" />
                            </div>
                            <div className="cart__name">
                                <a href="#">Dry food – "Brand"(2kg)</a>
                            </div>
                            <div className="cart__quantity">
                                <input className="cart__quantity-input" type="number" min="1" />
                            </div>
                            <div className="cart__info">
                                <div className="cart__price">
                                    $ 5
                                </div>
                                <div className="cart__remove">
                                    <a className="cart__remove-button" href="#">Remove</a>
                                </div>
                            </div>
                        </div>
                        <div className="cart__product">
                            <div className="cart__img-container">
                                <img src="img/logo.jpg" className="cart__img" alt="good" />
                            </div>
                            <div className="cart__name">
                                <a href="#">Dry food – "Brand"(2kg)</a>
                            </div>
                            <div className="cart__quantity">
                                <input className="cart__quantity-input" type="number" min="1" />
                            </div>
                            <div className="cart__info">
                                <div className="cart__price">
                                    $ 5
                                </div>
                                <div className="cart__remove">
                                    <a className="cart__remove-button" href="#">Remove</a>
                                </div>
                            </div>
                        </div>
                        <div className="cart__summary-bottom">
                            <div className="cart__summary-line cart__summary-price">
                                Total: $ <span>10</span>
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