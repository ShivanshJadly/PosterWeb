import React, { useState } from "react";
import { cn } from "../../utils/cd";

import CarsImage from '../../additionalFile/category-image/Cars.jpeg';
import AnimeImage from '../../additionalFile/category-image/Anime.jpeg';
import ComicImage from '../../additionalFile/category-image/Comic.jpeg';
import GameImage from '../../additionalFile/category-image/Game.jpeg';
import MovieImage from '../../additionalFile/category-image/Movie.jpeg';
import MusicImage from '../../additionalFile/category-image/Music.jpeg';
import QuotesImage from '../../additionalFile/category-image/Quotes.jpeg';
import SceneryImage from '../../additionalFile/category-image/Scenery.jpeg';
import SeriesImage from '../../additionalFile/category-image/Series.jpeg';
import SportsImage from '../../additionalFile/category-image/Sports.jpeg';

const imageMap = {
    "Cars": CarsImage,
    "Anime": AnimeImage,
    "Comics": ComicImage,
    "Game": GameImage,
    "Movie": MovieImage,
    "Music": MusicImage,
    "Quotes": QuotesImage,
    "Scenery": SceneryImage,
    "Series": SeriesImage,
    "Sports": SportsImage,
};

export const Card = React.memo(({
  card,
  index,
  hovered,
  setHovered
}) => (

  <div
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    className={cn(
      "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
      hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
    )}>
    <img
      src={imageMap[card.title]}
      alt={card.title}
      fill
      className="object-cover absolute inset-0" />
    <div
      className={cn(
        "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
        hovered === index ? "opacity-100" : "opacity-0"
      )}>
      <div
        className="text-xl flex flex-col md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
        {card.title}
        
      </div>
    </div>
  </div>
));

Card.displayName = "Card";

export function FocusCards({
  cards
}) {
  const [hovered, setHovered] = useState(null);
  return (
    (<div
      className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered} />
      ))}
    </div>)
  );
}
