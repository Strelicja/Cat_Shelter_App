import React from 'react';
import ReactDOM from 'react-dom';
require('../css/style.css');
require('../sass/style.scss');


class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      filterText: '',
      likesKids: false
    }
  }

  changeBox = () => {
    this.setState({
      likesKids: (this.state.likesKids ? false : true)
    });
  }

  changeFilterText = (text) => {
    this.setState({
      filterText: text
    });
  }

  render() {
    return <div className = 'yellow blueWidth'>
            <Title />
            <SearchBar filter = {this.state.filterText} likesKids = {this.state.likesKids}
                          changeBox = {this.changeBox} filterText = {this.changeFilterText}/>
            <CatTable kitties = {this.props.kitties} filter = {this.state.filterText}
                      likesKids = {this.state.likesKids} />
          </div>
  }
}

class SearchBar extends React.Component {

  handlerCheckBox = () => { // rozwiązanie problemu event.target.checked
    if (typeof this.props.changeBox === 'function') {
      this.props.changeBox();
    }
  }

  handlerSearch  = (event) => {
    if (typeof this.props.filterText === 'function') {
      this.props.filterText(event.target.value);
    }
  }

  render() {
    return <form className = 'blue'>
              <input type = 'text' placeholder = "Search..." onChange = {this.handlerSearch}/>
                <p>
                  <input type = 'checkbox' checked = {this.props.likesKids} onChange = {this.handlerCheckBox}/>
                    Only show kitties that likes kids
                </p>
            </form>
  }
}

class CatTable extends React.Component {

  render() {
    let rows = [];
    let lastCategory = null;
    let filters = this.props.filter;
    let checkBox = this.props.likesKids;

    this.props.kitties.forEach(function(kitty) {
      if(kitty.category !== lastCategory) {
        rows.push(<CatCategoryRow category = {kitty.category} key = {kitty.category} />);
      }

      if(((kitty.name.includes(filters) && filters.length > 2) || filters.length < 3) && (kitty.likesKids === true || checkBox === false)) {
        rows.push(<CatRow kitty = {kitty} key = {kitty.name} />);
      }

      lastCategory = kitty.category;
    });

    return <table className = 'green'>
            <thead>
              <tr>
                <th> Cat name  </th>
                <th> Cat age </th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
  }
}

class CatCategoryRow extends React.Component {
  render() {
    return <tr className = 'turquoise'>
            <th colSpan = '2'> {this.props.category} </th>
          </tr>
  }
}

class CatRow extends React.Component {
  render() {
    let name = this.props.kitty.likesKids ?
                this.props.kitty.name : <span style = {{color: 'red'}}>
                {this.props.kitty.name} </span>;
    return <tr className = 'red'>
            <td>
              {name}
            </td>
            <td className="red borderWidth">
              {this.props.kitty.age}
            </td>
          </tr>
  }
}
class Title extends React.Component {
  render() {
    return <h1>Choose your cat!</h1>
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
