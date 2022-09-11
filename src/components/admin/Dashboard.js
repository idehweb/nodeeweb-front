import React,{useState} from "react";
import { Card, Col, Container, Row } from "shards-react";
import { withTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import PageTitle from "#c/components/common/PageTitle";
import LoginForm from "#c/components/components-overview/LoginForm";
import { defaultImg } from "#c/assets/index";
import { savePost } from "#c/functions/index";

// class Login extends React.PureComponent {
const Dashboard = ({ t }) => {

  // constructor(props) {
  //   super(props);
  let params = useParams();

  return (
    <Container fluid className="main-content-container px-4">
      jhghj
    </Container>
  );
};

export default withTranslation()(Dashboard);
