import React from 'react';
import { Container, Row, Col } from 'shards-react';
import { withTranslation } from 'react-i18next';

import PageTitle from '#c/components/common/PageTitle';
// import UserDetails from "#c/components/profile/UserDetails";
import UserAccountDetails from '#c/components/profile/UserAccountDetails';

const Profile = ({ t }) => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle
        title={t('user account')}
        subtitle={t('edit details')}
        md="12"
        className="ml-sm-auto mr-sm-auto"
      />
    </Row>
    <div className="w-100">
      <Col lg="8" className="m-auto">
        <UserAccountDetails title={t('account details')} />
      </Col>
    </div>
  </Container>
);

export default withTranslation()(Profile);
