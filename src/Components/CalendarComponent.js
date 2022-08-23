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
import { Calendar } from 'react-calendar'
import globalize from 'globalize'
import './calendar.css'
import moment from 'moment'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { withStyles, createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { isThisMonth } from "date-fns";



const styles = theme => ({
    input: {
        margin: theme.spacing(1),
        height: 38
    }
})
class ItemRenderer {

    render() {
        console.log("hey!")
        // Access the items array using the "data" prop:
        const item = this.props.data[this.props.index];
        console.log(item)
        return (
            <div style={this.props.style}>
                {item.name}
            </div>
        );
    }
}
function getNumberOfDays(start, end) {
    // Copied from https://stackabuse.com/javascript-get-number-of-days-between-dates/
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
}

class CalendarComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: new Date(),
            datePickerValue: new Date(),
            textFieldValue: "",
            events: {
                '2022-08-28': ["Get Diapers"],
                '2022-08-30': ["Change Oil"],
                '2022-09-01': ["Order Formula"]

            },
            selectedEvents: [],
            nextThirtyDays: []
        }
    }
    handleDateChange(eventTarget) {
        var tempList = {}
        for (var date in this.state.events) {
            var dateFormatted = new Date(date + 'T00:00:00')
            const daysBetweenDates = getNumberOfDays(eventTarget, dateFormatted);
            if (daysBetweenDates > 0 && daysBetweenDates < 30) {
                tempList[date] = this.state.events[date]
            }
        }

        this.setState({
            value: eventTarget,

            selectedEvents: this.state.events[moment(eventTarget).format("YYYY-MM-DD")],
            nextThirtyDays: tempList
        })
    }
    handleDatePickerChange(eventTarget) {
        this.setState({
            datePickerValue: eventTarget
        })
    }
    handleTextFieldChange(eventTarget) {
        this.setState({
            textFieldValue: eventTarget.target.value
        })
    }
    addNote() {
        console.log("hey")
        console.log(this.state.datePickerValue, this.state.textFieldValue)
    }
    

    componentDidMount() {
        this.handleDateChange(this.state.value)
    }
    render() {
        const { classes } = this.props;
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ padding: 10 }}>
                    <Grid container spacing={12}>
                        <Grid item xs={12} align="center">
                            <Calendar onChange={e => this.handleDateChange(e)} value={this.state.value} />
                            <Typography align="center" variant={'h6'} gutterBottom padding={1}>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Add event" 
                                    variant="outlined" 
                                    InputProps={{
                                        className: classes.input
                                    }}
                                    InputLabelProps={{
                                        // shrink: true
                                    }}
                                    value={this.state.textFieldValue}
                                    onChange={(e) => this.handleTextFieldChange(e)}
                                />
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        label="Event Date"
                                        inputFormat="MM/dd/yyyy"
                                        value={this.state.datePickerValue}
                                        onChange={e => this.handleDatePickerChange(e)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <Button className={classes.input} variant="contained" onClick={this.addNote.bind(this)}>Add Todo</Button>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h5" align="center">
                                Today
                            </Typography>
                            <List dense={true}
                                height={300}
                                sx={{
                                    width: '100%',
                                    bgcolor: 'background.paper',
                                    overflow: 'auto',
                                    maxHeight: 200,

                                }}>
                                {this.state.selectedEvents ?
                                    this.state.selectedEvents.map((d, i) => {
                                        return <ListItem key={i}>
                                            <ListItemText
                                                align="center"
                                                primary={moment(this.state.value).format("YYYY-MM-DD")}
                                                secondary={d}
                                            />
                                        </ListItem>
                                    })
                                    :
                                    <ListItem key={1}>
                                        <ListItemText
                                            align="center"
                                            primary={"No events for Today"}
                                        />
                                    </ListItem>

                                }
                            </List>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h5" align="center">
                                Next 30 days
                            </Typography>

                            <List dense={true}
                                height={300}
                                sx={{
                                    width: '100%',
                                    bgcolor: 'background.paper',
                                    overflow: 'auto',
                                    maxHeight: 200,

                                }}>
                                {this.state.nextThirtyDays && Object.keys(this.state.nextThirtyDays).length > 0 ?
                                    Object.entries(this.state.nextThirtyDays).map(([key, value]) => {
                                        return value.map((d, i) => {
                                            return <ListItem key={d}>
                                                <ListItemText
                                                    align="center"
                                                    primary={key}
                                                    secondary={d}
                                                />
                                            </ListItem>
                                        })

                                    }) :
                                    <ListItem key={1}>
                                        <ListItemText
                                            align="center"
                                            primary={"No events for next 30 days"}
                                        />
                                    </ListItem>
                                }
                            </List>

                        </Grid>
                    </Grid>
                </div>

            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CalendarComponent));