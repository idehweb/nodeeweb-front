import React from "react";
import {Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Col, Row} from "shards-react";
import LoadingComponent from '#c/components/components-overview/LoadingComponent';

import store from "#c/functions/store";
import {withTranslation} from 'react-i18next';
import {
  buy,
  changeAddressArr,
  createOrder,
  getTheChaparPrice,
  getTheSettings,
  goToProduct,
  savePost,
  updateAddress,
  updateCard
} from "#c/functions/index"
// import State from "#c/data/state";

import State from '#c/data/state.json';
import City from '#c/data/city.json';

function GetGateways(prop) {
return 'hi'
}
export default withTranslation()(GetGateways);
