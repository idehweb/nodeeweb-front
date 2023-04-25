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
import AlertPopup from "#c/components/components-overview/AlertPopup";
const theChip = (props) => {
  let [showPop, setShowPop] = useState(false);
  const onSelectWarranty =(e)=>{
    setShowPop(e)
  }
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
    t,
    requireWarranty
  } = props;
  let allOptions = [];

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
  const [canBuy,setCanBuy] = useState(false);
  const onClickChip = (name, e) => {
    if(requireWarranty){
      if(e.key >0){
        setCanBuy(!canBuy)
      }else{
        setCanBuy(false)
      }
    }

      let obj = {...actives};
      obj[name] = e.name;
      combinations.forEach((comb) => {
        if (isEqual(comb.options, obj)) {
          console.log("comb", comb);
          setTheCombination(comb);
        }
      });
      setActives(obj);
      showPrice(obj);
  };

  useEffect(() => {
    console.log("useEffect...", actives);
    showPrice(actives);
    // loadProductItems();
  }, []);

  let inS = ((theCombination.in_stock == "0" || theCombination.in_stock == null) ? false : true);
  return (
    [<div className={" mt-5 the-chip row"} key={0}>
      {
        !requireWarranty && (
          <label className={"the-label-inline bigger"}>{t("please choose combination") + ":"}</label>
        )
      }

        {
        showPop && (
          <AlertPopup title={t("please choose combination") + ":"} show={showPop}  onHandler={(e)=>setShowPop(e)}>
                  {options && options.map((opt, k) => {
                                  return <ChipInside key={k} opt={opt} actives={actives} onClickChip={(e) => {
                                    onClickChip(opt.name, e);
                                  }}/>;
                  })}
            </AlertPopup>
        )
      }

    </div>,
      <div className={" mt-2 the-chip row"} key={1}>
        <div className={"col-md-8"}>
           {options && !requireWarranty &&  options.map((opt, k) => {
                return <ChipInside key={k} opt={opt} actives={actives} onClickChip={(e) => {
                  onClickChip(opt.name, e);
                }}/>;
            })}
        </div>
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
              <AddToCardButton onSelectWarranty={(e)=>onSelectWarranty(e)} item={{
                canBuy:canBuy,
                requireWarranty:requireWarranty,
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
              <AddToCardButton onSelectWarranty={(e)=>onSelectWarranty(e)}  item={{
                canBuy:canBuy,
                 requireWarranty:requireWarranty,
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
    onClickChip(val);
  };

  return (
    <Stack direction="row" className={" mt-2 wrap-stack"} spacing={1}>
      <label className={"the-label-inline"} style={{width:'100%'}}>{opt.name + ":"}</label>
      
      {(opt.values && opt.values.length) &&
      (opt.values).map((val, j) => {
        return <Chip
          key={j}
          icon={(actives && (actives[opt.name] === val.name)) ? <RadioButtonCheckedIcon style={{marginRight:'10px'}}/> : <RadioButtonUncheckedIcon style={{marginRight:'10px'}}/>}
          variant={(actives && (actives[opt.name] === val.name)) ? "filled" : "outlined"}
          className={(actives && (actives[opt.name] === val.name)) ? "active" : ""} label={val.name}
          onClick={(e) => {
            Object.assign(val,{key:j})
            onClick(val, j);
          }}/>;
      })}


    </Stack>
  );
};

export default withTranslation()(theChip);
