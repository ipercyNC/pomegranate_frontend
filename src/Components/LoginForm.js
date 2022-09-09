import React, { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import FilledInput from '@mui/material/FilledInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import { connect, useSelector, useDispactch, useDispatch } from 'react-redux'
import { login, loginUser, loadAllCalendarEvents } from '../auth/authSlice'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';



class LoginForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showPassword: false,
            password: '',
            username: ''
        }

    }
    handlePasswordChange = (event) => {
        this.setState({ 'password': event.target.value });
    };
    handleUsernameChange = (event) => {
        this.setState({ 'username': event.target.value });
    };
    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    async handleLogin() {
        if (this.props.connectedUser == undefined || this.props.connectedUser == "") {
            console.log("Logging in user")
            await this.props.loginUser(this.state.username, this.state.password)
        }
    }

    render() {
        return (
            <div>
                <Grid container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '90vh' }}
                >
                    <Typography variant="h1" gutterBottom sx={{ opacity: 0.6 }}>
                        Pomegranate
                    </Typography>
                    <Grid item xs={12}>
                        <FormControl variant="standard">
                            <TextField
                                placeholder="Username"
                                id="standard-start-adornment"
                                variant="standard"
                                value={this.state.username}
                                onChange={(e) => this.handleUsernameChange(e)}
                                sx={{ width: '50ch', margin: 2 }}
                            />
                            <Input
                                id="standard-adornment-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={(e) => this.handlePasswordChange(e)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                        >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                placeholder="Password"
                                sx={{ margin: 2 }}
                            />
                            <Button variant="contained" sx={{ margin: 2 }} onClick={this.handleLogin.bind(this)}>Login</Button>

                        </FormControl>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        connectedUser: state.auth.connectedUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (username, password) => dispatch(loginUser(username, password)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);