import React from 'react';
import Chance from 'chance';


class Detail extends React.Component {
    render() {
        return( 
          <div>
          <p>Hello, {chance.first()}!</p>
          <p>{this.props.message}</p>
          </div>
        );
    }
}

export default Detail;

