import React, { Component } from 'react'
import axios from 'axios';

export class DeleteEdit extends Component {
    componentDidMount() {
        let itineraryId = this.props.itinerary._id
    }
    handleDelete = () => {
        let itineraryId = this.props.itinerary._id
        let commentId = this.props.comment.id
       axios.put('/api/itineraries/delete/' + itineraryId , {
            comment: commentId
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
    render() {
       
        return (
            <div>
                <div className="commentDeleteButton-div">
                    <button className="commentDeleteButton"><span className="far fa-edit commentDeleteicon"></span></button>
                    <button onClick={this.handleDelete} className="commentDeleteButton"><span className="far fa-trash-alt commentDeleteicon"></span></button>
                </div>
            </div>
        )
    }
}

export default DeleteEdit
