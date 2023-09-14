import { Box, BoxProps, Button, Card, Typography, styled, useTheme } from '@mui/material'
import React from 'react'
import { useAuthContext } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled(Card)(({ theme }) => ({
  height: 'max-content',
  width: 'max-content',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'start',
  gap: '1rem',
  padding: '2rem 1.5rem',
  borderRadius: '1rem',
}));

const Homepage: React.FC<BoxProps> = ({ ...props }) => {

  const navigate = useNavigate();

  const { token, user, logout } = useAuthContext();

  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const theme = useTheme();

  return (
    <Box {...props} >
      <Wrapper elevation={5}>
        <Typography variant="h2" alignSelf='center' mb='1rem' >Welcome Home!</Typography>
        <Box display='inline-flex'>
          <Typography variant="h5" mr='0.5rem'>Logged in as:</Typography>
          <Typography variant="h5" color={theme.palette.success.dark}>
            {user}
          </Typography>
        </Box>
        <Box display='inline-flex'>
          <Typography variant="h5" mr='0.5rem'>Your token is:</Typography>
          <Typography variant="h5" color={theme.palette.error.dark}>
            *****{token?.slice(-5)}
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => logout()}
          sx={{ alignSelf: 'center', mt: '1rem' }}
        >
          Logout
        </Button>
      </Wrapper>
    </Box>
  )
}

export default styled(Homepage)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100dvh',
  width: '100dvw',
}))