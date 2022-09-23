import React from "react";
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import { connect } from 'react-redux'
import { loginUser, verifyToken } from '../auth/authSlice'
import Button from '@mui/material/Button';
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
    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin()
          }
    }
    async handleLogin() {
        if (this.props.connectedUser === undefined || this.props.connectedUser === "") {
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
                        <FormControl variant="standard" onKeyPress={this.handleKeyDown.bind(this)}>
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
                            <Button variant="contained" sx={{ margin: 2 }} onKeyDown={this.handleKeyDown.bind(this)} onClick={this.handleLogin.bind(this)}>Login</Button>

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