import React, { Component } from 'react';
import Summary from './Summary.js';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionCounter: 0,
      questions: []
    }

    this.updateAnswerStatus = this.updateAnswerStatus.bind(this);
  }
  updateAnswerStatus(answer) {

    let questions = this.state.questions;
    
    questions.push({
      question: this.props.questions[ this.state.questionCounter ].question,
      correct_answer: JSON.parse( this.props.questions[ this.state.questionCounter ].correct_answer.toLowerCase() ),
      answered: answer
    })

    let questionCounter = this.state.questionCounter + 1;

    this.setState({ questionCounter, questions });
  }
  render() {

    let question = this.props.questions[ this.state.questionCounter ];
    return (
      <div className="main-container mt-4 text-center">
        {
          this.state.questionCounter < 10 ?
            <div className="quesiton">
              <h5 className="text-uppercase header-container">{question.category || null}</h5>
              <div className="mt-5 question-container">
                {/* we use html because of some math formulas */}
                <div dangerouslySetInnerHTML={{ __html: question.question }} />
              </div>
              <div className="mt-5">
                <button className="btn btn-primary col-3" onClick={() => {this.updateAnswerStatus(true)} }>TRUE</button>
                <span className="col-2">OR</span>
                <button className="btn btn-primary" onClick={() => {this.updateAnswerStatus(false)} }>FALSE</button>
              </div>
            </div>
          :
            <Summary {...this.state} restartQuiz={this.props.restartQuiz} />
        }

      </div>
    );
  }
}

export default Quiz;
