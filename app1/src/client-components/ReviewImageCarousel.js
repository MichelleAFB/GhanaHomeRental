
import {Cloudinary} from "@cloudinary/url-gen";
import {fill,crop} from "@cloudinary/url-gen/actions/resize";
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
            arr.push(cld.image(r.img_url).resize(fill().width(100).height(80)))
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

 

      if(!isLoading && ourImages!=null){ 
        return (
          <div  class="flex h-3/5 p-2 object-cover ">
            <Carousel showThumbs={true} autoPlay>
            {
              ourImages.map((m)=>{
                return(
                  <div class="h-[60vh] object-cover">
                     <Image cloudName="michelle-badu" publicId={m.publicID}>
                      <Transformation crop="scale" angle="10"/>
                   </Image>
                  </div>
                )
              })
            }
            </Carousel>
          </div>
        )

     }else{
      return(<div></div>)
     }
};
//ReactDOM.render(<CarouselImages />, document.querySelector('.demo-carousel'));



export default ReviewImageCarousel