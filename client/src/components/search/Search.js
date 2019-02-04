import React, { Component } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/profile/all";
class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			query: "",
			results: []
		};
	}

	handleInputChange = () => {
		this.setState({
			query: this.search.value
		});
	};

	onSubmit = () => {
		axios
			.get(`${API_URL}`)
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});
	};

	render() {
		return (
			<form>
				<div className="form-group">
					<input
						type="email"
						className="form-control"
						placeholder="search for ..."
						ref={input => (this.search = input)}
						onChange={this.handleInputChange}
					/>
				</div>

				<button
					type="button"
					className="btn btn-primary ml-4 mb-4"
					onClick={this.onSubmit}
				>
					{" "}
					Submit
				</button>
			</form>
		);
	}
}

export default Search;
