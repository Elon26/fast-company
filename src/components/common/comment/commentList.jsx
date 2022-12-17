import React from "react";
import Comment from "./comment";
import PropTypes from "prop-types";

const CommentList = ({ comments, onDelete }) => {
    return comments.map((comment) => (
        <Comment
            key={comment._id}
            commentId={comment._id}
            userId={comment.userId}
            comment={comment.content}
            createdAt={comment.created_at}
            onDelete={onDelete}
        />
    ));
};

CommentList.propTypes = {
    comments: PropTypes.array,
    onDelete: PropTypes.func
};

export default CommentList;
