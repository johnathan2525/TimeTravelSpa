export const transporterParse = (passenger) => {
    if (passenger.transporter === 'undefined' || passenger.transporter === null || typeof passenger.transporter !== 'object') {
        return null
    }
    return passenger.transporter
}