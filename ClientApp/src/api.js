import $axios from './axios'
import {toast} from 'react-toastify'
import qs from 'qs'

export const GetAllPassengers = async () => {
    try {
        let response = await $axios.get('/Passengers')
        return response.data
    } catch (e) {
        console.error(e)
        toast.error(`Could not retrieve passengers. Check console log.`)
    }
    return false
}

export const GetPassenger = async (id) => {
    try {
        let response = await $axios.get(`/Passengers/${id}`)
        return response.data
    } catch (e) {
        console.error(e)
        toast.error(`Could not retrieve passenger with id of '${id}'. Check console log.`)
    }
    return false
}

export const CreatePassenger = async (passenger) => {
    try {
        let response = await $axios.post(`/Passengers`, qs.stringify(passenger))
        toast.success("Passenger Created Successfully!");
        return response.data
    } catch (e) {
        console.error(e)
        toast.error(`Could not create passenger. Check Logs`)
    }
    return false
}

export const DeletePassenger = async (id) => {
    try {
        let response = await $axios.delete(`/Passengers/${id}`)
        toast.success("Passenger Deleted Successfully!");
        return response.data
    } catch (e) {
        console.error(e)
        toast.error(`Could not delete passenger. Check Logs`)
    }
    return false
}

export const UpdatePassenger = async (id, passenger) => {
    try {
        await $axios.put(`/Passengers/${id}`, qs.stringify(passenger))
        toast.success("Updated Successfully");
        return passenger
    } catch (e) {
        console.error(e)
        toast.error(`Could not retrieve passenger with id of '${id}'. Check console log.`)
    }

    return false
}


export const GetAllTransporters = async () => {
    try {
        let response = await $axios.get('/Transporters')
        return response.data
    } catch (e) {
        console.error(e)
        toast.error(`Could not retrieve transporters. Check console log.`)
    }
    return false
}


export const GetTransporter = async (id) => {
    try {
        let response = await $axios.get(`/Transporters/${id}`)
        return response.data
    } catch (e) {
        console.error(e)
        toast.error(`Could not retrieve transporter with id of '${id}'. Check console log.`)
    }
    return false
}

export const GetTransporterPassengers = async (id) => {
    try {
        let response = await $axios.get(`/Transporters/${id}/passengers`)
        return response.data
    } catch (e) {
        console.error(e)
        toast.error(`Could not retrieve passengers for transporter with id of '${id}'. Check console log.`)
    }
    return false
}


export const UpdateTransporter = async (id, transporter) => {
    try {
        await $axios.put(`/Transporters/${id}`, qs.stringify(transporter))
        toast.success("Updated Successfully");
        return transporter
    } catch (e) {
        console.error(e)
        toast.error(`Could not retrieve passenger with id of '${id}'. Check console log.`)
    }
    return false
}


export const CreateTransporter = async (transporter) => {
    try {
        let response = await $axios.post(`/Transporters`, qs.stringify(transporter))
        toast.success("Transporter Created Successfully!");
        return response.data
    } catch (e) {
        console.error(e)
        toast.error(`Could not create Transporter. Check Logs`)
    }
    return false
}

export const DeleteTransporter = async (id) => {
    try {
        let response = await $axios.delete(`/Transporters/${id}`)
        toast.success("Transporter Deleted Successfully!");
        return response.data
    } catch (e) {
        console.error(e)
        toast.error(`Could not delete transporter. Check Logs`)
    }
    return false
}
