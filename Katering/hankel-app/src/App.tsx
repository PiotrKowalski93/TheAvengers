import * as React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const logo = require('./photos/mainPhoto.jpeg');

class App extends React.Component {
  render() {
    return (
        <div className="App">
          <img src={logo} className="Main-photo" alt="logo" />
          <br/>
          <br/>
          <UserButtons/>
          <Tabs/>
        </div>    
    );
  }
}

class UserButtons extends React.Component{
  render(){
    return (
      <div className="btn-group d-flex justify-content-end">      
        <a className="btn btn-primary" type="submit">Zaloguj</a>
        <a className="btn btn-primary" type="submit">Rejestracja</a>
      </div>    
    );
  }
}

class Tabs extends React.Component{
  render(){
    return (
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" id="about-tab" data-toggle="tab" href="#about" role="tab" aria-controls="about" aria-selected="true">O NAS</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="about" role="tabpanel" aria-labelledby="about-tab"><AboutTab/></div>
        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"><ProfileTab/></div>
        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab"><ContactTab/></div>
      </div>
      </div>
    );
  }
}

class AboutTab extends React.Component{
  render(){
    return(
        <div className="card mb-3">
          <div className="card-body">
            <h4 className="card-title">Card title</h4>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
    );
  }
}

class ProfileTab extends React.Component{
  getData():string{
    axios.get('//192.168.1.23:60040/api/menu')
    .then(function (response) {
      console.log('testG' + response);
      return response;
    })
    .catch(function (error) {
      console.log('error' + error);
    });
    return '';
  }
  render(){
    var testGosia = this.getData();
    return(
      <div>
        {testGosia}
      </div>
    );
  }
}

class ContactTab extends React.Component{
  render(){
    return(
      <div>
      </div>
    );
  }
}

export default App;
