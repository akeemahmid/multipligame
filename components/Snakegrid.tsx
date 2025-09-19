"use client";

import Image from "next/image";
import { KeyboardEvent, useEffect, useState } from "react";
import milli from "../public/mulll.avif";
import { data } from "../data/data";

const Snakegrid = () => {
  const image = <Image src={milli} alt="name" className="opacity-20" />;
  const grizSize = 20;

  type Point = {
    x: number;
    y: number;
  };
  type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

  const [snake, setSnake] = useState<Point[]>([
    { y: 0, x: 2 },
    { y: 0, x: 1 },
    { y: 0, x: 0 },
  ]);
  const [food, setFood] = useState<Point>({ x: 0, y: 0 });
  const [direction, setDirection] = useState<Direction>("DOWN");
  const [gameOver, setGameover] = useState(false);
  const [foodChangeCount, setFoodChangeCount] = useState(0);
  const [showDidYouKnow, setShowDidYouKnow] = useState(false);
  const [randomDescription, setRandomDescription] = useState<string | null>(
    null
  ); 

  const generateFoods = () => {
    const x = Math.floor(Math.random() * grizSize);
    const y = Math.floor(Math.random() * grizSize);
    setFood({ x, y });
    setFoodChangeCount((prev) => prev + 1);
  };

  const moveSnake = () => {
    const newSnake = [...snake];
    const snakehead = { ...newSnake[0] };

    if (direction === "UP") snakehead.y -= 1;
    if (direction === "DOWN") snakehead.y += 1;
    if (direction === "LEFT") snakehead.x -= 1;
    if (direction === "RIGHT") snakehead.x += 1;

    if (
      snakehead.x < 0 ||
      snakehead.x > grizSize ||
      snakehead.y < 0 ||
      snakehead.y > grizSize ||
      newSnake.some(
        (snakepart) =>
          snakepart.x === snakehead.x && snakepart.y === snakehead.y
      )
    ) {
      setGameover(true);
      return;
    }

    newSnake.unshift(snakehead);

    if (snakehead.x === food.x && snakehead.y === food.y) {
      generateFoods();
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  };

  useEffect(() => {
    const interval = setInterval(moveSnake, 65);
    return () => clearInterval(interval);
  }, [snake, direction]);

  useEffect(() => {
    generateFoods();
  }, []);

  const handlekey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") setDirection("UP");
    if (event.key === "ArrowDown" && direction !== "UP") setDirection("DOWN");
    if (event.key === "ArrowLeft" && direction !== "RIGHT") setDirection("LEFT");
    if (event.key === "ArrowRight" && direction !== "LEFT") setDirection("RIGHT");
  };

  const handlePlayAgain = () => {
    setSnake([
      { y: 0, x: 2 },
      { y: 0, x: 1 },
      { y: 0, x: 0 },
    ]);
    setDirection("DOWN");
    setGameover(false);
    setFoodChangeCount(0);
    setShowDidYouKnow(false);
    setRandomDescription(null);
    generateFoods();
  };

  const handleLearnMore = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setRandomDescription(data[randomIndex].description);
    setShowDidYouKnow(true);
  };

  return (
    <section className="container flex-wrap mx-auto flex justify-center h-auto w-full mt-[10%] relative">
      <div
        onKeyDown={handlekey}
        tabIndex={0}
        autoFocus
        className="grid grid-rows-20 border-[#a66cff] border-2"
      >
        {/* Grid */}
        {Array.from({ length: grizSize }).map((_, y) => (
          <div key={y} className="flex">
            {Array.from({ length: grizSize }).map((_, x) => (
              <div
                key={x}
                className={`w-4 h-4 md:w-5 md:h-5 border border-[#3E3170] ${
                  snake.some(
                    (snakepart) => snakepart.x === x && snakepart.y === y
                  )
                    ? "bg-[#a66cff]"
                    : ""
                } ${food.x === x && food.y === y ? "bg-green-600" : ""}`}
              ></div>
            ))}
          </div>
        ))}
      </div>

      {/* Full Page Backdrop + Modal */}
      {gameOver && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>

          {/* Modal */}
          <div className="relative z-10 flex flex-col items-center space-y-9 bg-[#3e3170b3] w-auto md:w-[350px] md:h-[340px] rounded-3xl p-6 shadow-lg">
            {!showDidYouKnow ? (
              <>
                <div>
                  <div className="text-4xl font-bold text-red-600">
                    Game Over
                  </div>
                  <h1 className="text-lg font-bold text-green-600">
                    Score : {(foodChangeCount - 1) * 5} points
                  </h1>
                </div>

                <div className="flex flex-col gap-3 mt-[10%] w-full">
                  <button
                    className="py-3 px-5 bg-gradient-to-r cursor-pointer text-xl font-bold text-white from-[#a66cff] to-[#3E3170] rounded-3xl"
                     onClick={() => window.location.reload()}
                  >
                    PLAY AGAIN
                  </button>
                  <button
                    className="py-3 px-5 bg-gradient-to-r cursor-pointer text-xl font-bold text-white opacity-60 hover:opacity-100 from-[#a66cff] to-[#3E3170] rounded-3xl"
                    onClick={handleLearnMore}
                  >
                    LEARN MORE
                  </button>
                </div>
              </>
            ) : (
              <div className="w-[300px] md:w-auto text-center">
                <h1 className="text-4xl font-bold text-[#FFFFFFB2]">
                  Did You Know? 🤔
                </h1>
                <p className="text-left text-white font-medium  mt-[5%]">
                  {randomDescription}
                </p>
                <button
                  className="py-3 px-5 bg-gradient-to-r cursor-pointer text-xl font-bold text-white from-[#a66cff] to-[#3E3170] rounded-3xl mt-6"
                 onClick={() => window.location.reload()}
                >
                  PLAY AGAIN
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Snakegrid;
