import { useState, useRef } from "react";
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

type TimerState =
  | { state: "initial" }
  | { state: "running" }
  | { state: "paused" }
  | { state: "error" };

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerState, setTimerState] = useState<TimerState>({
    state: "initial",
  });
  const intervalRef = useRef<NodeJS.Timer>(null);
  const timerIcon = timerState.state === "running" ? faPause : faPlay;

  function handleStartStop() {
    if (timerState.state !== "paused") {
      const id = intervalRef.current;
      clearInterval(id);
    } else {
      const id = setInterval(() => {
        console.log("tick");
      }, 1000);

      intervalRef.current = id;
    }

    setTimerState((prevState) =>
      prevState.state !== "running" ? { state: "running" } : { state: "paused" }
    );
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center dark:bg-zinc-900 dark:text-gray-50">
      <h1 className="text-5xl font-bold">25 + 5 Clock</h1>

      {/* Session and Break Controls */}
      <section className="mt-4 flex items-center justify-center gap-7">
        <div>
          <SectionLabel id="break-label">Break Length</SectionLabel>
          <div className="flex items-center justify-center gap-2">
            <Button id="break-decrement">
              <FontAwesomeIcon icon={faArrowUp} size="xl" />
            </Button>
            <span id="break-length" className="text-2xl">
              {breakLength}
            </span>
            <Button id="break-increment">
              <FontAwesomeIcon icon={faArrowDown} size="xl" />
            </Button>
          </div>
        </div>
        <div>
          <SectionLabel id="session-label">Session Length</SectionLabel>
          <div className="flex items-center justify-center gap-2">
            <Button id="session-decrement">
              <FontAwesomeIcon icon={faArrowUp} size="xl" />
            </Button>
            <span id="session-length" className="text-2xl">
              {sessionLength}
            </span>
            <Button id="session-increment">
              <FontAwesomeIcon icon={faArrowDown} size="xl" />
            </Button>
          </div>
        </div>
      </section>

      {/* Timer Display */}
      <section className="mt-3 flex flex-col items-center justify-center rounded-3xl border-4 px-6 pt-3 pb-5">
        <SectionLabel id="timer-label">Session</SectionLabel>
        <h3 id="time-left" className="text-7xl font-bold">
          25:00
        </h3>
      </section>

      {/* Timer Controls */}
      <section className="mt-1 flex gap-2">
        <Button id="start_stop">
          <FontAwesomeIcon
            icon={timerIcon}
            size="xl"
            onClick={handleStartStop}
          />
        </Button>
        <Button id="reset">
          <FontAwesomeIcon icon={faRepeat} size="xl" />
        </Button>
      </section>
    </main>
  );
}

export default App;
