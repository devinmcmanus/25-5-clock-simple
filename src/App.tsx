import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faPlay,
  faPause,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Button from "./components/Button";
import SectionLabel from "./components/SectionLabel";
import beepSound from "./assets/beep-alarm-366507.mp3";

type TimerState =
  | { value: "initial" }
  | { value: "running" }
  | { value: "paused" }
  | { value: "error" };

type TimerMode = { value: "session" } | { value: "break" };

type TimerStatus = {
  state: TimerState;
  mode: TimerMode;
};

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerStatus, setTimerStatus] = useState<TimerStatus>({
    state: { value: "initial" },
    mode: { value: "session" },
  });
  const [timeRemaining, setTimeRemaining] = useState(sessionLength * 60);
  const intervalRef = useRef<NodeJS.Timer>(null);
  const beepRef = useRef(null);
  const timerIcon = timerStatus.state.value === "running" ? faPause : faPlay;
  const minutes = Math.floor(timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(timeRemaining % 60)
    .toString()
    .padStart(2, "0");
  const timeRemainingFormatted = `${minutes}:${seconds}`;

  useEffect(() => {
    function startTimer() {
      const id = setInterval(() => {
        setTimeRemaining((t) => t - 1);
      }, 1000);

      intervalRef.current = id;
    }

    function pauseTimer() {
      clearInterval(Number(intervalRef.current));
      intervalRef.current = null;
    }

    if (
      timerStatus.state.value === "paused" ||
      timerStatus.state.value === "initial"
    ) {
      pauseTimer();
    }

    if (timerStatus.state.value === "running" && !intervalRef.current) {
      startTimer();
    }
  }, [timerStatus.state.value, timeRemaining]);

  function handleStartPause() {
    setTimerStatus((prevStatus: TimerStatus) =>
      prevStatus.state.value !== "running"
        ? { ...prevStatus, state: { value: "running" } }
        : { ...prevStatus, state: { value: "paused" } }
    );
  }

  function handleChangeBreakLength(delta: number) {
    const newBreakLength = breakLength + delta;
    setBreakLength(
      newBreakLength > 0 && newBreakLength <= 60 ? newBreakLength : breakLength
    );
  }

  function handleChangeSessionLength(delta: number) {
    const newSessionLength = sessionLength + delta;
    setSessionLength(
      newSessionLength > 0 && newSessionLength <= 60
        ? newSessionLength
        : sessionLength
    );

    if (timerStatus.state.value === "initial") {
      setTimeRemaining(
        newSessionLength > 0 && newSessionLength <= 60
          ? newSessionLength * 60
          : timeRemaining
      );
    }
  }

  function handleReset() {
    setSessionLength(25);
    setBreakLength(5);
    setTimerStatus({
      state: { value: "initial" },
      mode: { value: "session" },
    });
    setTimeRemaining(25 * 60);

    beepRef?.current?.pause();

    if (beepRef.current.currentTime) {
      beepRef.current.currentTime = 0;
    }
  }

  /* Handle end of break */
  if (timeRemaining < 0 && timerStatus.mode.value === "break") {
    setTimerStatus((prevStatus: TimerStatus) => ({
      ...prevStatus,
      mode: { value: "session" },
    }));
    setTimeRemaining(sessionLength * 60);
  }

  /* Handle end of session */
  if (timeRemaining < 0 && timerStatus.mode.value === "session") {
    setTimerStatus((prevStatus: TimerStatus) => ({
      ...prevStatus,
      mode: { value: "break" },
    }));
    setTimeRemaining(breakLength * 60);
  }

  /* Play beep when timer reaches 0 */
  if (timeRemaining === 0) {
    beepRef?.current?.play();
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center dark:bg-zinc-900 dark:text-gray-50">
      <h1 className="text-5xl font-bold">25 + 5 Clock</h1>

      {/* Session and Break Controls */}
      <section className="mt-4 flex items-center justify-center gap-7">
        <div>
          <SectionLabel id="break-label">Break Length</SectionLabel>
          <div className="flex items-center justify-center gap-2">
            <Button
              id="break-decrement"
              onClick={() => handleChangeBreakLength(-1)}
            >
              <FontAwesomeIcon icon={faArrowDown} size="xl" />
            </Button>
            <span id="break-length" className="text-2xl">
              {breakLength}
            </span>
            <Button
              id="break-increment"
              onClick={() => handleChangeBreakLength(1)}
            >
              <FontAwesomeIcon icon={faArrowUp} size="xl" />
            </Button>
          </div>
        </div>
        <div>
          <SectionLabel id="session-label">Session Length</SectionLabel>
          <div className="flex items-center justify-center gap-2">
            <Button
              id="session-decrement"
              onClick={() => handleChangeSessionLength(-1)}
            >
              <FontAwesomeIcon icon={faArrowDown} size="xl" />
            </Button>
            <span id="session-length" className="text-2xl">
              {sessionLength}
            </span>
            <Button
              id="session-increment"
              onClick={() => handleChangeSessionLength(1)}
            >
              <FontAwesomeIcon icon={faArrowUp} size="xl" />
            </Button>
          </div>
        </div>
      </section>

      {/* Timer Display */}
      <section className="mt-3 flex flex-col items-center justify-center rounded-3xl border-4 px-6 pt-3 pb-5">
        <SectionLabel id="timer-label">
          {timerStatus.mode.value === "session" ? "Session" : "Break"}
        </SectionLabel>
        <h3 id="time-left" className="text-7xl font-bold">
          {timeRemainingFormatted}
        </h3>
      </section>

      {/* Timer Controls */}
      <section className="mt-1 flex gap-2">
        <Button id="start_stop" onClick={handleStartPause}>
          <FontAwesomeIcon icon={timerIcon} size="xl" />
        </Button>
        <Button id="reset" onClick={handleReset}>
          <FontAwesomeIcon icon={faRepeat} size="xl" />
        </Button>
      </section>
      <audio id="beep" ref={beepRef}>
        <source src={beepSound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </main>
  );
}

export default App;
