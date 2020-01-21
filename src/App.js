import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import ApiKey from './config';
import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoContainer from './components/PhotoContainer';


class App extends Component {
  constructor() {
    super()
    this.state = {
      photos: [],
      catPhotos: [],
      dogPhotos: [],
      sunsetPhotos: [],
      loading: true
    }
  }

  componentDidMount() {
    this.performSearch();

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ApiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          catPhotos: response.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });

      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ApiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          dogPhotos: response.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });

      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ApiKey}&tags=sunset&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          sunsetPhotos: response.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  performSearch = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ApiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          photos: response.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {

    return (
      <BrowserRouter>
        <div className="container">
        <SearchForm onSearch={this.performSearch} />
          
          <MainNav />
          {
            (this.state.loading) 
            ?
            <h1>Loading...</h1> 
            :
            <Switch>
              <Route  exact path="/" render={() => <PhotoContainer photos={this.state.photos}/>} />
              <Route  path="/cats" render={() => <PhotoContainer photos={this.state.catPhotos}/>} /> 
              <Route  path="/dogs" render={() => <PhotoContainer photos={this.state.dogPhotos}/>} />
              <Route  path="/sunset" render={() => <PhotoContainer photos={this.state.sunsetPhotos}/>} />
            </Switch>             
          }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
