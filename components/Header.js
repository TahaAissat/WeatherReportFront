import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState("initial");

  return (
    <div class="flex flex-row justify-center items-center h-28 w-screen bg-white">
      <h1 class="font-sans text-3xl font-semibold">Your weather report</h1>
      <span class="absolute right-5">
        <FontAwesomeIcon
          icon={faUser}
          size="xl"
          onClick={() => setShowModal(true)}
        />
      </span>
      {/*Modal sign in / sign up*/}
      {showModal && newUser === "initial" ? (
        <div class="flex fixed flex-col justify-center items-center inset-0 z-50 bg-[#334155] bg-opacity-50">
          <div class="w-fit h-fit p-5 flex flex-col justify-center items-center bg-white rounded-lg">
            <div class="flex flex-row justify-end w-full">
              <FontAwesomeIcon
                icon={faXmark}
                size="xl"
                onClick={() => {
                  setShowModal(false), setNewUser("initial");
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
                    setShowModal(false), setNewUser("initial");
                  }}
                />
              </div>
              <form class="space-y-6" action="#" method="POST">
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
                      required
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
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
            <form class="space-y-6" action="#" method="POST">
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
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
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
    </div>
  );
}

export default Header;
