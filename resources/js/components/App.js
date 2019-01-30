import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import Header from './Header'


class App extends Component {
  construnctor(props){
	super(props);
	  	this.state = {
			api: 'http://localhost/seprimi/public/api/'
	  	}
  }

  render () {

	 return (
		<BrowserRouter>
		  	<div>
			{/*<Header />*/}
			Encabezado
		  	</div>
		</BrowserRouter>
	 )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))