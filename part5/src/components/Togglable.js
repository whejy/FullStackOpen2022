import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const buttonLabel = visible ? 'Cancel' : props.buttonLabel;

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      {visible && <div>{props.children}</div>}
      <button onClick={() => toggleVisibility()}>{buttonLabel}</button>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;