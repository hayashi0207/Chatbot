import React from 'react';
import './assets/styles/style.css';
import { db } from './firebase/index';
import { AnswersList, Chats } from './components/index';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      answers: [],
      currentId: "init",
      dataset: {}
    }
    this.selectAnswer = this.selectAnswer.bind(this);
  }

  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats
    const dataset = this.state.dataset[nextQuestionId]
    chats.push({
      text: dataset.question,
      type: "question"
    })
    this.setState({
      chats: chats,
      answers: dataset.answers,
      currentId: nextQuestionId
    })
  }

  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case (nextQuestionId === "init"):
        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
        break;

      case (/^https*/.test(nextQuestionId)):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank'
        a.click();
        break;
      default:
        const chats = this.state.chats
        chats.push({
          text: selectedAnswer,
          type: "answer"
        })
        this.setState({
          chats: chats
        })
        setTimeout(() => this.displayNextQuestion(nextQuestionId), 1000);
        break;
    }
  }

  initDataset = (dataset) => {
    this.setState({
      dataset: dataset
    })
  }

  componentDidMount() {
    (async () => {
      const dataset = this.state.dataset

      await db.collection('questions').get().then(snapshots => {
        snapshots.forEach(doc => {
          const id = doc.id
          const data = doc.data()
          dataset[id] = data
        })
      });
      this.initDataset(dataset)
      const initAnswer = ""
      this.selectAnswer(initAnswer, this.state.currentId)
    })();
  }

  componentDidUpdate() {
    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }

  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={this.state.chats} />
          <AnswersList answers={this.state.answers} select={this.selectAnswer} />
        </div>
      </section>
    );
  }
};