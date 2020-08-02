import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../../routes/PrivateRoute';
import { authenticationService } from '../../services/authentication.service';
import { Company } from '../company';
import { Login } from '../login';
import './app.css';

// function App() {
//   return (<Router>
//     <div className="App">
//           <Switch>
//             <Route exact path='/' component={Login} />
//             <Route path="/login" component={Login} />
//             <Route path="/company-list" component={CompanyList} />
//           </Switch>
//     </div></Router>
//   );
// }

// export default App;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe((x) => this.setState({ currentUser: x }));
  }

  logout() {
    authenticationService.logout();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <Router>
        {/* {currentUser &&
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <div className="navbar-nav">
                <Link to="/" className="nav-item nav-link">Home</Link>
                <a onClick={this.logout} className="nav-item nav-link">Logout</a>
              </div>
            </nav>
          } */}
        <div className='App'>
          <Switch>
            <PrivateRoute exact path='/' component={Login} />
            <Route path='/login' component={Login} />
            <Route path='/company-list' component={Company} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
