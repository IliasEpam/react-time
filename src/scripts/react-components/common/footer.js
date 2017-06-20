import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { manipulateClasses, scrollTo, basicURI, delegateEvent } from '../../utils/utils';

export class Footer extends React.Component{
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
                <Link className="footer-main__link" to={"/category/" + data[i].id} key={data[i].id}>{data[i].title} </Link>
            );
        }
        this.setState({categories:categories});
    });
  }
  getData(){
      return fetch(basicURI + '/categories')
        .then((result) => {
            return result.json();
         })
  }
    render(){
        return (
            <footer className="page__footer-main">
                <div className="footer-main">
                    <div className="footer-main__content">
                        <div className="footer-main__section">
                            <h4 className="footer-main__section-header">Some contacts goes here</h4>
                            <address className="footer-main__contacts">Here is some contacts:</address>
                            <address className="footer-main__contacts">Email: example@examp.com</address>
                            <address className="footer-main__contacts">Tel: +7 3412 000 000</address>
                        </div>
                        <div className="footer-main__section">
                            <h4 className="footer-main__section-header">We accept</h4>
                            <div className="footer-main__payment">
                            </div>
                        </div>
                        <div className="footer-main__section">
                            <h4 className="footer-main__section-header">Here is a quick navigation:</h4>
                            {this.state.categories}
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
