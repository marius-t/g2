import React, { Component } from 'react';
import axios from 'axios';
import Quiz from './Quiz.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      started: false
    }

    this.getQuizData = this.getQuizData.bind(this);
    this.restartQuiz = this.restartQuiz.bind(this);
  }

  restartQuiz() {
    this.getQuizData();
    this.setState({started: false});
  }

  getQuizData() {
    axios({
      method: 'get',
      url: 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean'
    })
    .then(res => {
      if( res.status === 200 && res.data.results ) {
        this.setState({questions: res.data.results});
      }
    })
    .catch(err => {
      console.log(err);
    });
  }
  //Load quiz data
  componentWillMount() {
    this.getQuizData();
  }
  render() {
    return (
      <div className="main-container mt-4 text-center">
        {
          !this.state.started ?
            <div>
              <h3>Welcome to the<br/> Trivia Challenge!</h3>
              <div className="mt-5">
                You will be presented with 10 True or False questions.
              </div>
              <div className="mt-5">
                Can you score 100%?
              </div>
              {
                this.state.questions.length === 0?
                  <div className="mt-5">loading ...</div>
                :
                  <button className="btn btn-primary mt-5" onClick={(e) =>{ e.preventDefault(); this.setState({started: true}); } }>BEGIN</button>
              }
              
            </div>
          :
            <Quiz {...this.state} restartQuiz={this.restartQuiz}/>
        }
      </div>
    );
  }
}

export default App;
