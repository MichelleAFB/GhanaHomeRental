import React from 'react'
import { useState,useEffect } from 'react'

//outside
import axios from 'axios'

//assets
import IonIcon from '@reacticons/ionicons'

//redux
import { useDispatch,connect } from 'react-redux'
import { setReviewModalVisibility } from '../redux/user/user-actions'
function ReviewModal({visibility,application}) {

  const[isLoading,setIsLoading]=useState(true)
  const[files,setFiles]=useState()
  const[review,setReview]=useState()
  const[fileNames,setFileNames]=useState([])

  console.log(visibility)
  const dispatch=useDispatch()
  
  useEffect(()=>{
    if(visibility && application!=null){
      sessionStorage.removeItem("images")
      setIsLoading(false)
    }

  },[visibility])

  async function add(formData,index){
    const arr=[]
     await axios.post("https://api.cloudinary.com/v1_1/michelle-badu/image/upload/",formData).then((response1)=>{
      if(response1.data.secure_url!=null){
       console.log(response1)
       if(sessionStorage.getItem("images")==null){
        const images=[]

        images.push({img_url:response1.data.secure_url,publicID:response1.data.public_id})
        sessionStorage.setItem("images",JSON.stringify(images))
       }else{
        const im=JSON.parse(sessionStorage.getItem("images"))
        im.push({url_img:response1.data.secure_url})
        sessionStorage.setItem("images",JSON.stringify(im))
       }
       
       console.log(response1)
      }
     })
   }

  const sendImages=async(files)=>{
      Object.keys(files).map((i)=>{

        var formData=new FormData()
        formData.append('upload_preset','zj9kqmht')
        formData.append('file',files[i])
        formData.append('cloud_name','michelle-badu')
        formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY)
        add(formData,i)
      })
      return
  }

  if(visibility){
    console.log(application.application.review) 
   console.log(application.application.review)
  return (
  
    <div class='h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center '>
     
      <main  role='main' class='w-full z-20 max-w-lg mx-auto '>
        <div class="flex w-3/4 justify-center">
        <div class='flex flex-col rounded-xl shadow-lg bg-purple-300 dark:border-gray-700 mb-2'>
          <div class="flex justify-end p-3">
          <button  onClick={()=>{
              dispatch(setReviewModalVisibility(false))
          }}>
          <IonIcon name="close-outline" size="medium"/>
          </button>
          
          
          </div>
            
        
          <div class='p-2 flex flex-col'>
            <p class="text-center font-bold">Stay</p>
              <p class="text-center">{application.application.stay_start_date}-{application.application.stay_end_date}</p>
         <div class="flex flex-col m-3 p-2">
          <p class="text-center">
            
            You checkout at:{application.application.checkoutTime}
          </p>
          <label class="m-2 text-xl font-semibold">Leave A Review:</label>
          <textarea rows="10" cols="40" placeholder={application.application.review}  class="rounded-md m-2 p-3" onClick={(e)=>{
            setReview(e.target.value)
          }}>

          </textarea>
          <input type="file" class="m-1 " multiple="multiple" accept="image/jpeg, image/png, image/jpg" onChange={(e)=>{
            setFiles(e.target.files)
            console.log(files)
          }}/>
              </div>
              <button class="flex flex-col bg-green-300 rounded-md p-3 " onClick={()=>{
                const prom=new Promise((resolve,reject)=>{
                  if(files!=null){
                  sendImages(files).then(()=>{
                    console.log(files)
                    console.log(JSON.parse(sessionStorage.getItem("images")))
                    const images=JSON.parse(sessionStorage.getItem('images'))
                     axios.post("http://localhost:3012/current-resident/review/"+application.application._id,{review:review,images:images}).then((response)=>{
                        console.log(response.data)
                        if(response.data.success){
                          alert("Thank you for your review!")
                          sessionStorage.removeItem("images")
                        }
                      })
                      
                  });
                }else{

                  axios.post("http://localhost:3012/current-resident/review/"+application.application._id,{review:review,images:JSON.parse(sessionStorage.getItem('images'))}).then((response)=>{
                    console.log(response.data)
                    if(response.data.success){
                      alert("Thank you for your review!")
                      sessionStorage.removeItem("images")
                    }
                  })

                }

                })

                prom.then(()=>{
                  sessionStorage.removeItem("images")
                })
              }}>
                  <p class="text-center font-bold">Submit</p>
              </button>
          </div>
        </div>
        </div>
      </main>
    </div>

    )
  }else{
    return(<div></div>)
  }
}

const mapStateToProps = (state, props) => {
  var visibility= state.user.reviewModalVisibility;
  var application=state.user.reviewModalApplication
  console.log("visibility"+visibility)
  console.log(application)
  console.log(visibility)
  return {
   visibility:visibility,
   application:application
  };
};
export default connect(mapStateToProps)(ReviewModal)