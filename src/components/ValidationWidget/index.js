import React, { useState } from 'react'

import { Card, CardHeader, CardTitle, CardText,
  Button, Collapse } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'

import UploadWidget from '../UploadWidget'
import ErrorWidget from '../ErrorWidget'

import validate from '../../logic/validation'

import './index.css'

const getColor = (errors, active) => {
  if (errors.length > 0) {
    return 'warning'
  } else if (errors.length === 0 && active) {
    return 'success'
  } else {
    return 'primary'
  }
}

const ReloadButton = ({onClick, color='dark'}) =>
  <Button
    outline color={color}
    size="sm"
    style={{
      zIndex: 5,
      position: 'absolute',
      right: 0,
    }}
    onClick={e => {
      e.stopPropagation()
      onClick(e)
    }}
  >
    <FontAwesomeIcon
      fixedWidth icon={faRedo}
    />
  </Button>

const HeaderContent = ({errors, active, onReset}) => {
  if (errors.length > 0) {
    return <>
      <CardTitle className="h4" style={{position: 'relative'}}>
        <ReloadButton onClick={onReset} />
        Not quite there yet!
      </CardTitle>
      <CardText>
        There's a few things that we'll need you to fix.
      </CardText>
    </>
  } else if (errors.length === 0 && active) {
    return <>
      <CardTitle className="h4" style={{position: 'relative'}}>
        <ReloadButton color="light" onClick={onReset} />
        Looks great!
      </CardTitle>
      <CardText>
        We couldn't find any problems (so far at least). Well done!
      </CardText>
    </>
  } else {
    return <>
      <CardTitle className="h4">
        Start validation
      </CardTitle>
      <CardText>
        Please drag and drop your Psych-DS folder here,
        or click to select it
      </CardText>
    </>
  }
}

const ValidationWidget = () => {
  const [errors, setErrors] = useState([])
  const [active, setActive] = useState(false)

  const color = getColor(errors, active)

  return (
    <Card
      color={color}
      inverse={['primary', 'success'].includes(color)}
    >
      <CardHeader>
        <UploadWidget
          onDrop={ async (files) => {
            // Run validation
            const newErrors = await validate(files)

            // Update state
            // (TODO: At some point, there might need to be
            // and intermediate state that is visible while
            // the data are being processed)
            setActive(true)
            setErrors(newErrors)
          }}
          className="text-center py-3"
        >
          <HeaderContent
            errors={errors}
            active={active}
            onReset={() => {
              setActive(false)
              setErrors([])
            }}
          />
        </UploadWidget>
      </CardHeader>
      <Collapse isOpen={errors.length > 0}>
        <ErrorWidget errors={errors} />
      </Collapse>
    </Card>
  )
}

export default ValidationWidget
