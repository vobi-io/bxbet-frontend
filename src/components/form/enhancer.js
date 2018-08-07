import omit from 'object.omit'
import isEmail from 'validator/lib/isEmail'
import { compose, withStateHandlers, withHandlers } from 'recompose'

const validators = {
  required: val => (!val ? 'Required' : null),
  email: val => (val && !isEmail(val) ? 'Invalid email' : null),
  match: (val, values, matchKey) => (val && values[matchKey] && val !== values[matchKey] ? 'Do not match' : null),
}

const getKey = value => Object.keys(value)[0]
const getVal = value => Object.values(value)[0]
const getRules = (validations, key) => validations[key]
const evalFieldErrors = (rules, val, values) => {
  const fieldErrs = rules.reduce((errors, rule) => {
    let v = null
    if (typeof rule === 'object') {
      const key = getKey(rule)
      const matchKey = getVal(rule)
      v = validators[key](val, values, matchKey)
    } else {
      v = validators[rule](val)
    }
    if (v) {
      errors.push(v)
    }
    return errors
  }, [])
  return fieldErrs
}
const evalErrors = (currentErrors, fieldErrors, key) => {
  if (fieldErrors.length > 0) {
    const newErrs = {
      [key]: fieldErrors,
    }
    return Object.assign({}, currentErrors, newErrs)
  }

  return omit(currentErrors, key)
}
const validate = (validations, values) => {
  const errs = {}
  Object.keys(validations).map((field) => {
    const fieldErrs = evalFieldErrors(validations[field], values[field], values)
    if (fieldErrs.length > 0) {
      errs[field] = fieldErrs
    }
  })
  return errs
}

export default compose(
  withStateHandlers(
    () => ({
      submitted: false,
      values: {},
      errors: {},
      submitting: false,
      submissionError: '',
      valid: true,
    }),
    {
      setValue: ({ values, errors }, { validations }) => (value) => {
        const state = {}

        if (validations) {
          const key = getKey(value)
          const val = getVal(value)
          const rules = getRules(validations, key)
          if (rules && rules.length > 0) {
            const fieldErrs = evalFieldErrors(rules, val, values)
            const newErrors = evalErrors(errors, fieldErrs, key)

            if (Object.keys(newErrors).length > 0) {
              state.valid = false
            } else {
              state.valid = true
            }
            state.errors = newErrors
          }
        }

        state.values = Object.assign({}, values, value)

        // console.log('========= set value =========')
        // console.log(state)
        return state
      },
      setSubmitted: () => submitted => ({ submitted }),
      setSubmitting: () => submitting => ({ submitting }),
      setValid: () => valid => ({ valid }),
      setError: ({ errors }) => error => ({
        errors: Object.assign({}, errors, error),
        valid: false,
      }),
      setSubmissionError: () => submissionError => ({
        submissionError,
        submitted: true,
        submitting: false,
      }),
      clearError: ({ errors }) => key => ({ errors: omit(errors, key) }),
      setErrors: () => errors => ({ errors }),
    }
  ),
  withHandlers({
    getError: ({ errors }) => key => errors[key],
    getValue: ({ values }) => key => (values[key] ? values[key] : ''),
    onSubmit: ({
      submitHandler,
      setSubmitting,
      setSubmitted,
      errors,
      values,
      validations,
      valid,
      submitted,
      setErrors,
      setSubmissionError,
      setValid,
    }) => async (event) => {
      event.preventDefault()

      // console.log(errors)

      setSubmissionError('')
      setSubmitting(true)

      if (submitted && !valid) {
        setSubmitting(false)
        return
      }

      if (validations) {
        const errs = validate(validations, values)
        if (Object.keys(errs).length > 0) {
          setErrors(errs)
          setValid(false)
          setSubmitting(false)
          setSubmitted(true)
          return
        }
      }

      submitHandler({ values, errors, setSubmissionError })
    },
  })
)
