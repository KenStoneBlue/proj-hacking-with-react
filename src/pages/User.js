//https://api.github.com/users/KenStoneBlue/events
import React from 'react';
import ajax from 'superagent';
import { Route, IndexRoute, IndexLink } from 'react-router';

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: []
        };
    }

    componentWillMount() {
        ajax.get(`https://api.github.com/users/${this.props.params.user}/events`)
            .end((error, response) => {
                if (!error && response) {
                    this.setState({ events: response.body });
                } else {
                    console.log(`Error fetching user data.`, error);
                }
            }
        );
    }

    render() {
        return (
          <div>
            <p><IndexLink to="/" activeClassName="active">Home</IndexLink> > {this.props.params.user}</p>
            <ul>
            {this.state.events.map((event, index) => {
                console.log(event);
                const eventType = event.type;
                const repoName = event.repo.name;
                const creationDate = event.created_at;
                const baseUrl = `https://github.com/${repoName}`;
    
                return (<li key={index}>
                    <strong><a href={baseUrl}>{repoName}</a></strong>: {eventType} at {creationDate}.
                </li>);
            })}
          </ul>
        </div>);
    }
}

export default User;

