import React, { Suspense, useEffect, useState } from "react";
import Swiper from "#c/components/swiper";
import { isClient, loadProductItems, MainUrl } from "#c/functions/index";
import PostCard from "#c/components/Home/PostCard";
import { withTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const ProductsSlider = ({ cat_id = null, delay = 2500, t }) => {
  // console.log("\nProductsSlider==================>");
  let productSliderData = useSelector((st) => {
    return st.store.productSliderData;
  });

  const [tracks, settracks] = useState(isClient ? [] : (productSliderData[cat_id]));
  // const [tracks, settracks] = useState([]);
  // console.log("cat_id:", cat_id);
  // console.log("ProductsSlider:", productSliderData[cat_id]);
  if (isClient)
    useEffect(() => {
      console.log("\nuseEffect ProductsSlider==================>");
      loadProductItems(cat_id).then(res => settracks(res));


    }, []);
  // if (tracks)
  //   console.log("product tracks", tracks.length);
  // if ((tracks && tracks.length > 0))
  return (
    <Suspense fallback={<div> loading... </div>}>
      <div className={"rtl "}>
        {(tracks && tracks.length > 0) && <Swiper>

          {tracks.map((i, idx) => (
            <div className={"swiper-slide"} key={idx}><PostCard item={i}/></div>
          ))}
        </Swiper>}

      </div>
    </Suspense>
  );
  // else {
  //   return <div>hjkjhghjklkjhj</div>;
  // }
};
export const ProductsSliderServer = loadProductItems;

export default withTranslation()(ProductsSlider);
// export default {
//   component: Content,
//   loadData: dispatch => (
//     fetchRequestQuery(dispatch)
//   ),
// };
