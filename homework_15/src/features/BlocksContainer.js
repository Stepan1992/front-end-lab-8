import React from 'react';
import { hot } from 'react-hot-loader';
import BlockComponent from './BlockComponent.js';


class BlockContainer extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        const colors = this.props.colors;
        return (
            <div className="color-container">
                {colors.map((element, index) => <BlockComponent addBox={this.props.addBox}
                 key={index} id={element.id} color={element.color} tags={element.tags} />)}
            </div>
        );
    }
};

export default BlockContainer;