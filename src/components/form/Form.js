import enhancer from './enhancer'

const Form = props => props.children(props)

// const Form = ({
//   submitted,
//   errors,
//   submitting,
//   valid,
//   setSubmitted,
//   setSubmitting,
//   setError,
//   setErrors,
//   clearError,
//   getError,
//   setValue,
//   values,
//   onSubmit,
//   children,
// }) =>
//   children({
//     submitted,
//     errors,
//     submitting,
//     valid,
//     setSubmitted,
//     setSubmitting,
//     setError,
//     setErrors,
//     clearError,
//     setValue,
//     values,
//     onSubmit,
//     getError,
//   })

export default enhancer(Form)
