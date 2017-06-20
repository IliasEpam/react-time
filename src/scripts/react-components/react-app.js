import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { MainPage } from './mainPage.js';
import { CategoryPage } from './categoryPage.js';
import { ProductPage } from './productPage.js';
import { CartPage } from './cartPage.js';
import { ContactsPage } from './contactsPage.js';
import { PaymentPage } from './paymentPage.js';

import { Header } from './common/header.js';
import { Footer } from './common/footer.js';
import { ScrollUp } from './common/scroll-up.js';
import { ModalWindows } from './common/modal-windows.js';

export class App extends React.Component{
    showPopUp() {
        localStorage.removeItem('cat-shop-token');
        manipulateClasses('.modal-window', 'modal-window--visible', 'add');
        manipulateClasses('#sign-window', 'modal-window__pop-ups--visible', 'add');
    }
    controlWindows(event) {
        var eventTraget = event.target;
        if (eventTraget.classList.contains('modal-window') || eventTraget.classList.contains('modal-window__close')) {
            manipulateClasses('.modal-window', 'modal-window--visible', 'remove');
            manipulateClasses('#reg-window', 'modal-window__pop-ups--visible', 'remove');
            manipulateClasses('#sign-window', 'modal-window__pop-ups--visible', 'remove');
        } else if (eventTraget.classList.contains('modal-window__sign-link') || eventTraget.classList.contains('modal-window__reg-link')) {
            manipulateClasses('#reg-window', 'modal-window__pop-ups--visible', 'toggle');
            manipulateClasses('#sign-window', 'modal-window__pop-ups--visible', 'toggle');
        }
    }
    scrollUp() {
        scrollTo(0);
    }
    showScrollUp() {
        if (document.body.scrollTop < window.innerHeight - 50) {
            manipulateClasses('.page__scroll-up', 'page__scroll-up--visible', 'remove');
        } else {
            manipulateClasses('.page__scroll-up', 'page__scroll-up--visible', 'add');
        }
    }
    sayHi() {
        var el = document.getElementById('userName');
        if (localStorage.getItem('cat-shop-token')) {
            corsApiVkRequest()
                .then(result => result.response[0].first_name)
                .then((name) => 'Hi ' + name)
                .then((phrase) => { el.innerHTML = phrase })
                .catch(err => console.log(err))
        } else {
            el.innerHTML = '';
        }
    }
    render(){
        return (
        <div>
            <Header />
            <ScrollUp />
            <div id="content">
                <Switch>
                    <Route exact={ true } path={ '/' } component={ MainPage }/>
                    <Route exact={ true } path={ '/category/:categoryId' } component={ CategoryPage }/>
                    <Route exact={ true } path={ '/product/:productId' } component={ ProductPage }/>
                    <Route exact={ true } path={ '/cart' } component={ CartPage }/>
                    <Route exact={ true } path={ '/contacts' } component={ ContactsPage }/>
                    <Route exact={ true } path={ '/payment' } component={ PaymentPage }/>
                    
                    <Route path='*' component={ MainPage }/>
                </Switch>
            </div>
            <ModalWindows />
            <Footer />
            
        </div>
        )
    }
}
