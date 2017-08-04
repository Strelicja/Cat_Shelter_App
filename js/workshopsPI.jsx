import React from 'react';
import ReactDOM from 'react-dom';
require('../css/style.css');
require('../sass/style.scss');

class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    filterText: '',
    likesKids: false
    };
  }
    search =(event)=>{
      console.log(event);
      this.setState ({
        filterText: event
      })
    }
    checked =(event)=>{
      console.log(event);
      this.setState ({
        likesKids: event
      })
    }
  render() {
  return (<div className='yellow blueWidth'>
      <SearchBar
        likesKids={this.state.likesKids}
        search={this.search}
        checked={this.checked}
        filterText={this.state.filterText} />
      <CatTable
        likesKids={this.state.likesKids}

        filterText={this.state.filterText}
        kitties={this.props.kitties} />
    </div>)
  }}

class SearchBar extends React.Component {

  handleSearch = (event) => {
    this.props.search(event.target.value);
  };
  handleChecked = (event) => {
    this.props.checked(event.target.value);
  };
  render() {

    return <form className="blue">
      <input
        type="text"
        value={this.props.filterText}
        onChange={this.handleSearch}
        placeholder="Search..." />
      <p>
        <input
          value={this.props.filterText}
          onChange={this.handleChecked}
          type="checkbox" />
        Only show kitties that likes kids
      </p>
    </form>;
  }
}

class CatTable extends React.Component {
  render() {
    var rows = [];
    var lastCategory = null;
    var filterText = this.props.filterText;
    var checkbox = this.props.likesKids;

    this.props.kitties.forEach(function(kitty) {
      if(kitty.category !== lastCategory) {
        rows.push(<CatCategoryRow
                  category = {kitty.category}
                  key = {kitty.category} />);
      }

      if(((kitty.name.includes(filterText) && filterText.length > 2) || filterText.length < 3) && (kitty.likesKids === true || checkbox === false)) {
        rows.push(<CatRow
                  kitty = {kitty}
                  key = {kitty.name} />);
      }
      lastCategory = kitty.category;
    });

    return <table className="green">
      <thead >
        <tr>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>;
  }
}


class CatCategoryRow extends React.Component {
  render() {
    return <tr>
      <th className="turquoise" colSpan="2">{this.props.category}</th>
      </tr>;
  }
}
class CatRow extends React.Component {
  render() {
    var name = this.props.kitty.likesKids
      ? this.props.kitty.name
      : <span style={{color: 'red'}}> {this.props.kitty.name} </span>;

    var age = this.props.kitty.likesKids
      ? this.props.kitty.age
      : <span style={{color: 'black'}}> {this.props.kitty.age} </span>;

    return (<tr>
        <td className="red">{name}</td>
        <td className="red borderWidth">{age}</td>
        <td>{this.props.kitty.cena}</td>
      </tr>
    )
  }
}


  var kitties = [
   {category: "male", age: "4", likesKids: true, name: "Fidel Catstro"},
   {category: "male", age: "9", likesKids: true, name: "Hairy Potter"},
   {category: "male", age: "2", likesKids: false, name: "Grumpy"},
   {category: "female", age: "1", likesKids: true, name: "Jude Paw"},
   {category: "female", age: "2", likesKids: false, name: "Lucifurr"},
   {category: "female", age: "3", likesKids: true, name: "Meowly Cyrus"}
  ];
  ReactDOM.render(
    <App kitties={kitties} />,
    document.getElementById('app')
  );
