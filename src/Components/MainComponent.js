import React from "react";
import Box from '@mui/material/Box';
import { connect } from 'react-redux'
import { setAuthToken, setConnectedUser, verifyToken } from '../auth/authSlice'
import AccountsComponent from './AccountsComponent'
import CalendarComponent from './CalendarComponent'
import LoginForm from './LoginForm'
import HeaderBar from "./HeaderBar";

class MainComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currentComponent: "main"
        }

    }
    handleClick = (e) => {

        console.log(e)
        if (e === 1) {
            this.setState({ currentComponent: "main" })
        }
        if (e === 2) {
            this.setState({ currentComponent: "calendar" })
        }
    }
    async componentDidUpdate() {

        if (!this.props.authToken){
            var token = localStorage.getItem('authToken')
            if (token) {
                this.props.setAuthToken(token)
                var res = await this.props.verifyToken(token)
                console.log(res)
                console.log(res['VerifiedUser'])
                if (res['VerifiedUser']){
                    console.log("okay", this.props.setConnectedUser(res['VerifiedUser']))
                }
            }
        }
    }
    async componentDidMount() {
        console.log("here")
        if (!this.props.authToken){
            var token = localStorage.getItem('authToken')
            if (token) {
                this.props.setAuthToken(token)
                var res = await this.props.verifyToken(token)
                console.log(res)
                console.log(res['VerifiedUser'])
                if (res['VerifiedUser']){
                    console.log("okay", this.props.setConnectedUser(res['VerifiedUser']))
                }
            }
            
        }
    }

    render() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                {this.props.connectedUser || this.props.authToken ?

                    <div>
                        <HeaderBar handleClick={this.handleClick} />
                        {this.state.currentComponent === "main" && <AccountsComponent />}
                        {this.state.currentComponent === "calendar" && <CalendarComponent />}
                    </div>
                    :
                    <LoginForm />
                }

            </Box >

        )
    }
}
const mapStateToProps = state => {
    return {
        connectedUser: state.auth.connectedUser,
        authToken: state.auth.authToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setConnectedUser: (user) => dispatch(setConnectedUser(user)),
        setAuthToken: (authToken) => dispatch(setAuthToken(authToken)),
        verifyToken: (token) => dispatch(verifyToken(token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);