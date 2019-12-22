import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';

class Comments extends Component {
    constructor() {
        super()
        this.state = {
            display: true,
            className: 'commentsBody-hide',
            deleteDisplay: true,
            deleteClassName: 'commentDeleteDiv-hide',
            placeHolder: 'Write your comment...',
            editClass_display: true,
            editClass: 'editClass-hide',
            viewOrHideComments: '',
            comment: '',
            comments: [],
            importedComment: [],
            commentNumber: '',
            commentViewComments: 'commentViewComments',
            selectedItem: '',
            editedComment: '',
        }
        this.handleWriting = this.handleWriting.bind(this);
        this.HandleSend = this.HandleSend.bind(this);
    }
    componentDidMount() {
        let itineraryId = this.props.itinerary._id;
        let commentNumber = this.props.itinerary.comments.length
        if(commentNumber === 1){
            this.setState({ commentNumber: 'View ' + commentNumber + ' comment' })
        }else if (commentNumber === 0) {
            this.setState({ commentNumber: 'No comments yet..' });
        }else {
            this.setState({ commentNumber: 'View all ' + commentNumber + ' comments ...' })
        }
        this.setState({ importedComment: this.props.itinerary.comments})
        this.setState({ viewOrHideComments: 'View all ' + commentNumber +' comments ...'})
        this.setState({ username: window.localStorage.getItem('userUsername')});   
        
        axios.get('/api/itineraries')
        .then(res => {
            console.log(res.data);
        })
    }
    handleDelete = (comment) => {
        let itineraryId = this.props.itinerary._id
        let commentId = comment.id;
        let editedComment = comment.comment;

       axios.put('/api/itineraries/delete/' + itineraryId , {
            commentBody: editedComment,
            selectedCommentId: commentId
        }).then (res => {
            this.setState({ 
                importedComment: res.data.comments,
                placeHolder: 'cleared'
            });
            console.log(res);
        }).catch (err => {
            console.log(err);
        })
    }
    handleEdit = () => {
        this.setState({ editClass_display: !this.state.editClass_display})
        if(this.state.editClass_display === true) {
            this.setState({ editClass: 'editClass' })
        } else {
            this.setState({ editClass: 'editClass-hide' })
        }
    }
    HandleEditSend = () => {
        let itineraryId = this.props.itinerary._id
        let commentId = this.state.selectedItem;
        let editedComment = this.state.editedComment
        axios.put('/api/itineraries/edit/' + itineraryId , {
            username: this.state.username,
            comment: editedComment,
            id: commentId
        }).then (res => {
            this.setState({ 
                importedComment: res.data.comments,
                placeHolder: 'cleared'
            });
            console.log(res);
        }).catch (err => {
            console.log(err);
        })

        this.setState({ 
            editClass_display: !this.state.editClass_display,
            deleteClassName: "commentDeleteDiv-hide",
            editClass: 'editClass-hide'
        })
        this.setState({ editedComment: ''})
        
    }
    handleCloseEdit = () => {
        this.setState({ editClass_display: !this.state.editClass_display})
        this.setState({ editClass: 'editClass-hide' })
    }
    handleClick = () => {
        this.setState({display: !this.state.display})
        if(this.state.display === true) {
            this.setState({className: 'commentsBody'})
            this.setState({ viewOrHideComments: 'Hide comments...'})
        } else if (this.state.display === false){
            this.setState({className: 'commentsBody-hide'})
            this.setState({ viewOrHideComments: this.state.commentNumber })
        }
    }
    determineItemStyle = (comment) => {
        if(this.state.selectedItem === comment.id){
            this.setState({selectedItem: ''})
        } else {
        this.setState({selectedItem: comment.id})
        }
    } 
    HandleSend = (e) => {
        let itineraryId = this.props.itinerary._id
        axios.put('/api/itineraries/' + itineraryId , {
            username: this.state.username,
            comment: this.state.comment,
            id: uuid()
        }).then (res => {
            this.setState({ 
                importedComment: res.data.comments
            });
            this.setState({placeHolder:''})
        }).catch (err => {
            console.log(err);
        })
        this.setState({comment: ''});
    }
    // The writing inside the comment input. 
    // Each type action changes the "comment" inside the state of this component.
    handleWriting = (event) => {
        this.setState({comment: event.target.value});
        console.log(this.state.comment);  
    }
    handleWritingEdit = (event) => {
        this.setState({editedComment: event.target.value});
        console.log(this.state.editedComment);  
    }
    render () {
        let itineraryComments = this.state.importedComment;
        let myEditCommentHtml = itineraryComments.map((comment, i)=> {
            if(this.state.selectedItem === comment.id){
                return(
                    <p key={comment.id} className="innerCommentView">
                       " {comment.comment} " 
                    </p>
                )
            }
        })
            
        let myCommentHtml = itineraryComments.map((comment, i)=> {
            return(
            <div className="comment-div-main" key={comment.id}>
                <div>
                    <p onClick={() => this.determineItemStyle(comment)} className="commentUsername"> {comment.username} :
                        <span className="commentBody">{comment.comment}</span>
                    </p>

                    <div className={this.state.selectedItem === comment.id ? 'commentDeleteDiv': 'commentDeleteDiv-hide'}> 
                        <div className="commentDeleteButton-div">
                            <button onClick={() => this.handleEdit(comment)} className="commentDeleteButton"><span className="far fa-edit commentDeleteicon"></span></button>
                            <button onClick={() => this.handleDelete(comment)} className="commentDeleteButton"><span className="far fa-trash-alt commentDeleteicon"></span></button>
                        </div>
                    </div>
                </div>
            </div>
            )}
        )     
        return (
            <div className="page">
                <div className="comments-div">
                    <p onClick={this.handleClick} className={this.state.commentViewComments}> { this.state.commentNumber } </p>
                    <div className={this.state.className}>
                        <div className="comment-div">

                            {myCommentHtml}

                        </div>
                        <div className="commentCommentsDiv">
                            <button onClick={this.HandleSend} className="btn commentSend"> SEND </button>
                            <input onChange={this.handleWriting} className="commentWriteComment" type="text" value= {this.state.comment} />
                        </div> 
                    </div>

                    <div className={this.state.editClass}>
                        <div className="commentUpdateDiv">
                            <div className="editCommentX-div">
                                <button onClick={this.handleCloseEdit} className="edit-button-x">
                                    <span className="far fa-2x fa-times-circle hide-button-x-icon"></span>
                                </button>
                            </div>
                            <p className="commentUpdate-title">Edit your comment</p>
                            {myEditCommentHtml}
                            <input className="commentUpdate-input" onChange={this.handleWritingEdit} type="text" value= {this.state.editedComment} />
                            <button onClick={this.HandleEditSend} className="btn edit-commentSend"> SEND edit </button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Comments;