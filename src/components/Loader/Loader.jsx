import React from 'react'
import {PropagateLoader} from 'react-spinners'

export default function Loader() {
  return (
    <div className=''>
        <div className="flex items-center justify-center h-screen">
            <PropagateLoader color={'#FFDE5B'} />
        </div>
    </div>
  )
}
