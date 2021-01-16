// modules
import React from 'react';
import PropTypes from 'prop-types';
// assets
import './Button.css';

/**
 * Action button to use in interfaces
 */
function Button(props) {
  return (
    <button className="actionBtn" onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
}

Button.propTypes = {
  /**
   * Click handler
   */
  onClick: PropTypes.func,
  /**
   * Is the button disabled?
   */
  disabled: PropTypes.bool,
  /**
   * What to display within the button
   */
  children: PropTypes.node
};

Button.defaultProps = {
  onClick: e => console.log(e),
  disabled: false
};

export default Button;