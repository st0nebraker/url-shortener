import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  componentDidMount = async () => {
		try {
			const data = await getUrls();
			this.setState({ urls: [...data.urls] });
		} catch (error) {
			console.log(error);
		}
	}
	
	submitUrl = async(givenUrl, givenTitle) => {
		try {
			const data = await postUrl(givenUrl, givenTitle);
			this.setState({ urls: [...this.state.urls, data] });
		} catch (error) {
			console.log(error.message);
		}
	}

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm submitUrl={this.submitUrl} />
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
