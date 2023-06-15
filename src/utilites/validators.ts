
export const maxLength2 = (number: number) => (formData: string | undefined) => {
    if (formData && formData.length >= number) return `Max length is ${number} symbols`
    return undefined

}

export const required = (formData: string | undefined) => {
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