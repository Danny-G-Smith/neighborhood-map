import React, { Component } from 'react'
import VenueList from './VenueList'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

export default class SearchBar extends Component {
   handleInput = e => {
      const searchText = e.target.value.toLowerCase();

      let filteredMarkers = this.props.markers
         .filter(
            marker =>
               !marker.name.toLowerCase().includes(e.target.value.toLowerCase())
         )
         .map(marker => (marker.visible = false));
      let unfilteredMarkers = this.props.markers
         .filter(marker =>
            marker.name.toLowerCase().includes(e.target.value.toLowerCase())
         )
         .map(marker => (marker.visible = true));
      this.props.updateState({
         searchText,
         markers: Object.assign(
            this.props.markers,
            Object.assign({ filteredMarkers }, { unfilteredMarkers })
         )
      });
   };
   //class SideBar extends Component {

   render () {
      return (
         <div className="sideBar">
            <form id="filterForm" onSubmit={(e) => e.preventDefault()} searchstring={this.props.searchString}>
               {this.search = this.props.searchString}
               <input type={'search'}

                   id={'search'}
                   placeholder={'Filter Venues'}
                   onChange={(event) => this.props.updateSearchString(event.target.value)}
               />
            </form>
            <VenueList venues={this.props.venues}/>
         </div>
      )
   }
}

//export default SideBar

