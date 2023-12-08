import City from "./City";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { defineDefaultCities } from "../reducers/defaultCities";

function Home() {
  const dispatch = useDispatch();
  const BACKEND_ADRESS = "http://localhost:3000";
  const user = useSelector((state) => state.user.value);
  const defaultCitiesList = useSelector((state) => state.defaultCities.value);
  const favCitiesList = useSelector((state) => state.favCities.value);
 
  // useEffect(() => {
  //   fetch(`${BACKEND_ADRESS}/weather`)
  //     .then((response) => response.json())
  //     .then((defaultData) => {
  //       dispatch(defineDefaultCities(defaultData.data));
  //     });
  // }, []);

  // const defaultCitiesDisplay = defaultCitiesList.map((data, i) => {
  //   return <City key={i} {...data} />;
  // });
    let favCitiesDisplay = favCitiesList.map((data, i) => {
      return <City key={i} {...data} />;
    });
  useEffect(() => {
         favCitiesDisplay = favCitiesList.map((data, i) => {
          return <City key={i} {...data} />;
        });
   },[favCitiesList])


  return (
    <div class="flex flex-col h-screen w-screen bg-gradient-to-b from-cyan-500 to-blue-500 ">
      <Header />
      <div class="flex flex-row justify-center items-center flex-wrap overflow-y-auto overflow-x-hidden">
        {favCitiesDisplay}
        {/*defaultCitiesDisplay*/}
      </div>
    </div>
  );
}

export default Home;
