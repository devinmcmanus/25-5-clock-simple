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

function App() {
  return (
    <main className="flex h-screen flex-col items-center justify-center dark:bg-zinc-900 dark:text-gray-50">
      <h1 className="text-5xl font-bold">25 + 5 Clock</h1>
      <section className="mt-4 flex items-center justify-center gap-7">
        <div>
          <h2 id="break-label" className="text-2xl font-bold">
            Break Length
          </h2>
          <div className="flex items-center justify-center gap-2">
            <Button id="break-decrement">
              <FontAwesomeIcon icon={faArrowUp} size="xl" />
            </Button>
            <span id="break-length" className="text-2xl">
              5
            </span>
            <Button id="break-increment">
              <FontAwesomeIcon icon={faArrowDown} size="xl" />
            </Button>
          </div>
        </div>
        <div>
          <h2 id="session-label" className="text-2xl font-bold">
            Session Length
          </h2>
          <div className="flex items-center justify-center gap-2">
            <Button id="session-decrement">
              <FontAwesomeIcon icon={faArrowUp} size="xl" />
            </Button>
            <span id="session-length" className="text-2xl">
              25
            </span>
            <Button id="session-increment">
              <FontAwesomeIcon icon={faArrowDown} size="xl" />
            </Button>
          </div>
        </div>
      </section>
      <section className="mt-3 flex flex-col items-center justify-center rounded-3xl border-4 px-6 pt-3 pb-5">
        <h2 id="timer-label" className="text-2xl font-bold">
          Session
        </h2>
        <h3 id="time-left" className="text-7xl font-bold">
          25:00
        </h3>
      </section>
      <section className="mt-1 flex gap-2">
        <Button id="start_stop">
          <FontAwesomeIcon icon={faPlay} size="xl" />
          <FontAwesomeIcon icon={faPause} size="xl" />
        </Button>
        <Button id="reset">
          <FontAwesomeIcon icon={faRepeat} size="xl" />
        </Button>
      </section>
    </main>
  );
}

export default App;
