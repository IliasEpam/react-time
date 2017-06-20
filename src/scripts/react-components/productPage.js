import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { getTemplate, manipulateClasses, scrollTo, delegateEvent, basicURI } from '../utils/utils';
import { BreadCrumbs } from './product/bread-crumbs.js';
import { Slider } from './product/slider.js';

export class ProductPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {title: '', description: '', price: ''}
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
        this.changePageTitle(data.title);
        });
    } 
    changePageTitle(title) {
        document.title = title;
    }
    render(){
        return(
            <div>
                <BreadCrumbs />
                <div className="page__product">
                    <div className="product">
                        <Slider path={this.props.match.params.productId}/>
                        <section className="product__about">
                            <h1 className="product__name">{this.state.title}</h1>
                            <p className="product__desc">
                                {this.state.description}
                            </p>
                            <div className="product__price">
                                Price: ${this.state.price}
                            </div>
                            <div className="product__inputs">
                                <label className="product__quantity">Quantity:<br/> <input type="number" min="1" value="1" /></label>
                                <button className="product__add-to-cart" type="submit"> Add to cart</button>
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