import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'counter',
    initialState: {
        connectedUser: '',
        authToken: '',
        connectedAccounts: [],
        calendarEvents: []
    },
    reducers: {
        login: (state, action) => {
            state.connectedUser = action.payload
        },
        setConnectedUser: (state, action) => {
            state.connectedUser = action.payload
        },
        populateAccounts: (state, action) => {
            state.connectedAccounts = action.payload
        },
        setAuthToken: (state, action) => {
            state.authToken = action.payload
        },
        populateCalendarEvents: (state, action) => {
            state.calendarEvents = action.payload
        }
    }
})

export const { login, setAuthToken, setConnectedUser, populateAccounts, populateCalendarEvents } = authSlice.actions

export default authSlice.reducer

// const url = "/auth"

export const loginUser = (username, password) => (dispatch) => {
    //ipercy,testing
    console.log(username, password)
    const requestOptions = {
        method: 'POST',
        crossDomain: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "username": username,
            "password": password
        })

    }
    return (
        fetch("http://localhost:3001/login", requestOptions)
            .then(response => {
                return response.json()
            })
            .then(response => {
                if (response['LoginResult'] === 'Success') {
                    dispatch(login(username))
                    console.log(response['authToken'])
                    localStorage.setItem('authToken', response['authToken'])
                    console.log("Login success")
                    return true
                } else {
                    console.log("Login failed")
                    return false
                }

            })
    )
}
export const createEvent = (date_, event, username) => (dispatch) => {
    console.log(date_, event, username)
    const requestOptions = {
        method: 'POST',
        crossDomain: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "dateValue": date_,
            "eventValue": event,
            "username": username
        })
    }
    return (
        fetch("http://localhost:3001/createEvent", requestOptions)
            .then(response => {
                return response.json()
            })
            .then(response => {
                console.log("response", response)
            })
    )
}
export const loadAllAccounts = (username) => (dispatch) => {
    const requestOptions = {
        method: 'POST',
        crossDomain: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "username": username
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

export const loadAllCalendarEvents = () => (dispatch) => {
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

            })
    )

}

export const refreshAllAccounts = () => (dispatch) => {
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
export const verifyToken = (token) => (dispatch) => {
    const requestOptions = {
        method: 'POST',
        crossDomain: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "authToken": token
        })

    }
    return (
        fetch("http://localhost:3001/verifyToken", requestOptions)
            .then(response => {
                return response.json()
            })
    )
}

