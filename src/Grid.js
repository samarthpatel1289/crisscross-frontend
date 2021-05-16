import React, { useState, useEffect } from "react";
import styles from "./grid.module.css";
import Circle from "./Circle-png.png";
import Cross from "./Cross-png.png";
import axios from "./axios";

export default function Grid() {
  const [imageArray, setImageArray] = useState([
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
  ]);
  const [counter, setcounter] = useState(0);
  const [checkArray, setCheckArray] = useState(false);
  const [Winner, setWinner] = useState("");

  useEffect(() => {
    if (checkArray) {
      if (Winner === "1") {
        alert("You are Winner!!");
      } else if (Winner === "-1") {
        alert("You loose");
      } else if (Winner === "0") {
        alert("Draw Match");
      }
    }
  }, [checkArray, Winner]);

  console.log("winner", Winner, checkArray);
  useEffect(() => {
    setCheckArray(true)
  }, [imageArray]);

  useEffect(() => {
    if (Winner === "") {
      axios
        .put(`/crisscross/game/${localStorage.getItem("game_id")}/`, {
          game_board: imageArray,
        })
        .then(async (response) => {
          await setWinner(response.data.data?.winner ?? "");
          if (!response.data.data?.winner) {
            await setImageArray(response.data.data.game_board);
          } else if (response.data.data?.winner === "-1") {
            await setImageArray(response.data.data.game_board);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [counter, Winner]);

  const handleGame = () => {
    axios
      .post(`/crisscross/${localStorage.getItem("user")}/game/`)
      .then((response) => {
        localStorage.setItem("game_id", response.data.data.game_id);
        setImageArray(["0", "0", "0", "0", "0", "0", "0", "0", "0"]);
        setcounter(0);
        setWinner("");
        setCheckArray(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleCounter = (key) => {
    setCheckArray(false);
    const temp = [...imageArray];
    console.log("key", key);
    if (temp[key] === "0") {
      if (counter < 9) {
        // if (counter % 2 === 0) {
        //   temp[key] = "-1";
        // } else {
        // }
        temp[key] = "1";
        setImageArray(temp);

        setcounter(counter + 1);
      }
    }
  };
  console.log(imageArray);
  return (
    <>
      <h1 className={styles.name}> Welcome {localStorage.getItem("name")} </h1>
      <div className={styles.container}>
        {imageArray.map((itm, key1) => (
          <>
            <div onClick={() => handleCounter(key1)}>
              <img
                src={
                  imageArray[key1] !== "0"
                    ? imageArray[key1] === "-1"
                      ? Circle
                      : Cross
                    : ""
                }
                style={{ objectFit: "contain", width: "100%" }}
              />
            </div>
          </>
        ))}
      </div>
      <div className={styles.button_container}>
        <button onClick={() => handleGame()}>Try Again</button>
        </div>
      
    </>
  );
}
