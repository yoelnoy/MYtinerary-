import React, { Component } from 'react';



    class SearchBar extends Component {
        constructor() {
            super();
            this.state = {
                search: ''
            }
        }
        
        updateSearch(event) {
            this.setState({search:event.target.value.substr(0, 20)})
            // console.log(event.target.value);
              
        }

        render(){
            return(
                <div className="searchBar-main">
                    <div className="searchBar-icon-div">
                       <button className="btn"> 
                           <span className="fas fa-search fa-2x searchBar-icon"></span>
                        </button>
                    </div>

                    <div className="searchBar-input-div">
                        <input type="text" 
                            value={this.state.search}
                            onChange={this.updateSearch.bind(this)} 
                            className="searchBar-input"/>
                    </div>

                </div>
            )
        }
    }
        
        

       
       

export default SearchBar;