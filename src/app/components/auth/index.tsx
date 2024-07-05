import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Box, Button, Fab, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { Messages } from "../../../lib/config";
import { T } from "../../../lib/types/common";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import MemberService from "../../services/MemberService";
import { MemberGender } from "../../../lib/enums/member.enum";
import { useGlobals } from "../../hooks/useGlobals";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
}));

const ModalImg = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  margin-top: 9px;
  margin-left: 10px;
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
  setSignupOpen: (isOpen: boolean) => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose, setSignupOpen } = props;
  const classes = useStyles();

  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const [memberGender, setMemberGender] = useState<MemberGender>(MemberGender.WOMEN);
  const { setAuthMember } = useGlobals();

  /** HANDLERS **/

  const handleUsername = (e: T) => {
    setMemberNick(e.target.value);
  };

  const handlePhone = (e: T) => {
    setMemberPhone(e.target.value);
  };

  const handlePassword = (e: T) => {
    setMemberPassword(e.target.value);
  };

  const handleMemberGender = (e: T) => {
    setMemberGender(e.target.value);
  };

  const handlePawwrodKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest().then();
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginRequest().then();
    }
  };

  const handleSignupRequest = async () => {
    try {
      console.log("inputs:", memberNick, memberPhone, memberPassword);
      const isFullfill = memberNick !== "" && memberPhone !== "" && memberPassword !== "";
      if (!isFullfill) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick,
        memberPhone,
        memberPassword,
        memberGender,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);

      setAuthMember(result);

      handleSignupClose();
    } catch (err) {
      console.log(err);
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async () => {
    try {
      const isFullfill = memberNick !== "" && memberPassword !== "";
      if (!isFullfill) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick,
        memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);

      // Saving Authenticated user
      setAuthMember(result);

      handleLoginClose();
    } catch (err) {
      console.log(err);
      handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signupOpen}>
          <Stack className={classes.paper} direction={"row"} sx={{ width: "800px" }}>
            <ModalImg src={"/img/login.jpg"} alt='camera' />
            <Stack sx={{ marginLeft: "69px", alignItems: "center" }}>
              <h2>Signup Form</h2>
              <TextField
                sx={{ marginTop: "7px" }}
                id='outlined-basic'
                label='username'
                variant='outlined'
                onChange={handleUsername}
              />
              <TextField
                sx={{ my: "17px" }}
                id='outlined-basic'
                label='phone number'
                variant='outlined'
                onChange={handlePhone}
              />
              <TextField
                id='outlined-basic'
                label='password'
                variant='outlined'
                onChange={handlePassword}
                onKeyDown={handlePawwrodKeyDown}
              />
              <FormControl fullWidth sx={{ marginTop: "20px", border: "none" }}>
                <InputLabel id='demo-simple-select-label'>Gender</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={memberGender}
                  label='Gender'
                  onChange={handleMemberGender}
                >
                  <MenuItem value='WOMEN'>Women</MenuItem>
                  <MenuItem value='MEN'>Men</MenuItem>
                </Select>
              </FormControl>
              <Fab
                sx={{ marginTop: "30px", width: "120px" }}
                variant='extended'
                color='primary'
                onClick={handleSignupRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Signup
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginOpen}>
          <Stack className={classes.paper} direction={"row"} sx={{ width: "700px" }}>
            <Stack>
              <ModalImg style={{ width: "90%" }} src={"/img/login.jpg"} alt='camera' />

              <p style={{ marginLeft: "10px" }}>
                Not registerd yet?{" "}
                <Button
                  variant='contained'
                  color='secondary'
                  size='small'
                  sx={{ borderRadius: "100px" }}
                  onClick={() => {
                    setSignupOpen(true);
                    handleLoginClose();
                  }}
                >
                  Signup
                </Button>
              </p>
            </Stack>
            <Stack
              sx={{
                marginLeft: "40px",
                marginTop: "25px",
                marginRight: "15px",
                alignItems: "center",
              }}
            >
              <h2>Login Form</h2>

              <TextField
                id='outlined-basic'
                label='username'
                variant='outlined'
                sx={{ my: "10px" }}
                onChange={handleUsername}
              />

              <TextField
                id={"outlined-basic"}
                label={"password"}
                variant={"outlined"}
                type={"password"}
                onChange={handlePassword}
                onKeyDown={handlePawwrodKeyDown}
              />

              <Fab
                sx={{ marginTop: "27px", width: "120px" }}
                variant={"extended"}
                color={"primary"}
                onClick={handleLoginRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}
