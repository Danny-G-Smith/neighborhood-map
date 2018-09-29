import React, { Component } from 'react'
// import SideBar from './components/SideBar';
import Notifications from './components/Notifications';
import './App.css'

import axios from 'axios'
class App extends Component {


   // this.toggleSideBar = this.toggleSideBar.bind(this);
   //
   // toggleSideBar () {
   //    this.setState(state => ({ sidebarOpen: !state.sidebarOpen }));
   // }

   /*
    https://www.youtube.com/watch?v=W5LhLZqj76s&feature=youtu.be
    -------------------------------------------------------------------
    Udacity | Neighborhood Map [2] - Add Google Maps to React App
    [Without Any External Components]
    Elharony Published on Aug 17, 2018
    -------------------------------------------------------------------
    In this tutorial, you will be able to Integrate Google Maps to your
    React App without any External Components, just using
    Vanilla JavaScript + Google Maps API...
    */

   state = {
      venues: []
   }

   componentDidMount () {
      this.getVenues()
   }

   renderMap = () => {
      loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyC5T8bcDZqx_vYa-ApCWu1hcymdMEmK9ek&callback=initMap')
      window.initMap = this.initMap
   }

   getVenues = () => {
      const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
      const parameters = {
         client_id: '5V3OK3JM0RT0YWWBQR2ZQNB3UJB3V0LM24GQHKEZKBI2EOWQ',
         client_secret: 'HYHANVJXDDZKVSHXHVL4XSXXIELLWJVLSM1EHSZB2KTI4XKK',
         query: 'food',
         ll:    "35.53,-97.6",
         v: '20180926'
      }

      axios.get(endPoint + new URLSearchParams(parameters))
         .then(response => {
            this.setState({
               venues: response.data.response.groups[0].items
            }, this.renderMap())
         })
         .catch(error => {
            console.log('ERROR!! ' + error)
         })
   }

   // Client ID
   // 5V3OK3JM0RT0YWWBQR2ZQNB3UJB3V0LM24GQHKEZKBI2EOWQ
   // Client Secret
   // HYHANVJXDDZKVSHXHVL4XSXXIELLWJVLSM1EHSZB2KTI4XKK

   initMap = () => {
      // Create A Map
      var map = new window.google.maps.Map(document.getElementById('map'), {
         center: {lat: 35.536193, lng: -97.603322},
         zoom: 12
      })

      // Create An InfoWindow
      var infowindow = new window.google.maps.InfoWindow()

      // Display Dynamic Markers
      this.state.venues.map(myVenue => {

         var contentString = `${myVenue.venue.name}`

         // Create A Marker
         var marker = new window.google.maps.Marker({
            position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
            map: map,
            title: myVenue.venue.name
         })

         // Click on A Marker!
         marker.addListener('click', function () {

            // Change the content
            infowindow.setContent(contentString)

            // Open An InfoWindow
            infowindow.open(map, marker)
         })
      })

   }

   render () {
      return (
         <main>
             <Notifications primary="info"/>
            <div id="map"></div>
         </main>
      )
   }
}

function loadScript (url) {
   var index = window.document.getElementsByTagName('script')[0]
   var script = window.document.createElement('script')
   script.src = url
   script.async = true
   script.defer = true
   index.parentNode.insertBefore(script, index)
}

export default App
