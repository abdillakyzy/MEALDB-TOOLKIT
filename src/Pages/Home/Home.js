import React, { useState } from "react";
import s from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import List from "../../Components/List/List";
import MealItem from "../../Components/Meal-item/Meal-item";
import PopularIngredients from "../../Components/Popular-ingredients";
import { getRandomMeal } from "../../Redux-toolkit/MealSlise/MealSlice";
import Alfavit from "../../Components/Alfavit/Alfavit"

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { latest, popular, randomMeal, randomIngredient, country } =
    useSelector((state) => state.products);
  console.log("country>>>", country);

  React.useEffect(() => {
    // Dispatching the action to get random meals
    dispatch(getRandomMeal());
  }, [dispatch]);

  const handleMealInfo = (id, title) => {
    navigate(`/meal/${id}/${title}`);
  };

  const handlePopularMeal = (title) => {
    navigate(`/ingredient/${title}`);
  };

  const randomItems = [];
  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * randomIngredient.length);
    randomItems.push(randomIngredient[randomIndex]);
  }
  const randomMealsId = (id, title) => {
    navigate(`/meal/${id}/${title}`);
  };

  const countryMeals = (title) => {
    navigate(`/meals/${title}`);
  };

  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
  };
  return (
    <section>
      <div className="container">
        <form onSubmit={handleSubmit} className={s.home_search}>
          <div>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </form>
        <div className={s.meal_item}>
          <h3>Latest Meals</h3>
          <div className={s.meal_item_content}>
            <List
              items={latest && latest}
              renderItem={(elem, i) => {
                return (
                  <MealItem
                    key={i}
                    {...elem}
                    onClick={() => handleMealInfo(elem.idMeal, elem.strMeal)}
                  />
                );
              }}
            />
          </div>
        </div>
        <div className={s.popular}>
          <h3>Popular Ingredients</h3>
          <div className={s.popular_ingredients}>
            <List
              items={popular}
              renderItem={(elem, i) => {
                if (i < 4) {
                  return (
                    <PopularIngredients
                      key={i}
                      {...elem}
                      onClick={() => handlePopularMeal(elem.strIngredient)}
                    />
                  );
                }
              }}
            />
          </div>
        </div>
        <div className={s.random_meals}>
          <div className={s.random_content}>
            <h3>Random Meals</h3>
            <div className={s.random_images}>
              <List
                items={randomMeal}
                renderItem={(elem, i) => (
                  <MealItem
                    onClick={() => randomMealsId(elem.idMeal, elem.strCategory)}
                    key={i}
                    {...elem}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className={s.popular}>
          <h3>Random Ingredients</h3>
          <div className={s.popular_ingredients}>
            <List
              items={randomItems && randomItems}
              renderItem={(elem, i) => (
                <PopularIngredients
                  key={i}
                  {...elem}
                  onClick={() => handlePopularMeal(elem.strIngredient)}
                />
              )}
            />
          </div>
        </div>
        <div className={s.country}>
          <h3>Browse Country</h3>
          <div className={s.country_meals}>
            <List
              items={country}
              renderItem={(elem, i) => (
                <div
                  key={i}
                  onClick={() => countryMeals(elem.strArea)}
                  className={s.flags}
                >
                  <img
                    src={`https://www.themealdb.com/images/icons/flags/big/64/${elem.strArea.substr(
                      0,
                      2
                    )}.png`}
                    alt=""
                  />
                </div>
              )}
            />
          </div>
        </div>
        <div className={s.alfavit}>
          <h3>Browse By Name</h3>
          <div className={s.alfavit_content}>
            <Alfavit />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
