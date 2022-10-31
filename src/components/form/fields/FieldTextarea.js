import React, {useEffect, useState} from 'react';
import {withTranslation} from 'react-i18next';
import {Field} from 'react-final-form'
import {Col} from 'shards-react';
import {getEntities, MainUrl, uploadMedia} from "#c/functions/index";

function FieldTextarea(props) {
  // console.clear();
  let {field,t} = props;
  const {type, kind, size, className, name, label, placeholder, value} = field;

  let [theVal, setTheVal] = useState(value)

  const changeVal = (e) => {
    console.log(e.target.value)
    setTheVal(e.target.value)
  }
  // return;
  console.log('theVal', theVal)
  return <Col
    sm={size ? size.sm : ''}
    lg={size ? size.lg : ''}
    className={'MGD ' + className}>
    <label htmlFor={name}>{label ? t(label) : t(name)}</label>

    <Field
      name={name}
      onBlur={e => {
        console.log("blur");
        input.onBlur(e);
      }}
      className="mb-2 form-control">
      {props => {
        let {input} = props;
        return <textarea name={name} onChange={(e) => {
          changeVal(e)
        }} value={theVal} type={"text"}/>
      }}
    </Field>

  </Col>

}

export default withTranslation()(FieldTextarea);
