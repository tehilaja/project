import React from 'react';
import ReactDOM from 'react-dom';

const action = "learning react"

const date = new Date();

class Footer extends React.Component {
	constructor(){
		super()
		this.state = {person1:"Tehila", person2:"Avital"}
	}

	render(){
		return(
			<header className="App-header">
				<a
				  className="App-link"
				  href="https://www.youtube.com/watch?v=DLX62G4lc44"
				  target="_blank"
				  rel="noopener noreferrer"
				>
				{this.state.person1} & {this.state.person2}
				</a>
				<p>
				{`${action} at ${date.getHours()}:${date.getMinutes()}`}
				</p>
			</header>
		)
	}
}

export default Footer