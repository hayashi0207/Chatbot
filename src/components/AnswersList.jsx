import React from 'react';
import { Answer } from './index';

const AnswersList = (props) => {
    return (
        <div>
            {props.answers.map((value, index) => {
                return (
                    <Answer content={value.content} nextId={value.nextId} select={props.select} key={index.toString()} />
                )
            })}
        </div>
    );
}

export default AnswersList