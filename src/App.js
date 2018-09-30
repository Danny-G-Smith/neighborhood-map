import React, { Component } from 'react'

import { N, Footer, Navbar, NavItem } from 'react-materialize'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
//import {errorNotification, addNotification, moveNotification} from 'components/Notification'
// import Footer from 'react-materialize/lib/Footer'
// import Navbar from 'react-materialize/lib/Navbar'
// import NavItem from 'react-materialize/lib/NavItem'
//import {Toast} from './components/Toast'

import './App.css'
//import { errornotification } from './components/Notification'

import axios from 'axios'

class App extends Component {

   /*
    https://www.youtube.com/watch?v=W5LhLZqj76s&feature=youtu.be
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
         intent: 'browse',
         ll: '35.522489,-97.619255',//35.522489, -97.619255
         radius: 10000,
         v: '20180908'
      }
      //https://api.foursquare.com/v2/venues/search?client_id=5V3OK3JM0RT0YWWBQR2ZQNB3UJB3V0LM24GQHKEZKBI2EOWQ&client_secret=HYHANVJXDDZKVSHXHVL4XSXXIELLWJVLSM1EHSZB2KTI4XKK&query=food&intent=browse&ll=35.522489,-97.619255&radius=10000&v=20180926
      // Pass props to parent component in React.js

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
      })

   }

   render () {
      return (

         <main>
               <Navbar brand='logo' right>
                  <NavItem onClick={() => console.log('test click')}>Getting started</NavItem>
                  <NavItem href='components.html'>Components</NavItem>
               </Navbar>

            {/*<Toast toast="here you go!" displayLength={4000}>*/}
               {/*Toast*/}
            {/*</Toast>*/}
            {/*{window.react-materialize.toast('I am a toast!', 4000)}*/}



            { N.toast({html: 'I am a toast!'})}

               <div id="map"></div>

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
