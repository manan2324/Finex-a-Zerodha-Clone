import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function ForgotPassword({ open, handleClose }) {
  const [step, setStep] = React.useState(1);
  const [email, setEmail] = React.useState('');
  const [code, setCode] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  const handleSendCode = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/forgot-password`, { email });
      setMessage("Code sent to your email.");
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending code.");
    }
    setLoading(false);
  };

  const handleVerifyCode = async () => {
    if (!code || code.length !== 4) {
      setMessage("Please enter a 4-digit code.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/verify-code`, { email, code });
      setMessage(data.message || "Code verified successfully.");
      setStep(3);
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid or expired code.");
    }
    setLoading(false);
  };

  const handleResetPassword = async (e) => {
    if (!newPassword || newPassword.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/reset-password`, { email, newPassword });
      setMessage("Password reset successful.");
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error resetting password.");
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (!open) {
      setStep(1);
      setEmail('');
      setCode('');
      setNewPassword('');
      setMessage('');
      setLoading(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        {step === 1 && (
          <>
            <DialogContentText>
              Enter your registered email. We'll send a 4-digit code to reset your password.
            </DialogContentText>
            <OutlinedInput
              autoFocus
              required
              id="email"
              type="email"
              placeholder="Email address"
              fullWidth
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </>
        )}

        {step === 2 && (
          <>
            <DialogContentText>
              Enter the 4-digit code sent to your email.
            </DialogContentText>
            <OutlinedInput
              autoFocus
              required
              id="code"
              type="text"
              placeholder="4-digit code"
              fullWidth
              value={code}
              onChange={e => setCode(e.target.value)}
            />
          </>
        )}

        {step === 3 && (
          <>
            <DialogContentText>
              Enter your new password.
            </DialogContentText>
            <OutlinedInput
              autoFocus
              required
              id="newPassword"
              placeholder="New password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </>
        )}

        {message && (
          <span style={{ color: step === 3 ? "green" : "red", marginTop: 8 }}>
            {message}
          </span>
        )}
      </DialogContent>

      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>

        {step === 1 && (
          <Button variant="contained" onClick={handleSendCode} disabled={loading}>
            Send Code
            {loading && <CircularProgress size={20} sx={{ ml: 1 }} />}
          </Button>
        )}
        {step === 2 && (
          <Button variant="contained" onClick={handleVerifyCode} disabled={loading}>
            Verify
            {loading && <CircularProgress size={20} sx={{ ml: 1 }} />}
          </Button>
        )}
        {step === 3 && (
          <Button variant="contained" onClick={handleResetPassword} disabled={loading}>
            Reset
            {loading && <CircularProgress size={20} sx={{ ml: 1 }} />}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
