import React from 'react'
import "./ApartmentLayout.css"
import { useState } from 'react'
function ApartmentLayout() {

  const[on,setOn]=useState(false)
  return (
    <div>
    <div class="main-content">
    <div class="door-hor"></div>
    <div class="utility">
      <div class="door-hor"></div>
      <div class="name">utility room</div>
    </div>
    <div class="kitchen">
      <div class="ref"></div>
      <div class="rug"></div>
      <div class="cabinets">
        <div class="stove"></div>
      </div>
      <div class="sink">
        <div class="sink-tap-1"></div>
        <div class="sink-tap-2"></div>
      </div>
      <div class="island">
        <div class="chair"></div>
      </div>
      <div class="name">kitchen</div>
    </div>
    <div class="bathroom-2">
      <div class="window-hor"></div>
      <div class="door-hor"></div>
      <div class="shower"></div>
      <div class="toilet"></div>
      <div class="vanity"></div>
      <div class="rug"></div>
      <div class="name">bath #1 hi</div>
    </div>
    <div class="bedroom-2" onClick={()=>{
      setOn(!on)
    }}>
      <div class="door-ver"></div>
      <div class="window-hor"></div>
      <div class="bed-table"></div>
      <input value={on}/>{on}
      {
        on?
        <div class="bed-on"  onClick={()=>{
          setOn(!on)
        }}>
        <div class="blanket-on"></div>
        <button class="pillow"  onClick={()=>{
          setOn(!on)
        }}></button>
      </div>
      :
      <div class="bed-on">
        <div class="blanket-on"></div>
        <button class="pillow" onClick={()=>{
          setOn(!on)
        }}></button>
      </div>
      }
      <div class="table"></div>
      <div class="name">guest bedroom</div>
    </div>

    <div class="living-room">
      <div class="rug"></div>
      <div class="window-ver"></div>
      <div class="sofa"></div>
      <div class="coffee-table"></div>
      <div class="tv-set"></div>
      <div class="name">living room</div>
    </div>
    <div class="bedroom-1">
      <div class="rug"></div>
      <div class="door-hor"></div>
      <div class="window-hor"></div>
      <div class="bed">
        <div class="blanket"></div>
        <div class="pillow"></div>
        <div class="pillow"></div>
      </div>
      <div class="bed-table"></div>
      <div class="bed-table"></div>
      <div class="name">master bedroom</div>
    </div>
    <div class="bedroom-2">
      <div class="door-ver"></div>
      <div class="window-hor"></div>
      <div class="bed-table"></div>
      <div class="bed">
        <div class="blanket"></div>
        <div class="pillow"></div>
      </div>
      <div class="table"></div>
      <div class="name">guest bedroom</div>
    </div>
    <div class="closet">
      <div class="wall-gap"></div>
      <div class="name">walk-in closet</div>
    </div>
    <div class="bathroom-1">
      <div class="door-ver"></div>
      <div class="door-ver"></div>
      <div class="window-hor"></div>
      <div class="rug"></div>
      <div class="bathtub"></div>
      <div class="vanity"></div>
      <div class="toilet"></div>
      <div class="name">bath #2</div>
    </div>
    <div class="office">
      <div class="door-hor"></div>
      <div class="window-hor"></div>
      <div class="table"></div>
      <div class="name">home office</div>
    </div>
    <div class="patio">
      <div class="door-sliding"></div>
      <div class="real-patio">
        <div class="name">balcony</div>
      </div>
      <div class="patio-table"></div>
      <div class="patio-chair"></div>
      <div class="patio-chair"></div>
    </div>
  </div>
  <aside class="context">
    <div class="explanation">Part of the <a href="https://codepen.io/collection/DQvYpQ/" target="_blank">CSS Grid collection here</a>.</div>
  </aside>
  <footer><a href="https://twitter.com/meowlivia_" target="_blank"><i class="icon-social-twitter icons"></i></a><a href="https://github.com/oliviale" target="_blank"><i class="icon-social-github icons"></i></a><a href="https://dribbble.com/oliviale" target="_blank"><i class="icon-social-dribbble icons"></i></a></footer>
	</div>
  )
}

export default ApartmentLayout