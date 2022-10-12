import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const buttonLabel = visible ? 'Cancel' : props.buttonLabel

  const toggleVisibility = () => setVisible(!visible)

  const variant = buttonLabel === 'Cancel' ? 'danger' : 'primary'

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <span>
      <Button
        className="my-3"
        variant={variant}
        id="toggleButton"
        onClick={() => toggleVisibility()}
      >
        {buttonLabel}
      </Button>
      {visible && <div>{props.children}</div>}
    </span>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
