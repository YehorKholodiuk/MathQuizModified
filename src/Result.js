import React from 'react';

function Result(props) {


    return (
        <div>
            <>Right Answer - <b>{props.result}</b> out of <b>{props.quizLength}</b>! {'  '}
                {props.result === props.quizLength ? <>Congratulations!</> : <>Try again!</>}
            </>

        </div>
    );
}

export default Result;
