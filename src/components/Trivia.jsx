import { useMemo } from "react";
import shuffle from "../utils/shuffle"
import { decode } from 'html-entities'

/* eslint-disable react/prop-types */

export default function Trivia(props) {
  const options = useMemo(
    () => shuffle([...props.incorrectOptions, props.correctOption]),
    [props.correctOption, props.incorrectOptions]
  );

  return (
    <div className="single-question">
      <h3 className="question">{decode(props.question)}</h3>
      <div className="options">
        {options.map((option, index) => (
          <button
            disabled={props.disabled}
            className={`option 
            ${props.pickedAnswer === option && "picked"} 
            ${props.disabled && option === props.correctOption && "correct"} 
            ${
              props.disabled &&
              props.pickedAnswer !== props.correctOption &&
              option === props.pickedAnswer &&
              "wrong"
            }`}
            key={index}
            onClick={() => props.pickAnswer(option)}
          >
            {decode(option)}
          </button>
        ))}
      </div>
    </div>
  );
}