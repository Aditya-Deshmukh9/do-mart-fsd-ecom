import React from "react";
import HomeSwiper from "./HomeSwiper";
import { BadgePercent, Star } from "lucide-react";
import Image from "next/image";
import { SmallStarRating, StarRating } from "@/components/ui/star-ratings";


function HomeHeroSection() {
  const DiscountedGames = new Array(5).fill({
    name: "Tiny Tina's Wonderlands",
    rating: 3.5,
    price: 50,
    discount: 50,
    image: "/imgs/w-vgs-rpg-gollum-70x90.jpg"
  })
  return (
    <section className="py-10 px-10 select-none">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <HomeSwiper />
        </div>
        <div className="md:col-span-1">
          <h1 className="flex items-center gap-4">
            <BadgePercent className="text-primary" />
            Discounted Gamer
          </h1>
          <div className="max-w-full flex flex-col mt-4 items-start gap-4 md:pl-5">
            {
              DiscountedGames.map((game, index) => (
                <div className="flex gap-x-2" key={index}>
                  <Image
                    src={game.image}
                    alt={`${game.name}_image`}
                    height={100}
                    width={100}
                    className="p-1"
                  />
                  <div className="flex flex-col gap-y-2">
                    <h3 className="text-md text-card-foreground font-semibold leading-5">{game.name}</h3>
                    <SmallStarRating rating={game.rating} />
                    <p>
                      <span className="text-foreground/30 line-through pr-1">
                        Rs.100
                      </span>
                      <span className="text-primary">Rs.50</span>
                    </p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHeroSection;
