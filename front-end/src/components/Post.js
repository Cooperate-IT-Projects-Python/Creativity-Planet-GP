import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { makeStyles } from '@material-ui/core/styles'; 
import { Card, CardHeader, CardContent,Modal, CardActions, Button, Typography, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core'; 
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'; 
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined'; 
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'; 
import DialogContentText from "@material-ui/core/DialogContentText";
import { useTranslation } from "react-i18next";
import Cookies from 'js-cookie';

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
  root: {
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
  },
  card: {
    margin: theme.spacing(2),
    maxWidth: 600,
    [theme.breakpoints.up("sm")]: {
      minWidth: 400,
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  commentForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(5),
  },
  commentButton: {
    margin: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      alignSelf: "flex-end",
    },
  },
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: theme.spacing(2),
    backgroundColor: '#f2f2f2',
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },
  commentInput: {
    flex: 1,
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      marginBottom: theme.spacing(2),
    },
  },
  submitButton: {
    flexShrink: 0,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
})); 
 
const PostList = () => { 
  const { t, i18n } = useTranslation();

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
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  useEffect(() => { 
    axios.get('http://127.0.0.1:8000/community/posts/') 
      .then(response => { 
        console.log(response.data); 

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
    setuser(Cookies.get('userid'))
    // setTags([]); 
    setMainImage(null); 
  }; 
 
  const handleEditSubmit = () => { 
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    // formData.append('tags', tags);
    formData.append('user', Cookies.get('userid'));
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
      user: Cookies.get('userid'), // or set it to the current user's ID
      post: postId

    })
    .then(response => {
      // Update the post object in the state with the new rating value
      setPosts(posts.map(post => {
        if (post.pk === postId) {
          return {
            ...post,
            num_likes: response.data.num_likes
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
        user: Cookies.get('userid'),
        value: 0,
      })
      .then(() => {
        // update the like count of the post
        setPosts(posts.map(p => p.pk === post.pk ? { ...p, num_likes: p.num_likes - 1 } : p));
        // update the state of the liked post
        setLikedPost({ postId: null, value: null });
      })
      .catch(error => console.log(error));
    } else if (likedPost.postId === post.pk && likedPost.value === 0) {
      // user has already disliked the post, so like it
      axios.post(`http://127.0.0.1:8000/community/likepost/${post.pk}`, {
        user: Cookies.get('userid'),
        value: 1,
      })
      .then(() => {
        // update the like count of the post
        setPosts(posts.map(p => p.pk === post.pk ? { ...p, num_likes: p.num_likes + 1 } : p));
        // update the state of the liked post
        setLikedPost({ postId: post.pk, value: 1 });
      })
      .catch(error => console.log(error));
    } else {
      // user has not liked or disliked the post yet, so like it
      axios.post(`http://127.0.0.1:8000/community/likepost/${post.pk}`, {
        user: Cookies.get('userid'),
        value: 1,
      })
      .then(() => {
        // update the like count of the post
        setPosts(posts.map(p => p.pk === post.pk ? { ...p, num_likes: p.num_likes + 1 } : p));
        // update the state of the liked post
        setLikedPost({ postId: post.pk, value: 1 });
      })
      .catch(error => console.log(error));
    }
  };
  

  // const PostComments = ({ postId }) => {
  //   const [comments, setComments] = useState([]);
  //   const [newComment, setNewComment] = useState("");
  //   const [openModal, setOpenModal] = useState(false);
  
  //   const handleOpenModal = () => {
  //     setOpenModal(true);
  //   };
  
  //   const handleCloseModal = () => {
  //     setOpenModal(false);
  //   };
  
  //   const handleNewCommentChange = (event) => {
  //     setNewComment(event.target.value);
  //   };
  
  //   const handleNewCommentSubmit = (event) => {
  //     event.preventDefault();
  //     axios
  //       .post("http://127.0.0.1:8000/community/setcomment/", {
  //         comment: newComment,
  //         post: postId,
  //         user: 1, // replace with the actual user ID
  //       })
  //       .then(() => {
  //         setComments([...comments, { comment: newComment, user: { name: "you" } }]);
  //         setNewComment("");
  //         handleCloseModal();
  //       })
  //       .catch((error) => console.log(error));
  //   };
  
  //   useEffect(() => {
  //     axios
  //       .get(`http://127.0.0.1:8000/community/postcomments/${postId}`)
  //       .then((response) => {
  //         setComments(response.data);
  //       })
  //       .catch((error) => console.log(error));
  //   }, [postId]);
  // }  
 
  const handleClick = (post) => {
    try {
      axios
        .get(`http://127.0.0.1:8000/community/postcomments/${post.pk}`)
        .then((response) => {
          setPostId(post.pk); 
          setComments(response.data);
          setOpen(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleClose = () => {
    setOpen(false);
  };

  const handleCommentSubmit = (post) => {
    const newComment = {
      comment: commentText,
      post: post.pk,
      created_at: new Date().toISOString(),
      is_answer: false,
      user: Cookies.get('userid'),
    };

    axios
      .post("http://127.0.0.1:8000/community/setcomment/", newComment)
     
      .then((response) => {
        setComments([...comments, response.data]);
        
        setCommentText("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return ( 
    <div className={classes.container}> 
      {posts.map(post => ( 
        <Card key={post.pk} className={classes.card}> 
          <CardHeader 
            avatar={ 
              <Avatar aria-label="post-owner" className={classes.avatar}> 
                {post.post_owner.username.charAt(0)} 
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
            {t("posta.tags", { tags: post.tags.join(', ') })}            </Typography> 
            <Typography variant="body2" color="textSecondary"> 
            {t("posta.owner", { username: post.post_owner.username })}            </Typography> 
          </CardContent> 
          <CardActions className={classes.actions}> 
            <div> 
            <Button startIcon={<ThumbUpAltOutlinedIcon />} onClick={() => handleLikeClick(post)}> 
            {t("posta.likes", { num_likes: post.num_likes })} </Button> 

<Button startIcon={<ChatBubbleOutlineOutlinedIcon />} onClick={() => handleClick(post)}>
{t("posta.commentsBtn")}   
    </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{ style: { borderRadius: '1rem', overflow: 'hidden' } }}>
      <DialogTitle>{t("posta.comments")}</DialogTitle>                <DialogContent>
  {comments.map((comment) => (
    <div key={comment.pk}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={comment.user.avatar} />
        <span style={{ marginLeft: '1rem' }}>{comment.user.name}</span>
        <span style={{ marginLeft: '1rem' }}>{comment.created_at}</span>

      </div>
      <p style={{color:'gold'}}>{comment.comment}</p>
    </div>
  ))}
</DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>{t("close")}</Button>
        </DialogActions>
      </Dialog>
      
            </div> 
            <div> 
              <Button variant="contained" color="primary" onClick={() => handleEditOpen(post)}> 
              {t("editPost")}              </Button> 
              <Button variant="contained" color="secondary" onClick={() => handleDeleteOpen(post)}> 
              {t("delete")} 
              </Button> 
            </div> 
          </CardActions> 
          <form className={classes.formContainer}>
      <TextField
        id="comment-text"
        label={t("posta.addComment")}
        variant="outlined"
        size="small"
        value={commentText}
        onChange={(event) => setCommentText(event.target.value)}
        className={classes.commentInput}
        multiline
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() =>handleCommentSubmit(post)}
        className={classes.submitButton}
      >
        {t("submit")}
      </Button>
    </form>
        </Card> 
      ))} 
      <Dialog open={editOpen} onClose={handleEditClose}> 
        <DialogTitle>Edit Post</DialogTitle> 
        <DialogContent> 

          <TextField 
            autoFocus 
            margin="dense" 
            label={t("titleLabel")} 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            fullWidth 
          /> 
          <TextField 
            margin="dense" 
            label={t("contentLabel")}
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
          {t("cancel")}
                    </Button> 
          <Button onClick={handleEditSubmit} color="primary"> 
          {t("save")}
                    </Button> 
        </DialogActions> 
      </Dialog> 
      <Dialog open={deleteOpen} onClose={handleDeleteClose}> 
      {t("delete.confirmation")}
              <DialogContent> 
          <Typography variant="body1">{t("delete.dialog.title")}</Typography> 
        </DialogContent> 
        <DialogActions> 
          <Button onClick={handleDeleteClose} color="primary"> 
          {t("cancel")}          </Button> 
          <Button onClick={handleDeleteConfirm} color="secondary"> 
          {t("delete")}
                    </Button> 
        </DialogActions> 
      </Dialog> 
    </div> 
  ); 
}; 
 
export default PostList; 