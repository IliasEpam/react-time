import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { manipulateClasses, scrollTo, basicURI, delegateEvent, corsApiVkRequest } from '../../utils/utils';

export class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {products: [], wantedProducts: [], helloMessage: '', sid:''};
    }
    showPopUp() {
        localStorage.removeItem('cat-shop-token');
        fetch(basicURI + '/users/logout', {
            method: 'POST'
        })
        this.setState({helloMessage: ''});
        manipulateClasses('.modal-window', 'modal-window--visible', 'add');
        manipulateClasses('#sign-window', 'modal-window__pop-ups--visible', 'add');
    }
    sayHi() {
        if (localStorage.getItem('cat-shop-token')) {
            corsApiVkRequest()
            .then(result => result.response[0].first_name)
            .then((name) => {console.log(name); return 'Hi ' + name})
            .then((phrase) => { this.setState({helloMessage: phrase }) })
            .catch(err => console.log(err))
        } 
       /* else {
            fetch(basicURI + '/users/me')
            .then((result)=>{console.log(result); console.log(result.json())})
            .then((user)=>{
                console.log(user);
                this.setState({helloMessage: 'Hi ' + user.username });
            })
        }*/
    }
    searchProduct(){
        if (!(this.state.products.length)){
            fetch(basicURI + '/products')
            .then((result) => {
                return result.json();
            })
            .then((data)=>{
                this.setState({products:data});
                var productList = [];
                var value = document.getElementById('product-search').value;
                value = value.toLowerCase();
                for (var i = 0; i < data.length; i++){
                    var productTitle = data[i].title.toLowerCase();
                    if (productTitle.indexOf(value) + 1){
                        productList.push(data[i]);
                    }
                }
                this.renderSearchResults(productList);
            })
        }
        else{
            var productList = [];
            var value = document.getElementById('product-search').value;
            value = value.toLowerCase();
            for (var i = 0; i < this.state.products.length; i++){
                var productTitle = this.state.products[i].title.toLowerCase();
                if (productTitle.indexOf(value) + 1){
                    productList.push(this.state.products[i]);
                }
            }
            this.renderSearchResults(productList);
        }
    }
    renderSearchResults(data){
        var productsToRender = [];
        if (data.length){
            manipulateClasses('.navigation-top__search-result', 'navigation-top__search-result--visible', 'add');
            var cycleTimes = data.length;
            if (data.length > 5){
                cycleTimes = 5;
            }
            for (var i = 0; i < cycleTimes; i++){
                productsToRender.push(
                    <div className="navigation-top__search-result-item" key={data[i].id}>
                        <Link className="navigation-top__search-result-link" to={'/product/' + data[i].id}>
                            <img className="navigation-top__search-result-img" src={basicURI + '/' + data[i].imgs[0].imgPath} alt={data[i].title} />
                            {data[i].title}
                        </Link>
                    </div>
                );
            }
            if (data.length > 5){
                productsToRender.push(
                    <div className="navigation-top__search-result-item navigation-top__search-result-item--text-center" key={6}>
                        ...
                    </div>
                );
            }
            this.setState({wantedProducts: productsToRender});
        }
        else{
            productsToRender.push(
                <div className="navigation-top__search-result-item navigation-top__search-result-item--text-center" key={1}>
                    There is no products to display
                </div>
            );
            this.setState({wantedProducts: productsToRender});
        }
    }
    onFocusSearchInput(){
        var value = document.getElementById('product-search').value;
        if (value) {
            manipulateClasses('.navigation-top__search-result', 'navigation-top__search-result--visible', 'add');
        }
    }
    hideSearchResults(e){
        if (!(e.target.classList.contains('navigation-top__search-input'))){
            manipulateClasses('.navigation-top__search-result', 'navigation-top__search-result--visible', 'remove');
        }
    }
    componentWillMount(){
        this.sayHi();
    }
    render(){
        document.addEventListener('click', this.hideSearchResults);
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
                                <input 
                                    className="navigation-top__search-input" 
                                    type="text" 
                                    placeholder="Search..." 
                                    id="product-search" 
                                    onChange={this.searchProduct.bind(this)}
                                    onFocus={this.onFocusSearchInput.bind(this)}/>
                                <img className="navigation-top__search-img" src="img/icons/search.png" />
                                <div className="navigation-top__search-result" id="search-result">
                                    {this.state.wantedProducts}
                                </div>
                            </label>
                            <Link className="navigation-top__icon navigation-top__icon--cart" to="/cart"></Link>
                            <a className="navigation-top__icon navigation-top__icon--profile" onClick={this.showPopUp.bind(this)}></a>
                            <span id="userName">{this.state.helloMessage}</span>
                        </div>
                    </nav>
                </div>
            </header>
        )
    }
}
