import axios from 'axios'

class Helper {
   static baseURL () {
      return 'https://api.foursquare.com/v2'
   }

   static auth () {
      const keys = {
         client_id: '5V3OK3JM0RT0YWWBQR2ZQNB3UJB3V0LM24GQHKEZKBI2EOWQ',
         client_secret: 'HYHANVJXDDZKVSHXHVL4XSXXIELLWJVLSM1EHSZB2KTI4XKK',
         v: '20180908'
      }

      return Object.keys(keys)
         .map(key => `${key}=${keys[key]}`)
         .join('&')
   }

   static urlBuilders (urlParams) {
      if (!urlParams) {
         return ''
      }
      return Object.keys(urlParams)
         .map(key => `${key}=${urlParams[key]}`)
         .join('&')
   }

   static headers () {
      return {
         Accept: 'application/json'
      }
   }

   static simpleFetch(endPoint, method, urlParams) {
      let requestData = {
         method,
         headers: Helper.headers()
      };
      return fetch(
         `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilders(
            urlParams
         )}`,
         requestData
      ).then(res = res.json());
   }
}

export default class SquareAPI {

   static search(urlParams) {
      return Helper.simpleFetch("/venues/search", "GET", urlParams);
   }

   static getVenueDetails(VENUE_ID) {
      return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
   }

   static getVenuePhotos(VENUE_ID) {
      return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
   }
}


// getVenues = () => {
//    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
//    const parameters = {
//       client_id: '5V3OK3JM0RT0YWWBQR2ZQNB3UJB3V0LM24GQHKEZKBI2EOWQ',
//       client_secret: 'HYHANVJXDDZKVSHXHVL4XSXXIELLWJVLSM1EHSZB2KTI4XKK',
//       query: 'food',
//       intent: 'browse',
//       ll: '35.522489,-97.619255',//35.522489, -97.619255
//       radius: 10000,
//       v: '20180908'
//    }
//    //https://api.foursquare.com/v2/venues/search?client_id=5V3OK3JM0RT0YWWBQR2ZQNB3UJB3V0LM24GQHKEZKBI2EOWQ&client_secret=HYHANVJXDDZKVSHXHVL4XSXXIELLWJVLSM1EHSZB2KTI4XKK&query=food&intent=browse&ll=35.522489,-97.619255&radius=10000&v=20180926
//    // Pass props to parent component in React.js
//
//    axios.get(endPoint + new URLSearchParams(parameters))
//       .then(response => {
//          this.setState({
//             venues: response.data.response.groups[0].items
//          }, this.renderMap())
//       })
//       .catch(error => {
//          console.log('ERROR!! ' + error)
//       })
// }
