import React, {Component} from 'react'

class Generator extends Component {
	constructor(){
		super();
		this.state = {
			topText: "",
			bottomText: "",
			randomImage: "http://i.imgflip.com/1bij.jpg",
			allImages: []
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount(){
		fetch("https://api.imgflip.com/get_memes")
			.then(response => response.json())
			.then(response => {
				const {memes} = response.data;
				this.setState({
					allImages: memes,
				})
			})
	}

	handleClick(){
		this.setState((state) => {
			let random = Math.floor(Math.random()*state.allImages.length);
			return {randomImage: state.allImages[random].url}
		})
	}

	handleChange(event){
		const {name, value} = event.target;
		this.setState({[name]: value});
	}

	render(){
		return(
			<div className = "wrapper">
				<form>
					<input
						placeholder="Top Text"
						type="text"
						name="topText"
						value={this.state.topText}
						onChange={this.handleChange}
					/>
					<input
						placeholder="Bottom Text"
						type="text"
						name="bottomText"
						value={this.state.bottomText}
						onChange={this.handleChange}
					/>
				</form>
				<button onClick={this.handleClick}>GENERATE</button>
				<div className="meme">
					<img
						src = {this.state.randomImage}
						alt = "problem?"
					/>
					<h3 className="topText">{this.state.topText}</h3>
					<h3 className="bottomText">{this.state.bottomText}</h3>
				</div>
			</div>
		);
	}
}

export default Generator;