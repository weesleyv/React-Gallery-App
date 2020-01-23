import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
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
      loading: true
    }
  }

  componentDidMount() {
    this.performSearch();
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
        <Route render={(props) => <SearchForm onSearch={this.performSearch} {...props} /> } />
          
              
        <MainNav onSearch={this.performSearch}/>
          {
            (this.state.loading) 
            ?
            <h1>Loading...</h1> 
            :
            <Switch>
              <Route exact path="/" render ={ () => <Redirect to="/search" /> } />
              <Route path="/search" exact render={(props) => <PhotoContainer photos={this.state.photos} {...props}/>} />
              <Route path="/search/:name"  render={(props) => <PhotoContainer photos={this.state.photos} {...props}/>} />              
            </Switch>             
          }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
