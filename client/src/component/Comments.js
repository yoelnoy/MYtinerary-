import React, { Component } from 'react';

class Comments extends Component {
    constructor() {
        super()
        this.state = {
            display: true,
            className: 'commentsBody-hide'     /*'commentsBody'*/
        }
    }

    handleClick = () => {
        this.setState({display: !this.state.display})
        if(this.state.display == true) {
            this.setState({className: 'commentsBody'})
        } else if (this.state.display == false){
            this.setState({className: 'commentsBody-hide'})
        }
    }

    render () {
        return (
            <div className="page">
                
                <div className="comments-div">
                    <p onClick={this.handleClick} className="commentViewComments"> View comments... </p>
                    <div className={this.state.className}>
                        <p className="commentUsername"> someTraveler.1988 :
                            <span className="commentBody">So amazing.. Really recommended</span>
                        </p>
                        <p className="commentUsername"> worldGirl.MAD :
                            <span className="commentBody">Had such a great time! I went with my mother and 2 sisters andhad a blast! you should try it guys!</span>
                        </p>
                        <p className="commentUsername"> John.K.guide55 :
                            <span className="commentBody">Awesome experience!!! Didn't know what to expect in the beginning but boy oh boy was i in for a surprise!</span>
                        </p>
                    </div>
                </div>

            </div>
        )
    }
}

export default Comments;