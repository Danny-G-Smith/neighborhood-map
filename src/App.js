import React, { Component } from 'react'

import { Footer, Navbar, NavItem } from 'react-materialize'
import './App.css'
// https://www.npmjs.com/package/prop-types
import PropTypes from 'prop-types' // ES6
// https://www.npmjs.com/package/axios
import axios from 'axios'
import SideBar from './component/SideBar'
import VenueList from './component/VenueList'

class App extends Component {

   /*
    https://www.youtube.com/watch?v=W5LhLZqj76s&feature=youtu.be
    */

   state = {
      venues: [],
      names: [],
      venueID: [],
      prefix: [],
      suffix: [],
      short: [],
      searchString: ''
   }

   updateSearchString = (searchString) => {
      if (searchString) {
         this.setState({searchString})
      } else {
         this.setState({searchString: ''})
      }
   }

   componentDidMount () {
      this.getVenues()
   }

   renderMap = () => {
      loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyC5T8bcDZqx_vYa-ApCWu1hcymdMEmK9ek&callback=initMap')
      window.initMap = this.initMap
   }

   getVenues = () => {
      const explore = 'https://api.foursquare.com/v2/venues/explore?'
      const search = 'https://api.foursquare.com/v2/venues/search?'
      const venues = 'https://api.foursquare.com/v2/venues/'
      const short = 'https://api.foursquare.com/v2/venues/'
      const prefix = 'https://api.foursquare.com/v2/venues/'
      const suffix = 'https://api.foursquare.com/v2/venues/'



         const parameters = {
         client_id: '5V3OK3JM0RT0YWWBQR2ZQNB3UJB3V0LM24GQHKEZKBI2EOWQ',
         client_secret: 'HYHANVJXDDZKVSHXHVL4XSXXIELLWJVLSM1EHSZB2KTI4XKK',
         query: 'food',
         intent: 'browse',
         ll: '35.522489,-97.619255',//35.522489, -97.619255
         radius: 10000,
         v: '20180908'
      }

      // {console.log(photos)}
      // https://api.foursquare.com/v2/venues/search?client_id=5V3OK3JM0RT0YWWBQR2ZQNB3UJB3V0LM24GQHKEZKBI2EOWQ&client_secret=HYHANVJXDDZKVSHXHVL4XSXXIELLWJVLSM1EHSZB2KTI4XKK&query=food&intent=browse&ll=35.522489,-97.619255&radius=10000&v=20180926
      // Pass props to parent component in React.js

      axios.get(explore + new URLSearchParams(parameters),
         search + new URLSearchParams(parameters),
         venues + new URLSearchParams(parameters),
         short + new URLSearchParams(parameters),
         prefix + new URLSearchParams(parameters),
         suffix + new URLSearchParams(parameters),
      )
         .then(response => {
            this.setState({
               venueID: response.data.response.groups[0].items.map(element => element.venue.id),
               venues:  response.data.response.groups[0].items,
               names:   response.data.response.groups[0].items.map(element => element.venue.name),
               short:   response.data.response.groups[0].items.map(element => element.venue.categories[0].shortName),
               prefix:  response.data.response.photos.items[0].map(element => element.prefix),
               suffix:  response.data.response.photos.items[0].map(element => element.suffix)
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
         center: {lat: 35.52248, lng: -97.619255},
         zoom: 13
      })

      // Create An InfoWindow
      var infowindow = new window.google.maps.InfoWindow()

      // Display Dynamic Markers
      this.state.venues.map(myVenue => {
         //debugger
         //this.searchString = this.state.searchString;
         console.log(this.searchString)
         if (myVenue.venue.name.toLowerCase().includes(this.state.searchString.toLowerCase())) { //return
            var contentString = `${myVenue.venue.name + '<br>' + myVenue.venue.id}`

            // Create A Marker
            var marker = new window.google.maps.Marker({
               position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
               map: map,
               title: myVenue.venue.name,
               onClick: this.onMapClicked,
               icon: {
                  url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
               }
            })
         } else {
            // no op
         }

         // Click on A Marker!
         marker.addListener('click', function () {

            // Change the content
            infowindow.setContent(contentString)

            // Open An InfoWindow
            infowindow.open(map, marker)
         })

      }) // .map
   }

   render () {
      return (

         <main>
            {/*https://materializecss.com/ documentation*/}
            {/*https://react-materialize.github.io/#/*/}
            <Navbar brand='logo'>
               <NavItem onClick={() => console.log('test click')}>Getting started</NavItem>
               <NavItem href='components.html'>Components</NavItem>
            </Navbar>

            {/*<Toast toast="here you go!">*/}
            {/*Toast*/}
            {/*</Toast>*/}
            <div className="App">

               {/*https://developers.google.com/maps/documentation/javascript/tutorial*/}
               <div id="map"></div>
               <SideBar
                  venues={this.state.names.filter(name => name.toLowerCase().includes(this.state.searchString.toLowerCase()))}
                  updateSearchString={this.updateSearchString}
               >
                  {/*<input className="search"/>*/}
                  <VenueList/>
               </SideBar>
               {console.log(this.venues)}
               <map></map>
            </div>
            <footer>
               <span className="copyrights=">&copy; 2018 Copyright Text </span>
               <span className="more-links"><a className="grey-text text-lighten-4" href="#!">More Links</a></span>
            </footer>
         </main>
      )
   }
}

// Runtime type checking for React props and similar objects.
// https://www.npmjs.com/package/prop-types
const myPropTypes = {
   venues: PropTypes.object,
   names: PropTypes.object,
   photos: PropTypes.object,
   venueID: PropTypes.object,
   short: PropTypes.object,
   prefix: PropTypes.object,
   suffix: PropTypes.object,
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

// "American"
// "American"
// "American"
// "Asian"
// "Asian"
// "Burgers"
// "Burgers"
// "Chinese"
// "Chinese"
// "Chinese"
// "Deli / Bodega"
// "Diner"
// "Diner"
// "Fast Food"
// "Indian"
// "Indian"
// "Mediterranean"
// "Mexican"
// "Mexican"
// "Mexican"
// "Mexican"
// "Mexican"
// "Middle Eastern"
// "Pizza"
// "Pizza"
// "Restaurant"
// "Sandwiches"
// "Seafood"
// "Steakhouse"
// "Tacos"

// https://api.foursquare.com/v2/venues/explore
// https://api.foursquare.com/v2/venues/explore?client_id=5V3OK3JM0RT0YWWBQR2ZQNB3UJB3V0LM24GQHKEZKBI2EOWQ&client_secret=HYHANVJXDDZKVSHXHVL4XSXXIELLWJVLSM1EHSZB2KTI4XKK&query=food&intent=browse&v=20181001&ll=35.522489,-97.619255&radius=10000
// https://api.foursquare.com/v2/venues/VENUE_ID/photos?client_id=5V3OK3JM0RT0YWWBQR2ZQNB3UJB3V0LM24GQHKEZKBI2EOWQ&client_secret=HYHANVJXDDZKVSHXHVL4XSXXIELLWJVLSM1EHSZB2KTI4XKK&query=food&intent=browse&v=20181001&ll=35.522489,-97.619255&radius=10000

//   4d950ba129352d4327a3dec1
