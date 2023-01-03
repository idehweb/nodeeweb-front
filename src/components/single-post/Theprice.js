import React  from "react";
import { withTranslation } from "react-i18next";
import { addBookmark, arrayMin, getContactData, getMinPrice } from "#c/functions/index";
import { store } from "#c/functions/store";
import {useSelector} from "react-redux";

import { dFormat, PriceFormat } from "#c/functions/utils";
const Theprice = (props) => {
  let { price, salePrice, t, className, combinations, type } = props;
  if (price) price = PriceFormat(price);
  if (salePrice) salePrice = PriceFormat(salePrice);
  const themeData = useSelector((st) => st.store.themeData);
// return themeData.currency
  if (price == 0 || price == null) {
    console.log("error...", price);

    return <></>;
  }
  if(!themeData.currency){
    themeData.currency='toman';
  }
  return (
    <div className={"thePrice rtl " + className}>
      {/*{price}*/}
      {/*{salePrice}*/}
      <div className={"only-price"}> {Boolean(!salePrice && price != null) &&
      <div className={"wer  mt-2 pandnotsp"}>
                <span className="card-non-title-item">
                          {(type === "variable" && t("from"))}
                  <span className={"mr-2"}>{price +" "+ t(themeData.currency)}</span>
                </span>
      </div>
      }</div>
      <div className={"with-sale-price"}>{Boolean(salePrice && salePrice !== null) && (
        <div className={"wer  mt-2 pandsp"}>
                <span className="card-non-title-item">
                  {salePrice +" "+ t(themeData.currency)}
                </span>
          <span className="card-non-title-item ml-2">
                  <del>{price +" "+ t(themeData.currency)}</del>
                </span>
        </div>
      )}
      </div>
    </div>
  );

};
class Theprice_old extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // phoneNumber: '',
      // email: '',
      // lan: store.getState().store.lan,
      // optionsId: {},
      // combinationsTemp: {},

    };
  }


  render() {
    let { price, salePrice, t, className, combinations, type } = this.props;
    if (price) price = PriceFormat(price);
    if (salePrice) salePrice = PriceFormat(salePrice);
    // console.log("salePrice", salePrice);
    // price = getMinPrice(combinations);
    // console.log("price2", price);

    if (price == 0 || price == null) {
      console.log("error...", price);

      return <></>;
    }
    // console.log("price3", price);
// return 'false'
    return (
      <div className={"thePrice rtl " + className}>
        {/*{price}*/}
        {/*{salePrice}*/}
        <div className={"only-price"}> {Boolean(!salePrice && price != null) &&
        <div className={"wer  mt-2 pandnotsp"}>
                <span className="card-non-title-item">
                          {(type === "variable" && t("from"))}
                  <span className={"mr-2"}>{price +" "+ t(themeData.currency)}</span>
                </span>
        </div>
        }</div>
        <div className={"with-sale-price"}>{Boolean(salePrice && salePrice !== null) && (
          <div className={"wer  mt-2 pandsp"}>
                <span className="card-non-title-item">
                  {salePrice +" "+ t(themeData.currency)}
                </span>
            <span className="card-non-title-item ml-2">
                  <del>{price +" "+ t(themeData.currency)}</del>
                </span>
          </div>
        )}
        </div>
      </div>
    );
  }
}

export default withTranslation()(Theprice);
