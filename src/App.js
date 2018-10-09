import React, { Component } from 'react'
//import ReactDOM from 'react-dom'
import SquareAPI from './API/'
import { Footer, Navbar, NavItem } from 'react-materialize'
import './App.css'
// https://www.npmjs.com/package/prop-types
import PropTypes from 'prop-types' // ES6
// https://www.npmjs.com/package/axios
import axios from 'axios'
import SideBar from './component/SideBar'
import VenueList from './component/VenueList'
// time at 10:56

require('dotenv').config()
console.log(`${process.env.REACT_APP_DEV_API_URL}`)

class App extends Component {

   /*
    https://www.youtube.com/watch?v=W5LhLZqj76s&feature=youtu.be
    */

   state = {
      venue: '',
      venues: [],
      names: [],
      venue_id: [],
      short: [],
      search_string: '',
      marker: '',
      markers: [],
      photo: [],
      photo_url: []
   }

   updateSearchString = (search_string) => {
      if (search_string) {
         this.setState({search_string})
      } else {
         this.setState({search_string: ''})
      }
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

      const parameters = {
         client_id: `${process.env.REACT_APP_client_id}`, // '5V3OK3JM0RT0YWWBQR2ZQNB3UJB3V0LM24GQHKEZKBI2EOWQ', //
         client_secret: `${process.env.REACT_APP_client_secret}`, // 'HYHANVJXDDZKVSHXHVL4XSXXIELLWJVLSM1EHSZB2KTI4XKK', //
         query: 'food', //`${process.env.REACT_APP_food}`,          // 'food', //
         intent: 'browse', //`${process.env.REACT_APP_browse}`,       // browse, //
         ll: '35.522489,-97.619255',                  //35.522489, -97.619255
         radius: 10000, //`${process.env.REACT_APP_radius}`,       //10000, //
         v: `${process.env.REACT_APP_v}`             //'20180908'
      }

      // {console.log(photos)}
      // https://api.foursquare.com/v2/venues/search?client_id=5V3OK3JM0RT0YWWBQR2ZQNB3UJB3V0LM24GQHKEZKBI2EOWQ&client_secret=HYHANVJXDDZKVSHXHVL4XSXXIELLWJVLSM1EHSZB2KTI4XKK&query=food&intent=browse&ll=35.522489,-97.619255&radius=10000&v=20180926
      // Pass props to parent component in React.js

      axios.get(explore + new URLSearchParams(parameters),
         search + new URLSearchParams(parameters),
         venues + new URLSearchParams(parameters),
         short + new URLSearchParams(parameters),
      )
         .then(response => {
            this.setState({
               venue_id: response.data.response.groups[0].items.map(element => element.venue.id),
               venues: response.data.response.groups[0].items,
               names: response.data.response.groups[0].items.map(element => element.venue.name),
               address: response.data.response.groups[0].items.map(element => element.venue.location.formattedAddress),
               short: response.data.response.groups[0].items.map(element => element.venue.categories[0].shortName),
            }, this.renderMap())
         })
         .catch(error => {
            console.log('ERROR!! ' + error)
         })
   }
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
         // if (myVenue.venue.name.toLowerCase().includes(this.state.search_string.toLowerCase()))
         //  { //return
         if (myVenue.venue.name.toLowerCase().includes(this.state.search_string.toLowerCase())) { //return
            var contentString =
               `${myVenue.venue.name + '<br>' +
               myVenue.venue.location.formattedAddress[0] + '<br>' +
               myVenue.venue.location.formattedAddress[1] + '<br>' +
               myVenue.venue.location.formattedAddress[2] + '<br>'
                  }`
         }

         // Create A Marker
         var marker = new window.google.maps.Marker({
            position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
            map: map,
            title: myVenue.venue.name,
            icon: {
               url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
            }
         })
         // } else {
         //
         // }

         let currentVenueItem
         // Click on A Marker!
         //console.log(marker);
         marker.addListener('click', function () {

            // Change the content
            infowindow.setContent(contentString)

            // Open An InfoWindow
            infowindow.open(map, marker)
         })

         const addAnimaLink = ({response, infoWindows}) => {
            let photos = response.data.response.photos.items
            let photo_url
            let k
            photos.forEach(photo => {
               for (k = 0; k < this.state.currentlyDisplayed.length; k++) {
                  photo_url = `${photo.prefix}${photo.height}x${photo.width}${photo.suffix}`
               }

               if (`if (this.name === marker.name)`) {
                  {infoWindows[k].open(map, marker)}
               }
            })
         }

      }) // .map

   }

   // Client ID
   // 5V3OK3JM0RT0YWWBQR2ZQNB3UJB3V0LM24GQHKEZKBI2EOWQ
   // Client Secret
   // HYHANVJXDDZKVSHXHVL4XSXXIELLWJVLSM1EHSZB2KTI4XKK

   componentDidMount () {
      this.getVenues()
   }

   render () {
      return (

         <main>
            {/*https://materializecss.com/ documentation*/}
            {/*https://react-materialize.github.io/#/*/}
            <Navbar brand='logo' right>
               <NavItem onClick={() => console.log('test click')}>Getting started</NavItem>
               <NavItem href='components.html'>Components</NavItem>
            </Navbar>

            {/*<Toast toast="here you go!">*/}
            {/*Toast*/}
            {/*</Toast>*/}
            <div className="App">

               {/*https://developers.google.com/maps/documentation/javascript/tutorial*/}
               <div id="map"></div>
               <SideBar venues={this.state.names.filter(name =>
                  name.toLowerCase().includes(this.state.search_string.toLowerCase()))}
                        updateSearchString={this.updateSearchString}
                        handleListItemClick={this.handleListItemClick}
               >
                  <input className="search"/>
                  <VenueList/>
               </SideBar>
               {/*{console.log(this.venues)}*/}
               <map {...this.state} handle_marker_click={this.handle_marker_click}/>
            </div>
            <Footer copyrights="&copy; 2018 Copyright Text"
                    moreLinks={
                       <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
                    }
            >
            </Footer>
         </main>
      )

      const handle_marker_click = marker => {
         this.closeAllMarkers()
         marker.isOpen = true
         this.setState({markers: Object.assign(this.state.markers, marker)})
         const venue = this.state.venues.find(venue => venue.id === marker.id)

         SquareAPI.getVenueDetails(marker.id).then(res => {
            const newVenue = Object.assign(venue, res.response.venue)
            this.setState({venues: Object.assign(this.state.venues, newVenue)})
            console.log(newVenue)
         })
      }

      const handleListItemClick = venues => {
         const marker = this.state.markers.find(marker => marker.id === venues.id)
         this.handle_marker_click(marker)
         console.log(venues)
      }
   }


}

// Runtime type checking for React props and similar objects.
// https://www.npmjs.com/package/prop-types
const myPropTypes = {
   venues: PropTypes.object,
   names: PropTypes.object,
   photos: PropTypes.object,
   venue_id: PropTypes.object,
   short: PropTypes.object,
   radius: PropTypes.number,
   v: PropTypes.number
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

//ReactDOM.render(<Example/>, document.getElementById('app'))



