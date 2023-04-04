import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";

function AddressForm() {
  const [inputValues, setInputValues] = useState({});
  const [counter, setCounter] = useState(0);
  const [num, setNum] = React.useState(1);
  const [errors, setErrors] = useState({});

  const handleClick = () => {
    var count = counter - 1;
    if (count < 0) {
      count = 0;
    }
    setCounter(count);
    console.log(counter);
  };
  const handleAdd = () => {
    var count = counter + 1;

    setCounter(count);
    console.log(counter);
  };

  const handleOnChange = (e) => {
    const abc = {};
    abc[e.target.className] = e.target.value;
    setInputValues({ ...inputValues, ...abc });
  };
  const validateInput = () => {
    let errors = {};
    let isValid = true;

    // Validate Number of Children field
    if (!num || num < 1) {
      errors["num"] = "Number of Children must be at least 1";
      isValid = false;
    }

    // Validate Child Name fields
    for (let i = 0; i < counter; i++) {
      if (!inputValues[i] || inputValues[i].trim() === "") {
        errors[i] = "Child Name is required";
        isValid = false;
      }
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInput()) {
      // Submit form
    }
  };

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Shipping address
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              xs={12}
              sm={6}
              type='number'
              id='Number of Children'
              label='Number of Children'
              fullWidth
              variant='standard'
              onChange={(e) => setNum(e.target.value < 1 ? 1 : e.target.value)}
              value={num ? num : 1}
              error={errors["num"]}
              helperText={errors["num"]}
            />
          </Grid>
          <button onClick={handleAdd}>Add Child Info</button>
          {/* <div style={{width:"100%"}} className="App"> */}

          {/* {Object.keys(inputValues).map((c) => {
        return true;
      })} */}

          {Array.from(Array(counter)).map((c, index) => {
            return (
              <Grid item key={index}>
                <TextField
                  xs={12}
                  sm={6}
                  id={`Child Name ${index}`}
                  name={index}
                  label={`Child Name ${index}`}
                  fullWidth
                  required
                  variant='standard'
                  onChange={handleOnChange}
                  // key={c}
                  className={index}
                  error={errors[index]}
                  helperText={errors[index]}
                />
                <TextField
                  xs={12}
                  sm={6}
                  id={`Age ${index}`}
                  name={index}
                  label={`Age ${index}`}
                  fullWidth
                  variant='standard'
                  // onChange={(e) => setNum(e.target.value <5 ? 5 : e.target.value)}
                  // value={num}
                  onChange={(e) =>
                    setInputValues({ ...inputValues, [index]: e.target.value })
                  }
                  value={inputValues[index]}
                  error={errors[index]}
                  helperText={errors[index]}
                />
                <button onClick={handleClick}>Remove</button>
              </Grid>
            );
          })}
          {/* </div> */}

          <Grid item xs={12} sm={6}>
            <TextField
              id='city'
              name='city'
              label='City'
              fullWidth
              autoComplete='shipping address-level2'
              variant='standard'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='state'
              name='state'
              label='State/Province/Region'
              fullWidth
              variant='standard'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='zip'
              name='zip'
              label='Zip / Postal code'
              fullWidth
              autoComplete='shipping postal-code'
              variant='standard'
            />
          </Grid>
        </Grid>
        <button type='submit'>Submit</button>
      </form>
    </React.Fragment>
  );
}
export default AddressForm;
