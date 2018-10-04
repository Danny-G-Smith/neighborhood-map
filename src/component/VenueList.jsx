import React, { Component } from 'react'
import VenueItem from './VenueItem'

class VenueList extends Component {
   render () {
      return (
         <ol className="venueList">
            {this.props.venues &&
            this.props.venues.map((venue, idx) => (
               <VenueItem key={idx} name={venue}/>
            ))}
         </ol>
      );
   }
}

export default VenueList

