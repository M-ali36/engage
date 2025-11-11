import React, { useState, useEffect, useRef } from 'react'
import * as classes from './index.module.css'
import { useForm } from 'react-hubspot'
import LinkArrow from '@Svg/link-arrow.svg'
import AnimatedLink from '@Ui/AnimatedLink'

const SubscribeForm = ({ text }) => {
  const [submitted, setSubmitted] = useState(false)
  const [message, setMessage] = useState()
  const [messageStyle, setMessageStyle] = useState({})
  const [canSend, setCanSend] = useState(false)
  const [hasError, setHasError] = useState(false)

  const formRef = useRef()
  const emailInput = useRef()

  useEffect(() => {
    if (submitted) formRef.current.reset()
  }, [submitted])

  const { data, isLoading, isError, handleSubmit } = useForm({
    portalId: '25832621',
    formId: 'be77cea0-67aa-4ef3-8894-5cac42a1fb17',
  })

  useEffect(() => {
    if (data?.data) {
      setSubmitted(true)
    } else {
      setSubmitted(false)
    }
    setMessage(data?.data.inlineMessage)
  }, [data])

  const validateEmail = (text) => {
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return validRegex.test(text)
  }

  const checkValidate = () => {
    if (emailInput.current) {
      const value = emailInput.current.value
      return value ? validateEmail(value) : false
    }
    return false
  }

  const handleChange = () => {
    const valid = checkValidate()
    setCanSend(valid)
    setHasError(!valid && emailInput.current.value.length > 0)
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className={`${classes.control} ${submitted ? classes.controlSubmitted : ''}`}>
            <input
              type="email"
              name="email"
              ref={emailInput}
              placeholder={submitted ? 'Thanks for sliding into our DMs' : 'Email Address'}
              id="subscribe-EMAIL"
              onChange={handleChange}
              required
              className={`${classes.input} ${hasError ? classes.inputError : classes.inputNoError}`}
              tabIndex={submitted ? -1 : undefined}
            />
            <button className={classes.btn} type="submit" disabled={!canSend} aria-label="Subscribe">
              <LinkArrow className={classes.icon}/>
            </button>
          </div>
          {message && (
            <p className="mt-2 text-sm" style={messageStyle} dangerouslySetInnerHTML={{ __html: message }} />
          )}
        </form>
      </div>
    </div>
  )
}

export default SubscribeForm
