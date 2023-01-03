import React from "react";
import {Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Col, ListGroup, ListGroupItem} from "shards-react";
import {RadioGroup} from '@mui/material';

import store from "#c/functions/store";
import PriceChunker from "./PriceChunker";
// import State from "#c/data/state";
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
import GetDiscount from "./GetDiscount";
import GetGateways from "./GetGateways";

const LastPart2 = (props) => {

}

class LastPart extends React.Component {
  constructor(props) {
    super(props);
    const {t, theParams} = props;
    this.state = {
      lan: store.getState().store.lan || 'fa',
      token: store.getState().store.user.token || '',
      user: store.getState().store.user || {},
      card: store.getState().store.card || [],
      themeData: store.getState().store.themeData || [],
      discount: theParams.discount || null,
      discountCode: theParams.discountCode || null,
      order_id: store.getState().store.order_id || null,
      paymentMethod: 'zarinpal',
      sum: theParams.sum || 0,
      return_url: '',//window.location.origin + window.location.pathname + 'my-orders',
      deliveryPrice: theParams.deliveryPrice || 0,
      amount: theParams.amount || 0,
    };
    // this.getSettings();
  }

  returnAmount = (amount,tax = 0) => {
    // console.log('      this.props.theParams.',      this.props.theParams)
    if(!amount){
      amount=this.state.sum;
    }
    let x = ((tax/100) * this.state.sum)
    amount=amount+x;
    amount=parseInt(amount);
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  returnTaxAmount = (tax = 0) => {
    let x = ((tax/100) * this.state.sum)
    if (x)
      return parseInt(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    else
      return 0
  }

  setDiscount = (discount, v = 'price', code = '') => {
    if (!this.card) {
      this.card = store.getState().store.card;
    }
    if (!this.amount) {
      this.amount = 0;
      this.card.forEach((items) => {
        this.amount += (items.count) * (items.salePrice || items.price);
      })
    }
    if (v == 'price') {
      let ty = this.amount - discount;
      if (ty < 0) {
        ty = 0
      }
      this.props.theParams.setDiscount(discount, code)
      this.props.theParams.setamount(ty)

      return this.setState({discount: discount, amount: ty})
    } else if (v == 'percent') {


      let x = (this.amount * 100) / discount

      let ty = this.amount - x;
      if (ty < 0) {
        ty = 0
      }
      console.log('discount', x)
      console.log('this.amount', ty)
      this.props.theParams.setDiscount(discount, code)

      this.props.theParams.amount = ty;
      this.props.theParams.setamount(ty)

      return this.setState({discount: x, amount: ty})
    }
  }

  render() {
    const {t, _id, onNext, onPlaceOrder, theParams, onPrev} = this.props;
    // let sum = 0;
    console.log('theParams', theParams);
    let {address, setting, amount, sum, deliveryPrice, tax = 9} = theParams;
    let {order_id, return_url, card, lan, themeData, discount, discountCode} = this.state;
    let {currency = 'toman'} = themeData;
    // console.log(' this.state', this.state);
// return JSON.stringify(themeData)
    let temp = amount;
    return (
      <Card className="mb-3 pd-1">
        <CardHeader className={'pd-1'}>
          <div className="kjhghjk">
            <div
              className="d-inline-block item-icon-wrapper ytrerty"
              dangerouslySetInnerHTML={{__html: t('check and pay')}}
            />
          </div>
        </CardHeader>
        <CardBody className={'pd-1'}>
          <Col lg="12">

            {/*<Col lg="12">*/}
            {/*<Row>*/}
            <ListGroup flush className={'card-add checkout'}>

              {card && card.length > 0 && card.map((item, idx2) => {
                //
                // if (item.salePrice) {
                // sum += (item.salePrice * item.count);
                //
                // } else if (item.price && !item.salePrice) {
                // sum += (item.price * item.count);
                // }
                return (<ListGroupItem key={idx2} className="d-flex px-3 border-0 wedkuhg">
                  {/*<ListGroupItemHeading>*/}
                  <div className={'flex-1 txc pt-1'}>
                    <div className={'bge'}>
                      {item.count}
                    </div>
                  </div>
                  <div className={'flex-1 txc pt-1'}>
                    x
                  </div>
                  <div className={'flex-8'}>
                    <div className={'ttl'}>{item.title[lan]}</div>

                  </div>
                  <div className={'flex-2 pl-2'}>
                    {(item.price && !item.salePrice) && <div
                      className={'prc'}>{(item.price * item.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + t(currency)}</div>}
                    {(item.price && item.salePrice) && <div
                      className={'prc'}>{(item.salePrice * item.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + t(currency)}
                      {/*<del*/}
                      {/*className={'ml-2'}>{t('$') + item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</del>*/}
                    </div>}
                  </div>

                  {/*</ListGroupItemHeading>*/}
                </ListGroupItem>);
              })}
              <ListGroupItem className={'d-flex px-3 border-0 '}>
                {'ارسال به: '}
                {address.State + ' - '}
                {address.City + ' - '}
                {address.StreetAddress}
              </ListGroupItem>
              <ListGroupItem className={'d-flex px-3 border-0 '}>
                {'روش ارسال: '}
                {setting.title}

              </ListGroupItem>
              {!discount && <ListGroupItem className={'d-flex px-3 border-0 '}>
                <div className={'flex-1'}>
                  <div className={'ttl'}>{t('discount code') + ": "}</div>

                </div>
                <div className={'flex-1'}>

                  <GetDiscount price={amount} setDiscount={(e, v = 'price', code = '') => {
                    this.setDiscount(e, v, code)
                  }} order_id={order_id}/>
                </div>
              </ListGroupItem>}


              <ListGroupItem className={'d-flex px-3 border-0 '}>
                {[<div className={'flex-1'} key={'xo2'}>
                  <div className={'ttl'}>{t('sum') + ": "}</div>

                </div>,
                  <div className={'flex-1 textAlignRight'} key={'xo3'}>
                    {sum && <div
                      className={'ttl '}>{sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + t(currency)}</div>}

                  </div>]}

              </ListGroupItem>

              {discountCode && <ListGroupItem className={'d-flex px-3 border-0 '}>
                <div className={'flex-1'}>
                  <div className={'ttl'}>{t('discount code') + ": "}</div>

                </div>
                <div className={'flex-1'}>
                  <div key={'xo5'} className={'flex-1 textAlignRight'}>
                    <div
                      className={'ttl '}>{discountCode}</div>
                  </div>

                </div>
              </ListGroupItem>}

              {discount && <ListGroupItem className={'d-flex px-3 border-0 '}>
                <div className={'flex-1'}>
                  <div className={'ttl'}>{t('discount') + ": "}</div>

                </div>
                <div className={'flex-1'}>
                  <div key={'xo5'} className={'flex-1 textAlignRight'}>
                    <div
                      className={'ttl '}>{discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + t(currency)}</div>
                  </div>

                </div>
              </ListGroupItem>}
              <ListGroupItem className={'d-flex px-3 border-0 '}>

                {[<div className={'flex-1'} key={'xo4'}>
                  <div className={'ttl'}>{t('delivery') + ": "}</div>

                </div>,
                  <div key={'xo5'} className={'flex-1 textAlignRight'}>
                    <div className={'ttl '}>
                      {((deliveryPrice > 0)) && <div
                        className={'ttl '}>
                        {deliveryPrice}
                        {deliveryPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + t(currency)}
                      </div>}

                      {(!deliveryPrice || deliveryPrice === 0) && <div
                        className={'ttl '}>
                        {t('free')}
                      </div>}
                    </div>

                  </div>]}
              </ListGroupItem>
              <ListGroupItem className={'d-flex px-3 border-0 '}>

                {[<div className={'flex-1'} key={'xo4'}>
                  <div className={'ttl'}>{t('tax') + ": "}</div>

                </div>,
                  <div key={'xo5'} className={'flex-1 textAlignRight'}>
                    <div className={'ttl '}>
                      {this.returnTaxAmount(tax)+ " " + t(currency)}
                    </div>

                  </div>]}
              </ListGroupItem>
              <ListGroupItem className={'d-flex px-3 border-0 '}>

                {[<div className={'flex-1'} key={'xo6'}>
                  <div className={'ttl'}>{t('amount') + ": "}</div>

                </div>,
                  <div key={'xo7'} className={'flex-1 textAlignRight'}>
                    <div
                      className={'ttl '}>{amount && (this.returnAmount(amount,tax) + " " + t(currency))}</div>


                  </div>]}
              </ListGroupItem>
              <ListGroupItem className={'d-flex px-3 border-0 '}>
                {/*<ListGroup className={'width100'}>*/}
                <GetGateways setPaymentMethod={this.props.theParams.setPaymentMethod}/>
                {/*</ListGroup>*/}
              </ListGroupItem>
              {Boolean(amount > 50000000) && <ListGroupItem className={'d-flex px-3 border-0 '}>

                {[<div className={'flex-1'} key={'xo8'}>
                  <div className={'ttl'}>{'سقف پرداخت اینترنتی ۵۰ میلیون تومان است.'}</div>
                  <div className={'ttl'}>{'باید در چند مرحله پرداخت کنید:'}</div>

                </div>,
                  <div className={'flex-1 textAlignRight'} key={'xo9'}>
                    <PriceChunker price={amount} onPlaceOrder={onPlaceOrder}/>
                  </div>]}
              </ListGroupItem>}
            </ListGroup>
            <Col className={"empty " + "height50"} sm={12} lg={12}>

            </Col>
            <ListGroup>
              <ListGroupItem className={'d-flex px-3 border-0 '}>
                <RadioGroup>
                </RadioGroup>

              </ListGroupItem>
            </ListGroup>

            <hr/>

          </Col>
        </CardBody>
        <CardFooter className={'pd-1'}>
          <ButtonGroup size="sm right">
            <Button className={''} left={"true"} onClick={onPrev}><i
              className="material-icons">{'chevron_right'}</i>{t('prev')}</Button>
          </ButtonGroup>
          {/*{amount}*/}
          {Boolean(amount <= 50000000) && <ButtonGroup size="sm left">
            <Button className={''} left={"true"} onClick={() => onPlaceOrder(0)}>{t('Place Order')}</Button>

          </ButtonGroup>}

        </CardFooter>
      </Card>
    );
  }
}

export default withTranslation()(LastPart);
