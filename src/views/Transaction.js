import React from "react";
import {Button, Container} from "shards-react";
import {withTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {updateStatus} from "../functions/index";

class Transaction extends React.Component {
  constructor(props) {
    super(props);
    let url = new URL(window.location.href);
    let Status = url.searchParams.get("Status") || url.searchParams.get("status") || "";
    let Authority = url.searchParams.get("Authority") || url.searchParams.get("trackId") || "";
    if (Status == '1' || Status == 1) {

      Status = 'OK';
    }
    if (Status == '2' || Status == 2) {

      Status = 'OK';
    }
    this.state = {
      Status: Status,
      Authority: Authority
    };
    updateStatus(Status, Authority).then(() => {

    });

  }

  render() {
    const {Status} = this.state;
    const {t} = this.props;
    let tel = {};
    if (Status === 'OK') {
      tel['title'] = t('Transaction was successful!');
      // tel['description']=t('Transaction was successful!');
    } else {
      tel['title'] = t('Transaction was unsuccessful!');
      // tel['description']=t('Transaction was successful! Please contact the admin!');
    }

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <div className="error">
          <div className="error__content">
            <h2>{Status}</h2>
            <h3>{tel['title']}</h3>
            {/*<p>{tel['description']}</p>*/}
            <Link to={"/"}><Button pill>&larr; {t('Go Back')}</Button></Link>
          </div>
        </div>
      </Container>
    );
  }
}

export default withTranslation()(Transaction);
