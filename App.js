import React, { Component } from "react";
import Facts from './facts';
import './index.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apikey: "",
      items: [],
      isLoaded: false,
      fact: "",
      lang: "",
      url: "https://factchecktools.googleapis.com/v1alpha1/claims:search?key=",
      nextPage: "",
    };
    // This binding is necessary to make `this` work in the callback
    this.handleInputChange = this.handleInputChange.bind(this);
    this.datafetch = this.datafetch.bind(this);
  }

  componentDidMount() {
    document.getElementById("search").addEventListener("click", Event => {
      Event.preventDefault();
      this.state.url = this.state.url + this.state.apikey + '&query=' + this.state.fact + '&languageCode=' + this.state.lang;
      this.datafetch(this.state.url);
    });
    document.getElementById("nextPage").addEventListener("click", Event => {
      Event.preventDefault();
      let url1 = this.state.url + "&pageToken=" + this.state.nextPage;
      this.datafetch(url1);
    });
  }

  datafetch(url) {
    console.log(url);
    fetch(url)
      .then(response => response.json()) //to get the response and as response will be asynchronous so it will be passed to next then whenever we get it
      .then(content => {
        this.setState({
          isLoaded: true,
          items: content.claims,
          fact: "",
          lang: "",
          nextPage: content.nextPageToken,
        })
        console.log(content.claims);
        console.log('Next Page', content.nextPageToken);
      }) //to handle the data. JSON response will have claims and nextPageToken(just two properties)
      .catch(err => {
        console.error(err);
      });
  }

  handleInputChange(event) {
    let target = event.target;
    let name = target.id;

    this.setState({
      [name]: target.value
    });
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return (
        <React.Fragment>
          <div className="form">
            <span className="title">Credible</span><br />
            <input type="text" id="fact" placeholder="Fact" value={this.state.fact} onChange={this.handleInputChange} />
            <input type="text" id="lang" placeholder="Language" value={this.state.lang} onChange={this.handleInputChange} />
            <button id="search">Search</button>
            <button id="nextPage" hidden={true}>Next Page</button>
          </div>
        </React.Fragment>);
    }
    else {
      return (
        <React.Fragment>
          <div className="form">
            <span className="title">Credible</span><br />
            <input type="text" id="fact" placeholder="Fact" value={this.state.fact} onChange={this.handleInputChange} />
            <input type="text" id="lang" placeholder="Language" value={this.state.lang} onChange={this.handleInputChange} />
            <button id="search">Search</button>
            <button id="nextPage" hidden={false}>Next Page</button>
          </div>
          <ol>
            {items.map(item => {
              return (
                <li><Facts
                  claimant={item.claimant}
                  text={item.text}
                  textualRating={item.claimReview[0].textualRating}
                  url={item.claimReview[0].url}
                  reviewDate={item.claimReview[0].reviewDate}
                /></li>
              );
            })}
          </ol>
        </React.Fragment>);
    }
  }
}

export default App;