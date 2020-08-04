import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
    "button": {
        width: '100%',
        backgroundColor: 'rgb(250, 50, 50)',
        marginBottom: 5,
        '&:hover': {
            backgroundColor: 'rgb(250, 100, 100)'
        }
    }
}),
);
const Answer = (props) => {
    const classes = useStyles();
    return (
        <Button className={classes.button} variant="contained" color="primary" onClick={() => props.select(props.content, props.nextId)}>
            {props.content}
        </Button>
    );
}

export default Answer