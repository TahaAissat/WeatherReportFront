import City from "./City";
import Header from "./Header";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.user.value);
  const favCitiesList = useSelector((state) => state.favCities.value);
  const favCitiesDisplay = favCitiesList.map((data, i) => {
    return <City key={i} {...data} favorite={true} />;
  });

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-b from-indigo-900 via-indigo-500 to-indigo-200 ">
      <Header />
      <div className="flex flex-row justify-center items-center flex-wrap overflow-y-auto overflow-x-hidden">
        {favCitiesDisplay.length === 0 && !user.token ? (
          <div className="w-72 h-64 flex flex-col justify-between items-between mt-20 text-white">
            <span className='text-lg'>Welcome to your weather report !</span>
            <span>
              <span className="font-bold">Step 1</span> : Create an account or
              log in
            </span>
            <span>
              <span className="font-bold">Step 2</span> : Search for a city's
              weather report by clicking on the magnifying class icon in the top
              right part of your screen
            </span>
            <span>
              <span className="font-bold">Step 3</span> : If you wish to have
              access to the reports at any time, add the city to your favorites
              by clicking on the star
            </span>
          </div>
        ) : null}
        {favCitiesDisplay}
      </div>
    </div>
  );
}

export default Home;
