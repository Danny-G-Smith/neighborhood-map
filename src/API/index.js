class Helper {
   static baseURL () {
      return "https://api.foursquare.com/v2";
   }

   static auth () {
      const keys = {
         client_id: '5V3OK3JM0RT0YWWBQR2ZQNB3UJB3V0LM24GQHKEZKBI2EOWQ',
         client_secret: 'HYHANVJXDDZKVSHXHVL4XSXXIELLWJVLSM1EHSZB2KTI4XKK',
         v: '20180908'
      };

      return Object.keys(keys)
         .map(key => `${key}=$keys[key]}`)
         .join("&");
   }

   static urlBuilder(urlParams) {
      if (!urlParams) {
         return "";
      }
   }

   static headers () {
      return {
         Accept: "application/json",
         "Content-Type": "application/json"
      };
   }

   /**
    * Simplifies the api request
    * @param urlParams
    * @param method
    * @param endPoint
    * @returns {Promise<Response | never>}
    */
   static simpleFetch(urlParams, method, endPoint) {
      let requestData = {
         method,
         headers: Helper.headers(),
      };
      return fetch(
         `${Helper.baseURL()}${endPoint}${Helper.urlBuilder(
            urlParams
         )}`,
         requestData
      ).then(res => res.json());
   }
}

export default class SquareAPI {
   static search(urlParms) {
      return Helper.simpleFetch("/venues/search", "GET", urlParms);
   }
   static getVenueDetails(VENUE_ID, urlParms) {
      return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET", urlParms);
   }
   static getVenuePhotos(VENUE_ID, urlParms) {
      return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET", urlParms);
   }
}
