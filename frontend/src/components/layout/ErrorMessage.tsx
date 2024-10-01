
import React from 'react'



const ErrorMessage = ({ error }: { error: string | null }) => {

  return (

    <>

      {error && <div className="mb-4 text-red-500">{error}</div>}

    </>

  )

}



export default ErrorMessage
