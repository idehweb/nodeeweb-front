import React from "react";
import {Button, Card, CardHeader, ListGroup, ListGroupItem} from "shards-react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import store from '#c/functions/store';

const UserDetails = ({
                       userDetails = {
                         name: 'john doe',
                         metaTitle: 'john doe',
                         metaValue: 'john doe',
                         jobTitle: 'business man',
                         avatar: '',
                         address: [],
                       }
                     }) => {
  let st = store.getState().store.user;
  // this.state = {
  //   phoneNumber: st.phoneNumber,
  //   firstName: st.firstName,
  //   lastName: st.lastName,
  //   email: st.email,
  //   internationalCode: st.internationalCode,
  // };
  if (st.firstName && st.lastName) {
    userDetails.name = st.firstName + ' ' + st.lastName;
  }
  if (st.phoneNumber) {
    userDetails.jobTitle = st.phoneNumber;
  }

  return (
    <Card small={'true'} className="mb-5 pt-3 profile-box">
      <CardHeader className="border-bottom text-center">
        <div className="mb-3 mx-auto">
          <AccountCircleIcon
            className={"humanprofile"}
          />
        </div>
        <h4 className="mb-0">{userDetails.name}</h4>
        <span className="text-muted d-block mb-2">{userDetails.jobTitle}</span>
        {/*<Button pill outline size="sm" className="mb-2">*/}
          {/*<i className="material-icons mr-1">person_add</i> Follow*/}
        {/*</Button>*/}
      </CardHeader>

    </Card>
  );
}


export default UserDetails;
