import React from 'react';
import './Welcome.css';
import {Link} from 'wouter';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Divider,
    Container,
    Grid,
    Button} from '@material-ui/core/';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    margin: {
        margin: theme.spacing(1),
    },
    grid: {
        margin: "5px",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

export default function Welcome() {
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={`welcomeContainer`}>
            <Grid container spacing={3} className={classes.grid}>
                <Grid container item xs={12} md={6} sm={12} direction="column" justify="space-between" alignItems="stretch" >
                    <Typography variant="h3" align="left" gutterBottom>
                        Your tool to automatize creation of curriculums vitae
                        <Divider />
                    </Typography>
                    
                    <Typography variant="h6" align="left" >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus molestiae dicta cumque unde corrupti deserunt dignissimos cupiditate. Nihil in placeat corrupti earum cumque debitis fugit iure. Enim hic quaerat illum.
                    </Typography>
                    <div>
                        <Link to="/login">
                            <Button className={classes.margin} size="large" variant="contained" color="primary" href="/login">
                                Login
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button className={classes.margin} size="large" variant="contained" color="primary" href="/register">
                                Register
                            </Button>
                        </Link>
                    </div>
                </Grid>
                <Grid item xs={12} md={6} sm={12}>
                    <img style={{maxWidth: "100%"}} width="auto" src="http://localhost:5000/images/wp_cv.jpg" alt=""/>
                    <Typography variant="h6" align="left" >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus molestiae dicta cumque unde corrupti deserunt dignissimos cupiditate. Nihil in placeat corrupti earum cumque debitis fugit iure. Enim hic quaerat illum.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}