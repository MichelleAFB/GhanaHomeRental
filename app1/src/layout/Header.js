import React from 'react'
import '../css/Header.css'
import SearchIcon from "@material-ui/icons/Search";
import LanguageIcon from "@material-ui/icons/Language";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import {useEffect,useState} from 'react'

//redux
import { connect,useDispatch, useSelector } from 'react-redux';
import {setUser,setUserType} from '../redux/user/user-actions'

function Header({user,userType,userRedux}) {
    console.log(user)
    console.log(userType)
    const[admin,setAdmin]=useState()
    const[client,setClient]=useState()
    const[isAdmin,setIsAdmin]=useState(false)
    const[isClient,setIsClient]=useState(false)
    const[isLoading,setIsLoading]=useState(true)

    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    
    useEffect(()=>{
        const prom=new Promise((resolve,reject)=>{
            
            if(userType!=null){
                resolve()
            }
      
          
           
        })

        prom.then(()=>{
            console.log("here")
            setIsLoading(false) 

        })
    },[userType,user,userRedux])
    const ad=JSON.parse(sessionStorage.getItem("admin"))
    console.log(ad)
    

    
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
    if(!isLoading && user!=null){
       console.log(userType)
    return (
            <div className='mt-0 mr-0 ml-0 flex p-4 justify-between align-center'>
            
            
           
            <div className='flex align-middle'>
                <div><input type="text" class="rounded-lg border-gray-300 border-2 m-2" /></div>
                  <div class="mt-2"><SearchIcon/> </div>  
                
            </div>

            <div className='flex align-center'>
              
                
                
                <Avatar />
                {
                    userType=="admin"? 
                    <div class="flex m-2">
                        <p>{user.firstname} {user.lastname} (Admin)</p>
                         <button class="ml-2" onClick={()=>{
                            const prom=new Promise((resolve,reject)=>{
                                dispatch(setUserType(null))
                                dispatch(setUser(null));
                                sessionStorage.removeItem("user")
                                sessionStorage.removeItem("userType")
                                resolve()
                            })

                            prom.then(()=>{
                                    navigate("/sign-in")
                            })
                         }}>Sign Out</button>
                    </div>
                    :<div></div>
                }
                  {
                    userType=="client"? 
                    <div class="flex m-2">
                    <p>{user.firstname} {user.lastname} </p>
                     <button class="ml-2" onClick={()=>{
                        const prom=new Promise((resolve,reject)=>{
                            dispatch(setUserType(null))
                            dispatch(setUser(null));
                            sessionStorage.removeItem("user")
                            sessionStorage.removeItem("userType")
                            sessionStorage.removeItem("signInType")
                            resolve()
                        })

                        prom.then(()=>{
                                //navigate("/")
                        })
                     }}>Sign Out</button>
                </div>
                :<div></div>
                }
                {
                    user==null  ?
                    <Link to="/sign-in" class="text-gray-400 m-2">Sign In</Link>:<div></div>
                }

            </div>
        </div>
    )}else{
        return(
            <div className='mt-0 mr-0 ml-0 flex p-4 justify-between align-center'>
            
            
           
            <div className='flex align-middle'>
                <div><input type="text" class="rounded-lg border-gray-300 border-2 m-2" /></div>
                  <div class="mt-2"><SearchIcon/> </div>  
                
            </div>

            <div className='flex align-center'>
              
                
                
                <Avatar />
                {
                    userType=="admin"? 
                    <div class="flex m-2">
                        <p>{user.firstname} {user.lastname} (Admin)</p>
                         <button class="ml-2" onClick={()=>{
                            const prom=new Promise((resolve,reject)=>{
                              
                                sessionStorage.removeItem("user")
                                sessionStorage.removeItem("userType")
                                sessionStorage.removeItem("admin")
                                sessionStorage.removeItem("noDays")
                                resolve()
                            })

                            prom.then(()=>{
                               // dispatch(setUserType(null))
                               // dispatch(setUser(null));
                               user=null
                                navigate("/sign-in")
                            })
                         }}>Sign Out</button>
                    </div>
                    :<div></div>
                }
                  {
                    userType=="client"? 
                    <div class="flex m-2">
                    <p>{user.firstname} {user.lastname} </p>
                     <button class="ml-2" onClick={()=>{
                        const prom=new Promise((resolve,reject)=>{
                            
                            sessionStorage.removeItem("user")
                            sessionStorage.removeItem("userType")
                            sessionStorage.removeItem("admin")
                            sessionStorage.removeItem("noDays")
                            resolve()
                        })

                        prom.then(()=>{
                            //dispatch(setUserType(null))
                            //dispatch(setUser(null));
                            user=null
                            navigate("/sign-in")
                        })
                     }}>Sign Out</button>
                </div>
                :<div></div>
                }
                {
                    user==null  ?
                    <Link to="/sign-in" class="text-gray-400 m-2">Sign In</Link>:<div></div>
                }

            </div>
        </div>
        )
    }
}
   
const mapStateToProps = (state, props) => {
    var user= state.user.user;
    var userType=state.user.userType
    var userRedux=state.user.user;
    if(userType==null || user==null){
        user=JSON.parse(sessionStorage.getItem("user"))
        console.log(sessionStorage.getItem("client"))
        userType=JSON.parse(sessionStorage.getItem("userType"))

    }if(JSON.parse(sessionStorage.getItem("user"))==null){
        user=null
    }
 
    return {
      user: user,
      userType: userType,
      userRedux:userRedux
    };
  };

export default connect(mapStateToProps)(Header)
