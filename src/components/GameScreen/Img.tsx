import { useState, useRef, useEffect, useCallback } from "react";

interface ImgGameProps {
  className?: string;
}

export const ImgGame: React.FC<ImgGameProps> = ({ className }) => {
  type Cat = {
    x: number;
    width: number;
    height: number;
    y: number;
    id: number;
    isFind: boolean;
  };
  const [catsCoordinates, setCatsCoordinates] = useState<Cat[]>([
    {
      x: 16,
      width: 17,
      height: 10,
      y: 81,
      id: 1,
      isFind: false,
    },
    {
      x: 34,
      width: 10,
      height: 10,
      y: 75,
      id: 2,
      isFind: false,
    },
    {
      x: 50,
      width: 10,
      height: 13,
      y: 69,
      id: 3,
      isFind: false,
    },
  ]);
  type CatDisplay = {
    x: number;
    y: number;
    width: number;
    height: number;
    id: number;
    isVisible: boolean;
    isFind: boolean;
  };
  const [positionsCatsOnDisplay, setPositionsCatsOnDisplay] = useState<
    CatDisplay[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const isVisibleOnWindow = useCallback(
    (cat: Cat, xOffsetpx: number, yOffsetpx: number) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const xOffset = (xOffsetpx * 100) / windowWidth;
      const yOffset = (yOffsetpx * 100) / windowHeight;

      if (xOffset + cat.width > 100) {
        return false;
      } else if (yOffset + cat.height > 100) {
        return false;
      } else if (xOffset + cat.width * 2 < 0) {
        return false;
      } else if (yOffset + cat.height * 2 < 0) {
        return false;
      }

      return true;
    },
    [],
  );

  // Функция перерасчета позиций
  const updatePositions = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { offsetWidth: containerWidth, offsetHeight: containerHeight } =
      container;
    const imgAspectRatio = 1 / 1;
    const containerAspectRatio = containerWidth / containerHeight;

    let imgWidth: number, imgHeight: number;

    if (containerAspectRatio > imgAspectRatio) {
      imgWidth = containerWidth;
      imgHeight = containerWidth / imgAspectRatio;
    } else {
      imgHeight = containerHeight;
      imgWidth = containerHeight * imgAspectRatio;
    }

    const xOffset = (containerWidth - imgWidth) / 2;
    const yOffset = (containerHeight - imgHeight) / 2;

    const newPositions = catsCoordinates.map((cat) => ({
      x: xOffset + (cat.x / 100) * imgWidth,
      y: yOffset + (cat.y / 100) * imgHeight,
      width: (cat.width / 100) * imgWidth,
      height: (cat.height / 100) * imgHeight,
      isFind: cat.isFind,
      id: cat.id,
      isVisible: isVisibleOnWindow(
        cat,
        xOffset + (cat.x / 100) * imgWidth,
        yOffset,
      ),
    }));

    setPositionsCatsOnDisplay(newPositions);
  }, [catsCoordinates, isVisibleOnWindow]);

  useEffect(() => {
    updatePositions();
    const resizeObserverPositions = new ResizeObserver(updatePositions);

    if (containerRef.current) {
      resizeObserverPositions.observe(containerRef.current);
    }

    return () => {
      resizeObserverPositions.disconnect();
    };
  }, [updatePositions]);

  const handleCatClick = (index: number) => {
    setCatsCoordinates((prevCats) =>
      prevCats.map((cat, i) => (i === index ? { ...cat, isFind: true } : cat)),
    );
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex justify-center items-center overflow-hidden ${className}`}
    >
      <img
        src="/src/assets/cats.webp"
        alt="Cat"
        className="w-full h-full object-cover"
      />

      {positionsCatsOnDisplay.map((cat, index) => (
        <div
          onClick={() => handleCatClick(index)}
          key={index}
          data-cat-index={index}
          className="absolute border-4 border-solid border-red"
          style={{
            top: `${cat.y}px`,
            left: `${cat.x}px`,
            width: `${cat.width}px`,
            height: `${cat.height}px`,
            // transform: "translate(-50%, -50%)",
          }}
        >
          {cat.isFind && <div className="text-white">Нашел!</div>}
        </div>
      ))}
    </div>
  );
};
