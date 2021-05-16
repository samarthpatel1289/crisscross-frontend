import React, { useState } from "react";
import axios from "./axios";
import {useHistory} from "react-router-dom"
import styles from "./form.module.css";


export const Home = () => {
    const history = useHistory()
  const [userName, setUserName] = useState("");
  const handleChange = (e) => {
    setUserName(e.target.value);
    localStorage.setItem("name", e.target.value);
  };
  const handleSubmit = () => {
      // api 
      axios.post(
          "crisscross/",
          {
            user_name : userName
          }
      ).then((response) => {
        console.log("Response",response)
        localStorage.setItem("user",response.data.data.user_id)
        axios.post(`/crisscross/${response.data.data.user_id}/game/`).then((response) => {
            localStorage.setItem("game_id", response.data.data.game_id)
          }).catch((err) => {
              console.log("err",err)
          })
        history.push('/game')
      }).catch((err)=>{
          console.log("err",err)
      })
  }
  return (
    <>
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Enter Name"
        value={userName}
        onChange={(e) => handleChange(e)}
      ></input>
    </div>
    <div className={styles.container}>
      <button type="submit" onClick = {() => handleSubmit()} >Start Game</button>
    </div>
    </>
  );
};
