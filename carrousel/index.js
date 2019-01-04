import React, { Component } from 'react';
import '../../assets/scss/carrousel.scss';
import RightArrow from '../../assets/icons/svg/right-arrow.svg'
import LeftArrow from '../../assets/icons/svg/left-arrow.svg'

class Carrousel extends Component {
  constructor(props) {
    super(props);
    
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.paging = this.paging.bind(this);
    
    this.state = {
        items: props.items,
        autoRotate: props.autoRotate
    };
  }
  
  componentWillMount() {
    const { autoRotate } = this.state;
    
    if(autoRotate) {
      setInterval(() => {
        this.next();
      }, 2500);
    }
  }
  
  prev() {
    this.paging(-1);
  }
  
  next() {
    this.paging(1);
  }
  
  paging(number) {
    let { items } = this.state;
    let index = items.findIndex((item) => (item.isVisible) ? item : null); 
    let length = index + number; 
    let nextImageIndex = length >= items.length ? 0 : length < 0 ? items.length - 1 : index + number;
    
    if(nextImageIndex === 0 || nextImageIndex === items.length) {
      let position = nextImageIndex === 0 ? 1 : nextImageIndex === items.length ? -1 : 0;
      items = items.map((i) => { i.position = position; i.isVisible = false; return i; })
    }
    else {
      items[index].isVisible = false;
      items[index].position = number * -1;      
    }
    
    items[nextImageIndex].isVisible = true;
    items[nextImageIndex].position = 0;
    this.setState({
      items: items
    })
  }
  
  render() {
    const { items } = this.state;
    const carrouselImages = items.map((item, index) => {
      if(item.isVisible) {
        return <img key={index} alt="carrouselImage" className="image -visible" src={item.image} />
      }
      else {
        if(item.position === -1)
          return <img key={index} alt="carrouselImage" className="image -left" src={item.image} />
        else
          return <img key={index} alt="carrouselImage" className="image -right" src={item.image} />
      }
    })
    
    const carrouselBalls = items.map((item, index) => {
      if(item.isVisible) {
        return <div key={index} className="ball -active"></div>
      }
      else {
        return <div key={index} className="ball"></div>
      }
    })    
    
    return (
      <div className="carrousel">
        <div className="icon arrow -prev-arrow" onClick={this.prev}><img src={LeftArrow} alt="Carrousel Previous" width="25px"/></div>
        <div className="image-container">
          {carrouselImages}
        </div>
        <div className="icon arrow -next-arrow" onClick={this.next}><img src={RightArrow} alt="Carrousel Next" width="25px"/></div>
        <div className="counter">
          {carrouselBalls}
        </div>
      </div>
    );
  }
}

export default Carrousel;