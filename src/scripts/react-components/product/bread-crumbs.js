import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { manipulateClasses, scrollTo, basicURI, delegateEvent } from '../../utils/utils';

export class BreadCrumbs extends React.Component{
    render(){
        return (
            <div className="page__bread-crumbs">
                <div className="bread-crumbs">
                    <Link className="bread-crumbs__link" to="/">Main page</Link>
                    <Link className="bread-crumbs__link" to="/category/">Category name</Link>
                    <a className="bread-crumbs__link" href="#">Product name</a>
                </div>
            </div>
        )
    }
}
