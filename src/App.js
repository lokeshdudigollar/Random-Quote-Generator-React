import React, { Component } from "react";
import { Helmet } from "react-helmet";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      loading: false,
      index: 0
    };
    this.randomQuotes = this.randomQuotes.bind(this);
  }

  randomQuotes() {
    this.setState({
      index: Math.floor(Math.random() * this.state.quotes.length)
    });
  }

  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          quotes: response.quotes,
          loading: true
        });
      });
  }

  render() {
    var { quotes, loading } = this.state;

    //var currentQuote = quotes[this.state.index].quote;
    const colors = [
      "#16a085",
      "#27ae60",
      "#2c3e50",
      "#f39c12",
      "#e74c3c",
      "#9b59b6",
      "#FB6964",
      "#342224",
      "#472E32",
      "#BDBB99",
      "#77B1A9",
      "#73A857"
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    if (!loading) {
      return <div>loading.......</div>;
    } else {
      var currentQuote = quotes[this.state.index].quote;
      var currentAuthor = quotes[this.state.index].author;
      var tweetquote =
        "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor);
      var tumblrShare =
        "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
        encodeURIComponent(currentAuthor) +
        "&content=" +
        encodeURIComponent(currentQuote) +
        "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button";
      return (
        <div className="container" id="wrapper">
          <Helmet>
            <style>{"body { background-color:" + color + "; }"}</style>
          </Helmet>
          <div id="quote-box">
            <div className="quote-text" style={{ opacity: 1, color: color }}>
              <i className="fa fa-quote-left"> </i>
              <span id="text">{currentQuote}</span>
            </div>

            <div className="quote-author" style={{ opacity: 1, color: color }}>
              -&nbsp;<span id="author">{currentAuthor}</span>
            </div>

            <div className="buttons">
              <a
                className="button"
                id="tweet-quote"
                title="Tweet this quote!"
                target="_top"
                href={tweetquote}
              >
                <i
                  className="fa fa-twitter"
                  style={{ backgroundColor: color }}
                ></i>
              </a>

              <a
                className="button"
                id="tumblr-quote"
                rel="noreferrer"
                title="Post this quote on tumblr!"
                target="_blank"
                href={tumblrShare}
              >
                <i
                  className="fa fa-tumblr"
                  style={{ backgroundColor: color }}
                ></i>
              </a>
              <button
                id="new-quote"
                onClick={this.randomQuotes}
                style={{ backgroundColor: color }}
              >
                New Quote
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
