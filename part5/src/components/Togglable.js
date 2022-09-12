import { useState, forwardRef, useImperativeHandle } from 'react';

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

export default Togglable;
