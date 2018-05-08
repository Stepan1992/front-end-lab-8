import React from 'react';
import { hot } from 'react-hot-loader';

class BlockComponent extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        const currentBox = this.props;
        return (
            <div className="color-block" style={{ background: this.props.color }}>
                <button onClick={() => this.props.addBox(currentBox)}><i className="material-icons">add</i>Add</button>
            </div>
        );
    }
};

export default BlockComponent;


