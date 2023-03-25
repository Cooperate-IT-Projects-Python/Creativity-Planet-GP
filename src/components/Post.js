import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { makeStyles } from '@material-ui/core/styles'; 
import { Card, CardHeader, CardContent, CardActions, Button, Typography, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core'; 
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'; 
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined'; 
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'; 
 
 
const useStyles = makeStyles((theme) => ({ 
  container: { 
    marginTop: theme.spacing(4), 
  }, 
  card: { 
    marginBottom: theme.spacing(4), 
  }, 
  avatar: { 
    backgroundColor: theme.palette.primary.main, 
  }, 
  actions: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: theme.spacing(2), 
  }, 
})); 
 
const PostList = () => { 
  const classes = useStyles(); 
  const [posts, setPosts] = useState([]); 
  const [editOpen, setEditOpen] = useState(false); 
  const [deleteOpen, setDeleteOpen] = useState(false); 
  const [postId, setPostId] = useState(null); 
  const [title, setTitle] = useState(''); 
  const [content, setContent] = useState(''); 
  const [tags, setTags] = useState([]); 
  const [mainImage, setMainImage] = useState(null); 
  const [user, setuser] = useState(''); 
 
  useEffect(() => { 
    axios.get('http://127.0.0.1:8000/community/posts/') 
      .then(response => { 
        setPosts(response.data); 
      }) 
      .catch(error => { 
        console.log(error); 
      }); 
  }, []); 
 
  const handleEditOpen = (post) => { 
    setEditOpen(true); 
    setPostId(post.pk); 
    setTitle(post.title); 
    setContent(post.content);
    // setTags(post.tags); 
    setMainImage(post.main_Image); 
  }; 
 
  const handleEditClose = () => { 
    setEditOpen(false); 
    setPostId(null); 
    setTitle(''); 
    setContent(''); 
    setuser(1)
    // setTags([]); 
    setMainImage(null); 
  }; 
 
  const handleEditSubmit = () => { 
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    // formData.append('tags', tags);
    formData.append('user', 1);
    if (mainImage instanceof File) {
      formData.append('main_Image', mainImage);
    }
    
    axios.put(`http://127.0.0.1:8000/community/postgetupdel/${postId}`, formData) 
      .then(response => { 
        setPosts(posts.map(post => post.pk === postId ? response.data : post)); 
        handleEditClose(); 
      }) 
      .catch(error => { 
        console.log(error.response.data); // or console.log(error.message) for general error message
    });
    
  };
  
 
  const handleDeleteOpen = (post) => { 
    setDeleteOpen(true); 
    setPostId(post.pk); 
  }; 
 
  const handleDeleteClose = () => { 
    setDeleteOpen(false); 
    setPostId(null); 
  }; 
 
  const handleDeleteConfirm = () => { 
    axios.delete(`http://127.0.0.1:8000/community/postgetupdel/${postId}`) 
      .then(() => { 
        setPosts(posts.filter(post => post.pk !== postId)); 
        handleDeleteClose(); 
      }) 
      .catch(error => { 
        console.log(error); 
      }); 
  }; 
 

  const handleRatePost = (postId, value) => {
    console.log(value, postId);
    axios.post('http://127.0.0.1:8000/community/ratepost/', {
      value: value,
      user: 1, // or set it to the current user's ID
      post: postId

    })
    .then(response => {
      // Update the post object in the state with the new rating value
      setPosts(posts.map(post => {
        if (post.pk === postId) {
          return {
            ...post,
            rate_number: response.data.rate_number
          };
        }
        return post;
      }));
    })
    .catch(error => {
      console.log(error);
    });
  };
  const [likedPost, setLikedPost] = useState({ postId: null, value: null });
  const handleLikeClick = (post) => {
    // check if the user has already liked or disliked this post
    if (likedPost.postId === post.pk && likedPost.value === 1) {
      // user has already liked the post, so unlike it
      axios.post(`http://127.0.0.1:8000/community/likepost/${post.pk}`, {
        user: 1,
        value: 0,
      })
      .then(() => {
        // update the like count of the post
        setPosts(posts.map(p => p.pk === post.pk ? { ...p, rate_number: p.rate_number - 1 } : p));
        // update the state of the liked post
        setLikedPost({ postId: null, value: null });
      })
      .catch(error => console.log(error));
    } else if (likedPost.postId === post.pk && likedPost.value === 0) {
      // user has already disliked the post, so like it
      axios.post(`http://127.0.0.1:8000/community/likepost/${post.pk}`, {
        user: 2,
        value: 1,
      })
      .then(() => {
        // update the like count of the post
        setPosts(posts.map(p => p.pk === post.pk ? { ...p, rate_number: p.rate_number + 1 } : p));
        // update the state of the liked post
        setLikedPost({ postId: post.pk, value: 1 });
      })
      .catch(error => console.log(error));
    } else {
      // user has not liked or disliked the post yet, so like it
      axios.post(`http://127.0.0.1:8000/community/likepost/${post.pk}`, {
        user: 2,
        value: 1,
      })
      .then(() => {
        // update the like count of the post
        setPosts(posts.map(p => p.pk === post.pk ? { ...p, rate_number: p.rate_number + 1 } : p));
        // update the state of the liked post
        setLikedPost({ postId: post.pk, value: 1 });
      })
      .catch(error => console.log(error));
    }
  };
  

  return ( 
    <div className={classes.container}> 
      {posts.map(post => ( 
        <Card key={post.pk} className={classes.card}> 
          <CardHeader 
            avatar={ 
              <Avatar aria-label="post-owner" className={classes.avatar}> 
                {post.post_owner.name.charAt(0)} 
              </Avatar> 
            } 
            title={post.title} 
            subheader={post.created_at} 
          /> 
          <CardContent> 
            <Typography variant="body1" color="textPrimary"> 
              {post.content} 
            </Typography> 
            <img src={post.main_Image} alt={post.title} className="mb-3" /> 
            <Typography variant="body2" color="textSecondary"> 
              Tags: {post.tags.join(', ')} 
            </Typography> 
            <Typography variant="body2" color="textSecondary"> 
              Post owner: {post.post_owner.name} 
            </Typography> 
          </CardContent> 
          <CardActions className={classes.actions}> 
            <div> 
            <Button startIcon={<ThumbUpAltOutlinedIcon />} onClick={() => handleLikeClick(post)}> 
  {post.rate_number} Likes 
</Button> 

              <Button startIcon={<ChatBubbleOutlineOutlinedIcon />}> 
                {post.Num_comments} Comments 
              </Button> 
            </div> 
            <div> 
              <Button variant="contained" color="primary" onClick={() => handleEditOpen(post)}> 
                Edit 
              </Button> 
              <Button variant="contained" color="secondary" onClick={() => handleDeleteOpen(post)}> 
                Delete 
              </Button> 
            </div> 
          </CardActions> 
        </Card> 
      ))} 
      <Dialog open={editOpen} onClose={handleEditClose}> 
        <DialogTitle>Edit Post</DialogTitle> 
        <DialogContent> 

          <TextField 
            autoFocus 
            margin="dense" 
            label="Title" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            fullWidth 
          /> 
          <TextField 
            margin="dense" 
            label="Content" 
            value={content} 
            onChange={e => setContent(e.target.value)} 
            fullWidth 
          /> 
          {/* <TextField 
            margin="dense" 
            label="Tags" 
            value={tags.join(', ')} 
            onChange={e => setTags(e.target.value.split(', '))} 
            fullWidth 
          />  */}
 <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={event => setMainImage(event.target.files[0])}
          />
        </DialogContent> 
        <DialogActions> 
          <Button onClick={handleEditClose} color="primary"> 
            Cancel 
          </Button> 
          <Button onClick={handleEditSubmit} color="primary"> 
            Save 
          </Button> 
        </DialogActions> 
      </Dialog> 
      <Dialog open={deleteOpen} onClose={handleDeleteClose}> 
        <DialogTitle>Confirm Delete</DialogTitle> 
        <DialogContent> 
          <Typography variant="body1">Are you sure you want to delete this post?</Typography> 
        </DialogContent> 
        <DialogActions> 
          <Button onClick={handleDeleteClose} color="primary"> 
            Cancel 
          </Button> 
          <Button onClick={handleDeleteConfirm} color="secondary"> 
            Delete 
          </Button> 
        </DialogActions> 
      </Dialog> 
    </div> 
  ); 
}; 
 
export default PostList; 