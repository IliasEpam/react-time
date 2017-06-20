import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { manipulateClasses, scrollTo, basicURI, delegateEvent } from '../../utils/utils';

export class Header extends React.Component{
    showPopUp() {
        localStorage.removeItem('cat-shop-token');
        manipulateClasses('.modal-window', 'modal-window--visible', 'add');
        manipulateClasses('#sign-window', 'modal-window__pop-ups--visible', 'add');
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
            <header className="page__navigation-top">
                <div className="navigation-top">
                    <nav className="navigation-top__content">
                        <Link className="navigation-top__logo" to="/" title="Go the main page">
                            <img className="navigation-top__logo-img" src="img/logo.png" alt="red panda logo" /> 
                            Cat shop
                        </Link>
                        <div className="navigation-top__panel">
                            <label className="navigation-top__search">
                                <input type="search" placeholder="Search..." />
                                <img className="navigation-top__search-img" src="img/icons/search.png" />
                            </label>
                            <Link className="navigation-top__icon navigation-top__icon--cart" to="/cart"></Link>
                            <a className="navigation-top__icon navigation-top__icon--profile" onClick={this.showPopUp}></a>
                            <span id="userName"></span>
                        </div>
                    </nav>
                </div>
            </header>
        )
    }
}
