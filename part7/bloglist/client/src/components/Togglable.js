import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const buttonLabel = visible ? 'Cancel' : props.buttonLabel

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      {visible && <div>{props.children}</div>}
      <Button
        variant="primary"
        id="toggleButton"
        onClick={() => toggleVisibility()}
      >
        {buttonLabel}
      </Button>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
