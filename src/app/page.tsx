"use client";

import React, { useState, useEffect } from "react";
import Timer from "./components/Timer";
import CustomButton from "./components/CustomButton";

export default function Home() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [isGameStart, setIsGameStart] = useState(true);
  const [playerOneExt, setpOneExt] = useState(true);
  const [playerTwoExt, setpTwoExt] = useState(true);
  const [isP1Turn, setIsP1Turn] = useState(true);

  const gameStart = 45;
  const gameInProgress = 30;

  const [beepSound, setBeepSound] = useState<HTMLAudioElement | null>(null);
  const [lossOfTurnSound, setLossOfTurnSound] =
    useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBeepSound(new Audio("/audio/beep.mp3"));
      setLossOfTurnSound(new Audio("/audio/loss_of_turn.mp3"));
    }
  }, []);

  function startGame() {
    setCounter(gameStart);
    setIsGameStart(true);
    setIsGameOn(true);
    setpOneExt(true);
    setpTwoExt(true);
    setIsP1Turn(true);
  }

  function restartGame() {
    setCounter(gameStart);
    setIsGameOn(false);
  }

  function extension() {
    isP1Turn ? setpOneExt(false) : setpTwoExt(false);
    setCounter(counter + gameInProgress);
  }

  function pushOut() {
    setIsP1Turn(!isP1Turn);
    setCounter(gameInProgress);
    if (isGameStart) {
      setIsGameStart(false);
    }
  }

  function nextTurn() {
    setCounter(gameInProgress);
    setIsP1Turn(!isP1Turn);
    if (isGameStart) {
      setIsGameStart(false);
    }
  }

  function ballPotted() {
    setCounter(gameInProgress);
    if (isGameStart) {
      setIsGameStart(false);
    }
  }

  const [counter, setCounter] = useState(gameStart);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isGameOn && beepSound && lossOfTurnSound) {
      timer = setInterval(() => {
        if (counter > 0) {
          setCounter((prevSeconds) => prevSeconds - 1);
          if (counter <= 11 && counter > 1) {
            beepSound.play();
          } else if (counter === 1) {
            lossOfTurnSound.play();
          }
        } else {
          clearInterval(timer);
        }
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isGameOn, counter, beepSound, lossOfTurnSound]);

  return (
    <main className='flex flex-col h-5/6 w-screen justify-center bg-slate-900'>
      <section className='flex flex-col justify-around h-screen'>
        <div className='flex justify-center items-center'>
          <Timer
            timeValue={counter}
            maxTime={isGameStart ? gameStart : gameInProgress}
          />
        </div>
        {counter === 0 ? (
          <div className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl text-stone-50'>Loss Of Turn</h1>
            <h3 className='text-stone-50'>
              Ball in hand to {!isP1Turn ? "Player 1" : "Player 2"}
            </h3>
          </div>
        ) : null}
        <div className='flex flex-col justify-center items-center'>
          {!isGameOn ? (
            <CustomButton label='START' size={150} onPress={startGame} />
          ) : (
            <div className='flex flex-col justify-center items-center'>
              <h1 className='text-xl text-stone-50'>
                {isP1Turn ? "Player 1" : "Player 2"}
              </h1>
              <div className='flex justify-center items-center'>
                <CustomButton label='Next Player' onPress={nextTurn} />
                {counter > 0 ? (
                  <CustomButton label='Ball Potted' onPress={ballPotted} />
                ) : null}
              </div>
              <div className='flex justify-center items-center'>
                {counter > 0 ? (
                  <CustomButton
                    label='Extension'
                    onPress={extension}
                    isDisabled={isP1Turn ? !playerOneExt : !playerTwoExt}
                  />
                ) : null}
                {isP1Turn && isGameStart && counter > 0 ? (
                  <CustomButton label='Push Out' onPress={pushOut} />
                ) : null}
              </div>
              <CustomButton label='Restart' onPress={restartGame} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
