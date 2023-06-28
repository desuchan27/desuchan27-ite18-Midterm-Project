import React, { useState, useEffect } from "react";
import Navigation from "../navigation/navigation";
import { userData } from "../../helpers";
import SingleDog from "../singleDog/SingleDog";

export const Home = () => {
  const [dogs, setDogs] = useState([]);
  const [text, setText] = useState("");
  const [searched, setSearched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDog, setSelectedDog] = useState(null);

  const fetchDogData = async () => {
    try {
      const res = await fetch("https://api.thedogapi.com/v1/breeds");
      const data = await res.json();
      setDogs(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDogData();
  }, []);

  const searchForDog = async () => {
    try {
      const res = await fetch(
        `https://api.thedogapi.com/v1/breeds/search?q=${text}`
      );
      const data = await res.json();

      const dogsWithImages = await Promise.all(
        data.map(async (dog) => {
          const imageRes = await fetch(
            `https://api.thedogapi.com/v1/images/search?breed_id=${dog.id}`
          );
          const image = await imageRes.json();

          return { ...dog, image: image[0] };
        })
      );

      setDogs(dogsWithImages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "") {
      setSearched(false);
      fetchDogData();
    } else {
      searchForDog();
      setSearched(true);
    }
  };

  const { username } = userData();

  const openModal = (dog) => {
    setSelectedDog(dog);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedDog(null);
    setShowModal(false);
  };

  return (
    <>
      {!dogs ? (
        <h1 className="flex items-center justify-center text-white text-center px-5 text-3xl h-screen font-bold uppercase">
          Loading...
        </h1>
      ) : (
        <>
          <Navigation />
          <section className="p-8 max-w-2lg mx-auto">
            <div className="text-center">
              <div>
                <div>
                  <h1>What breeds are you looking for? {username}</h1>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto"
                autoComplete="off"
              >
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search"
                  className="py-2 px-4 rounded border placeholder-charcoal text-charcoal"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </form>
            </div>

            <div className="grid grid-cols-5 gap-8 md:grid-cols-5 xl:grid-cols-5 my-10 lg:my-20">
              {dogs.map((dog) => (
                <button
                  key={dog.id}
                  onClick={() => openModal(dog)}
                  className="bg-charcoal p-4 rounded hover:bg-slate-600 transition-all duration-200"
                >
                  <article>
                    <img
                      src={dog.image.url}
                      alt={dog.name}
                      className="rounded md:h-80 w-full object-cover"
                      loading="lazy"
                    />
                    <h3 className="text-white font-bold mt-4">{dog.name}</h3>
                    <p className="text-slate-400">Bred for: {dog.bred_for}</p>
                  </article>
                </button>
              ))}
            </div>
          </section>
          {showModal && <SingleDog dog={selectedDog} closeModal={closeModal} />}
        </>
      )}
      <footer>
        <p className="text-charcoal m-10">
          This website is powered by{" "}
          <a href="https://www.thedogapi.com" className="text-customOrange">
            The Dog API{" "}
          </a>
        </p>
      </footer>
    </>
  );
};

export default Home;
