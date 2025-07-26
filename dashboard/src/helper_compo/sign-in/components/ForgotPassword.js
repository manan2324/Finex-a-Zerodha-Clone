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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://finex-backend.onrender.com/forgot-password", { email });
      setStep(2);
      setMessage("Code sent to your email.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending code.");
    }
    setLoading(false);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("https://finex-backend.onrender.com/verify-code", { email, code });
      setStep(3);
      setCode('');
      setMessage(data.message || "Code verified successfully.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error verifying code.");
    }
    setLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://finex-backend.onrender.com/reset-password", { email, newPassword });
      setMessage("Password reset successful.");
      setTimeout(() => {
        setStep(1);
        setEmail('');
        setCode('');
        setNewPassword('');
        setMessage('');
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
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        {step === 1 && (
          <>
            <DialogContentText>
              Enter your account&apos;s email address, and we&apos;ll send you a 4-digit code to reset your password.
            </DialogContentText>
            <OutlinedInput
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              label="Email address"
              placeholder="Email address"
              type="email"
              fullWidth
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {message && <span style={{ color: "red" }}>{message}</span>}
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
              margin="dense"
              id="code"
              name="code"
              label="Code"
              placeholder="4-digit code"
              type="text"
              fullWidth
              value={code}
              onChange={e => setCode(e.target.value)}
            />
            {message && <span style={{ color: "red" }}>{message}</span>}
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
              margin="dense"
              id="newPassword"
              name="newPassword"
              label="New Password"
              placeholder="New Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide the password' : 'display the password'
                    }
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
            {message && <span style={{ color: "green" }}>{message}</span>}
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        {step === 1 && (
          <Button color='primary' variant="contained" type="submit" onClick={handleSendCode}>
            Send Code
            {loading && <CircularProgress size={24} color='inherit' sx={{ ml: 1 }} />}
          </Button>
        )}
        {step === 2 && (
          <Button variant="contained" type="submit" onClick={handleVerifyCode}>
            Verify Code
            {loading && <CircularProgress size={24} color='inherit' sx={{ ml: 1 }} />}
          </Button>
        )}
        {step === 3 && (
          <Button variant="contained" type="submit" onClick={handleResetPassword}>
            Reset Password
            {loading && <CircularProgress size={24} color='inherit' sx={{ ml: 1 }} />}
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
