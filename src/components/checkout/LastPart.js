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

class LastPart extends React.Component {
  constructor(props) {
    super(props);
    const {t, theParams} = props;
    this.state = {
      lan: store.getState().store.lan || 'fa',
      token: store.getState().store.user.token || '',
      user: store.getState().store.user || {},
      card: store.getState().store.card || [],
      address: theParams.address,
      order_id: store.getState().store.order_id || null,
      paymentMethod: 'zarinpal',
      sum: theParams.sum || 0,
      return_url: '',//window.location.origin + window.location.pathname + 'my-orders',
      deliveryPrice: theParams.deliveryPrice || 0,
      total: theParams.total || 0,
    };
    // this.getSettings();
  }


  render() {
    const {t, _id, onNext, onPlaceOrder, theParams, onPrev} = this.props;
    // let sum = 0;
    console.log('theParams', theParams);
    let {address, setting, total, sum, deliveryPrice} = theParams;
    let {order_id, return_url, card, lan} = this.state;
    console.log(' this.state',  this.state);

    let temp = total;
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
                      className={'prc'}>{(item.price * item.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + t(' UZS')}</div>}
                    {(item.price && item.salePrice) && <div
                      className={'prc'}>{(item.salePrice * item.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + t(' UZS')}
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
              <ListGroupItem className={'d-flex px-3 border-0 '}>
                <div className={'flex-1'}>
                  <div className={'ttl'}>{t('discount code') + ": "}</div>

                </div>
                <div className={'flex-1'}>

                  <GetDiscount price={total} setDiscount={this.setDiscount} order_id={order_id}/>
                </div>
              </ListGroupItem>
              <ListGroupItem className={'d-flex px-3 border-0 '}>
                {[<div className={'flex-1'} key={'xo2'}>
                  <div className={'ttl'}>{t('sum') + ": "}</div>

                </div>,
                  <div className={'flex-1 textAlignRight'} key={'xo3'}>
                    {sum && <div
                      className={'ttl '}>{sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + t(' UZS')}</div>}

                  </div>]}

              </ListGroupItem>
              <ListGroupItem className={'d-flex px-3 border-0 '}>

                {[<div className={'flex-1'} key={'xo4'}>
                  <div className={'ttl'}>{t('delivery') + ": "}</div>

                </div>,
                  <div key={'xo5'} className={'flex-1 textAlignRight'}>
                    <div className={'ttl '}>
                      {(deliveryPrice !== 0) && <div
                        className={'ttl '}>
                        {deliveryPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + t(' UZS')}
                      </div>}

                      {(deliveryPrice === 0) && <div
                        className={'ttl '}>
                        {t('free')}
                      </div>}
                    </div>

                  </div>]}
              </ListGroupItem>
              <ListGroupItem className={'d-flex px-3 border-0 '}>

                {[<div className={'flex-1'} key={'xo6'}>
                  <div className={'ttl'}>{t('total') + ": "}</div>

                </div>,
                  <div key={'xo7'} className={'flex-1 textAlignRight'}>
                    <div
                      className={'ttl '}>{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + t(' UZS')}</div>


                  </div>]}
              </ListGroupItem>
              {Boolean(total > 50000000) && <ListGroupItem className={'d-flex px-3 border-0 '}>

                {[<div className={'flex-1'} key={'xo8'}>
                  <div className={'ttl'}>{'سقف پرداخت اینترنتی ۵۰ میلیون تومان است.'}</div>
                  <div className={'ttl'}>{'باید در چند مرحله پرداخت کنید:'}</div>

                </div>,
                  <div className={'flex-1 textAlignRight'} key={'xo9'}>
                    <PriceChunker price={total} onPlaceOrder={onPlaceOrder}/>
                  </div>]}
              </ListGroupItem>}
            </ListGroup>
            <Col className={"empty " + "height50"} sm={12} lg={12}>

            </Col>
            <ListGroup>
              <ListGroupItem className={'d-flex px-3 border-0 '}>
                <RadioGroup>
                </RadioGroup>
                <form action="https://test.paycom.uz" method="POST" id="payme_form">
                  <input type="hidden" name="account[order_id]" value={order_id}/>
                  <input type="hidden" name="amount" value={sum * 100}/>
                  <input type="hidden" name="merchant" value="60df08856508de80a7a07ada"/>
                  <input type="hidden" name="callback"
                         value={return_url}/>
                  <input type="hidden" name="lang" value="ru"/>
                  <input type="hidden" name="description" value="Оплата заказа №70315"/>
                  {order_id &&
                  <input type="submit" className="button alt" style={{display: 'none'}} id="submit_payme_form"
                         value="Оплатить"/>}

                </form>
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
          {Boolean(total <= 50000000) && <ButtonGroup size="sm left">
            <Button className={''} left={"true"} onClick={() => onPlaceOrder(0)}>{t('Place Order')}</Button>

          </ButtonGroup>}

        </CardFooter>
      </Card>
    );
  }
}

export default withTranslation()(LastPart);
