import React,{useState} from "react";
import { Card, Col, Container, Row } from "shards-react";
import { withTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import PageTitle from "#c/components/common/PageTitle";
import LoginForm from "#c/components/components-overview/LoginForm";
import { defaultImg } from "#c/assets/index";
import { savePost } from "#c/functions/index";
import AreaChart from "./component/AreaChart.tsx";
import BarChart from "./component/BarChart.tsx";
import BrushDemo from "./component/BrushDemo.tsx";
import BugReproduce from "./component/BugReproduce.tsx";
import RadarChart from "./component/RadarChart.tsx";
import CartesianAxis from "./component/CartesianAxis.tsx";
import CartesianGrid from "./component/CartesianGrid.tsx";
import Curve from "./component/Curve.tsx";
// import FunnelChart from "./component/FunnelChart.tsx";
import Treemap from "./component/Treemap.tsx";

// class Login extends React.PureComponent {
const Dashboard = ({ t }) => {

  // constructor(props) {
  //   super(props);
  let params = useParams();

  return (
    <Container fluid className="main-content-container px-4">
      {/*<AreaChart />*/}
      {/*<BarChart />*/}
      <BugReproduce />
      {/*<RadarChart />*/}
      {/*<Curve />*/}
      {/*<FunnelChart />*/}
      {/*<CartesianAxis />*/}
      {/*<CartesianGrid />*/}
      {/*<BrushDemo />*/}
      {/*<Treemap />*/}
    </Container>
  );
};

export default withTranslation()(Dashboard);
