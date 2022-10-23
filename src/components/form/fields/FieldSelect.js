import React ,{useState} from 'react';
import {withTranslation} from 'react-i18next';
import {Field} from 'react-final-form'
import {Col} from 'shards-react';
import {MainUrl, uploadMedia} from "#c/functions/index";

function FieldSelect(props) {
  // console.clear();
  let {field} = props;
  const {type, kind, size, className, name, label,options, placeholder,value} = field;

  let [theVal,setTheVal]=useState(value)
  // console.log('field object', field)

  // return;
  return <Col
    sm={size ? size.sm : ''}
    lg={size ? size.lg : ''}
    className={'MGD ' + className}>
    <label htmlFor={name}>{label} - select</label>
    <Field
      name={name}
      component="select"
      type="select"
      placeholder={'value'}

      className="mb-2 form-control"
    >
      {/*<option/>*/}
      {options && options.map((ch, c) => {
        return <option value={ch.value}>{ch.label}</option>
      })}

    </Field>

  </Col>
}

export default withTranslation()(FieldSelect);
