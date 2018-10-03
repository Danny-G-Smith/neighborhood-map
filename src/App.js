import React, { Component } from 'react'

import { Footer, Navbar, NavItem } from 'react-materialize'
import './App.css'
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
      name: ''
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
      //https://api.foursquare.com/v2/venues/search?client_id=5V3OK3JM0RT0YWWBQR2ZQNB3UJB3V0LM24GQHKEZKBI2EOWQ&client_secret=HYHANVJXDDZKVSHXHVL4XSXXIELLWJVLSM1EHSZB2KTI4XKK&query=food&intent=browse&ll=35.522489,-97.619255&radius=10000&v=20180926
      // Pass props to parent component in React.js

      axios.get(explore + new URLSearchParams(parameters),
         search + new URLSearchParams(parameters),
         venues + new URLSearchParams(parameters)
      )
         .then(response => {
            this.setState({
               venues: response.data.response.groups[0].items,
               name: response.data.response.groups[0].items[0].venue.name //[0].name
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

         var contentString = `${myVenue.venue.name}`

         // Create A Marker
         var marker = new window.google.maps.Marker({
            position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
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
      }) // .map
   }

   render () {
      return (

         <main>
            <Navbar brand='logo' right>
               <NavItem onClick={() => console.log('test click')}>Getting started</NavItem>
               <NavItem href='components.html'>Components</NavItem>
            </Navbar>

            {/*<Toast toast="here you go!">*/}
            {/*Toast*/}
            {/*</Toast>*/}
            <div className="App">
               <div id="map"></div>
               <SideBar {...this.state}>
                  <input className="search"/>
                  <VenueList/>
               </SideBar>
               {console.log(this.venues)}
               {/*<map {...this.state} handleMarkerClick={this.handleMarkerClick}></map>*/}
               <map></map>
            </div>
            <Footer copyrights="&copy; 2018 Copyright Text"
                    moreLinks={
                       <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
                    }
                    links={
                       <ul>
                          <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
                          <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                          <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                          <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
                       </ul>
                    }
                    className='example'
            >
               <h5 className="white-text">Footer Content</h5>
               <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer
                  content.</p>
            </Footer>
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
