import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useEffect } from 'react';
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useStateContext } from '@src/context/state';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Paper, Avatar } from '@material-ui/core';

interface HomeProps {
  token?: string;
  firstName?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Home: NextPage<HomeProps> = ({ token, firstName }) => {
  const router = useRouter();
  const classes = useStyles();
  const { setName, setToken } = useStateContext();

  useEffect(() => {
    if(token && firstName) {
      setToken(token);
      setName(firstName);
      router.push(`/${firstName}/vocab`);
    }
  }, []);

  function login() {
    window.location.assign('http://soaring-backend.localhost/v1/auth/login');
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Soaring Vocab
          </Typography>
          <Button
            fullWidth
            type="submit"
            color="primary"
            variant="contained"
            className={classes.submit}
            onClick={login}
          >
            Sign In with Google
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}

Home.getInitialProps = ({ query }) => ({
  token: query?.token as string,
  firstName: query?.firstName as string
});

export default Home;
