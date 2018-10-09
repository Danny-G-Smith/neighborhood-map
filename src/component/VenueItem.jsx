import React from 'react'
//import {handleListItemClick} from "../API/"

//debugger
const VenueItem = (props) => {
   return (
      <li className="venueItem"
         onClick={() => this.props.handleListItemClick(this)}>
         {props.name}
      </li> )
}

export default VenueItem

