import React from 'react';
import "./App.css";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import  SearchTitle from "./components/SearchTitle";
import  MoviesList from "./components/MoviesList";
import { ErrorPage } from './components/ErrorPage';
export default class App extends React.Component {
	constructor(){
		super();
		this.state = {
			// movie: 'matrix',
			searchQuery: "",
			moviesArray:[],
			favoriteMovies:[],
			id:'',
			isError: false,
			renderFavorites: false,
		}
	}

	fetchMovies = (url) => {
		axios.get(url)
			.then(response => {
				if(response.data.Response === "True"){
this.setState({moviesArray: response.data.Search, isError: false})
				} else { //response.data.Response === "False"
this.setState({isError: true})
				}
		
			})
	}
	componentDidMount () {
		const localStorageData = JSON.parse(localStorage.getItem('favorite'))
		this.setState({favoriteMovies:localStorageData})
		console.log(localStorageData)
	}

	handleChange = (e) => {
		this.setState({searchQuery: e.target.value})
	}

	handleSearch = () => {
		this.fetchMovies(`https://www.omdbapi.com/?apikey=c0790adf&s=${this.state.searchQuery}`)
		// this.fetchMovies(`https://www.omdbapi.com/?apikey=c0790adf&s=harry`)
		this.setState({searchQuery:''})
		// console.log(this.state.searchQuery, "<<")
	}

	handleFavorite = (movie) => {
		// console.log(this.state.favoriteMovies.some(item => item.imdbID === movie.imdbID), 'from some')
		if(!this.state.favoriteMovies.some(item => item.imdbID === movie.imdbID)) {
			this.setState({favoriteMovies: [...this.state.favoriteMovies,movie]})
		} else {
			alert('already in your favorites!')
		}
		localStorage.setItem('favorite', JSON.stringify([...this.state.favoriteMovies,movie]))
}
	showFavorite = () => {
		this.setState({renderFavorites: !this.state.renderFavorites})

	}
	checkFavorite = (id) =>{
		return this.state.favoriteMovies.some(item => item.imdbID === id)

	}

	render (){
		const {searchQuery, moviesArray, isError, renderFavorites, favoriteMovies} = this.state;
		// console.log(this.state.moviesArray, "!!!")
		  return (
<div className="App">
      <header className='header'>
        <h1>Movie App</h1>
        <div>
          <SearchTitle handleChange={this.handleChange} value={searchQuery} handleSearch={this.handleSearch} showFavorite={this.showFavorite} renderFavorites={renderFavorites}/>
        </div>
      </header>
		{isError ? <ErrorPage errorText='Movie not found'/> : (
			<MoviesList data ={moviesArray} handleFavorite={this.handleFavorite} checkFavorite={this.checkFavorite}/>
		)}
      <h2>Favorites:</h2>
		{renderFavorites ? <MoviesList data ={favoriteMovies} checkFavorite={this.checkFavorite} handleFavorite={this.handleFavorite}/> : <p> not here</p>}
    </div>
  );
	}

}
// https://www.omdbapi.com/ key: c0790adf