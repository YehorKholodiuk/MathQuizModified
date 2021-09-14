import React, {useState} from 'react';

function Quiz(props) {

    const {question} = props;
    const [userAnswer, setUserAnswer] = useState('');
    const [openNextToggle, setOpenNextToggle] = useState(false);

    const saveButtonHandler = (serialNumber, userAnswer) => {
        props.getAnswers(serialNumber, userAnswer);
        setOpenNextToggle(!openNextToggle);
    }

    return (
        <div>
            {question.serialNumber}){' '}
            {question.firstNumber}{' '}
            {question.sign}{' '}
            {question.secondNumber} = {' '}
            <input
                value={userAnswer}
                placeholder={'input your answer'}
                onChange={(e) => setUserAnswer(e.target.value)}
            />
            <button
                disabled={!userAnswer}
                onClick={() => saveButtonHandler(question.serialNumber, userAnswer)}> Save
            </button>

        </div>
    );
}

export default Quiz;