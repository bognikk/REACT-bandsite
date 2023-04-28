import React from "react";

import "./Button.scss";

const Button = ({ type, className, onClick, disabled, children }) => {
	return (
		<button
			type={type || "button"}
			className={`button ${className}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
