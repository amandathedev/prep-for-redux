import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import logo from "./logo.svg";
import "./App.css";
import { createStore } from "redux";

const reducer = (oldState = { count: 0 }, action) => {
  console.log("action", action, "stored state", oldState);
  switch (action.type) {
    case "CLICKED_PLUS":
      return { count: oldState.count + 1 };
    case "CLICKED_MINUS":
      return { count: oldState.count - 1 };
    default:
      return oldState;
  }
};

const store = createStore(reducer);

class App extends Component {
  // state = { count: 0 };

  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Counter
          count={store.getState().count}
          increment={this.increment}
          decrement={this.decrement}
        />
      </div>
    );
  }
}

class Header extends Component {
  renderDescription = () => {
    const remainder = store.getState().count % 5;
    const upToNext = 5 - remainder;
    return `The current count is less than ${store.getState().count +
      upToNext}`;
  };

  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
        <h3>{this.renderDescription()}</h3>
      </header>
    );
  }
}

class Counter extends Component {
  increment = () => {
    store.dispatch({ type: "CLICKED_PLUS" });
    // this.setState(prevState => ({ count: prevState.count + 1 }));
  };

  decrement = () => {
    store.dispatch({ type: "CLICKED_MINUS" });
    // this.setState(prevState => ({ count: prevState.count - 1 }));
  };

  render() {
    return (
      <div className="Counter">
        <h1>{store.getState().count}</h1>
        <button onClick={this.decrement}> - </button>
        <button onClick={this.increment}> + </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
