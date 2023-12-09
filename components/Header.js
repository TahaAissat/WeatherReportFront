import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { logUser, logOut } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { defineListFavoriteCities } from "../reducers/favCities";
import City from "./City";

function Header() {
  const dispatch = useDispatch();
  const BACKEND_ADRESS = "https://weather-report-back.vercel.app";
  let searchResultStyle =
    "w-64 h-fit flex flex-col justify-evenly items-center bg-white rounded-lg";
  const [showModal, setShowModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [newUser, setNewUser] = useState("initial");
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const user = useSelector((state) => state.user.value);
  const favCitiesList = useSelector((state) => state.favCities.value);

  // Log in
  const handleSubmitSignIn = (e) => {
    e.preventDefault();
    fetch(`${BACKEND_ADRESS}/signin`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((userData) => {
        if (userData.result) {
          dispatch(logUser(userData.data));
          setShowModal(false);
          setNewUser("initial");
          setError("");
        } else {
          setError(userData.error);
        }
      });
  };

  // Sign up
  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    fetch(`${BACKEND_ADRESS}/signup`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((userData) => {
        if (userData.result) {
          dispatch(logUser(userData.data));
          setError("");
          setNewUser("initial");
          setShowModal(false);
        } else {
          setError(userData.error);
        }
      });
  };

  // Log out
  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(defineListFavoriteCities([]));
  };

  // Search city's weather
  const handleSearch = () => {
    fetch(`${BACKEND_ADRESS}/weather/search`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ cityName: search }),
    })
      .then((response) => response.json())
      .then((resultData) => {
        if (resultData.result) {
          setSearchResult([resultData.weather]);
          setSearch("");
        }
      });
  };

  // Refresh favorites when logging/adding after search
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
  }, [showModal, showSearchModal]);

  // Creation of jsx elements to display search results in modal
  let searchDisplay = searchResult.map((data, i) => {
    const isFavorite = favCitiesList.some((e) => e.id === data.id);
    return <City key={i} {...data} favorite={isFavorite} />;
  });

  if (searchResult.length > 0) {
    searchResultStyle =
      "w-fit h-fit p-8 flex flex-col justify-evenly items-center bg-white rounded-lg";
  }

  return (
    <div className="flex flex-row justify-start pl-7 items-center h-28 w-screen bg-indigo-800">
      {!user.token ? (
        <h1 className="font-sans text-3xl text-white ">Your weather report</h1>
      ) : (
        <h1 className="font-sans text-3xl text-white ">
          {user.username}'s weather report
        </h1>
      )}
      <span className="absolute right-12">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="xl"
          onClick={() => setShowSearchModal(true)}
          style={{ color: "white" }}
        />
      </span>
      {!user.token ? (
        <span className="absolute right-5">
          <FontAwesomeIcon
            icon={faUser}
            size="xl"
            onClick={() => setShowModal(true)}
            style={{ color: "white" }}
          />
        </span>
      ) : (
        <span className="absolute right-5">
          <FontAwesomeIcon
            icon={faRightFromBracket}
            size="xl"
            onClick={() => handleLogOut()}
            style={{ color: "white" }}
          />
        </span>
      )}
      {/*Modal to pick either log or sign up*/}
      {showModal && newUser === "initial" ? (
        <div className="flex fixed flex-col justify-center items-center inset-0 z-50 bg-[#334155] bg-opacity-50">
          <div className="w-64 h-36 flex flex-col justify-between items-center bg-white rounded-lg">
            <div className="flex flex-row justify-end w-full mr-2 mt-1">
              <FontAwesomeIcon
                icon={faCircleXmark}
                size="xl"
                onClick={() => {
                  setShowModal(false), setNewUser("initial"), setError("");
                }}
              />
            </div>
            <div>
              <button
                className="flex w-32 m-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => setNewUser(false)}
              >
                Sign in
              </button>
              <button
                className="flex w-32 m-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => setNewUser(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {/*Log in modal*/}
      {showModal && !newUser ? (
        <div>
          <div className="flex fixed flex-col justify-center items-center inset-0 z-50 bg-[#334155] bg-opacity-50">
            <div className="w-42 h-72 p-5 flex flex-col justify-center items-center bg-white rounded-lg">
              <div className="flex flex-row justify-end w-full ml-4 mb-4">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  size="xl"
                  onClick={() => {
                    setShowModal(false), setNewUser("initial"), setError("");
                  }}
                />
              </div>
              <form className="space-y-6" onSubmit={handleSubmitSignIn}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="text-red-600">{error}</div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
      {/*Sign up modal*/}
      {showModal && newUser === true ? (
        <div className="flex fixed flex-col justify-center items-center inset-0 z-50 bg-[#334155] bg-opacity-50">
          <div className="w-42 h-96 p-4 flex flex-col justify-center items-center bg-white rounded-lg">
            <div className="flex flex-row justify-end w-full ml-4 mb-4">
              <FontAwesomeIcon
                icon={faCircleXmark}
                size="xl"
                onClick={() => {
                  setShowModal(false), setNewUser("initial");
                }}
              />
            </div>
            <form className="space-y-6" onSubmit={handleSubmitSignUp}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="username"
                    autoComplete="username"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="text-red-600">{error}</div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
      {/* Search modal */}
      {showSearchModal ? (
        <div className="flex fixed flex-col justify-center items-center inset-0 z-50 bg-[#334155] bg-opacity-50">
          <div className={searchResultStyle}>
            <div className="flex flex-row justify-end w-full pt-2 pr-2">
              <FontAwesomeIcon
                icon={faCircleXmark}
                size="xl"
                onClick={() => {
                  setShowSearchModal(false);
                  setSearchResult([]);
                }}
              />
            </div>
            <div className="flex flex-col">
              <input
                placeholder="Search for a city"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 my-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => handleSearch()}
              >
                Search
              </button>
            </div>
            {searchResult.length > 0 ? <div>{searchDisplay}</div> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Header;
