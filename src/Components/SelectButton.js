import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ControlledOpenSelect(props) {
  const { setValue } = props;
  const classes = useStyles();
  const [curr, setCurr] = React.useState('');
  const [open, setOpen] = React.useState(false);

  React.useEffect(()=> {
    setValue(curr);
  }, [curr]);

  const handleChange = event => {
    setCurr(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
     
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Currency</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={curr}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'$'}>$</MenuItem>
          <MenuItem value={'£'}>£</MenuItem>
          <MenuItem value={'CHF'}>CHF</MenuItem>
        </Select>
      </FormControl>
      
    </div>
  );
}
