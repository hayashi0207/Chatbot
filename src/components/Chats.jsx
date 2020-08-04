import React from 'react';
import { Chat } from './index';
import List from '@material-ui/core/List';
import { makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
    chats: {
        height: '77%',
        overflow: 'auto'
    }
}))

const Chats = (props) => {
    const classes = useStyles();
    return (
        <List className={classes.chats} id="scroll-area">
            {props.chats.map((chat, index) => {
                return <Chat text={chat.text} type={chat.type} key={index.toString()} />
            })}

        </List>
    );
}
export default Chats;