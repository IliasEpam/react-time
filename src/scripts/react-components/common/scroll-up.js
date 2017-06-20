import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { manipulateClasses, scrollTo, basicURI, delegateEvent } from '../../utils/utils';

export class ScrollUp extends React.Component{
    scroll() {
        scrollTo(0);
    }
    showScrollUp() {
        if (document.body.scrollTop < window.innerHeight - 50) {
            manipulateClasses('.page__scroll-up', 'page__scroll-up--visible', 'remove');
        } else {
            manipulateClasses('.page__scroll-up', 'page__scroll-up--visible', 'add');
        }
    }
    
    render(){
        window.addEventListener('scroll', this.showScrollUp);
        return (
            <div className="page__scroll-up" onClick={scroll}>
                <div className="scroll-up">
                    <div className="scroll-up__img">
                    </div>
                </div>
            </div>
        )
    }
}
