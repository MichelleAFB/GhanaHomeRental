import React from 'react'

//redux
import { useDispatch } from 'react-redux'
import { setReviewModalApplication,setReviewModalVisibility } from '../redux/user/user-actions'
import { useEffect,useState } from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Image, Video, Transformation} from 'cloudinary-react';
import {Cloudinary} from "@cloudinary/url-gen";
import {fill,crop} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';
import axios from 'axios';
import CarouselImages from './CarouselImages';
import {Carousel} from 'react-responsive-carousel';


function ReviewItem({application}) {

  const dispatch=useDispatch()
  console.log(application.application)
  const[show,setShow]=useState(false)
  const[ourImages,setOurImages]=useState()
const[isLoading,setIsLoading]=useState(true)
  
  useEffect(()=>{
    const arr=[]
    const  prom=new Promise((resolve,reject)=>{
      const arr=[]
      const cld = new Cloudinary({
        cloud: {
          cloudName: 'michelle-badu',
          apiKey:'877163957659927',
          apiSecret:'NBk67NDZKIxpnGE06FUDFLSisp8'
        }
      })
      var index=0
      axios.get("http://localhost:3012/current-resident/review-images/"+application.application._id).then((response)=>{
        if(response.data.success){
          console.log(response.data)
          if(response.data.no_img>0){
            const images=response.data.images
          setOurImages(response.data.images)
          images.map((r)=>{
            arr.push(cld.image(r.img_url).resize(fill().width(100).height(80)))
            index++
            console.log(index)
            if(index==images.length){
              resolve()
            }
        })
      }
     }
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

  console.log(application)
  if(application.application==null){
    return(<div></div>)
  }
  if(application.application.review==null || application.application.review=="" || application.application.review=='' || application.application.review.length==0){
  return (
    <div class="flex  w-full bg-gray-200  justify-center rounded-md">
    <div class="flex flex-col  rounded-md p-3 m-3">
      <p class="text-center font-bold">Your Stay</p>
      <p class="text-center">{application.application.stay_start_date}-{application.application.stay_end_date}</p>
     
      <button class="bg-purple-400 rounded-md p-3" onClick={()=>{
        const prom=new Promise((resolve,reject)=>{
          dispatch(setReviewModalApplication(application))
          setTimeout(()=>{
            resolve()
          },400)
        })

        prom.then(()=>{
          dispatch(setReviewModalVisibility(true))
        })
      }}>
        <p class="text-white font-bold">Review</p>
      </button>
      </div>
    </div>
  )
    }if(application.application.review!="" || application.application.review.length!=0 || application.application.review!='' ){
      console.log(ourImages)
      return(
      <div class="flex w-full h-full justify-center">
      <div class="flex flex-col bg-gray-200 rounded-md p-3 m-3">
        <p class="text-center font-bold">Your Stay</p>
        <p class="text-center">{application.application.stay_start_date}-{application.application.stay_end_date}</p>
        <div class="flex p-3 bg-white w-full rounded-sm">
            <p>{application.application.review}</p>
        </div>
        <div class="flex w-full">
        <Carousel showThumbs={true} autoPlay>
          {
            ourImages!=null?
            <div class="h-[60vh] w-full">
              { ourImages.map((m)=>{
                console.log(m.publicID)
               
                return(
                  <div class="h-[60vh] object-cover">
                     <Image cloudName="michelle-badu" publicId={m.publicID}>
                      <Transformation crop="scale" angle="10"/>
                   </Image>
                  </div>
                )
                
              })
            }
            </div>:
            <div></div>
          }
           
            </Carousel> 

        </div>
        <button class="bg-purple-700 rounded-md p-3" onClick={()=>{
          const prom=new Promise((resolve,reject)=>{
           dispatch(setReviewModalApplication(application))
           resolve()
          })
  
          prom.then(()=>{
            dispatch(setReviewModalVisibility(true))
          })
        }}>
          <p class="text-white font-bold">Review</p>
        </button>
        </div>
      </div>
      )
    }
    else{
      return(<div></div>)
    }
}

export default ReviewItem