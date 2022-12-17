import AddComment from "../common/comment/addComment";
import CommentList from "../common/comment/commentList";
import { orderBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { createComment, removeComment, getComments, getCommentsLoadingStatus, loadCommentsList } from "../../store/comments";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { getCurrentUserId } from "../../store/users";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());
    const currentUserId = useSelector(getCurrentUserId());

    const handleSubmit = (data) => {
        const comment = {
            ...data,
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId,
            _id: nanoid()
        };
        dispatch(createComment(comment));
    };

    const handleDelete = (commentId) => {
        dispatch(removeComment(commentId));
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <h2>New comment</h2>
                    <AddComment onSubmit={handleSubmit} />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {!isLoading
                        ? <CommentList
                            comments={sortedComments}
                            onDelete={handleDelete}
                        />
                        : "Loading..."
                    }
                </div>
            </div>
        </>
    );
};

export default Comments;
