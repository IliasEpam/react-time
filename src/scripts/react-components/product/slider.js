import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { manipulateClasses, scrollTo, basicURI, delegateEvent } from '../../utils/utils';

export class Slider extends React.Component{
    constructor(props){
        super(props);
        this.state = {imgs: [], bigImg: ''}
    }
    componentDidMount(){
      this.getData()
      .then((data) => {
        var imgs = [];
        var img = '';
        for (var i = 0; i < data.imgs.length; i++){
            console.log(data.imgs[i]);
            if (i === 0){
                img =  <img className="slider__shown-img" src={basicURI + '/' + data.imgs[i].imgPath} id="big-img" onClick={this.carouselSetNextImg} key={i} />;
                imgs.push(
                    <img className="slider__source-img slider__source-img--active" onClick={this.carouselSetTargetImg} src={basicURI +  '/' + data.imgs[i].imgPath} key={i+100} /> 
                );
            }
            else{ 
                imgs.push(
                    <img className="slider__source-img" onClick={this.carouselSetTargetImg} src={basicURI +  '/' + data.imgs[i].imgPath}  key={i}/> 
                );
            }
        }
        this.setState({imgs:imgs});
        this.setState({img:img});
    });
  }
  getData(){
      return fetch(basicURI + '/products/' + this.props.path)
        .then((result) => {
            return result.json();
         })
  }
  carouselSetNextImg(){
        var currentImg = document.querySelector('.slider__source-img--active');
        var sources = document.querySelector('.slider__source');
        var bigImg = document.querySelector('.slider__shown-img');
        if (currentImg.nextElementSibling === null) {
                var source = sources.firstElementChild.getAttribute('src');
                currentImg.classList.remove('slider__source-img--active');
                sources.firstElementChild.classList.add('slider__source-img--active');
            } else {
                var source = currentImg.nextElementSibling.getAttribute('src');
                currentImg.classList.remove('slider__source-img--active');
                currentImg.nextElementSibling.classList.add('slider__source-img--active');
            }
        bigImg.setAttribute('src', source);
    }
    carouselSetPrevImg(){
        var currentImg = document.querySelector('.slider__source-img--active');
        var sources = document.querySelector('.slider__source');
        var bigImg = document.querySelector('.slider__shown-img');
        if (currentImg.previousElementSibling === null) {
                var source = sources.lastElementChild.getAttribute('src');
                currentImg.classList.remove('slider__source-img--active');
                sources.lastElementChild.classList.add('slider__source-img--active');
            } else {
                var source = currentImg.previousElementSibling.getAttribute('src');
                currentImg.classList.remove('slider__source-img--active');
                currentImg.previousElementSibling.classList.add('slider__source-img--active');
            }
        bigImg.setAttribute('src', source);
    }
    carouselSetTargetImg(event){
        var currentImg = document.querySelector('.slider__source-img--active');
        var bigImg = document.querySelector('.slider__shown-img');
        var eventTarget = event.target;
        var source = eventTarget.getAttribute('src');
        currentImg.classList.remove('slider__source-img--active');
        eventTarget.classList.add('slider__source-img--active');
        bigImg.setAttribute('src', source);
    }
    render(){
        return (
            <div className="product__slider">
                <div className="slider">
                    <figure className="slider__shown-img-container">
                        {this.state.img}
                    </figure>
                    <div className="slider__controls">
                        <div className="slider__arrow slider__arrow--left" onClick={this.carouselSetPrevImg}></div>
                        <div className="slider__source">
                            {this.state.imgs}
                        </div>
                        <div className="slider__arrow slider__arrow--right" onClick={this.carouselSetNextImg}></div>
                    </div>
                </div>
            </div>
        )
    }
}
