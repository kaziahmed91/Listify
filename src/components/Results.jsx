import React from 'react'
var FontAwesome = require('react-fontawesome');

class Results extends React.Component {

  _displayResults(displaySearchResults) { 
    const closeGlyph = <FontAwesome onClick={this.props._clearSearch} className='gClose' name='times-circle-o' size='2x' />

    if (displaySearchResults.length > 0) { 
     return (
        <div className="search-results">
        {closeGlyph}
        <h2>Your Search Results:</h2>
          {displaySearchResults}
        </div>
    )} else { 
      return (
        <div className="search-results">
        {closeGlyph}
        <h2>Your Search Results:</h2>
          <h3>Sorry Results not found </h3>
        </div>
    )}
  }

  render() {
    console.log("showSearchMenu ",this.props.showSearchMenu)
    let displaySearchResults = []
    let count = 0
    let songcount = 100
    let addToQueue = this.props._addToQueue;
       
      this.props.searchResults.forEach((songs, index) => {
        if (songs.length > 1) {
          displaySearchResults.push(<h2 key={count}> Playlist: {songs[0]}</h2>)
            for (let i=1;i < songs.length; i++) {
              displaySearchResults.push(<p key={songcount} onClick={() => {this.props._addToQueue(songs[i])}}> Title: {songs[i].track_title} </p>)
              songcount++
            }
          }
           count++
        })
    let showResults = this.props.showSearchMenu ? this._displayResults(displaySearchResults) : ""

    return(
      <div>
        {showResults}
      </div>
    )
  }
}

export default Results

