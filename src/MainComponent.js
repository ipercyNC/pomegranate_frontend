import React, { useState } from "react";
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';


function MainComponent() {
    const [users, setUsers] = useState([{ 'email': 'ianpercyor@gmail.com' }]);
    // function load() {
    //     console.log("loading")
    //     axios.get("http://localhost:3001/load", { crossdomain: true }).then(response => {
    //         console.log(response)
    //         setUsers(response.data);
    //     });
    // }
    // load()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div" style={{ flexGrow: 1 }}>
                        Pomegranate
                    </Typography>
                    <Typography variant="h8" color="inherit" component="div">
                        ianpercyor@gmail.com
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                NW Natural
                            </Typography>
                            <Typography variant="h5" component="div">
                                Status: Awaiting payment
                            </Typography>
                            <Typography variant="body2">
                                Payment Due: $25
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Pay Bill</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                Clark Public Utilities
                            </Typography>
                            <Typography variant="h5" component="div">
                                Status: Up To Date
                            </Typography>
                            <Typography variant="body2">
                                Payment Due: $0
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Pay Bill</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Box>

    )
}
export default MainComponent;