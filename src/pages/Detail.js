import React from 'react';
import { IndexLink, Link } from 'react-router';
import Chance from 'chance';
import ajax from 'superagent';



class Detail extends React.Component {

    constructor(props) {

        super(props);

        console.log('props');
        console.log(props);

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
            profile: [],
            commits: [],
            forks: [],
            pulls: [],
            mode: 'commits',
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
			console.log(`fetching `);

		  this.fetchFeed('commits');
		  this.fetchFeed('forks');
		  this.fetchFeed('pulls');

      ajax.get('https://api.github.com/users/KenStoneBlue').end((error, response) => {
        console.log('response');
        console.log(response);
        if (!error && response) {
            this.setState({ profile: response.body });
        } else {
            console.log('There was an error fetching from GitHub', error);
        }
      });

    }

  	fetchFeed(type) {
  		//if (this.props.params.repo === '') {
  			// empty repo name, bail out!
  			//return;
  		//}
  
			console.log(`fetching ${type}`);
  		const baseURL = 'https://api.github.com/repos/KenStoneBlue';
  		ajax.get(`${baseURL}/${this.props.params.repo}/${type}`).end((error, response) => {
  				if (!error && response) {
  					this.saveFeed(type, response.body);
  				} else {
  					console.log(`Error fetching ${type}`, error);
  				}
  		});
  	}
  
  	saveFeed(type, contents) {
  		this.setState({ [type]: contents });
  	}

  	renderCommits() {
  		return this.state.commits.map((commit, index) => {
  			const author = commit.author ? commit.author.login : 'Anonymous';
  
  			return (<p key={index} className="github">
  				<Link to={ `/user/${author}` }>{author}</Link>:	<a href={commit.html_url}>{commit.commit.message}</a>.
  			</p>);
  		});
  	}
  
  	renderForks() {
  		return this.state.forks.map((fork, index) => {
  			const owner = fork.owner ? fork.owner.login : 'Anonymous';
  
  			return (<p key={index} className="github">
  				<Link to={ `/user/${owner}` }>{owner}</Link>: forked to	<a href={fork.html_url}>{fork.html_url}</a> at {fork.created_at}.
  			</p>);
  		});
  	}
  
  	renderPulls() {
  		return this.state.pulls.map((pull, index) => {
  			const user = pull.user ? pull.user.login : 'Anonymous';
  
  			return (<p key={index} className="github">
  				<Link to={ `/user/${user}` }>{user}</Link>:	<a href={pull.html_url}>{pull.body}</a>.
  			</p>);
  		});
  	}


  	selectMode(mode) {
  		this.setState({ mode: mode });
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

    		let content;
    
    		if (this.state.mode === 'commits') {
    			content = this.renderCommits();
    		} else if (this.state.mode === 'forks') {
    			content = this.renderForks();
    		} else {
    			content = this.renderPulls();
    		}

        return( 
          <div>
            <p><IndexLink to="/" activeClassName="active">Home</IndexLink> > {this.props.params.repo}</p>

            <p>Hello, {this.state.name} from {this.state.country}!</p>
  
            <p>Hello, {chance.first()} from {chance.country({ full: true })}!</p>
  
            {this.state.people.map((person, index) => (<p key={index} >Hello, {person.name} from {person.country}!</p>))}
  
            <p> -- {this.props.message} -- </p>
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
                return (<p key={index}> *** <strong>{author}</strong>: <a href={commit.html_url}>{commit.commit.message}</a>.</p>);
            })}
            </div>

            <hr />

      			{/* <p>You are here: <IndexLink to="/" activeClassName="active">Home</IndexLink> &gt; {this.props.params.repo}</p> */}
      
      			<button onClick={this.selectMode.bind(this, 'commits')} ref="commits">Show Commits</button>
      			<button onClick={this.selectMode.bind(this, 'forks')} ref="forks">Show Forks</button>
      			<button onClick={this.selectMode.bind(this, 'pulls')} ref="pulls">Show Pulls</button>
      			{content}


          </div>
        );
    }




}

export default Detail;

