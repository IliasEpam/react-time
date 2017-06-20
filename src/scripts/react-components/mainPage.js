import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { getTemplate, manipulateClasses, scrollTo, corsApiVkRequest, basicURI } from '../utils/utils';


export class MainPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {categories: []}
    }
    componentDidMount(){
        this.getData()
        .then((data) => {
            var categories = [];
            for (var i = 0; i < data.length; i++){
                categories.push(
                <div className="categories__category" key={data[i].id}>
                    <Link className="categories__link" to={'/category/' + data[i].id}>
                        <img className="categories__img" src={data[i].img} alt={data[i].title} />
                        <div className="categories__description">{data[i].title} (<span className="categories__products-amount"> </span>)</div>
                    </Link>
                </div>
                );
            }
            this.setState({categories:categories});
            this.setProductsAmountByCategories();
        });
    }

    getData(){
        return fetch(basicURI + '/categories')
        .then((result) => {
            return result.json();
        })
    }
    scrollDown() {
        scrollTo(window.innerHeight - 50);
    }
    changePageTitle() {
        var target = document.getElementsByTagName('title')[0];
        target.innerHTML = 'Cat Shop';
    }
    setProductsAmountByCategories() {
        fetch(basicURI + '/categories')
            .then((result) => {
                return result.json();
            })
            .then((result) => {
                var data = {};
                data.categories = result;
                return data;
            })
            .then((data) => {
                var promises = [];
                for (let i = 0; i < data.categories.length; i++) {
                    promises.push(fetch(basicURI + '/products?categoryID=' + data.categories[i].id)
                        .then((result) => {
                            return result.json();
                        })
                    )
                }
                return Promise.all(promises)
            })
            .then((data)=>{
                var collection = document.getElementsByClassName('categories__products-amount');
                for (var i = 0; i < collection.length; i++) {
                    collection[i].innerHTML = data[i].length;
                }
            })
        
    }
  render() {
    return (
        <div>
            <div className="page__main-banner">
                <section className="main-banner">
                    <div className="main-banner__text-container">
                        <h1 className="main-banner__heading">Any exciting header</h1>
                        <p className="main-banner__text">Some attractive text, shouldn't be too large. Just a couple lines. Some attractive text, shouldn't be too large. Just a couple lines.</p>
                    </div>
                    <div className="main-banner__scroll-down" onClick={this.scrollDown}>
                        <div className="main-banner__scroll-down-text">Start shopping</div>
                    </div>
                </section>
            </div>
            <main className="page__categories">
                <div className="categories">
                    <section className="categories__content">
                        <h2 className="categories__header">Categories</h2>
                        {this.state.categories}
                    </section>
                </div>
            </main>
            <div className="page__partners">
            <div className="partners">
                <div className="partners__content">
                     <img className="partners__logo" alt="partner" src="img/partners/wwf.png" />
                     <img className="partners__logo" alt="partner" src="img/partners/green.png" />
                     <img className="partners__logo" alt="partner" src="img/partners/royal.png" />
                     <img className="partners__logo" alt="partner" src="img/partners/wwf.png" />
                </div>
            </div>
            </div>
        </div>
    );
  }
}