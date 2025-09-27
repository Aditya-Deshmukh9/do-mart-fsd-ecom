"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "@/public/imgs/wd-vgs-slide-1-opt.jpg";
import img2 from "@/public/imgs/wd-vgs-slide-2-opt.jpg";
import img3 from "@/public/imgs/wd-vgs-slide-st-3-opt.jpg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Parallax, Pagination, Navigation } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

function HomeSwiper() {
  const sliderImage = [
    {
      img: img1,
      title: `Explore iconic,
                                                    gore-drenched Los Angeles<br/>
                                                    and evolve to become the
                                                    ultimate Zombie Slayer.`,
      button: "Take It Now",
      moreDets: "",
      available: ["PC"],
    },
    {
      img: img2,
      title: ` In this next generation
                                                    role-playing game set<br/>
                                                    amongst the stars, create
                                                    any character you freedom.`,
      button: "Take It Now",
      moreDets: "",
      available: ["PC", "XBOX", "PS"],
    },
    {
      img: img3,
      title: `Multiplayer mode is coming
                                                    soon after the release date<br/>
                                                    as a free update for the
                                                    game universe.`,
      button: "Take It Now",
      moreDets: "",
      available: ["PC", "PS"],
    },
  ];

  return (
    <Swiper
      speed={600}
      parallax={true}
      pagination={{
        clickable: true,
      }}
      loop={true}
      modules={[Parallax, Pagination, Navigation]}
      className="mySwiper h-[600px]"
    >
      {sliderImage.map((slide, index) => (
        <SwiperSlide
          key={index}
          className="relative"
          style={{
            backgroundImage: `url(${slide.img.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute left-[3rem] top-1/2 flex flex-col items-start gap-y-4">
            {/* Available on */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="font-semibold text-sm text-white text-left"
            >
              Available on:{" "}
              {slide?.available?.map((platform, i) => (
                <span
                  key={i}
                  className="px-3 border-foreground text-xs ml-2 border-2 rounded-full py-1"
                >
                  {platform}
                </span>
              ))}
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="title text-white text-2xl font-bold"
              data-swiper-parallax="-300"
              dangerouslySetInnerHTML={{ __html: slide.title }}
            />

            {/* Button */}
            <motion.div
              initial={{ y: 70, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <Button className="rounded-full w-fit px-4 text-sm font-semibold">
                {slide.button}
              </Button>
            </motion.div>
          </div>
        </SwiperSlide>
      ))}
      <div className="swiper-pagination"></div>
    </Swiper>
  );
}

export default HomeSwiper;
