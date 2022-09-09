import { createSlice } from '@reduxjs/toolkit'
import axios from "axios"

export const authSlice = createSlice({
    name: 'counter',
    initialState: {
        connectedUser: '',
        connectedAccounts: [],
        calendarEvents: []
    },
    reducers: {
        login: (state, action) => {
            state.connectedUser = action.payload
        },
        populateAccounts: (state, action) => {
            state.connectedAccounts = action.payload
        },
        populateCalendarEvents: (state, action) => {
            state.calendarEvents = action.payload
        }
    }
})

export const { login, populateAccounts, populateCalendarEvents } = authSlice.actions

export default authSlice.reducer

const url = "/auth"

export const loginUser = () => (dispatch) => {
    const requestOptions = {
        method: 'POST',
        crossDomain: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "username": "ipercy",
            "password": "testing"
        })

    }
    return (
        fetch("http://localhost:3001/login", requestOptions)
        .then(response => {
            return response.json()
        })
        .then(response => {
            dispatch(login("ipercy"))
        })
    )
}

export const loadAllAccounts = () => (dispatch) => {
    const requestOptions = {
        method: 'POST',
        crossDomain: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "username": "ipercy"
        })

    }
    return (
        fetch("http://localhost:3001/loadAllAccounts", requestOptions)
        .then(response => {
            return response.json()
        })
        .then(response => {
            dispatch(populateAccounts(response["results"]))
        })
    )
}

export const loadAllCalendarEvents = async () => (dispatch) => {
    const requestOptions = {
        method: 'POST',
        crossDomain: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "username": "ipercy"
        })

    }
    return (
        fetch("http://localhost:3001/loadAllCalendarEvents", requestOptions)
        .then(response => {
            return response.json()
        })
        .then(response => {
            dispatch(populateCalendarEvents(response["results"]))
            return new Promise( (resolve, reject) => {

                let name = 'Paul'
        
                if (name === 'Paul') {
                   resolve("Promise resolved successfully");
                }
                else {
                   reject(Error("Promise rejected"));
                }
             });
        })
    )

}

export const refreshAllAccounts= () => (dispatch) =>  {
    const requestOptions = {
        method: 'POST',
        crossDomain: true,
        headers: { 'Content-Type': 'application/json' }
    }
    return (
        fetch("http://localhost:3001/connect", requestOptions)
        .then(response => {
            return response.json()
        })
        .then(response => {
            dispatch(loadAllAccounts())
        })
    )
}
