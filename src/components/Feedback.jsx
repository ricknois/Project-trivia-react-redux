import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { name, score, imagePath } = this.props;
    return (
      <header>
        <h1 data-testid="feedback-text">Feedback</h1>
        <img
          data-testid="header-profile-picture"
          alt="Player_avatar"
          src={ imagePath }
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  imagePath: state.player.imagePath,
});

export default connect(mapStateToProps)(Feedback);