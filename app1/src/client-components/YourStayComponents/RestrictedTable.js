import React from 'react'

import { useState,useEffect } from 'react'

//outside
import axios from 'axios'
import {Cloudinary} from "@cloudinary/url-gen";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';
import {AdvancedImage} from '@cloudinary/react';
import {Image, Video, Transformation} from 'cloudinary-react';

function RestrictedTable({restricted,occupant}) {
   
  const[restrictedList,setRestrictedList]=useState(restricted)
  const[isLoading,setIsLoading]=useState(true)
  const[seeImage1,setSeeImage1]=useState(false)
  const[seeImage2,setSeeImage2]=useState(false)

  const[seeImage0,setSeeImage0]=useState(false)

   
 

    console.log(restricted)
    useEffect(()=>{
      const prom=new Promise((resolve,reject)=>{

        var newrestricted;

      if(restricted==null){
          newrestricted=[{firstname:"",lastname:"",img_url:null},
                     {firstname:"",lastname:"",img_url:null},
                     {firstname:"",lastname:"",img_url:null}]
           setRestrictedList(newrestricted)          
       }
        if(restricted.length<3){
      
         if(restricted[1]==null){
            newrestricted=[restricted[0],
            {firstname:"",lastname:"",img_url:null},,
            {firstname:"",lastname:"",img_url:null}]
         }
         if(restricted[2]==null){
          newrestricted=[restricted[0],
                   restricted[1],
            {firstname:"",lastname:"",img_url:null}]
       }
       
      
      setRestrictedList(newrestricted)
      }
      resolve()
      })

      prom.then(()=>{
        setIsLoading(false)
      })

    },[])
    console.log(restrictedList) 

    async function add(formData,index){
     const arr=[]
      await axios.post("https://api.cloudinary.com/v1_1/michelle-badu/image/upload/",formData).then((response1)=>{
       if(response1.data.secure_url!=null){
        console.log(response1)
        sessionStorage.setItem("url_"+index,response1.data.secure_url)
        console.log(response1)
       }
        
        
       
      })
    }

    async function setList(){
      var index=0
      const arr=[]
      restrictedList.map(async(m,i)=>{
        console.log(m)
        console.log(m.img_url)
        const formData=new FormData()
        var file=m.img_url
        formData.append('upload_preset','zj9kqmht')
        formData.append('file',file.img_url)
        formData.append('cloud_name','michelle-badu')
        formData.append("api_key", "877163957659927")
        
        console.log(formData.entries)
        if(m.img_url!=null){
         

         console.log(m)
         await add(formData,m.img_url.id).then((res)=>{
          const rest=restrictedList
          if(res!=false){
            console.log("\n\n\n"+res)
            
           
           // setRestrictedList(rest)
          }
         
            console.log(restrictedList)
         }).then((rest)=>{
          if(rest!=false){
            console.log("\n\n\n"+rest)
            
            
            arr.push({url:rest,id:index})
            console.log(arr)
           
          }
          index++

         })
        }
     
      })
      
    }

    if(!isLoading && restricted!=null && restricted.length>0){
      console.log(restrictedList)
      const s=axios.get(restrictedList[0].img_url).then((response)=>{
        console.log(response)
        return response
      })
      const cld = new Cloudinary({
        cloud: {
          cloudName: 'michelle-badu',
          apiKey:'877163957659927',
          apiSecret:'NBk67NDZKIxpnGE06FUDFLSisp8'
        }
      })
      const myImage0 = cld.image(restrictedList[0].img_url).resize(fill().width(50).height(50)); 
      
      const myImage1 = new CloudinaryImage(restrictedList[1].img_url, {cloudName: 'michelle-badu'}).resize(fill().width(100).height(150));
      const myImage2 = new CloudinaryImage(restrictedList[2].img_url, {cloudName: 'michelle-badu'}).resize(fill().width(100).height(150));
      
      console.log(myImage2)
  return (
    <div class="flex-col w-full p-3">
  
      <p class="text-lg font-bold text-center text-red-600">Restricted Individuals</p>
    <table class="w-full p-3">
    <tr class="border-gray-400 border-2">
      <th class="border-gray-400 border-2">First</th>
      <th class="border-gray-400 border-2" >Last</th>
      <th class="border-gray-400 border-2">Upload Image</th>
     
    </tr>
   
      {restricted[0]!=null ?
        <tr>
          <td><input type='text'default={restricted[0].firstname} placeholder={restricted[0].firstname}  name='firstname'onChange={(e)=>{
            var g=restricted
            restrictedList[0].firstname=e.target.value
            setRestrictedList(restrictedList)
        }} id="first_0"class="w-full"/></td>
          <td><input type='text' default={restricted[0].lastname} placeholder={restricted[0].lastname}  name='lastname' onChange={(e)=>{
            var g=restricted
            restrictedList[0].lasttname=e.target.value
            setRestrictedList(restrictedList)
        }}id="last_0"class="w-full"/></td>
          <td>
            <div class="flex-col">
              <div class="flex">
              <input type='file' default={restricted[0].imag_url} placeholder={restricted[0].img_url}  name='phone' onChange={(e)=>{
            var g=restricted
            restrictedList[0].img_url={img_url:e.target.files[0],id:0}
            setRestrictedList(restrictedList)
                   }}id="phone_0"class="w-full"/>
               <button class="bg-orange-400 rounded-md flex w-1/3 justify-center" onClick={()=>{
              setSeeImage0(!seeImage0)
            }}>
              <p class="text-white text-center">See</p>
            </button>
              </div>
           
        {
          myImage0.publicID!=null?
          <div class="flex">
         
            {
              seeImage0?
              <Image cloudName="michelle-badu" publicId={myImage0.publicID}>
                <Transformation crop="scale" width="20" angle="10" />
            </Image>: 
            <div>

            </div>
            }
          </div>:
          <div></div>
        }
        </div>
       </td>
        
        </tr>:
        <tr>
          <td><input type='text' id="first_0" onChange={(e)=>{
            var g=restricted
            restrictedList[0].firstname=e.target.value
            setRestrictedList(restrictedList)
            console.log(restrictedList)
        }} class="w-full"/></td>
          <td><input type='text'  id="last_0" onChange={(e)=>{
            var g=restricted
            restrictedList[0].lastname=e.target.value
            setRestrictedList(restrictedList)
        }}class="w-full"/></td>
          <td><input type='file' id="phone_0" onChange={(e)=>{
            var g=restricted
            console.log(e.target.value)
            restrictedList[0].img_url={img_url:e.target.files[0],id:0}
            setRestrictedList(restrictedList)
        }}class="w-full"/></td>
       
        </tr>}
        {restricted[1]!=null ?
        <tr>
          <td><input type='text'default={restricted[1].firstname} placeholder={restricted[1].firstname}  name='firstname'onChange={(e)=>{
            var g=restricted
            restrictedList[1].firstname=e.target.value
            setRestrictedList(restrictedList)
        }} id="first_1"class="w-full"/></td>
          <td><input type='text' default={restricted[1].lastname} placeholder={restricted[1].lastname}  name='lastname' onChange={(e)=>{
            var g=restricted
            restrictedList[1].lasttname=e.target.value
            setRestrictedList(restrictedList)
        }}id="last_1"class="w-full"/></td>
          <td>
            <div class="flex-col">
              <div class="flex">
              <input type='file' default={restricted[1].imag_url} placeholder={restricted[1].img_url}  name='phone' onChange={(e)=>{
            var g=restricted
            restrictedList[1].img_url={img_url:e.target.files[1],id:1}
            setRestrictedList(restrictedList)
                   }}id="phone_1"class="w-full"/>
               <button class="bg-orange-400 rounded-md w-1/3 flex justify-center" onClick={()=>{
              setSeeImage1(!seeImage1)
            }}>
              <p class="text-white">See</p>
            </button>
              </div>
           
        {
          myImage0.publicID!=null?
          <div class="flex">
         
            {
              seeImage1?
              <Image cloudName="michelle-badu" publicId={myImage1.publicID}>
                <Transformation crop="scale" width="20" angle="10" />
            </Image>: 
            <div>

            </div>
            }
          </div>:
          <div></div>
        }
        </div>
       </td>
        </tr>:
        <tr>
          <td><input type='text' id="first_1" onChange={(e)=>{
            var g=restricted
            restrictedList[1].firstname=e.target.value
            setRestrictedList(restrictedList)
            console.log(restrictedList)
        }} class="w-full"/></td>
          <td><input type='text'  id="last_1" onChange={(e)=>{
            var g=restricted
            restrictedList[1].lastname=e.target.value
            setRestrictedList(restrictedList)
        }}class="w-full"/></td>
          <td><input type='file' id="phone_1" onChange={(e)=>{
            var g=restricted
            console.log(e.target.value)
            restrictedList[1].img_url={img_url:e.target.files[1],id:1}
            setRestrictedList(restrictedList)
        }}class="w-full"/></td>
        </tr>}
        {restricted[2]!=null ?
        <tr>
          <td><input type='text'default={restricted[2].firstname} placeholder={restricted[2].firstname}  name='firstname'onChange={(e)=>{
            var g=restricted
            restrictedList[2].firstname=e.target.value
            setRestrictedList(restrictedList)
        }} id="first_2"class="w-full"/></td>
          <td><input type='text' default={restricted[2].lastname} placeholder={restricted[2].lastname}  name='lastname' onChange={(e)=>{
            var g=restricted
            restrictedList[2].lastname=e.target.value
            setRestrictedList(restrictedList)
        }}id="last_1"class="w-full"/></td>
          <td>
            <div class="flex-col">
              <div class="flex">
              <input type='file' default={restricted[2].imag_url} placeholder={restricted[2].img_url}  name='phone' onChange={(e)=>{
            var g=restricted
            restrictedList[2].img_url={img_url:e.target.files[2],id:2}
            setRestrictedList(restrictedList)
                   }}id="phone_1"class="w-full"/>
               <button class="bg-orange-400 rounded-md w-1/3 flex justify-center" onClick={()=>{
              setSeeImage2(!seeImage2)
            }}>
              <p class="text-white">See</p>
            </button>
              </div>
           
        {
          myImage2.publicID!=null?
          <div class="flex">
         
            {
              seeImage2?
              <Image cloudName="michelle-badu" publicId={myImage2.publicID}>
                <Transformation crop="scale" width="20" angle="10" />
            </Image>: 
            <div>

            </div>
            }
          </div>:
          <div></div>
        }
        </div>
       </td>
        </tr>:
        <tr>
          <td><input type='text' id="first_2" onChange={(e)=>{
            var g=restricted
            restrictedList[2].firstname=e.target.value
            setRestrictedList(restrictedList)
            console.log(restrictedList)
        }} class="w-full"/></td>
          <td><input type='text'  id="last_2" onChange={(e)=>{
            var g=restricted
            restrictedList[2].lastname=e.target.value
            setRestrictedList(restrictedList)
        }}class="w-full"/></td>
          <td><input type='file' id="phone_2" onChange={(e)=>{
            var g=restricted
            console.log(e.target.value)
            restrictedList[2].img_url={img_url:e.target.files[2],id:2}
            setRestrictedList(restrictedList)
        }}class="w-full"/></td>
        </tr>}
    </table>
    <button class="bg-green-400 rounded-md w-full  flex-col justify-items-center p-3 m-2" onClick={()=>{
        const prom=new Promise((resolve,reject)=>{
          console.log("\n\n")
          var index=0
          
       
         setList().then(()=>{
            
            const arr=restrictedList
            arr[0]={firstname:restrictedList[0].firstname,lastname:restrictedList[0].lastname,img_url:sessionStorage.getItem("url_0")}
            arr[1]={firstname:restrictedList[1].firstname,lastname:restrictedList[1].lastname,img_url:sessionStorage.getItem("url_1")}
            arr[2]={firstname:restrictedList[2].firstname,lastname:restrictedList[2].lastname,img_url:sessionStorage.getItem("url_2")}
           
           
            console.log(arr)

                      axios.post("https://ghanahomestayserver.onrender.com/current-resident/restricted-individuals/"+occupant.application._id+"/"+occupant._id,{restricted:arr,no_restricted:arr.length}).then((response)=>{
              console.log(response)
              if(response.data.success==true){
                alert("SUCCESS: "+response.data.no_restricted+" have been restricted "+restricted.length+" to "+occupant.firstname+ " "+occupant.lastname+"'s guest list")
              }
            })
          })
        })
    }}>
          <p class="text-center text-white font-bold">
            Submit
          </p>
        </button>
    </div>
  )
  console.log(restricted)
    }else {
    return (
      <div class="flex-col w-full p-3">
    
        <p class="text-lg font-bold text-center text-red-600">Restricted Individuals</p>
      <table class="w-full p-3">
      <tr class="border-gray-400 border-2">
        <th class="border-gray-400 border-2">First</th>
        <th class="border-gray-400 border-2" >Last</th>
        <th class="border-gray-400 border-2">Upload Image</th>
       
      </tr>
     
        
     
          <tr>
            <td><input type='text' id="first_0" onChange={(e)=>{
              var g=restricted
              restrictedList[0].firstname=e.target.value
              setRestrictedList(restrictedList)
              console.log(restrictedList)
          }} class="w-full"/></td>
            <td><input type='text'  id="last_0" onChange={(e)=>{
              var g=restricted
              restrictedList[0].lastname=e.target.value
              setRestrictedList(restrictedList)
          }}class="w-full"/></td>
            <td><input type='file' id="phone_0" onChange={(e)=>{
              var g=restricted
              console.log(e.target.value)
              restrictedList[0].img_url={img_url:e.target.files[0],id:0}
              setRestrictedList(restrictedList)
          }}class="w-full"/></td>
         
          </tr>
        
         
          <tr>
            <td><input type='text' id="first_0" onChange={(e)=>{
                var g=restricted
                restrictedList[1].firstname=e.target.value
                setRestrictedList(restrictedList)
            }} class="w-full"/></td>
            <td><input type='text'  id="last_0" onChange={(e)=>{
                var g=restricted
                restrictedList[1].lastname=e.target.value
                setRestrictedList(restrictedList)
                console.log(restrictedList)
            }}class="w-full"/></td>
            <td><input type='file' id="phone_0" onChange={(e)=>{
              var g=restricted
              restrictedList[1].img_url={img_url:e.target.files[0],id:1}
              setRestrictedList(restrictedList)
          }}class="w-full"/></td>
           
          </tr>
         
        
          <tr>
            <td><input type='text' id="first_0" onChange={(e)=>{
              var g=restricted
              restrictedList[2].firstname=e.target.value
              setRestrictedList(restrictedList)
          }}class="w-full"/></td>
            <td><input type='text'  id="last_0" onChange={(e)=>{
              var g=restricted
              restrictedList[2].lastname=e.target.value
              setRestrictedList(restrictedList)
          }}class="w-full"/></td>
            <td><input type='file' id="phone_0" onChange={(e)=>{
              var g=restricted
              restrictedList[2].img_url={img_url:e.target.files[0],id:2}
  
              setRestrictedList(restrictedList)
          }}class="w-full"/>
         </td>
          
          </tr>
         
      </table>
      <button class="bg-green-400 rounded-md w-full  flex-col justify-items-center p-3 m-2" onClick={()=>{
          const prom=new Promise((resolve,reject)=>{
            console.log("\n\n")
            var index=0
            
         
           setList().then(()=>{
              
              const arr=restrictedList
              arr[0]={firstname:restrictedList[0].firstname,lastname:restrictedList[0].lastname,img_url:sessionStorage.getItem("url_0")}
              arr[1]={firstname:restrictedList[1].firstname,lastname:restrictedList[1].lastname,img_url:sessionStorage.getItem("url_1")}
              arr[2]={firstname:restrictedList[2].firstname,lastname:restrictedList[2].lastname,img_url:sessionStorage.getItem("url_2")}
             
             
              console.log(arr)
  
                        axios.post("https://ghanahomestayserver.onrender.com/current-resident/restricted-individuals/"+occupant.application_id+"/"+occupant._id,{restricted:arr,no_restricted:arr.length}).then((response)=>{
                console.log(response)
                console.log(response.data.success)
                alert(response.data.success)
                if(response.data.success){
                  alert("SUCCESS: "+response.data.no_restricted+" have been restricted "+restricted.length+" to "+occupant.firstname+ " "+occupant.lastname+"'s guest list")
                }
              })
  
            })
           
            
           
            
          })
      }}>
            <p class="text-center text-white font-bold">
              Submit
            </p>
          </button>
      </div>
    )
      
    }
}

export default RestrictedTable