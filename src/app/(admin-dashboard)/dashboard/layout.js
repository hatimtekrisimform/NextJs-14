import React from 'react'

const layout = ({children,team,analytics}) => {
  return (
   <>
   {children}
   {team}
   {analytics}
   </>
  )
}

export default layout