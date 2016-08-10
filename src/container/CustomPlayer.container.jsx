import React from 'react';
import SC from 'soundcloud';
import SCwidget from 'react-soundcloud-widget'
import CustomPlayerStyles from '../styles/musicplayer_container.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const getQueueTracks = songQueue => songQueue.map(song => song.track_uri);

class CustomPlayer extends React.Component {

    componentDidMount() { 
    }

    render() {
          let playbackparams = {auto_play: false }

        return (
            <div id="soundcloud-player">
                <SCwidget
                    url={this.props.currentlyPlaying}
                    opts={ playbackparams}
                    onEnd={this.props._playNextSongInQueue}
                 />
            </div>
        )
    }
}


export default CustomPlayer;
