import React from "react";
import { Col, Container, Row } from "shards-react";

import PageTitle from "../components/common/PageTitle";
// import State from "#c/data/state";
import GetInformation from "#c/components/checkout/GetInformation";
import GetAddress from "#c/components/checkout/GetAddress";
import GetDelivery from "#c/components/checkout/GetDelivery";
import LastPart from "#c/components/checkout/LastPart";
import { withTranslation } from "react-i18next";
import { buy, createOrder, isClient, updatetStatus } from "../functions/index";
import { Navigate } from "react-router-dom";
import store from "../functions/store";
import { toast } from "react-toastify";


class Checkout extends React.Component {
  constructor(props) {
    super(props);
    const { t } = props;
    let ref = this;
    this.state = {
      redirect_url: "/login",
      redirect: null,
      page: "1",
      total: 0,
      sum: 0,
      card: store.getState().store.card || [],
      user: store.getState().store.user || [],
      order_id: store.getState().store.order_id || [],
      setting: {},
      paymentMethod: "zarinpal",
      deliveryPrice: 0,
      token: store.getState().store.user.token || "",
      firstName: store.getState().store.user.firstName || "",
      lastName: store.getState().store.user.lastName || "",
      internationalCode: store.getState().store.user.internationalCode || null,
      the_address: {}
    };
    this.updateTheStatus();
  }

  updateTheStatus(status = "checkout") {
    updatetStatus(status);
  }

  goNext(page) {
    console.log("page", page);
    this.setState({ page: page });

  }

  onSetAddress(params) {
    console.log("onSetAddress", params);
    this.setState({ the_address: params });

  }

  onChooseDelivery(params) {
    console.log("onChooseDelivery", params);
    this.setState(params);

  }

  placeOrder(theprice = 0) {
    console.log("placeOrder...", theprice);
    let { address, hover, deliveryPrice, hoverD, order_id, card, setting, user, sum, paymentMethod, return_url, total, the_address } = this.state;
    const { t } = this.props;
    sum = 0;
    card.map((item, idx2) => {

      sum += (item.salePrice || item.price) * item.count;

    });
    let order = {
      deliveryDay: setting,
      billingAddress: the_address,
      card: card,
      customer_data: user,
      sum: sum,
      deliveryPrice: deliveryPrice,
      total: total,
      customer: user._id,
    };
    if(order_id){
      order['order_id']=order_id
    }
    // console.log('user',user);
    // return;
    if (!user.internationalCode) {
      toast(t("Please enter international code!"), {
        type: "error"
      });
      return;
    }
    if (!user.firstName) {
      toast(t("Please enter first name!"), {
        type: "error"
      });
      return;
    }
    if (!user.lastName) {
      toast(t("Please enter last name!"), {
        type: "error"
      });
      return;
    }
    if (!order.billingAddress || (order.billingAddress && order.billingAddress.length < 1)) {
      toast(t("Please enter address!"), {
        type: "error"
      });
      return;

    }
    toast(t("Submitting order..."), {
      type: "success"
    });
    console.clear();
    console.log('order',order);
    console.log('paymentMethod',paymentMethod);
    // return;
    if (paymentMethod === "zarinpal") {

      createOrder(order).then((res) => {

        // console.log('res for judytgs is:', res.order._id);
        if (!res.success) {

          toast(t(res.message), {
            type: "error"
          });
          return 0;
        }
        toast(t("Submitting transaction..."), {
          type: "success"
        });
        buy(res.order._id, {}, theprice).then((add) => {
          if (add.success)
            toast(t("Navigateing..."), {
              type: "success"
            });
          if (!add.success)
            return toast(t("Error..."), {
              type: "error"
            });
          console.log("ass", add);
          if (isClient)
            window.location.replace(add.url);
        });
      });
    }

    if (paymentMethod === "mellat") {

      toast(t("Mellat payment gateway is not accessible!"), {
        type: "error"
      });
      return;
    }

  }

  render() {
    const { t, _id } = this.props;
    // let sum = 0;
    let { renTimes, order_id, paymentMethod, deletModals, return_url, the_address, redirect, redirect_url, page, sum, modals, token, address, hover, hoverD, total, deliveryPrice, setting, firstName, lastName, internationalCode } = this.state;
    // sum = 0;
    let dp = 0;
    // console.log('sum', sum);
    // console.log('card', card);
    // console.log('settings', settings);

    // return null;
    if (!firstName || !lastName || !internationalCode) {
      redirect = true;
      redirect_url = "/login/goToCheckout";
    }
    if (!token) {
      redirect = true;
    }
    if (redirect) {
      console.log("redirect_url", redirect, redirect_url);
      // if (!_id) {
      //   _id = this.props.match.params._id;
      // }
      // this.cameFromProduct(_id);
      // Promise.all([savePost({goToCheckout: true})]).then(() => {
      return <Navigate to={redirect_url} push={false} exact={true}/>;

      // })
      // ;
    }
    // } else {
    return (
      <Container fluid className="main-content-container px-4 maxWidth1200">
        <Row noGutters className="page-header py-4">
          <PageTitle title={t("Submit order")} subtitle={t("order details")} md="12"
                     className="ml-sm-auto mr-sm-auto"/>
        </Row>
        {page == "1" && <Row>
          <Col lg="2"></Col>
          <Col lg="8">
            <GetInformation onNext={() => this.goNext("2")}/>
          </Col>
          <Col lg="2"></Col>
        </Row>}
        {page == "2" && <Row>


          <Col lg="2"></Col>
          <Col lg="8">
            <GetAddress onNext={() => this.goNext("3")} onSetAddress={(params) => this.onSetAddress(params)}
                        onPrev={() => this.goNext("1")}/>

          </Col>
          <Col lg="2"></Col>


        </Row>}
        {page == "3" && <Row>


          <Col lg="2"></Col>
          <Col lg="8">

            <GetDelivery onNext={() => this.goNext("4")} onChooseDelivery={(params) => {
              this.onChooseDelivery(params);
            }} addressChoosed={the_address}
                         onPrev={() => this.goNext("2")}/>

          </Col>
          <Col lg="2"></Col>


        </Row>}
        {page == "4" && <Row>


          <Col lg="2"></Col>
          <Col lg="8">
            <LastPart onPrev={() => this.goNext("3")} onPlaceOrder={(e) => {
              this.placeOrder(e);
            }} theParams={{ sum, total, deliveryPrice, address: the_address, setting }}/>
          </Col>
          <Col lg="2"></Col>


        </Row>}
      </Container>
    );
    // }
  }
}

export default withTranslation()(Checkout);
