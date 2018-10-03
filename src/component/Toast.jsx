import React, { Component } from 'react'
import M from 'react-materialize/lib/Toast'

class Toast extends Component {
   render () {
      return ( toast({html: 'I am a toast!'}))
   }
}

export default Toast
