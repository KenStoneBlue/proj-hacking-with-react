import React from 'react';
import { Link } from 'react-router';


class List extends React.Component {
    render(){
      return(
        <div>
            <p>Please choose a repository from the list below.</p>
            <ul>
                <li><Link to="/react">React</Link></li>
                <li><Link to="/detail/proj-hacking-with-react">proj-hacking-with-react</Link></li>
                <li><Link to="/detail/react-native">React Native</Link></li>
                <li><Link to="/detail/jest">Jest</Link></li>

            </ul>
        </div>
      );
    }
}
export default List;