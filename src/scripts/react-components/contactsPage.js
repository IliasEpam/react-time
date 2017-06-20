import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { getTemplate, manipulateClasses, scrollTo, delegateEvent, basicURI } from '../utils/utils';

export class ContactsPage extends React.Component {
    changePageTitle() {
        document.title = 'Contact Information';
    }
    copyInputValues() {
        var checkbox = document.getElementById('ckeckboxSameAdress');
        var allAdressInputs = document.querySelectorAll('.contacts__input');
        if (checkbox.checked) {
            for (var i = 0; i < allAdressInputs.length / 2; i++) {
                allAdressInputs[i + allAdressInputs.length / 2].value = allAdressInputs[i].value;
            }
        } else {
            for (var i = 0; i < allAdressInputs.length / 2; i++) {
                allAdressInputs[i + allAdressInputs.length / 2].value = '';
            }
        }
    }
    render(){
        return(
            <div className="page__contacts">
                <div className="contacts">
                    <form className="contacts__form">
                        <section className="contacts__form-block">
                            <h2 className="contacts__block-header"> Shipping address</h2>
                            <div className="contacts__line">Country <input className="contacts__input" type="text" name="shipping-country" required/></div>
                            <div className="contacts__line">City <input className="contacts__input" type="text" name="shipping-city" required/></div>
                            <div className="contacts__line">Address <input className="contacts__input" type="text" name="shipping-address" required/></div>
                            <div className="contacts__line">ZIP <input className="contacts__input" type="text" name="shipping-zip" required/></div>
                        </section>
                        <section className="contacts__form-block">
                            <h2 className="contacts__block-header"> Billing address</h2>
                            <div className="contacts__line">Country <input className="contacts__input" type="text" name="billing-country" required/></div>
                            <div className="contacts__line">City <input className="contacts__input" type="text" name="billing-city" required/></div>
                            <div className="contacts__line">Address <input className="contacts__input" type="text" name="billing-address" required/></div>
                            <div className="contacts__line">ZIP <input className="contacts__input" type="text" name="billing-zip" required/></div>
                            <div className="contacts__line">
                                <label><input type="checkbox" id="ckeckboxSameAdress" onClick={this.copyInputValues}/>My billing address is the same</label>
                            </div>
                        </section>
                        <div className="contacts__button-wrapper">
                            <Link type="submit" className="contacts__button" to="/payment">
                                Continue
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}