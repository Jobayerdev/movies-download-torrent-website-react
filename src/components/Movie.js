import React, { Component } from 'react';
import axios from 'axios'

 class Movie extends Component {
 	constructor(props){
 		super(props)
 		this.state ={
 			movie:[],
 			movieInfo:[],
 			loading:true
 		}
 	}
 	componentDidMount() {
 		let search = window.location.search;
 		let params = new URLSearchParams(search);
 		let GetID = params.get('id');
 		axios.get(`https://yts.lt/api/v2/movie_details.json?movie_id=${GetID}&with_images=true&with_cast=true`)
 			.then(response => this.setState({
 				movie:response.data.data.movie
 			}))

 	}
	render() {
		const{movie} = this.state
		console.log(movie)
		return (
			<React.Fragment>
				<div className="movie">
					<div className="container">
						<div className="row">
							<div className="col-md-4">
								<div className="movie-poster">
									<img src={movie.large_cover_image} alt=""/>
								</div>
								<div className="movie-download">
									<a href={movie.torrents && movie.torrents[1].url}>Download</a>
								</div>
							</div>
							<div className="col-md-8">
								<div className="movie-info">
									<div className="title-rating">
										<h1>{movie.title} <span>{movie.year}</span></h1>

										<p><i className="fas fa-share-alt"></i> share</p>
										<p><i className="fa fa-heart-o"></i> Favorite</p>
										<div className="rateing">
											
											<h4> <i className="fas fa-star"></i> {movie.rating} <span> /10</span></h4>
										</div>
										{movie.genres && movie.genres.map((gen,i)=> (<div className="genres" key={i}><span  className={gen}>{gen}</span></div>))}
									</div>
									<div className="overview">
										<h2>overview</h2>
										<div className="row">
											<div className="col-md-8">
												<div className="ov-left-side">
													<p>{movie.description_full}</p>
													<h2>Cast</h2>
													<ul>
														{
															movie.cast && movie.cast.map((cast,i) => (

																	<li key={i}>
																		<img src={cast.url_small_image} alt=""/>
																		<h4>{cast.name} <span> - {cast.character_name}</span></h4>
																	</li>
																))

														}
														
													</ul>
												</div>
											</div>
											<div className="col-md-4">
												<div className="ov-right-side">
													<ul>
														<li>
															<h4>Date Uploaded:</h4>
															<p>{movie.date_uploaded}</p>
															
														</li>
														<li>
															<h4>Downloaded</h4>
															<p>{movie.download_count} </p>
														</li>
														<li>
															<h4>Language</h4>
															<p>{movie.language}</p>
														</li>
														
														<li>
															<h4>Genres:</h4>
															 {movie.genres && movie.genres.map((genres,i) => (
																<p key={i}> {genres}, </p>
																))} 
														</li>
														
														<li>
															<h4>Run Time:</h4>
															<p>{movie.runtime}</p>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		)
	}
}
export default Movie;
