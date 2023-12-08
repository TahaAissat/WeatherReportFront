import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faRightFromBracket,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { logUser, logOut } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { defineListFavoriteCities } from "../reducers/favCities";
import City from "./City";

function Header() {
  const dispatch = useDispatch();
  const BACKEND_ADRESS = "http://localhost:3000";
  const [showModal, setShowModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [newUser, setNewUser] = useState("initial");
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const user = useSelector((state) => state.user.value);

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
          dispatch(logUser(userData.data))
          setShowModal(false)
          setError('')
        } else {
          setError(userData.error);
        }
      });
  };

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
          setShowModal(false);
        } else {
          setError(userData.error);
        }
      });
  };

  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(defineListFavoriteCities([]));
  };

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
  let searchDisplay = searchResult.map((data, i) => {
    return <City key={i} {...data} />;
  });

  useEffect(() => {
    fetch(`${BACKEND_ADRESS}/weather/fetchFav`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ favorites: user.favorites }),
    })
      .then((response) => response.json())
      .then((favCitiesData) => {
        if (favCitiesData.result) {
          dispatch(defineListFavoriteCities(favCitiesData.data));
        }
      });
  }, [showModal, showSearchModal]);

  return (
    <div class="flex flex-row justify-center items-center h-28 w-screen bg-white">
      <h1 class="font-serif text-3xl ">Your weather report</h1>
      <span class="absolute right-12">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="xl"
          onClick={() => setShowSearchModal(true)}
        />
      </span>
      {!user.token ? (
        <span class="absolute right-5">
          <FontAwesomeIcon
            icon={faUser}
            size="xl"
            onClick={() => setShowModal(true)}
          />
        </span>
      ) : (
        <span class="absolute right-5">
          <FontAwesomeIcon
            icon={faRightFromBracket}
            size="xl"
            onClick={() => handleLogOut()}
          />
        </span>
      )}
      {/*Modal sign in / sign up*/}
      {showModal && newUser === "initial" ? (
        <div class="flex fixed flex-col justify-center items-center inset-0 z-50 bg-[#334155] bg-opacity-50">
          <div class="w-fit h-fit p-5 flex flex-col justify-center items-center bg-white rounded-lg">
            <div class="flex flex-row justify-end w-full">
              <FontAwesomeIcon
                icon={faXmark}
                size="xl"
                onClick={() => {
                  setShowModal(false), setNewUser("initial"), setError("");
                }}
              />
            </div>
            <button
              class="flex w-32 m-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => setNewUser(true)}
            >
              Sign Up
            </button>
            <button
              className="flex w-32 m-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => setNewUser(false)}
            >
              Sign in
            </button>
          </div>
        </div>
      ) : null}
      {/*Modal pour se connecter*/}
      {showModal && !newUser ? (
        <div>
          <div class="flex fixed flex-col justify-center items-center inset-0 z-50 bg-[#334155] bg-opacity-50">
            <div class="w-fit h-fit p-4 flex flex-col justify-center items-center bg-white rounded-lg">
              <div class="flex flex-row justify-end w-full">
                <FontAwesomeIcon
                  icon={faXmark}
                  size="xl"
                  onClick={() => {
                    setShowModal(false), setNewUser("initial"), setError("");
                  }}
                />
              </div>
              <form class="space-y-6" onSubmit={handleSubmitSignIn}>
                <div>
                  <label
                    htmlFor="email"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div class="mt-2">
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
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <div class="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div class="mt-2">
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
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div class="text-red-600">{error}</div>
                <div>
                  <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
      {/*Modal pour s'inscrire*/}
      {showModal && newUser === true ? (
        <div class="flex fixed flex-col justify-center items-center inset-0 z-50 bg-[#334155] bg-opacity-50">
          <div class="w-fit h-fit p-4 flex flex-col justify-center items-center bg-white rounded-lg">
            <div class="flex flex-row justify-end w-full">
              <FontAwesomeIcon
                icon={faXmark}
                size="xl"
                onClick={() => {
                  setShowModal(false), setNewUser("initial");
                }}
              />
            </div>
            <form class="space-y-6" onSubmit={handleSubmitSignUp}>
              <div>
                <label
                  htmlFor="username"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div class="mt-2">
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
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div class="mt-2">
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
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div class="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div class="mt-2">
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
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div class="text-red-600">{error}</div>
              <div>
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
      {showSearchModal ? (
        <div class="flex fixed flex-col justify-center items-center inset-0 z-50 bg-[#334155] bg-opacity-50">
          <div class="w-fit h-fit p-6 flex flex-col justify-center items-center bg-white rounded-lg">
            <div class="flex flex-row justify-end w-full">
              <FontAwesomeIcon
                icon={faXmark}
                size="xl"
                onClick={() => {
                  setShowSearchModal(false);
                  setSearchResult([]);
                }}
              />
            </div>
            <input
              placeholder="Search for a city"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button onClick={() => handleSearch()}>Search</button>
            {searchResult.length > 0 ? <div>{searchDisplay}</div> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Header;
