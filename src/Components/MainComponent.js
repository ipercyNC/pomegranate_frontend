import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Menu } from '@material-ui/core';
import MuiMenuItem from "@material-ui/core/MenuItem"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { connect, useSelector, useDispactch, useDispatch } from 'react-redux'
import { login, loginUser, loadAllAccounts, refreshAllAccounts } from '../auth/authSlice'
import { isEmpty } from "lodash"
import AccountsComponent from './AccountsComponent'
import CalendarComponent from './CalendarComponent'
import LoginForm from './LoginForm'
import HeaderBar from "./HeaderBar";
import styled from "styled-components";
const MenuItem = styled(MuiMenuItem)`
  justify-content: flex-end;
`;

class MainComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currentComponent: "main",
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

    render() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                {!this.props.connectedUser ?
                    <LoginForm />
                    :
                    <div>
                        <HeaderBar handleClick={this.handleClick} />
                        {this.state.currentComponent === "main" && <AccountsComponent />}
                        {this.state.currentComponent === "calendar" && <CalendarComponent />}
                    </div>
                }

            </Box >

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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);