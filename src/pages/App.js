import React from 'react';

class App extends React.Component {
    render() {
        return (
          <div>
            <h1>Ken Stone Blue Development Public GitHub Browser</h1>
            {this.props.children}
          </div>
        );
    }
}

export default App;

