import React from "react";
import { Badge } from "@nextui-org/react";
import CloseActionIcon from "./CloseAction";

const UploadedActionFile = ({ file, onDelete }) => {
  const getShortenedFilename = () => {
    const parts = file.filename.split(".");
    const name = parts.slice(0, -1).join(".");
    const extension = parts.slice(-1);
    return `...${name.slice(-3)}.${extension}`;
  };

  const handleClick = () => {
    onDelete(file.file_id);
  };

  return (
    <>
      <div className="relative flex flex-col items-center justify-center my-3 border border-white rounded-lg cursor-pointer w-28 h-28">
        <button
          role="button"
          aria-label="Close"
          className="w-8 h-8 border border-[#6366F1] absolute appearance-none select-none -top-3 left-24 rtl:left-1 rtl:right-[unset] p-2 text-foreground-500 rounded-full hover:bg-red-500 active:bg-red-600 tap-highlight-transparent outline-none focus:outline-none"
          type="button"
          onClick={handleClick}
        >
          <CloseActionIcon />
        </button>
        <div>
          <svg
            width="69"
            height="67"
            viewBox="0 0 69 67"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect width="69" height="67" fill="url(#pattern0_780_7351)" />
            <defs>
              <pattern
                id="pattern0_780_7351"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlinkHref="#image0_780_7351"
                  transform="matrix(0.010789 0 0 0.0111111 0.0144928 0)"
                />
              </pattern>
              <image
                id="image0_780_7351"
                width="90"
                height="90"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACfUlEQVR4nO2cTW7UQBCFvWLgBjCJOAY7FmxYEe4B4meHuQaHCigr4BbZIkDg1UPWGAkNmXR3VVd1tf2+fcnvfe6xk7bUw0AIIYQQQgghhBBCBgB3AbwFcAXgB/7nhWLWggnAJYBH3dw+AOcAvt5S6hrAHeGsNb8APB2is6zGlKgPilkP4stefvIpLhSzXsSWvTxXUzxUzHoSVzaA7xkF7ilmLfjZneycVppZIx4nbvJvAM+GSOS00sxasFy7L9m5xaSzFvxz/X5klxSTzFpwlKEP2aXFSmctuCFHfNmSYn9BI4YbCC9bWmwGjRhOEFq2slgTEn1iytYUQyMyOsWTrSmGRmT2iiVbUwyNKOgWR7amGBpR2O9Jxt6I/ccDTTG0Y19Z9mUVmYkQSTSzRoyCnrfJntQiMwIk0cwafi8ca67sKjITF0+ime0FinaCop2gaCco2gmKdoKinaBoJyjaCYp2gqKdoGgn1iZ6AvCudDOooMt+2Wyati56NC90yDVuXfQD80KHXPe3LnpvXuiQ62zrokfzQodc77cuepJ8GSnowpdhdCxu/PEqEIfAiqBoJyjaCYp2gqKdWJvoqcZeh+bPuNKO1dCEQON/WCR7GqUda4YVh0DjvQ7JnkZpx5phxSFQzr71nkZpx5phxSHQ/tFRvKdR2rFmWHEINNrr4MuwYzQ3Pnd1iENgRVC0ExTtBEU7QdFOULQTFO0ERa9IdI/HsdXmm4foNR0wKOWTh+g3GUGeK2Z74JWH6B2AL8JDYHcZs9H5fOokYQvZ5wlh87HGO+FsdMlnLpKPVufr+Xl14iX3UjEbiTnfx/lx4baSCSGEEEIIIYQQQobY/AEheIfV8IUvPwAAAABJRU5ErkJggg=="
              />
            </defs>
          </svg>
        </div>
        <p className="font-light">{getShortenedFilename()}</p>
      </div>
    </>
  );
};

export default UploadedActionFile;
