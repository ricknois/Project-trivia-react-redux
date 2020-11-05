import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginButton from '../Components/LoginButton';
import logo from '../trivia.png';
import ButtonSettings from '../Components/ButtonSettings';
import { responseToken } from '../Action/actionToken';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      validated: true,
    };

    this.validateFields = this.validateFields.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    const { token } = this.props;

    localStorage.setItem('token', token);
  }

  async handleClick() {
    const { history, requestToken } = this.props;
    await requestToken();
    history.push('/game');
  }

  validateFields() {
    const { name, email } = this.state;
    if (name.length > 0 && (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      this.setState(
        { validated: false },
      );
    } else {
      this.setState(
        { validated: true },
      );
    }
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({ [target.name]: value });
    this.validateFields();
  }

  render() {
    const { validated } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <form className="login-form">
          <label htmlFor="name-input">
            Your name
            <input
              type="text"
              id="name-input"
              name="name"
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="email-input">
            Your email
            <input
              type="email"
              id="email-input"
              name="email"
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          <LoginButton
            onClick={ this.handleClick }
            disabled={ validated }
            title="Jogar"
          />
        </form>
        <ButtonSettings />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestToken: () => dispatch(responseToken()),
});

const mapStateToProps = (state) => ({
  token: state.reducerLogin.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  requestToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
};
