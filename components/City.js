import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { defineListFavoriteCities } from "../reducers/favCities";

function City(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const BACKEND_ADRESS = "https://weather-report-back.vercel.app";

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

  useEffect(() => {
    if (user.token) {
      fetch(`${BACKEND_ADRESS}/weather/fetchFav`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ token: user.token }),
      })
        .then((response) => response.json())
        .then((favCitiesData) => {
          if (favCitiesData.result) {
            dispatch(defineListFavoriteCities(favCitiesData.data));
          }
        });
    }
  }, []);

  useEffect(() => {
    if (props.favorite) {
      setStarStyle({ color: "yellow" });
    }
  }, []);

  return (
    <div className="flex flex-col w-64 h-72 justify-center items-center bg-slate-50 rounded-2xl m-5">
      <span className="flex flex-row w-full justify-end p-3">
        {user.token ? (
          <FontAwesomeIcon
            icon={faStar}
            onClick={() => handleAddFav()}
            style={starStyle}
          />
        ) : null}
      </span>
      <div className="font-mono text-2xl mb-2">{props.cityName}</div>
      <div className="p-2">
        <Image src={`/${props.main}.png`} width={140} height={140} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="font-mono text-sm opacity-60">{props.description}</div>
        <div className="w-64 flex flex-row justify-between ">
          <span className="pl-2 font-mono text-indigo-500 ">
            {props.tempMin}°C
          </span>
          <span className=" pr-2 font-mono text-red-500">
            {props.tempMax}°C
          </span>
        </div>
      </div>
    </div>
  );
}

export default City;
