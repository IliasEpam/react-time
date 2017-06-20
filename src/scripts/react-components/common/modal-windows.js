import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { manipulateClasses, scrollTo, basicURI, delegateEvent } from '../../utils/utils';

export class ModalWindows extends React.Component{
    controlWindows(event) {
        var eventTraget = event.target;
        if (eventTraget.classList.contains('modal-window') || eventTraget.classList.contains('modal-window__close')) {
            manipulateClasses('.modal-window', 'modal-window--visible', 'remove');
            manipulateClasses('#reg-window', 'modal-window__pop-ups--visible', 'remove');
            manipulateClasses('#sign-window', 'modal-window__pop-ups--visible', 'remove');
        } else if (eventTraget.classList.contains('modal-window__sign-link') || eventTraget.classList.contains('modal-window__reg-link')) {
            manipulateClasses('#reg-window', 'modal-window__pop-ups--visible', 'toggle');
            manipulateClasses('#sign-window', 'modal-window__pop-ups--visible', 'toggle');
        }
    }
    render(){
        delegateEvent(document, 'click', '.modal-window', this.controlWindows);
        return (
            <div className="page__modal-window">
                <div className="modal-window">
                    <div className="modal-window__pop-ups" id="reg-window">
                        <div className="modal-window__close">
                        </div>
                        <form className="modal-window__form">
                            <div className="modal-window__line">
                                Registration
                            </div>
                            <div className="modal-window__line">
                                <input className="modal-window__input-email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2}" name="email" type="email" required placeholder="Email adress" />
                            </div>
                            <div className="modal-window__line">
                                <input className="modal-window__input-password" name="password" type="password" required placeholder="***" />
                            </div>
                            <div className="modal-window__line">
                                <button className="modal-window__button" type="submit">Register</button>
                            </div>
                            <div className="modal-window__line modal-window__line--text-right">
                                <a className="modal-window__sign-link">Sign In</a>
                            </div>
                        </form>
                    </div>
                    <div className="modal-window__pop-ups" id="sign-window">
                        <div className="modal-window__close">
                        </div>
                        <form className="modal-window__form">
                            <div className="modal-window__line">
                                Please Sign In
                            </div>
                            <div className="modal-window__line">
                                <input className="modal-window__input-email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2}" name="email" type="email" required placeholder="Email adress" />
                            </div>
                            <div className="modal-window__line">
                                <input className="modal-window__input-password" name="password" type="password" required placeholder="***" />
                            </div>
                            <div className="modal-window__line">
                                <label><input type="checkbox" name="remember" value="remember" /> Remember me </label>
                            </div>
                            <div className="modal-window__line">
                                <a className="modal-window__social-icon modal-window__social-icon--vk" href="https://oauth.vk.com/authorize?client_id=6054475&display=page&redirect_uri=http://localhost:2403/index.html&scope=friends&response_type=token&v=5.64"></a>
                            </div>
                            <div className="modal-window__line">
                                <button className="modal-window__button" type="submit">Sign In</button>
                            </div>
                            <div className="modal-window__line modal-window__line--text-right">
                                <a className="modal-window__reg-link">Register</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
