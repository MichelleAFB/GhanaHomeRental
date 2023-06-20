import React from 'react'

import{useNavigate,Link} from 'react-router-dom'

function Menu() {
  return (
    <div class="flex w-full p-3 bg-purple-300 justify-around">
      <div class="flex">
        hello
        <Link to="/reviews"><p class="text-center font-bold">Reviews</p></Link>
      </div>
    </div>
  )
}

export default Menu