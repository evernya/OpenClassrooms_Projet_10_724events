import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    // inversement de -1 et 1 afin que A soit placé avant B en ordre décroissant
    new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  );
  const nextCard = () => {
    if (byDateDesc !== undefined) {
      setTimeout(
        // ajout du - 1 pour la boucle
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
        5000
      )
    }
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                key={event.id || `fallback-${radioIdx}`} // utilise l'ID de la carte, mais si ce n'est pas disponible, utilise l'index
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // state index à la place du prop idx
                  readOnly // formulaire en lecture seule en évitant le message d'avertissement
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
