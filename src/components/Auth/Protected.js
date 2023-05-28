import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Protected({ isSignedIn, children }) {
  const navigate = useNavigate();
  if(!isSignedIn){
    return <Navigate to="/login" />
  }
  else{
    return children
  }
}
export default Protected