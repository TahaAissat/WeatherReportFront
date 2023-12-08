import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useState } from "react";

function City(props) {
  const user = useSelector((state) => state.user.value);
  const BACKEND_ADRESS = "http://localhost:3000";

  const [starStyle, setStarStyle] = useState({});

  const handleAddFav = () => {
    fetch(`${BACKEND_ADRESS}/weather/addFav`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id: props.id, token: user.token }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.result) {
          setStarStyle({ color: "yellow" });
        } else {
          setStarStyle({ color: "black" });
        }
      });
  };

  return (
    <div class="flex flex-col w-64 h-72 justify-center items-center bg-slate-50 rounded-2xl m-5">
      <span class="flex flex-row w-full justify-between p-2">
        <FontAwesomeIcon icon={faRotateRight} />
        {user.token ? (
          <FontAwesomeIcon
            icon={faStar}
            onClick={() => handleAddFav()}
            style={starStyle}
          />
        ) : null}
      </span>
      <div class="font-mono text-2xl">{props.cityName}</div>
      <div class="p-2">
        <Image src={`/${props.main}.png`} width={140} height={140} />
      </div>
      <div class="flex flex-col justify-center items-center">
        <div className='font-mono text-sm opacity-60'>{props.description}</div>
        <div class="w-64 flex flex-row justify-between ">
          <span class="pl-2 font-mono text-indigo-500 ">{props.tempMin}°C</span>
          <span class=" pr-2 font-mono text-red-500">{props.tempMax}°C</span>
        </div>
      </div>
    </div>
  );
}

export default City;
