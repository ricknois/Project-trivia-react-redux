import React, { Component } from 'react';
import { questionsAPI } from '../servicesAPI';
import Header from './Header';
import './Game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      actualQuestion: 0,
      selectedAnswer: '',
      assertions: 0,
      answersDisabled: false,
      repeatCount: true,
    };

    this.handleQuestions = this.handleQuestions.bind(this);
    this.handleAnswers = this.handleAnswers.bind(this);
    this.saveQuestions = this.saveQuestions.bind(this);
    this.handleUniqueAnswer = this.handleUniqueAnswer.bind(this);
    this.count = this.count.bind(this);
  }

  async componentDidMount() {
    // const token = localStorage.getItem('token');
    const questionsQuantity = 5;
    const token = '04fc0115ffe9fd9c561471c56e1281437e707a1bd76d9c87c4a22927cec42adc';
    const token = '2328682ae1d303064ff1d5d16b2490a22310553c91f9ebbcd1a9422d1b1e6cc9';
    const questions = (token !== '') ? await questionsAPI(questionsQuantity, token) : [];
    this.saveQuestions(questions);
  }

  handleColor() {
    const otherAnswers = document.querySelectorAll('article > div > button');

    otherAnswers.forEach((answer) => {
      const attributes = answer.attributes[0].value;

      if (attributes.includes('correct-answer')) {
        answer.classList.add('correct-answer');
      } else {
        answer.classList.add('incorrect-answer');
      }
    });
  }

  saveQuestions(questions) {
    this.setState({ questions });
  }

  handleAnswers(questionObj) {
    const incorrectAnswers = questionObj.incorrect_answers
      .map((incorrect) => ({ ans: incorrect, type: 'incorrect' }));
    const correctAnswer = { ans: questionObj.correct_answer, type: 'correct' };
    const allAnswers = [correctAnswer, ...incorrectAnswers];
    const numberOfAnswers = allAnswers.length;
    const allAnswersRandom = [];
    for (let i = 0; i < numberOfAnswers; i += 1) {
      const indexRandom = Math.round(Math.random() * (allAnswers.length - 1));
      allAnswersRandom[i] = allAnswers[indexRandom];
      allAnswers.splice(indexRandom, 1);
    }

    let indexOfIncorrectAnswers = 0;
    return allAnswersRandom.map((answer, index) => {
      const { ans, type } = answer;
      const testId = (type === 'correct')
        ? 'correct-answer' : `wrong-answer-${indexOfIncorrectAnswers}`;
      indexOfIncorrectAnswers = (type === 'incorrect')
        ? indexOfIncorrectAnswers + 1 : indexOfIncorrectAnswers;
      const { answersDisabled, selectedAnswer } = this.state;
      return (
        <button
          key={ index }
          type="button"
          data-testid={ testId }
          className={ (selectedAnswer === '') ? '' : `${type}-answer` }
          onClick={ () => this.handleUniqueAnswer(type) }
          disabled={ answersDisabled }
        >
          { ans }
        </button>
      );
    });
  }

  handleQuestions(questions) {
    const interval = 30000;
    const { repeatCount } = this.state;
    if (repeatCount) this.count(interval);
    return questions.map((questionObj, index) => (
      <article key={ index }>
        <p data-testid="question-category">{ questionObj.category }</p>
        <p data-testid="question-text">{ questionObj.question }</p>
        <div>
          { this.handleAnswers(questionObj) }
        </div>
      </article>
    ));
  }

  count(interval) {
    const thousand = 1000;
    let timer = interval / thousand;
    const frame = () => {
      if (timer === 0) {
        this.handleUniqueAnswer('incorrect');
        clearInterval(id);
      } else {
        document.getElementById('timer').innerHTML = timer;
        timer -= 1;
      }
    };
    const id = setInterval(frame, thousand);
  }

  handleUniqueAnswer(type) {
    const point = (type === 'correct') ? 1 : 0;
    this.setState((actualState) => ({
      selectedAnswer: type,
      assertions: actualState.assertions + point,
      repeatCount: false,
      answersDisabled: true,
    }));
  }

  render() {
    const { questions, actualQuestion } = this.state;
    return (
      <div>
        <p id="timer" />
        <Header />
        { questions.length > 0
          ? this.handleQuestions(questions)[actualQuestion] : 'Sem Questões' }
      </div>
    );
  }
}

export default Game;
