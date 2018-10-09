import React from 'react'
import {handleListItemClick} from "../API/"

const VenueItem = (props) => {
   return (
      <li className="venueItem"
         onClick={() => this.props.handleListItemClick(this.props)}>
         {props.name}
      </li> )
}

export default VenueItem

