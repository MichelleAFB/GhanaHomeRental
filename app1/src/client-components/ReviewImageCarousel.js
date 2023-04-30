
import {Cloudinary} from "@cloudinary/url-gen";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';
import {AdvancedImage} from '@cloudinary/react';
import {Image, Video, Transformation} from 'cloudinary-react';



import React, {useEffect,useState,Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function ReviewImageCarousel({images}) {

  const[ourImages,setOurImages]=useState()
  const[isLoading,setIsLoading]=useState(true)
     /*
      
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'michelle-badu',
      apiKey:'877163957659927',
      apiSecret:'NBk67NDZKIxpnGE06FUDFLSisp8'
    }
  })
  
  const myImage0 = cld.image(restrictedList[0].img_url).resize(fill().width(50).height(50)); 
      */
  
  useEffect(()=>{
    const arr=[]
    const  prom=new Promise((resolve,reject)=>{
      const cld = new Cloudinary({
        cloud: {
          cloudName: 'michelle-badu',
          apiKey:'877163957659927',
          apiSecret:'NBk67NDZKIxpnGE06FUDFLSisp8'
        }
      })
        images.map((r)=>{
            arr.push(cld.image(r.img_url).resize(fill().width(50).height(50)))
        })

        setTimeout(()=>{
            resolve()
        },500)
    })

    prom.then(()=>{

      const prom1=new Promise((resolve1,reject1)=>{
          setOurImages(arr)
          resolve1()
      })

      prom1.then(()=>{
        setIsLoading(false)
      })

    })

  },[])

 

      if(!isLoading){ 
        return (
            <Carousel autoPlay class="h-150 p-3 object-contain block m-3 " showThumbs={false}>
              hi
              {
              images!=null?
                <div>
                  {
                    ourImages.map((m)=>{
                      <div>
                    <Image cloudName="michelle-badu" publicId={m.publicID}>
                      <Transformation crop="scale" width="20" angle="10" />
                   </Image>: 
                      </div>
                    })
                  }
                </div>:
                <div></div>
              }
            </Carousel>
        )
     }else{
      return(<div></div>)
     }
};
//ReactDOM.render(<CarouselImages />, document.querySelector('.demo-carousel'));



export default ReviewImageCarousel