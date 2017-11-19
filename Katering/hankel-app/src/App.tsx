import * as React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

const logo = require('./photos/mainPhoto.jpeg');
const testFood = require('./photos/testFood.jpg');
const shoppingCart = require('./photos/shoppingCart.png');


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
      <div className="d-flex justify-content-end">      
        <div className="p-2">
        <button type="submit" className="btn btn-info">Zaloguj</button>
        </div>
        <div className="p-2">
        <button type="submit" className="btn btn-info">Rejestracja</button>
        </div>
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
          <a className="nav-link" id="menu-tab" data-toggle="tab" href="#menu" role="tab" aria-controls="menu" aria-selected="false">Menu</a>
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
        <div className="tab-pane fade" id="menu" role="tabpanel" aria-labelledby="menu-tab"><MenuTab/></div>
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
  httpGetTestResponse()
  {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://httpbin.org/anything', false);
      xhr.send();
      console.log('TestResponse: ' + xhr.responseText);
      return xhr.responseText;
  }

  render(){
    var testGosia = this.httpGetTestResponse();
    return(
      <div>
        {testGosia}
      </div>
    );
  }
}

class ContactTab extends React.Component{
  getContactData():string
  {
      return 'contact data';
  }
  render(){
    var contactData = this.getContactData();
    return(
      <div>
        {contactData}
      </div>
    );
  }
}

interface State {
  total: number;
  order: Array<orderElement>;
}

interface Props {
}

class MenuTab extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props);
    this.state = { 
      total: 0,
      order: []
    };
  }
  totalPrice: number = 0;
  order: Array<orderElement> = [];

  addItemToCart (item:menuItemJSON, e:any) {  
    e.preventDefault();
    var isInOrder = false;
    for (var elem of this.order){
        if(item.Id == elem.item.Id){
          elem.amount+=1;
          isInOrder = true;
        }
    }
    if(isInOrder == false){
      var elem: orderElement = { amount: 1, item: item };
      this.order.push(elem);
    }

    this.totalPrice += parseInt(item.Price);
    this.setState({
      total: this.totalPrice,
      order: this.order
    });
  }

  removeItemFromCart (item:menuItemJSON, e:any) {  
    e.preventDefault();
    var isRemoved = false;
    for (var elem of this.order){
        if(item.Id == elem.item.Id && isRemoved == false){
          if(elem.amount - 1 < 0){
            elem.amount = 0;
          } else{
            elem.amount-=1
          }
          isRemoved = true;
        }
    }

    if(this.totalPrice - parseInt(item.Price) < 0){
      this.totalPrice = 0;
    } else{
      this.totalPrice -= parseInt(item.Price);
    }

    this.setState({
      total: this.totalPrice,
      order: this.order
    });
  }

  getAmountFromOrder(item:menuItemJSON):number{
    var amount:number = 0;
    for (var elem of this.order){
      if(item.Id == elem.item.Id){
        amount = elem.amount;
      }
    }
    return amount;
  }

  getMenuJSON(){
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://10.31.52.196:8081/api/menu', false);
      xhr.send();
      if(xhr.responseText){
        console.log('Success');
        return xhr.responseText;
      } else{
        console.log('Success');
        return '[{"Id":1,"Name":"Spaghetti","Price":20,"Weight":"300g"},{"Id":2,"Name":"Thai Chicken XL","Price":25,"Weight":"400g"},{"Id":3,"Name":"Pizza","Price":18,"Weight":"500g"},{"Id":4,"Name":"Thai Chickien XS","Price":18,"Weight":"250g"},{"Id":5,"Name":"Tortilla","Price":15,"Weight":"300g"},{"Id":6,"Name":"Burger","Price":15,"Weight":"300g"},{"Id":7,"Name":"Small appetizer plate","Price":15,"Weight":"300g"},{"Id":8,"Name":"Big Appetizer plate","Price":25,"Weight":"500g"},{"Id":9,"Name":"Fruit plate","Price":10,"Weight":"259g"},{"Id":10,"Name":"Apple pie","Price":10,"Weight":"200g"},{"Id":11,"Name":"Chicken Tikka Masala","Price":25,"Weight":"400g"},{"Id":12,"Name":"Korma Chicken","Price":25,"Weight":"400g"},{"Id":13,"Name":"Chicken Salad","Price":15,"Weight":"350g"},{"Id":14,"Name":"Stake","Price":30,"Weight":"220g"},{"Id":15,"Name":"Tomato soup","Price":5,"Weight":"250g"},{"Id":16,"Name":"Chicken soup","Price":5,"Weight":"250g"}]';
      }
    }

  render(){
    var menuItems: Array<menuItemJSON> = JSON.parse(this.getMenuJSON());
    
    var itemsToDisplay = [];
    for (var item of menuItems) {
      let add = this.addItemToCart.bind(this, item);
      let remove = this.removeItemFromCart.bind(this, item);
      var amount:number = this.getAmountFromOrder(item);
      itemsToDisplay.push(
        <div className="container p-3 border rounded-bottom" key={item.Id}>
          <a href="#" className="list-group-item-action row">
            <div className="col col-md-auto">
              <img src={testFood} className="test-food" alt="testFood" />
            </div>
            <div className="col align-self-center">
              <span className='menuItemJSON' >
              <h4 className="mb-1">Name: {item.Name}</h4>
                <p className="mb-1">Price:{item.Price}</p>
                <p className="mb-1">Weight: {item.Weight}</p>
              </span>
            </div>
            <div className="col align-self-center  d-flex justify-content-end">
              <div className="col">
                <div className="btn-group btn-group-vertical">
                  <button type="submit" className="btn btn-info p-3 " onClick = {add}>
                    + 
                  </button> 
                  <br/>
                  <button type="submit" className="btn btn-info p-3" onClick = {remove}>
                  - 
                  </button>
                  </div>
                  <div className="p-3">
                      amount: {amount}
                  </div>
                </div>
            </div>
          </a>
        </div>
      );

      var orderElementsToDisplay = [];
      for (var elem of this.state.order) {
        orderElementsToDisplay.push(
          <div className="col align-self-center">
            <span className='menuItemJSON' >
            <h4 className="mb-1">Name: {elem.item.Name}</h4>
              <p className="mb-1">Amount:{elem.amount}</p>
            </span>
          </div>
        )};
      
    }
    
    return(
      <div className="container">
      <div className="col">
        <div className="d-flex justify-content-end p-4">
          <button type="button" className="btn btn-info w-25">
            <div className="row">
              <div className="col align-self-center">
              <p className="mb-1">Cart</p>
              <p className="mb-1">{this.totalPrice}zł</p>
              </div>
              <div className="col">
                <img src={shoppingCart} className="cart" alt="cart" />
              </div>
            </div>
          </button>
        </div>
        <div>
        {itemsToDisplay}
        </div>
        <div>
          <h2>Order:</h2>
          {orderElementsToDisplay}
        </div>
      </div>
    </div> 
    );
  }
}


interface orderElement{
  item: menuItemJSON;
  amount: number;
}

interface menuItemJSON {
  Id:    number;
  Name:  string;
  Price: string;
  Weight: string;
}

export default App;
