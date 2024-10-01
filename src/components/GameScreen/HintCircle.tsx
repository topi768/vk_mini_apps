import { FC, useState, useRef, useEffect } from "react";

export interface HintCircleProps {
  countHints: number;
}

export const HintCircle: React.FC<HintCircleProps> = ({ countHints }) => {
  const stepSizeCircle = useRef<number>(80);
  const [posHintCircleX, setPosHintCircleX] = useState<number>(220);
  const [isFirstOpen, setIsFirstOpen] = useState<boolean>(true);

  const [posHintCircleY, setPosHintCircleY] = useState<number>(230);
  const [radiusHintCircle, setRadiusHintCircle] = useState<number>(
    (countHints + 1) * stepSizeCircle.current,
  );
  const hintCircleRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!isFirstOpen && hintCircleRef.current) {
      hintCircleRef.current.style.display = "block";
    }

    setRadiusHintCircle(countHints * stepSizeCircle.current);

    if (hintCircleRef.current) {
      const newX = posHintCircleX - radiusHintCircle;
      const newY = posHintCircleY - radiusHintCircle;

      hintCircleRef.current.style.top = `${newY}px`;
      hintCircleRef.current.style.left = `${newX}px`;

      hintCircleRef.current.style.width = `${radiusHintCircle * 2}px`;
      hintCircleRef.current.style.height = `${radiusHintCircle * 2}px`;
    }

    setIsFirstOpen(false);
  }, [countHints]);

  return (
    <>
      <img
        src="src/assets/GameScreen/HintCircle.svg"
        ref={hintCircleRef}
        style={{
          display: "none",
          position: "absolute",
        }}
      />
      {/* центер */}
      {/* <div
        className="bg-red-900 w-1 h-1 absolute translate-x-0 "
        style={{
          transform: `translate(${posHintCircleX}px, ${posHintCircleY}px)`,
        }}
      ></div> */}
    </>
  );
};
