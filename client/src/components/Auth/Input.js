import React from 'react';

const Input = ({ id, name, type, onHandleChange }) => {
    return (
        <input
            type={type}
            name={name}
            id={id}
            onChange={onHandleChange}
        />
    );
};

export default Input;
