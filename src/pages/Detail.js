import React from 'react';
import Chance from 'chance';


class Detail extends React.Component {

    constructor(props) {
        super(props);

        const people = [];
    
        for (let i = 0; i < 10; i++) {
            people.push({
                name: chance.first(),
                country: chance.country({ full: true })
            });
        }
    
        this.state = {
            name: chance.first(),
            country: chance.country({ full: true }),
            people: people,
        };

        console.log('this.state');
        console.log(this.state);
    }

    shouldComponentUpdate(){
      return true;
    }


    shouldUpdateComponent(){
      return false;
    }

    buttonClicked() {
        console.log('Button was clicked!')
        const newState = {
            name: chance.first()
        };
    
        this.setState(newState);

        //this.forceUpdate();
    }

    render() {
        return( 
          <div>
          <p>Hello, {this.state.name} from {this.state.country}!</p>

          <p>Hello, {chance.first()} from {chance.country({ full: true })}!</p>


          <p>Hello, {chance.first()} from {chance.country({ full: true })}!</p>
          <p>Hello, {chance.first()} from {chance.country({ full: true })}!</p>

          {this.state.people.map((person, index) => (<p key={index} >Hello, {person.name} from {person.country}!</p>))}



          <p>{this.props.message}</p>
          <button onClick={this.buttonClicked.bind(this)}>Meet Someone New</button>
          </div>
        );
    }
}

export default Detail;

