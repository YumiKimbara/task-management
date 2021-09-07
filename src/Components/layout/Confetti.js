import { useEffect, useState, useContext } from "react";
import HomeContext from "../../Context/HomeContext";

import classes from "./Confetti.module.css";

import ReactCanvasConfetti from "react-canvas-confetti";

const Confetti = ({ setConfetti }) => {
  const [showConfetti, setShowConfetti] = useState({
    fire: false,
    reset: false,
  });

  useEffect(() => {
    // set any value that is cast to the logical true and will differ from the previous one.
    setShowConfetti({ fire: {} });
  }, []);

  setTimeout(() => {
    setConfetti(false);
  }, 3000);

  //   const onClickFire = () => {
  //     console.log("confetti");
  //     // set any value that is cast to the logical true and will differ from the previous one.
  //     setConfetti({ fire: {} });
  //   };

  //   onClickFire();

  return (
    <>
      <ReactCanvasConfetti
        angle={90}
        className={classes.confettiWrapper}
        fire={showConfetti}
        colors={[
          "#26ccff",
          "#a25afd",
          "#ff5e7e",
          "#88ff5a",
          "#fcff42",
          "#ffa62d",
          "#ff36ff",
        ]}
        decay={0.8}
        drift={0}
        gravity={1}
        origin={{
          x: 0.5,
          y: 0.5,
        }}
        particleCount={774}
        resize
        scalar={1}
        shapes={["circle", "square"]}
        spread={360}
        startVelocity={70}
        ticks={600}
        useWorker
        zIndex={-1}
      />
    </>
  );
};

export default Confetti;
