import React, {Suspense, useEffect, useState} from "react";
import Swiper from "#c/components/swiper";
import {isClient, loadProductItems, MainUrl} from "#c/functions/index";
import PostCard from "#c/components/Home/PostCard";
import {withTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useNavigate,useParams} from "react-router-dom";

const ProductsSlider = ({cat_id = null, customQuery, delay = 2500, t}) => {
  // console.log("\nProductsSlider==================>");
  let productSliderData = useSelector((st) => {
    return st.store.productSliderData;
  });

  const [tracks, settracks] = useState(isClient ? [] : (productSliderData[cat_id]));
  let params = useParams();

  // const [tracks, settracks] = useState([]);
  // console.log("cat_id:", cat_id);
  // console.log("ProductsSlider:", productSliderData[cat_id]);
  if (isClient)
    useEffect(() => {
      console.log("\nuseEffect ProductsSlider==================>");

      let query = {}, filter = {};
      if (customQuery)
        Object.keys(customQuery).forEach((item) => {
          let main = customQuery[item];
          if (params)
            main = main.replace('params._id', JSON.stringify(params._id))
          console.log('customQuery[item]', item, customQuery, customQuery[item])
          query[item] = JSON.parse(main)
        })

      // console.log("==> loadProductItems() offset:", offset, "filter:", filter, "query:", query);
      if (query) {
        filter = JSON.stringify(query)
      }
      loadProductItems(cat_id, filter).then(res => settracks(res));


    }, []);
  // if (tracks)
  //   console.log("product tracks", tracks.length);
  // if ((tracks && tracks.length > 0))
  return (
    <Suspense fallback={<div> loading... </div>}>
      <div className={"rtl "}>
        {(tracks && tracks.length > 0) && <Swiper>

          {tracks.map((i, idx) => {
            if (!i.slug) {
              i.slug = 'kjhjk'
            }
            return (
              <div className={"swiper-slide"} key={idx}><PostCard item={i}/></div>
            )
          })}
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
