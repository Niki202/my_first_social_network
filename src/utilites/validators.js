
export const maxLength2 = (number) => (formData) => {
    if (formData && formData.length >= number) return `Max length is ${number} symbols`
    return undefined

}

export const required = (formData) => {
    if (!formData) return 'Field is required'
    return undefined
}

// export const maxLength = (formData) => {
//     const errors ={}
//     if (!formData.newMessageText) {
//         errors.newMessageText = 'Required'
//         return errors
//     }
//     if (formData.newMessageText.length >= 10) {
//         errors.newMessageText = 'Max length is 10 symbols'
//     }
//     return errors
// }