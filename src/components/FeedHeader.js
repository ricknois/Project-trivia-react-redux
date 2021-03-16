import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../css/FeedHeader.css';

class FeedHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = '';
  }

  render() {
    const { playerName, email, score } = this.props;
    const hash = md5(email).toString();
    if (score) {
      return (
        <header className="header">
          <img
            src={ `https://www.gravatar.com/avatar/${hash}` }
            alt="Avatar"
            data-testid="header-profile-picture"
            className="logoGravatar"
          />
          <div className="scoreDiv">
            <div data-testid="header-player-name" className="score">{playerName}</div>
            <div data-testid="header-score" className="score">{`Pontuação: ${score.score}`}</div>
            <div className="score">{`Acertadas: ${score.assertions}`}</div>
          </div>
        </header>
      );
    }
    return (
      <header className="header">
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="Avatar"
          data-testid="header-profile-picture"
          className="logoGravatar"
        />
        <div className="scoreDiv">
          <div className="score" data-testid="header-player-name">{playerName}</div>
          <div className="score" data-testid="header-score">{`Pontuação: ${0}`}</div>
          <div className="score">{`Acertadas: ${0}`}</div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  playerName: state.login.player.user,
  email: state.login.player.email,
  score: state.game.results.player,
});

FeedHeader.propTypes = {
  playerName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(FeedHeader);
