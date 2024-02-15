import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import s from "./Popular-infoingredients.module.css";
import { getPopularInfo } from "../../Redux-toolkit/MealSlise/MealSlice";
import List from "../List/List";

const PopularInfoingredients = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title } = useParams();
  const { poplarInfo } = useSelector((state) => state.products);
  console.log(poplarInfo);
  useEffect(() => {
    dispatch(getPopularInfo(title));
  }, []);

  const infoClick = (id, title) => {
    navigate(`/meal/${id}/${title}`);
  };
  return (
    <div className="container">
      <div className={s.content}>
        <div className={s.title}>
          <h2>{title}</h2>
          <div className={s.content_title}>
            <img
              src={`https://www.themealdb.com/images/ingredients/${title}.png`}
              alt={title}
            />
          </div>
        </div>
        <div className={s.images_title}>
          <h2>Meals</h2>
          <div className={s.images}>
            <List
              items={poplarInfo}
              renderItem={(elem, i) => (
                <div
                  key={i}
                  className={s.images_item}
                >
                  <div className={s.item} onClick={() => infoClick(elem.idMeal, elem.strMeal)}>
                    <img src={elem.strMealThumb} alt={elem.strMeal} />
                  </div>
                  <p>{elem.strMeal}</p>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularInfoingredients;
