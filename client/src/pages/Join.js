import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { default as socket } from "../components/ws";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Axios from "axios";

const Join = () => {
  const [nickname, setNickname] = useState("");
  //const [position, setPosition] = useState("");
  const history = useHistory();
  const handleOnClick = () => history.push(`/chat/${nickname}`);

  useEffect(() => {
    localStorage.setItem("chatConnected", "true");
  }, []);

  const submitNickname = () => {
    socket.emit("user nickname", nickname);
  };
  const [nicknameList, setNicknameList] = useState([]);
  const addNickname = () => {
    Axios.post("http://localhost:3001/create", {
      nickname: nickname,
    }).then(() => {
      setNicknameList([
        ...nicknameList,
        {
          nickname: nickname,
        },
      ]);
    });
  };

  return (
    <div className='App'>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant='h2' gutterBottom component='div'>
          Chat with Us
        </Typography>

        <div>
          <input
            type='text'
            fullWidth
            placeholder='Username'
            onChange={(e) => setNickname(e.target.value)}
          />
          {/* <input
            type='text'
            fullWidth
            placeholder='S or C'
            onChange={(e) => setPosition(e.target.value)}
          /> */}

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 6, mb: 1 }}
            onClick={() => {
              addNickname();
              submitNickname();
              handleOnClick();
            }}
          >
            Join
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Join;
