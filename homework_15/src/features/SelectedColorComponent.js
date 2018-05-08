import React from 'react';
import { hot } from 'react-hot-loader';

class SelectedColorComponent extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <div className="added-box" style={{ background: this.props.color }}>
            <button onClick={() => this.props.returnBlock(this.props.id)}><i className="material-icons">close</i></button></div>
        );
    }
};

export default SelectedColorComponent;
