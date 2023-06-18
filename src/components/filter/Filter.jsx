import React from 'react'
import './Filter.css'

const Filter = (props) => {
    function onFilterChanged(event) {
        props.filterValue(event.target.value)
    }
  
    function onSizeChanged(event) {
      props.filterSize(event.target.value)
  }
  return (
    <div className="filter">
      <div className="filter-region">
          <select name='region' onChange={onFilterChanged}>
              <option selected value='all'>All regions</option>
              <option value='Oceania'>Oceania</option>
          </select>
      </div>
      <div className="filter-size">
      <select name='region' onChange={onSizeChanged}>
              <option selected value='all'>Smaller than</option>
              <option value='Lithuania'>Lithuania</option>
          </select>
      </div>
    </div>
  )
}

export default Filter