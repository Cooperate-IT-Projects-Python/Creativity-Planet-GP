import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Grid, makeStyles, Paper } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  input: {
    display: 'none',
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mainImageFile, setMainImageFile] = useState(null);
  const classes = useStyles();
  const [missingFieldsError, setMissingFieldsError] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (!title.trim() || !content.trim() || !mainImageFile) {
      // If any of the fields is missing, display an error message
      setMissingFieldsError('Please complete all the fields and add an image');
    } else {
      // Otherwise, submit the form
      const data = new FormData();
      data.append('title', title);
      data.append('content', content);
      data.append('user', 1); // Replace with the ID of the logged-in user
      data.append('main_Image', mainImageFile); // mainImageFile is a File object
      axios.post('http://127.0.0.1:8000/community/posts/', data)
      .then(response => {
        console.log(response.data);
        // Clear input fields
        setTitle('');
        setContent('');
        setMainImageFile(null);
        setMissingFieldsError('');
      })
      .catch(error => {
        console.log(error);
      });
    }
  };

  return (
    <Paper className={classes.root}>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="What's on your mind?"
            variant="outlined"
            fullWidth
            multiline
            rowsMax={6}
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            placeholder="Write something..."
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={event => setContent(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={event => setMainImageFile(event.target.files[0])}
          />
          <label htmlFor="icon-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<PhotoCamera />}
            >
              Add photo
            </Button>
          </label>
        </Grid>
        <Grid item xs={12}>
          {/* Display the missing fields error message */}
          {missingFieldsError && <p style={{color: 'red'}}>{missingFieldsError}</p>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSubmit}
            disabled={!title.trim()}
          >
            Post
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreatePost;
