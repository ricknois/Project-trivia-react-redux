import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveGameScore, saveNameEmail } from '../actions';

class Ranking extends Component {
  constructor() {
    super();

    this.resetScore = this.resetScore.bind(this);
  }

  resetScore() {
    const { resetNameEmail, resetGameScore } = this.props;
    resetNameEmail('', '');
    resetGameScore(0, 0);
  }

  render() {
    const { ranking } = this.props;
    const minusOne = -1;
    function compare(a, b) {
      if (a.score > b.score) {
        return minusOne;
      }
      if (a.score < b.score) {
        return 1;
      }
      return 0;
    }
    const sortedRanking = ranking.sort(compare);

    return (
      <div>
        <h3 data-testid="ranking-title">Ranking</h3>
        {sortedRanking.map((player, index) => (
          <div key={ index }>
            <p data-testid={ `player-name-${index}` }>{player.name}</p>
            <p data-testid={ `player-score-${index}` }>{player.score}</p>
            <img src={ player.picture } alt={ player.name } />
          </div>
        ))}
        <Link to="/" onClick={ this.resetScore }>
          <button data-testid="btn-go-home" type="button">Início</button>
        </Link>
      </div>
    );
  }
}

Ranking.propTypes = {
  ranking: PropTypes.shape({
    sort: PropTypes.func.isRequired,
  }).isRequired,
  resetNameEmail: PropTypes.func.isRequired,
  resetGameScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ranking: state.ranking,
});

const mapDispatchToProps = (dispatch) => ({
  resetNameEmail: (name, email) => dispatch(saveNameEmail(name, email)),
  resetGameScore: (score, assertions) => dispatch(saveGameScore(score, assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
