import React from 'react';
import Chance from 'chance';


class Detail extends React.Component {
    buttonClicked() {
        console.log('Button was clicked!')
        this.forceUpdate();
    }

    render() {
        return( 
          <div>
          <p>Hello, {chance.first()} from {chance.country({ full: true })}!</p>

          <p>Hello, {chance.first()} from {chance.country({ full: true })}!</p>


          <p>Hello, {chance.first()} from {chance.country({ full: true })}!</p>
          <p>Hello, {chance.first()} from {chance.country({ full: true })}!</p>
          <p>{this.props.message}</p>
          <button onClick={this.buttonClicked.bind(this)}>Meet Someone New</button>
          </div>
        );
    }
}

export default Detail;

