import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import ApiKey from './config';
import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoContainer from './components/PhotoContainer';
import PageNotFound from './components/PageNotFound';


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

/*Requesting the data, setting loading = true, 
and use the callback function of setState() to make request.
Set loading = false after the request completes.
@param {string} query - a tag to request for */
  performSearch = (query) => {
    this.setState( {loading: true}, () => {
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
    } )
  }

  render() {

    return (
      <BrowserRouter>
        <div className="container">
        <Route render={(props) => <SearchForm onSearch={this.performSearch} loading={this.state.loading} {...props} /> } />
          
              
        <MainNav onSearch={this.performSearch}/>
          {
            (this.state.loading) 
            ?
            <h1>Loading...</h1> 
            :
            <Switch>
              <Route exact path="/" render ={ () => <Redirect to="/search" /> } />
              <Route path="/search" exact render={(props) => <PhotoContainer photos={this.state.photos} {...props}/>} />
              <Route path="/search/:name" exact render={(props) => <PhotoContainer photos={this.state.photos} {...props}/>} /> 
              <Route component={PageNotFound} />            
            </Switch>             
          }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
