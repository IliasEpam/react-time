import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { getTemplate, manipulateClasses, scrollTo, corsApiVkRequest, basicURI } from '../utils/utils';
import { CategoryNavigation } from './category/category-navigation.js';

export class CategoryPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {products: [], header: ''}
    } 
    componentDidMount(){
      this.updateComponent(this.props.match.params.categoryId);
    }
    getData(parameter){
        return fetch(basicURI + '/products?categoryID=' + parameter)
            .then((result) => {
                return result.json();
            })
    }
    updateComponent(parameter){
         this.getData(parameter)
        .then((data) => {
        var products = [];
        var header = '';
        for (var i = 0; i < data.length; i++){
            if (i === 0) {
                header = data[i].categoryName
            };
            products.push(
            <div className="goods__good" key={data[i].id}>
                <img className="goods__good-img" src={basicURI + '/' + data[i].img} alt="" />
                <div className="goods__good-info">
                     <div className="goods__good-name">
                        <Link className="goods__good-link" to={'/product/' + data[i].id}>{data[i].title}</Link>
                     </div>
                     <div className="goods__good-price">
                        {data[i].price} $
                     </div>
                     <p className="goods__good-description">
                        {data[i].description}
                    </p>
                    <div className="goods__good-description">
                        <span className="goods__good-add-cart">Add to cart</span>
                    </div>
                </div>
            </div>
            );
        }
        this.setState({products:products});
        this.changePageTitle(header);
        this.setState({header: header});
        });
    }
    componentWillReceiveProps(newProps){
        this.updateComponent(newProps.match.params.categoryId);
        this.changePageTitle(this.state.header);
    }
    changePageTitle(title){
        document.title = title;
    }
    changeToListView() {
        manipulateClasses('.grid-view', 'grid-view--visible', 'add');
        manipulateClasses('.list-view', 'list-view--visible', 'remove');
        manipulateClasses('.goods__good-description', 'goods__good-description--visible', 'add');
        manipulateClasses('.goods__good', 'goods__good--list', 'add');
        manipulateClasses('.goods__good-info', 'goods__good-info--list', 'add');
        manipulateClasses('.goods__good-img', 'goods__good-img--list', 'add');
        manipulateClasses('.goods__good-price', 'goods__good-price--list', 'add');
        manipulateClasses('.goods__good-name', 'goods__good-name--list', 'add');
    }
    changeToGridView() {
        manipulateClasses('.goods__good-description', 'goods__good-description--visible', 'remove');
        manipulateClasses('.goods__good', 'goods__good--list', 'remove');
        manipulateClasses('.goods__good-info', 'goods__good-info--list', 'remove');
        manipulateClasses('.goods__good-img', 'goods__good-img--list', 'remove');
        manipulateClasses('.goods__good-price', 'goods__good-price--list', 'remove');
        manipulateClasses('.goods__good-name', 'goods__good-name--list', 'remove');
        manipulateClasses('.grid-view', 'grid-view--visible', 'remove');
        manipulateClasses('.list-view', 'list-view--visible', 'add');
    }
    render(){
        
        return (
            <main className="page__goods">
                <div className="goods">
                    <CategoryNavigation />
                    <section className="goods__content">
                        <span className="grid-view" onClick={this.changeToGridView}>Grid view</span>
                        <span className="list-view list-view--visible" onClick={this.changeToListView}>List view</span> 

                        <h1 className="goods__header"> 
                            {this.state.header}
                        </h1>
                        {this.state.products}
                        
                        <div className="goods__good goods__good--dummy"></div>
                        <div className="goods__good goods__good--dummy"></div>
                        <div className="goods__good goods__good--dummy"></div>
                    </section>
                </div>
            </main>
        )
    }

}