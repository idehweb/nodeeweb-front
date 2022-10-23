import React ,{useState} from 'react';
import {withTranslation} from 'react-i18next';
import {Field} from 'react-final-form'
import {Col} from 'shards-react';
import {MainUrl, uploadMedia} from "#c/functions/index";

function FieldServer(props) {
  // console.clear();
  let {field} = props;
  const {type, kind, size, className, name, label, placeholder,value} = field;

  let [theVal,setTheVal]=useState(value)
  // console.log('field object', field)

  // return;
  console.log('theVal',theVal)
  return <Col
    sm={size ? size.sm : ''}
    lg={size ? size.lg : ''}
    className={'MGD ' + className}>
    <label htmlFor={name}>{label}</label>
    <Field
      name={name}
      onBlur={e => {
        console.log("blur");
        input.onBlur(e);
      }}
      className="mb-2 form-control">
      {props => {
        let {input}=props;

        }}
    </Field>


  </Col>

}
export default withTranslation()(FieldServer);
