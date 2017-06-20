import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { getTemplate, manipulateClasses, scrollTo, delegateEvent, basicURI } from '../utils/utils';

export class PaymentPage extends React.Component {

    changePageTitle() {
        document.title = 'Payment Information';
    }
    render(){
        this.changePageTitle();
        return(
            <div className="page__payment">
                <section className="payment">
                    <h1 className="payment__header">Payment information</h1>
                    <form className="payment__form">
                        <div className="payment__card-wrapper">
                            <input className="payment__number" name="text" type="text" required placeholder="XXXX - XXXX - XXXX - XXXX" pattern="[0-9]{16}"/>
                            <input className="payment__month" type="text" name="month-exp" required placeholder="MM" pattern="[0-9]{2}"/>
                            <input className="payment__year" type="text" name="year-exp" required placeholder="YYYY" pattern="[0-9]{4}"/>
                            <input className="payment__holder" type="text" name="holder" required placeholder="NAME SURNAME" pattern="\w+\s\w+"/>
                        </div>
                        <div className="payment__cvv-wrapper">
                            <input className="payment__cvv" name="cvv" type="text" required placeholder="CVV2" pattern="[0-9]{3,4}" />
                        </div>
                        <div className="payment__button-wrapper"><button type="submit" className="payment__button">Finish</button></div>
                    </form>
                </section>
            </div>
        )
    }

}