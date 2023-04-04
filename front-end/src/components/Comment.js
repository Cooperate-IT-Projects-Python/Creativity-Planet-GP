import PropTypes from 'prop-types';

import styles from '../styles/home.module.css';
import { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField } from '@material-ui/core';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';

function PostComments({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // fetch comments for the post with the given postId
    axios.get(`http://127.0.0.1:8000/community/postcomments/${postId}`)
      .then(response => setComments(response.data))
      .catch(error => console.log(error));
  }, [postId]);

  const handleCommentSubmit = () => {
    // submit new comment to the server
    axios.post(`http://127.0.0.1:8000/community/setcomment`, {
      comment: newComment,
      post: postId,
      user: 1, // replace with actual user id
    })
      .then(response => {
        // add new comment to the state
        setComments([...comments, response.data]);
        // reset new comment input
        setNewComment('');
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <Button startIcon={<ChatBubbleOutlineOutlinedIcon />} onClick={() => setOpen(true)}> 
        {comments.length} Comments 
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          {comments.map(comment => (
            <div key={comment.pk}>
              <p>{comment.comment}</p>
              <p>Posted by {comment.user.name} on {comment.created_at}</p>
            </div>
          ))}

          <TextField
            label="Add a comment"
            fullWidth
            value={newComment}
            onChange={event => setNewComment(event.target.value)}
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
          />

          <Button onClick={handleCommentSubmit} color="primary" variant="contained">
            Post Comment
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}


PostComments.propTypes = {
  PostComments: PropTypes.object.isRequired,
};

export default PostComments;
