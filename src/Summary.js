import React, { Component } from 'react';

class Summary extends Component {
  
  render() {
    let 
        summaryHtml = [],
        score = 0;

    this.props.questions.map( (question, index) => {
      if( question.correct_answer === question.answered ) {
        score += 10;
        summaryHtml.push(
          <div key={index} >
              <strong>+ Correct</strong><p dangerouslySetInnerHTML={{ __html: question.question }}/>
          </div>
            
        );
      } else {
        summaryHtml.push(
          <div key={index}>
              <strong>- Incorrect</strong>
              <p dangerouslySetInnerHTML={{ __html: question.question }} />
          </div>
        );
      }
      return null;
    });

    return (
      <div className="main-container mt-4 text-center">

        <h5>Your test results are below</h5>
        <div className="mt-2">Your score is: {score}</div>
        <div className="mt-5 text-left">
            {summaryHtml}
        </div>
        <button className="btn btn-primary mt-5" onClick={() => {this.props.restartQuiz() } }>Begin new test</button>
      </div>
    );
  }
}

export default Summary;
