var React = require('react');
var ReactDOM = require('react-dom');
var axios = require("axios")
var moment = require('moment');
//var $ = require('jquery')
require('./index.css');


class SearchBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value:null,
      data:null
    };

    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

    componentDidMount() {
      this.handleSubmit();
  }

     componentDidMount() {
      this.handleChange;
  }

  handleChange(event){
    this.setState({value:event.target.value})
  }

  handleSubmit(event){

     event.preventDefault();

    const url = 'https://itunes.apple.com/search?term='+this.state.value+'&entity=movie&limit=5'

    axios.get(url)
    .then(response => {
      const results = response.data.results;
      console.log(results);
      this.setState({data:results})

  })
    .catch(error => console.log(error));
}

  render() {
    return (
      <div>
       <form className = "search-box" onSubmit = {this.handleSubmit}>
       <input type="text" placeholder="Search.." value = {this.state.value} onChange={this.handleChange}/>
       <input type = "submit" value = "Submit"/>
       </form>
       <p>(itunes API looking for movies limited to 5)</p>
      {!this.state.data? <p>LOADING...</p> : <Results list={this.state.data}/>}
      </div>
    )
  }
}

class Results extends React.Component {
  render() {

    return (
      <div className = "container">
       <ul className = "movies-list">
     {this.props.list.map(e=>
      <li
      key = {e.collectionId}>
      <p className ="title">{e.trackName}</p>
      <p className= "year">Release Date: {moment(e.releaseDate).format('MMMM Do, YYYY')}</p>
      <p className = "desc">Summary: {e.longDescription}</p>
      </li>)}
      </ul>

      </div>
    )
  }
}

ReactDOM.render(
  <SearchBox/>,
  document.getElementById('app')
);

/*    $.get(url, data=>console.log(data))
    .done(function(data){this.setState({data:data})}.bind(this))  */

