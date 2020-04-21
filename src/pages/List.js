import React from 'react';
import { IndexLink, Link } from 'react-router';


class List extends React.Component {
    render(){
      return(
        <div>
            <p><IndexLink to="/" activeClassName="active">Home</IndexLink></p>

            <p>Please choose a repository from the list below.</p>
            <ul>
                <li><Link to="/detail/proj-hacking-with-react">proj-hacking-with-react</Link></li>
            </ul>
        </div>
      );
    }
}
export default List;
