import React, {useEffect, useState} from "react";
import store from "#c/functions/store";
// import Swiper from "#c/components/swiper";
import {getCombination, getPosts, getPostsByCat, handleTitles, MainUrl} from "#c/functions/index";
// import PostCard from "#c/components/Home/PostCard";
import _ from 'lodash'

import {withTranslation} from "react-i18next";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Theprice from "#c/components/single-post/Theprice";
import {isEqual} from "../../../functions";
import AddToCardButton from "#c/components/components-overview/AddToCardButton";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
// import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
const theChip = (props) => {
  // console.log("props", props);
  const {
    combinations,
    options,
    showPrice = () => {
    },
    single,
    photos,
    _id,
    method,
    title,
    t
  } = props;
  let allOptions = [];

  // console.log("allOptions", allOptions);
  console.log('combinations', combinations)
  let choosed = combinations[0], doptions =combinations[0].options, lessPrice = combinations[0].salePrice || combinations[0].price,dstock=combinations[0].in_stock;
  _.forEach(combinations, (combination, j) => {
    let pr = combination.salePrice || combination.price
    let st = combination.in_stock;
    if(!dstock && st){
      lessPrice = pr;
      choosed = combination;
      doptions = combination.options;
      dstock = st;
    }
    if (pr < lessPrice && st) {
      lessPrice = pr;
      choosed = combination;
      doptions = combination.options;
    }
// if(st)
  })
  // return JSON.stringify(lessPrice);
  const [lan, setLan] = useState(store.getState().store.lan);
  const [actives, setActives] = useState(doptions || {});
  const [count, setCount] = useState(options.length);
  const [theCombination, setTheCombination] = useState(choosed || {});

  // const goToPage = (post) => {
  //
  // };
  //
  const onClickChip = (name, e) => {
    console.log("onClickChip", name, e);
    // console.log(count);
    // console.log(name, ":", e.name);
    let obj = {...actives};
    obj[name] = e.name;
    // let co=getCombination(combinations,obj);
    combinations.forEach((comb) => {
      // console.log('condition',condition,Object.is(comb.options,condition));

      if (isEqual(comb.options, obj)) {
        console.log("comb", comb);
        setTheCombination(comb);
      }
    });
    setActives(obj);
    showPrice(obj);
    console.log("obj", obj);
  };

  useEffect(() => {
    console.log("useEffect...", actives);
    showPrice(actives);
    // loadProductItems();
  }, []);

  let inS = ((theCombination.in_stock == "0" || theCombination.in_stock == null) ? false : true);
  // if (!inS && !single)
  //   return;
  console.log('combinations', combinations, theCombination)
  return (
    [<div className={" mt-5 the-chip row"} key={0}>
      <label className={"the-label-inline bigger"}>{t("please choose combination") + ":"}</label>
    </div>,
      <div className={" mt-2 the-chip row"} key={1}>
        <div className={"col-md-8"}> {options && options.map((opt, k) => {
          // console.log("opt", opt);
          return <ChipInside key={k} opt={opt} actives={actives} onClickChip={(e) => {
            onClickChip(opt.name, e);
          }}/>;
        })}</div>
        <div className={"col-md-4"}>{Boolean(theCombination) && <div className={"the-option-price text-center"}>

          <div className={"gfd"}>
            {/*{theCombination.price}/*/}
            <Theprice className={"single single-let " + theCombination.salePrice + " - " + theCombination.price}
                      price={theCombination.price}
                      in_stock={inS}
                      salePrice={theCombination.salePrice}/>
          </div>
          {inS && method === "list" && !single && <>
            <div className={"the-option-actions " + inS}>
              <AddToCardButton item={{
                _id: _id + "DDD" + theCombination,
                title: {
                  [lan]: title[lan] + " - " + handleTitles(theCombination)
                },
                // mainTitle: title,
                photos: photos,
                single: true,
                in_stock: inS,
                quantity: parseInt(theCombination.quantity),
                price: theCombination.price,
                type: "variable",
                // comb_id:comp.id,
                salePrice: theCombination.salePrice
              }}/>
            </div>
          </>}
          {single && <>
            <div className={"the-option-actions " + inS}>
              <AddToCardButton item={{
                _id: _id + "DDD" + theCombination.id,
                title: {
                  [lan]: title[lan] + " - " + handleTitles(theCombination)
                },
                photos: photos,
                single: true,
                in_stock: inS,
                quantity: parseInt(theCombination.quantity),
                price: theCombination.price,
                type: "variable",
                // comb_id:comp.id,
                salePrice: theCombination.salePrice
              }}/>
            </div>
          </>}
        </div>}
        </div>
      </div>]
  );
};
const ChipInside = ({opt, actives, onClickChip}) => {
  let [state, setState] = useState({});
  const onClick = (val, j) => {
    // console.log(val, j);
    onClickChip(val);
    // setState({...state,})
  };
  return (
    <Stack direction="row" className={" mt-2 wrap-stack"} spacing={1}>
      <label className={"the-label-inline"}>{opt.name + ":"}</label>
      {(opt.values && opt.values.length) &&
      (opt.values).map((val, j) => {
        return <Chip
          key={j}
          icon={(actives && (actives[opt.name] === val.name)) ? <RadioButtonCheckedIcon/> : <RadioButtonUncheckedIcon/>}
          variant={(actives && (actives[opt.name] === val.name)) ? "filled" : "outlined"}
          className={(actives && (actives[opt.name] === val.name)) ? "active" : ""} label={val.name}
          onClick={(e) => {
            onClick(val, j);
          }}/>;
      })}


    </Stack>
  );
};

export default withTranslation()(theChip);
