/*import React from 'react'
import ImageGallery from 'react-image-gallery';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function CarouselImages() {

  const images=[
    {
      original:require('../home_photos/Entry & Egress 2.jpg'), 
      originalHeight:'50px',
      originalWidth:'60px',
      thumbnail:require('../home_photos/Entry & Egress 2.jpg')
    },
    {
      original:require('../home_photos/Dining.jpg'),
      originalHeight:'50px',
      originalWidth:'60px',
      thumbnail:require('../home_photos/Dining.jpg')
    },
    {
      original:require('../home_photos/Bedroom 2.jpg'),
      originalHeight:'50px',
      originalWidth:'60px',
      thumbnail:require('../home_photos/Bedroom 2.jpg')
    },
    {
      original:require('../home_photos/Bedroom 3.jpg'),
      originalHeight:'50px',
      originalWidth:'60px',
      thumbnail:require('../home_photos/Bedroom 3.jpg')
    },
    {
      original:require('../home_photos/Bedroom 5.jpg'),
      originalHeight:'50px',
      originalWidth:'60px',
      thumbnail:require('../home_photos/Bedroom 5.jpg')

    }
  ]
  return (
    <Carousel>
        <div>
          <img src={require('../home_photos/Entry & Egress 2.jpg')} alt="house"/>
        </div>
        <div>
          <img src={require('../home_photos/Dining.jpg')} alt="dining"/>
        </div>

    </Carousel>
    
   
  )
}
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class CarouselImages extends Component {
    render() {
        return (
            <Carousel autoPlay class="h-150 p-3 object-contain block m-3 z-10 " showThumbs={false}>
                <div>
                   <img src={require('../home_photos/Entry & Egress 2.jpg')} 
                     class="object-cover h-[450px]"  alt="house"/>
                </div>
                <div>
                   <img src={require('../home_photos/Bedroom Chair.jpg')}  
                     class="object-cover h-[450px]"  alt="house"/>
                </div>
                <div>
                   <img src={require('../home_photos/Dining.jpg')} 
                    class="object-cover h-[450px]"  alt="dining"/>
               </div>
               <div>
                   <img src={require('../home_photos/Bedroom 2.jpg')} 
                    class="object-cover h-[450px]"  alt="bedroom2"/>
               </div>
               <div>
                   <img src={require('../home_photos/Bedroom 3.jpg')} 
                    class="object-cover h-[450px]"  alt="Bedroom3"/>
               </div>
               <div>
                   <img src={require('../home_photos/Bedroom 5.jpg')} 
                    class="object-cover h-[450px]"  alt="bedroom5"/>
               </div>
            </Carousel>
        );
    }
};
//ReactDOM.render(<CarouselImages />, document.querySelector('.demo-carousel'));

export default CarouselImages