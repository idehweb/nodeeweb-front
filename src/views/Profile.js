import React, {useState} from 'react';
import {Col, Container, Nav, NavItem, NavLink, Row} from 'shards-react';
import {withTranslation} from 'react-i18next';
import UserDetails from "#c/components/profile/UserDetails";
import UserAccountDetails from '#c/components/profile/UserAccountDetails';
import MyOrders from '#c/components/profile/MyOrders';
import MyTransactions from '#c/components/profile/MyTransactions';
import MyPazireshha from '#c/components/profile/MyPazireshha';
import MyRequests from '#c/components/profile/MyRequests';
import {useLocation} from 'react-router-dom';
import CONFIG from "#c/config";
export const MainUrl = CONFIG.BASE_URL;

const Profile = ({t}) => {
  const location = useLocation();
  let {hash = 'profile'} = location;
  // const myQuery  = location.search;
  // console.log('location',location)
  // console.log('myQuery',myQuery)
  hash = hash.replace('#','')
  if(!hash){
    hash='profile'
  }
  console.log('hash',hash)
  const [tab, setTab] = useState(hash);

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        {/*<PageTitle*/}
        {/*title={t('user account')}*/}
        {/*subtitle={t('edit details')}*/}
        {/*md="12"*/}
        {/*className="ml-sm-auto mr-sm-auto"*/}
        {/*/>*/}
      </Row>
      <div className="row">
        <Col lg="4">
          <div className="sticky">
            <UserDetails/>
            <Nav justified={true} tabs={true} className={"post-product-nav profile-nav vertical-nav"}>
              <NavItem>
                <NavLink active={tab === "profile"} href="#profile"
                         onClick={() => setTab("profile")}>
                  {/*<EditAttributesIcon className={"ml-2"}/>*/}
                  <span
                    className={""}>{t("profile")}</span></NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={tab === "my-orders"} href="#my-orders"
                         onClick={() => setTab("my-orders")}>
                  {/*<EditAttributesIcon className={"ml-2"}/>*/}
                  <span
                    className={""}>{t("my orders")}</span></NavLink>
                {/*<Link*/}
                {/*className={'nav-link'}*/}
                {/*to="/my-orders"*/}
                {/*>*/}
                {/*/!*<DescriptionIcon className={"ml-2"}/>*!/*/}
                {/*<span*/}
                {/*className={""}>{t("my orders")}</span></Link>*/}
              </NavItem>

              <NavItem>
                <NavLink active={tab === "transactions"} href="#transactions" onClick={() => setTab("transactions")}>
                  {/*<ReviewsIcon className={"ml-2"}/>*/}

                  <span className={""}>{t("transactions")}</span></NavLink>
              </NavItem>
              {(MainUrl.indexOf('arvandguarantee') !== -1) && <NavItem>
                <NavLink active={tab === "pazireshha"} href="#pazireshha" onClick={() => setTab("pazireshha")}>
                  {/*<ReviewsIcon className={"ml-2"}/>*/}

                  <span className={""}>{t("pazireshha")}</span></NavLink>
              </NavItem>}
              {/*<NavItem>*/}
                {/*<NavLink active={tab === "requests"} href="#requests" onClick={() => setTab("requests")}>*/}
                  {/*/!*<ReviewsIcon className={"ml-2"}/>*!/*/}

                  {/*<span className={""}>{t("requests")}</span></NavLink>*/}
              {/*</NavItem>*/}
            </Nav>
          </div>
        </Col>
        <Col lg="8" className="m-auto">
          {tab === "profile" && <div className={"pt-0"} id={"description"}>
            <UserAccountDetails title={t('account details')}/>

          </div>}
          {tab === "my-orders" && <div className={"pt-0"} id={"my-orders"}>
            <MyOrders title={t('my orders')}/>

          </div>}
          {tab === "transactions" && <div className={"pt-0"} id={"transactions"}>
            <MyTransactions title={t('transactions')}/>

          </div>}
          {tab === "requests" && <div className={"pt-0"} id={"requests"}>
            <MyRequests title={t('requests')}/>

          </div>}
          {tab === "pazireshha" && <div className={"pt-0"} id={"pazireshha"}>
            <MyPazireshha title={t('pazireshha')}/>

          </div>}
        </Col>
      </div>
      <div style={{height: '100px'}}></div>
    </Container>
  );
}

export default withTranslation()(Profile);
