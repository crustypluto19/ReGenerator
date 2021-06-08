import React from 'react'
import './StepCard.css'

const StepCard = (props) => {
  return (
    <div className = "card">
      <h5>{props.step}</h5>
    </div>
  )
}

export default StepCard
