import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import {Button,ButtonGroup} from "shards-react";

import { dFormat, PriceFormat } from "#c/functions/utils";
import { addItem, MainUrl, removeItem } from "#c/functions/index";
import { defaultImg } from "#c/assets/index";
import { store } from "#c/functions/store";

function PriceChunker({ price,onPlaceOrder, children, t }) {
  let temp = price,priceArr=[];
  // let [priceArr, SetPriceArr] = useState([]);
  while (temp > 50000000) {
    priceArr.push(50000000);
    temp -= 50000000;
  }
  if(temp>0 && temp <=50000000){
    priceArr.push(temp);

  }
  return (
    <div className="PriceChunker">
      {priceArr && priceArr.map((p,k)=>{
        return(<div className={'s mb-2'} key={k}>
          <span className={'price-part ml-2'}> {p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + t(' UZS')}</span>

          <ButtonGroup size="sm left">

          <Button className={'place-order '} left={"true"} onClick={(e)=>onPlaceOrder(p)}>{t('Place Order')}</Button>
          </ButtonGroup>
        </div>)
      })}
      {children}
    </div>
  );
}

export default withTranslation()(PriceChunker);
