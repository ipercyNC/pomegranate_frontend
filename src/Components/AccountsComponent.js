import React from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import { connect } from 'react-redux'
import { loadAllAccounts, refreshAllAccounts } from '../auth/authSlice'
import { isEmpty } from "lodash"


class AccountsComponent extends React.Component {

    componentDidMount() {
        if (isEmpty(this.props.connectedAccounts)) {
            console.log("Connecting accounts")
            console.log(this.props.connectedUser)
            this.props.loadAllAccounts(this.props.connectedUser)
        }
    }

    componentDidUpdate() {
        if (isEmpty(this.props.connectedAccounts)) {
            console.log("Connecting accounts")
            console.log(this.props.connectedUser)
            this.props.loadAllAccounts(this.props.connectedUser)
        }
        console.log("User connected:", this.props.connectedUser)
        console.log("Auth token: ", this.props.authToken)
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
        authToken: state.auth.authToken,
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