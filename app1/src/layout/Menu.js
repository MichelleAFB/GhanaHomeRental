import React from 'react'

import{useNavigate,Link} from 'react-router-dom'

function Menu() {
  return (
    <div class="flex w-full border-gray-300 p-3 border-2 justify-around">
      <div class="flex">
        <Link to="/reviews"><p class="text-center font-bold">Reviews</p></Link>
      </div>
    </div>
  )
}

export default Menu