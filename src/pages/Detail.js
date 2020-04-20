import React from 'react';
import Chance from 'chance';
import ajax from 'superagent';



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
            commits: [],
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

    componentWillMount() {
      ajax.get('https://api.github.com/repos/KenStoneBlue/proj-hacking-with-react/commits').end((error, response) => {
        console.log('response');
        console.log(response);
        if (!error && response) {
            this.setState({ commits: response.body });
        } else {
            console.log('There was an error fetching from GitHub', error);
        }
      });

      ajax.get('https://api.github.com/users/KenStoneBlue').end((error, response) => {
        console.log('response');
        console.log(response);
        if (!error && response) {
            this.setState({ commits: response.body });
        } else {
            console.log('There was an error fetching from GitHub', error);
        }
      });

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
  
            {this.state.people.map((person, index) => (<p key={index} >Hello, {person.name} from {person.country}!</p>))}
  
            <p>{this.props.message}</p>
            <button onClick={this.buttonClicked.bind(this)}>Meet Someone New</button>

            <hr />

            <div>
            {this.state.commits.map((commit, index) => (
                <p key={index}> <strong>{commit.author.login}</strong>: <a href={commit.html_url}>{commit.commit.message}</a>.
                </p>
            ))}
            </div>

            <hr />

            <div>
            {this.state.commits.map((commit, index) => {
                const author = commit.author ? commit.author.login : 'Anonymous';
                return (<p key={index}><strong>{author}</strong>: <a href={commit.html_url}>{commit.commit.message}</a>.</p>);
            })}
            </div>




          </div>
        );
    }
}

export default Detail;

