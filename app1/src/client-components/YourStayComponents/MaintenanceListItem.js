import React from 'react'

function MaintenanceListItem({issue}) {
  return (
    <div class="flex  p-3 bg-gray-400 rounded-md m-2">
      <div class="flex  w-full justify-arounded">
        <div class="flex">
         <p class="text-md font-bold text-white">Status:<span class="font-normal">{issue.status}</span></p>
        </div>
      <div class="flex">
        <p class="text-white"><span class="font-bold">Recieved:</span> {issue.dateRecieved}</p>
      </div>
       
      </div>

    </div>
  )
}

export default MaintenanceListItem