import React from 'react'
import '../css/Header.css'
import SearchIcon from "@material-ui/icons/Search";
import LanguageIcon from "@material-ui/icons/Language";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import {useEffect,useState} from 'react'

function Header() {

    const[admin,setAdmin]=useState()
    const[client,setClient]=useState()
    const[isAdmin,setIsAdmin]=useState(false)
    const[isClient,setIsClient]=useState(false)
    const[isLoading,setIsLoading]=useState(true)

    useEffect(()=>{
        const prom=new Promise((resolve,reject)=>{
            

            const ad=JSON.parse(sessionStorage.getItem("admin"))
            console.log(ad)
            const cl=JSON.parse(sessionStorage.getItem("client"))
            if(ad!=null){
                setAdmin(ad)
                setIsAdmin(true) 
            }
            if(cl!=null){
                setClient(cl)
                setIsClient(true)
            }
      
            console.log(admin)
            resolve()
        })

        prom.then(()=>{
            console.log("here")
            setIsLoading(false) 

        })
    },[])
    const ad=JSON.parse(sessionStorage.getItem("admin"))
    console.log(ad)
    

    console.log(admin)
    /**
     * <Link to='/'>
                <img
                    className="header__icon"
                    src="https://i.pinimg.com/originals/3c/bf/be/3cbfbe148597341fa56f2f87ade90956.png"
                    alt=""
                />
            </Link>
     */
    console.log(isLoading)
    if(!isLoading){
    return (
            <div className='mt-0 mr-0 ml-0 flex p-4 justify-between align-center'>
            
            
           
            <div className='flex align-middle'>
                <div><input type="text" class="rounded-lg border-gray-300 border-2 m-2" /></div>
                  <div class="mt-2"><SearchIcon/> </div>  
                
            </div>

            <div className='flex align-center'>
              
                
                
                <Avatar />
                {
                    isAdmin? 
                    <div class="flex m-2"><p>{admin.firstname} {admin.lastname}</p></div>
                    :<div></div>
                }
                  {
                    isClient? 
                    <div class="flex m-2"><p>{client.firstname} {client.lastname}</p></div>
                    :<div></div>
                }

            </div>
        </div>
    )}
}
   
 

export default Header
