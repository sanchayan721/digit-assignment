import { Box, BoxProps, Button, Card, CardProps, TextField, Typography, styled } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../providers/AuthProvider';

type RegisterFormProps = CardProps & {
  children: React.ReactNode;
  component?: React.ElementType;
};

const RegisterForm = styled(Card)<RegisterFormProps>(({ theme }) => ({
  color: theme.palette.text.primary,
  minWidth: '25rem',
  width: 'max-content',
  height: 'max-content',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1.5rem 1rem',
}));

const Register: React.FC<BoxProps> = ({ ...props }) => {

  const [formState, setFormState] = React.useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const [authError, setAuthError] = React.useState('');
  const { setIsAuthenticated, setToken, setUser, setIsLoading } = useAuthContext();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (formState.username === '' || formState.password === '' || formState.confirmPassword === '') {
      setAuthError('Please fill out all fields');
      return;
    };

    if (formState.password.length < 3) {
      setAuthError('Password must be at least 3 characters');
      return;
    };

    if (formState.password !== formState.confirmPassword) {
      setAuthError('Passwords do not match');
      return;
    };

    setIsLoading?.(true);
    try {
      const response = await fetch('http://localhost:3030/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });

      // recieve token from server or error message if login failed
      const { token, message, username } = await response.json();

      if (token) {
        setIsAuthenticated?.(true);
        setToken?.(token);
        setUser?.(username);
        setAuthError('');
        navigate('/', { replace: true });
      } else {
        setAuthError(message);
      }
      setIsLoading?.(false);
    } catch (err) { setIsLoading?.(false) }
  }

  return (
    <Box {...props}>
      <RegisterForm elevation={5} component="form">
        <Typography variant='h2' mb="1rem">Register</Typography>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={formState.username}
          onChange={(e) => setFormState({ ...formState, username: e.target.value })}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          value={formState.password}
          onChange={(e) => setFormState({ ...formState, password: e.target.value })}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          variant="outlined"
          type="text"
          value={formState.confirmPassword}
          onChange={(e) => setFormState({ ...formState, confirmPassword: e.target.value })}
        />
        <Box
          sx={{
            height: 'max-content',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            position: 'relative',
            mt: '1rem'
          }}
        >
          <Typography
            variant="body2"
            color="error"
            position="absolute"
            left="1rem"
          >
            {authError}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
        <Typography variant="body2" mt="0.5rem">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </RegisterForm>
    </Box>


  )
}

export default styled(Register)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  width: '100dvw',
  height: '100dvh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1.5rem 1rem',
}));