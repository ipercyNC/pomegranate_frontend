import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from "@material-ui/core/TextField";
import { connect, useSelector, useDispactch, useDispatch } from 'react-redux'
import { isEmpty } from "lodash"
import { Calendar } from 'react-calendar'
import './calendar.css'
import moment from 'moment'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { withStyles, createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { login, loginUser, loadAllCalendarEvents } from '../auth/authSlice'


const styles = theme => ({
    input: {
        margin: theme.spacing(1),
        height: 38
    }
})

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
   async componentDidUpdate() {
        if (this.props.connectedUser == undefined || this.props.connectedUser == "") {
            console.log("Logging in user")
            this.props.loginUser()
        }

        if (isEmpty(this.props.calendarEvents)) {
            console.log("Loading Calendar events")
            this.props.loadAllCalendarEvents()
            console.log(this.props.calendarEvents)

        }
        console.log("User connected:", this.props.connectedUser)
        console.log("Loaded events:", this.props.calendarEvents)
        // Object.entries(this.state.calendarEvents).map(([key, value]) => {
        //     console.log(key,value)
        // })
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
        connectedUser: state.auth.connectedUser,
        calendarEvents: state.auth.calendarEvents
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: () => dispatch(loginUser()),
        loadAllCalendarEvents: () => dispatch(loadAllCalendarEvents())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CalendarComponent));