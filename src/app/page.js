"use client";

import Weather from "@/components/Weather";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { BsSearch } from "react-icons/bs";

export default function Home() {
  const [city, setCity] = useState("");

  const [weather, setWeather] = useState({});

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.get(url);
      setWeather(data);
      setCity("");
    } catch (error) {
      setCity("");
      setWeather({});
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="px-3">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-10" />
      <Image
        fill
        className="object-cover"
        src="https://images.unsplash.com/photo-1561484930-998b6a7b22e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        alt="background"
      />

      {/* SEARCH */}

      <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-20">
        <form
          onSubmit={fetchWeather}
          className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl"
        >
          <div>
            <input
              className="bg-transparent border-none text-white focus:outline-none text-2xl placeholder:text-lg"
              type="text"
              placeholder="Search City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button>
            <BsSearch size={20} />
          </button>
        </form>
      </div>

      {/* Weather */}

      {weather.main && <Weather data={weather} />}

      <Toaster />
    </div>
  );
}
