import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import BlockContainer from './features/BlocksContainer.js';
import SelectedColorComponent from './features/SelectedColorComponent.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { colors: [], colorsStorage: [], addedBoxes: [] };
    this.addColorBox = this.addColorBox.bind(this);
    this.returnBlock = this.returnBlock.bind(this);
  };

  componentDidMount() {
    fetch('https://epam-fe-homework-15.firebaseio.com/colors.json')
      .then(response => response.json())
      .then(colors => this.setState({ colors: colors, colorsStorage: colors }))
  };

  addColorBox(box) {
    let filteredArray = this.state.colors.filter(element => element.id !== box.id);
    this.setState({
      addedBoxes: this.state.addedBoxes.concat([box]),
      colors: filteredArray
    });
  };

  returnBlock(id) {
    let filteredArray = this.state.addedBoxes.filter(element => element.id !== id),
      returnedBlock = this.state.colorsStorage.find(element => element.id === id);
    this.setState({
      addedBoxes: filteredArray,
      colors: this.state.colors.concat([returnedBlock]).sort((a, b) => a.id - b.id)
    });
  }

  render() {
    const colors = this.state.colors;
    const addedBoxes = this.state.addedBoxes;
    return (
      <div>
        <div className="selected-colors">
          {addedBoxes.map((element, index) => <SelectedColorComponent
            key={index} id={element.id} color={element.color} tags={element.tags} returnBlock={this.returnBlock} />)}
        </div>
        <div>
          {<BlockContainer colors={colors} addBox={this.addColorBox} />}
        </div>
      </div>
    );
  }
};

export default hot(module)(App);