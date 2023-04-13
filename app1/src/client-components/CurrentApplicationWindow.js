import React from 'react'

//redux
import { useDispatch,connect } from 'react-redux';

function CurrentApplicationWindow({visibility,application}) {

  console.log("HELLLLLLO"+ visibility)
  if(visibility){
   return (
     <div>CurrentApplicationWindow</div>
   )
  }else{
    return(<div></div>)
  }
}
const mapStateToProps = (state, props) => {
  var visibility= state.user.isCurrentlyOccupied;
  var application=state.user.currentlyOccupiedApplication
  console.log("visibility"+application)
  console.log(application)

  return {
   visibility:visibility,
   application:application
  };
};

export default connect(mapStateToProps)(CurrentApplicationWindow)