import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { getTemplate, manipulateClasses, scrollTo, corsApiVkRequest, basicURI } from '../../utils/utils';

export class CategoryNavigation extends React.Component{
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
                <li className="navigation-categories__point" key={data[i].id}>
                    <Link className="navigation-categories__link" to={"/category/" + data[i].id}>
                        <div className='navigation-categories__img navigation-categories__img--dry-food'></div> {data[i].title}
                    </Link>
                 </li>
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
            <div className="goods__navigation-categories">
                <ul className="navigation-categories">
                    {this.state.categories}
                </ul>
            </div>
        )
    }
}
