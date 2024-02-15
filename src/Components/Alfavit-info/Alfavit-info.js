import React, { useEffect } from "react";
import s from "./Alfavit-info.module.css";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import List from "../List/List";
import Alfavit from "../Alfavit/Alfavit";
import { getAlfavitMeals } from "../../Redux-toolkit/MealSlise/MealSlice";

const AlfavitInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { alfavitMeal } = useSelector((state) => state.products);
  const { meals } = useParams();

  useEffect(() => {
    dispatch(getAlfavitMeals(meals));
  }, [meals]);

  const infoClick = (id, title) => {
    navigate(`/meal/${id}/${title}`);
  };
  console.log('alfavitMeal>>>', alfavitMeal);

  return (
    <div className="container">
      <div className={s.content}>
        {alfavitMeal ? (
          <List
            items={alfavitMeal}
            renderItem={(elem, i) => (
              <div
                key={i}
                onClick={() => infoClick(elem.idMeal, elem.strMeal)}
                className={s.meal_content}
              >
                <div className={s.images}>
                  <img src={elem.strMealThumb} alt="" />
                </div>
                <p>{elem.strMeal}</p>
              </div>
            )}
          />
        ) : (
          <h2 className={s.text}>No meals found</h2>
        )}
      </div>
      <div className={s.alfavit}>
        <h2>Browse Meals</h2>
        <br />
        <Alfavit />
      </div>
    </div>
  );
};
export default AlfavitInfo;
