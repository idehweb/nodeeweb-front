import React from 'react';
import {Card, CardBody, Col, Container, Row} from 'shards-react';
import {Link} from "react-router-dom";
import {withTranslation} from 'react-i18next';

import PageTitle from '#c/components/common/PageTitle';
import {getMyPazireshha} from '#c/functions/index';

import {dateFormat} from '#c/functions/utils';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
class MyPazireshha extends React.Component {
  constructor(props) {
    super(props);
    let ref = this;
    const {t} = props;
    this.state = {
      data: [],
      redirect: false,
      newText: 'You did not created an order until now! please create one...',
      buttonText: 'create order',
      headCells: [
        {
          id: 'orderNumber',
          numeric: false,
          disablePadding: true,
          label: t('order number'),
        },
        {id: 'sum', numeric: false, disablePadding: true, label: t('sum')},
        {
          id: 'status',
          numeric: false,
          disablePadding: true,
          label: t('status'),
        },
        {
          id: 'paymentStatus',
          numeric: false,
          disablePadding: true,
          label: t('payment status'),
        },

        // {id: 'views', numeric: false, disablePadding: true, label: t('Views count')},
        // {id: 'getContactData', numeric: false, disablePadding: true, label: t('click count')},
        {
          id: 'createdAt',
          numeric: false,
          disablePadding: true,
          label: t('created at'),
        },
        {
          id: 'updatedAt',
          numeric: false,
          disablePadding: true,
          label: t('updated at'),
        },
        {
          id: 'actions',
          button_text: t('view order'),
          numeric: false,
          disablePadding: true,
          label: t('actions'),
          edit: true,
          editAction: function (_id) {
            ref.redirectTrue(_id);
          }
        },
      ],
    };
    this.getMyOrdersF();
  }

  redirectTrue(_id) {
    // getMyPost(_id).then((data) => {
    //   savePost(data);
    this.props.history.push('/order/' + _id);
    // this.setState({
    //   redirect: true
    // })
    // });
  }
  distStatus(response = {}){
    // console.log('distStaus()')
    // console.log('response.repairrejected ', response.repairrejected)
    // console.log('response.noproblem ', response.noproblem)
    // console.log('response.repairable ', response.repairable)
    // console.log('response.eastimate ', response.eastimate)
    // console.log('response.unrepairable ', response.unrepairable)
    // console.log('response.repaired ', response.repaired)
    // console.log('response.archive ', response.archive)
    // console.log('response.repairaccepted ',response.repairaccepted )

    if ( response.repairaccepted instanceof Array) {
      response.repairaccepted = response.repairaccepted[0]
    }
    // console.log('response.repairaccepted ', response.repairaccepted)

    var steps = {
      'step1': 'تعمیر پذیرفته شده', //
      'step2': 'منتظر سرویس',
      'step3': 'منتظر هماهنگی با مشتری',
      'step4': 'غیرقابل سرویس',
      'step5': 'آماده تحویل',
      'step6': 'در حال سرویس',
      'step7': 'سرویس شده',
      'step8': 'تعمیر پذیرفته نشده',
      'step9': 'منتظر بازدید تکنسین',
      'step10': 'انصراف از تعمیر به درخواست مشتری',
      'step11': 'ایرادی مشاهده نشد',
      'step12': 'تحویل داده شد',
    };
    // console.log('response.eastimate && response.repairaccepted && response.repairable && response.repaired', response.eastimate, response.repairaccepted, response.repairable, response.repaired)
    if (response.archive ) {
      console.log('step12')

      return steps['step12'];
    }
    if (response.repairaccepted && response.eastimate && response.unrepairable) {
      console.log('step4')

      return steps['step4'];
    }




    if (response.eastimate && response.repairaccepted && response.repairable && response.repaired) {
      console.log('step7')

      return steps['step7'];
    }

    if (!response.eastimate && response.repairaccepted && response.repairable && response.repaired) {
      console.log('step5')

      return steps['step5'];
    }
    // if (!response.eastimate && response.repairaccepted && response.repairable && response.repaired) {
    //     console.log('step5')
    //
    //     return steps['step5'];
    // }

    // if (!response.eastimate && response.repairaccepted && response.repairable && response.repaired) {
    //     console.log('step12')
    //
    //     return steps['step12'];
    // }
//    console.log(`repairaccepted: ${response.repairaccepted}, repairable: ${response.repairable}, eastimate: ${response.eastimate}`)
    if ((response.repairaccepted && response.repairable) || response.eastimate) {
      console.log('step6')

      return steps['step6'];
    }
    if ((response.eastimate && response.repairaccepted) || response.repairaccepted) {
      console.log('step2')

      return steps['step2'];
    }


    if (!response.repairrejected && !response.repairaccepted && !response.noproblem && !response.repairable && !response.eastimate && !response.unrepairable && !response.repaired) {
      console.log('step9')

      return steps['step9'];
    }

    if (response.repairrejected && response.eastimate) {
      console.log('step10')

      return steps['step10'];
    }
    if (response.noproblem) {
      console.log('step11')
      return steps['step11'];
    }
    if (response.eastimate) {
      console.log('step3')

      return steps['step3'];
    }


  };
  getMyOrdersF() {
    const {t} = this.props;
    getMyPazireshha().then((data) => {
      if (data && data.length > 0)
        data.map((post) => {
          if (post.createdAt) post.createdAt = dateFormat(post.createdAt);

          if (post.updatedAt) post.updatedAt = dateFormat(post.updatedAt);
          if (post && post['sum']) {
            post['sum'] =
              post['sum'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + t(' UZS');

            if (post && post['amount']) {
              post['amount'] =
                post['amount'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + t(' UZS');
            }
            if (post && post['deliveryPrice']) {
              post['deliveryPrice'] =
                post['deliveryPrice'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + t(' UZS');
            }
            // link['kind']=t('product');
          }
          // if (post && post['status']) {
            let status=this.distStatus(post)
          post['status_cl'] =
            'bg-success text-white text-center rounded p-3 iii';
            switch (post['status']) {
              case 'false':
                post['status'] = t('unsuccessful');
                post['status_cl'] =
                  'bg-error text-white text-center rounded p-3 iii';
                break;
              case false:
                post['status'] = t('unsuccessful');
                post['status_cl'] =
                  'bg-error text-white text-center rounded p-3 iii';
                break;
              case 'true':
                post['status'] = t('confirmed');
                post['status_cl'] =
                  'bg-success text-white text-center rounded p-3 iii';
                break;
              case true:
                post['status'] = t('complete');
                post['status_cl'] =
                  'bg-success text-white text-center rounded p-3 iii';
                break;
              default:
                break;
            }
            post['status']=status
          // }else{
          //   post['status'] = 'تعمیر پذیرفته شده';
          //   post['status_cl'] =
          //     'bg-error text-white text-center rounded p-3 iii';
          // }
          if (post && post['paymentStatus']) {
            switch (post['paymentStatus']) {
              case 'paid':
                post['paymentStatus'] = t('successful');
                post['paymentStatus_cl'] =
                  'bg-success text-white text-center rounded p-3 iii';
                break;
              case 'notpaid':
                post['paymentStatus'] = t('not paid');
                post['paymentStatus_cl'] =
                  'bg-warning text-white text-center rounded p-3 iii';
                break;
              case 'unsuccessful':
                post['paymentStatus'] = t('unsuccessful');
                post['paymentStatus_cl'] =
                  'bg-error text-white text-center rounded p-3 iii';
                break;
              default:
                break;
            }
          }

          return 0;
        });
      this.setState({
        data: data,
      });
    });
  }
  returnNormalPrice (price) {
    // console.log('price',price)
    // return
    if (price) {

      price = price.toString().trim();
      let p = price.split(/\s+/)
      p = parseInt(p.toString().replace(/,/g, ""))
      console.log('p', p)
      return p
    }
  }
  render() {
    let {t} = this.props;
    let {data, headCells, newText, buttonText} = this.state;
    // if (redirect) {
    //   return <Navigate to='/add-new-post'/>;
    // } else {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="12"
            title={'پذیرش های من'}
            subtitle={t('user account')}
            className="text-sm-left"
          />
        </Row>

        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardBody className="p-2 pb-3">
                <Row>

                  {data && data.reverse().map((dat, i) => {
                    return (<Col lg={12} md={12} sm={12} xs={12}>
                      <div className={'the-order mb-3'}>
                        <div className={'the-order-purple p-4'}>
                          <div className={'the-order-title the-whole-block'}>
                            <div className={'the-order-first-part'}>
                              <div className={'the-order-number'}> {t('#') + dat.cno}</div>
                              {dat.order && <div className={'the-order-number'}><Link to={'/order-details/'+dat.order._id}>{t('Order #') + (dat.order.orderNumber)}</Link></div>}

                              <div className={'the-order-status-main '}>

                                <div className={'the-order-body-line'}>
                                  <span className={'order-label'}>{t('Recieption Status')}
                                    :</span>
                                  <span className={dat.status_cl}><span
                                    className={'gfdsdf'}>{t(dat.status)}</span></span>
                                </div>
                                <div className={'the-order-body-line'}>
                                  <span className={'order-label'}>{t('reciept')}
                                    :</span>
                                  <span className={dat.paymentStatus_cl}> {dat.reciept}</span>
                                </div>
                                <div className={'the-order-body-line'}>
                                  <span className={'order-label'}>{t('prediag')}
                                    :</span>
                                  <span> {dat.prediag}</span>
                                </div>
                                <div className={'the-order-body-line'}>
                                  <span className={'order-label'}>{t('fullname')}
                                    :</span>
                                  <span> {dat.fullname}</span>
                                </div>

                              </div>

                            </div>
                            <div className={'the-order-body-line'}>
                              <div className={'the-order-body-line'}>
                                <span className={'order-label'}>{t('enter date')}
                                  :</span>
                                {dateFormat(dat.m_enterdate)}
                              </div>
                              <div className={'the-order-body-line'}>
                                <span className={'order-label'}>{t('app')}
                                  :</span>
                                {(dat.app)}
                              </div>
                              <div className={'the-order-body-line'}>
                                <span className={'order-label'}>{t('brand')}
                                  :</span>
                                {(dat.brand)}
                              </div>
                              {dat.amount && <div className={'the-order-body-line totalPrice'}>
                                <span className={'order-label'}>{t('Total Price')}
                                  :</span>
                                {dat.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+ t(' UZS')}
                              </div>}
                              {/*<div className={'the-order-body-line'}>*/}
                                {/*<Link*/}
                                  {/*className={'gfdsdf'} to={'/order-details/' + dat._id}><OpenInNewIcon/>{t("view items")}</Link>*/}
                              {/*</div>*/}
                            </div>
                          </div>


                        </div>
                      </div>
                    </Col>)
                  })}
                </Row>
                {/*<Table*/}
                {/*data={data}*/}
                {/*headCells={headCells}*/}
                {/*newText={newText}*/}
                {/*buttonText={buttonText}*/}
                {/*/>*/}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
    // }
  }
}

export default withTranslation()(MyPazireshha);
