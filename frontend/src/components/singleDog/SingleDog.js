import React, { useState, useEffect } from "react";

export default function SingleDog({ dog, closeModal }) {
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://api.thedogapi.com/v1/images/${dog.reference_image_id}`
        );
        const data = await response.json();
        setImageURL(data.url);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImage();
  }, [dog]);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
        <div className="bg-vanillaWhite p-10 max-w-7.2xl max-h-[700px] mx-auto overflow-y-auto">
          {dog && (
            <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 md:place-items-center">
              <article>
                <img src={imageURL} alt={dog.name} />
              </article>
              <article>
                <h1 className="text-3xl font-bold text-charcoal mb-8 lg:text-5xl">
                  {dog.name}
                </h1>
                {dog.description && (
                  <p className="text-charcoal mb-8">{dog.description}</p>
                )}

                <ul className="text-charcoal leading-loose text-lg-1 lg:leading-relaxed">
                  <li>
                    <span className="font-bold text-charcoal text-1xl">
                      Bred For:{" "}
                    </span>
                    {dog.bred_for}
                  </li>
                  <li>
                    <span className="font-bold text-charcoal">Height: </span>
                    {dog.height.metric} cm
                  </li>
                  <li>
                    <span className="font-bold text-charcoal">Weight: </span>
                    {dog.weight.metric} kgs
                  </li>
                  <li>
                    <span className="font-bold text-charcoal">
                      Breed Group:{" "}
                    </span>
                    {dog.breed_group}
                  </li>
                  <li>
                    <span className="font-bold text-charcoal">Lifespan: </span>
                    {dog.life_span}
                  </li>
                  <li>
                    <span className="font-bold text-charcoal">
                      Temperament:{" "}
                    </span>
                    {dog.temperament}
                  </li>
                </ul>

                <button
                  onClick={closeModal}
                  className="inline-block bg-slate-600 py-2 px-6 rounded mt-8 text-white hover:bg-slate-500 transition-all duration-200"
                >
                  &larr; Back
                </button>
              </article>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
