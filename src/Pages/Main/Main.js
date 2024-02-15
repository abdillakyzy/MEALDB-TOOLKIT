import React, { useEffect } from "react";
import Home from "../Home";
import { Route, Routes } from "react-router-dom";
import {
  getLatesMeal,
  getPopular,
  getRandomMeal, getCountryMeals
} from "../../Redux-toolkit/MealSlise/MealSlice";
import { useDispatch } from "react-redux";
import InfoIngredient from "../../Components/Info-ingredient";
import PopularInfoingredients from "../../Components/Popular-infoingredients/Popular-infoingredients";
import CountryInfo from "../../Components/Country-info";
import SearchInfo from "../../Components/Search-info/Search-info";
import AlfavitInfo from "../../Components/Alfavit-info/Alfavit-info";

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLatesMeal());
    dispatch(getPopular());
    dispatch(getRandomMeal())
    dispatch(getCountryMeals())
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:idMeal/:title" element={<InfoIngredient />} />
        <Route path="/ingredient/:title" element={<PopularInfoingredients />} />
        <Route path="/meals/:country" element={<CountryInfo/>}/>
        <Route path="/search/:text" element={<SearchInfo/>}/>
        <Route path="/alfavit/:meals" element={<AlfavitInfo/>}/>

      </Routes>
    </div>
  );
};

export default Main;
