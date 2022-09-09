import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Menu, MenuItem } from '@material-ui/core';
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


class AccountsComponent extends React.Component {

    constructor(props) {
        super(props)
    }


    componentDidMount() {
        if (isEmpty(this.props.connectedAccounts)) {
            console.log("Connecting accounts")
            console.log(this.props.connectedUser)
            this.props.loadAllAccounts(this.props.connectedUser)

        }
        console.log("User connected:", this.props.connectedUser)
        console.log("Connected accounts:", this.props.connectedAccounts)
    }

    refreshAllAccounts() {
        console.log("Refreshing Accounts")
        this.props.refreshAllAccounts()
        this.props.loadAllAccounts(this.props.connectedUser)
    }

    render() {
        return (
            <div>
                <Button style={{margin: 4 }} onClick={() => this.refreshAllAccounts()} variant="contained">Refresh</Button>
                {this.props.connectedAccounts.map((data, idx) => {
                    return <Grid key={idx} container spacing={4}>
                        <Grid item xs={4}>
                            <Card sx={{ margin: 1, minWidth: 275, borderRadius: '4px', border: 1, borderBottom:0, borderColor: 'grey.500' }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                        {data.account_name}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {data.status}
                                    </Typography>
                                    <Typography variant="body2">
                                        Payment Due: $ {data.amount_remaining}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {/* <Button size="small">Pay Bill</Button> */}
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                })}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        connectedUser: state.auth.connectedUser,
        connectedAccounts: state.auth.connectedAccounts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadAllAccounts: (username) => dispatch(loadAllAccounts(username)),
        refreshAllAccounts: () => dispatch(refreshAllAccounts())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountsComponent);