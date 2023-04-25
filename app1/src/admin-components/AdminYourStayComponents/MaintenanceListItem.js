import React from 'react'

function MaintenanceListItem({issue}) {
  return (
    <div class="flex flex-col p-3 bg-gray-400 rounded-md m-2">
      <p class="text-md font-bold">Status:<span class="font-normal">{issue.status}</span></p>

    </div>
  )
}

export default MaintenanceListItem