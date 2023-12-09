import City from "./City";
import Header from "./Header";
import { useSelector } from "react-redux";
import { useState } from "react";

function Home() {
  const favCitiesList = useSelector((state) => state.favCities.value)
  const [refreshState, setRefreshState] = useState(false);
  
  const handleRefresh = () => {
    setRefreshState(!refreshState)
  }
  const favCitiesDisplay = favCitiesList.map((data, i) => {
    return <City key={i} {...data} favorite={true} handleRefresh={handleRefresh} />;
  });


  return (
    <div class="flex flex-col h-screen w-screen bg-gradient-to-b from-indigo-900 via-indigo-500 to-indigo-200 ">
      <Header />
      <div class="flex flex-row justify-center items-center flex-wrap overflow-y-auto overflow-x-hidden">
        {favCitiesDisplay}
      </div>
    </div>
  );
}

export default Home;
