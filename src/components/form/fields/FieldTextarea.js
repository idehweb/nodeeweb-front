import React, {useEffect, useState} from 'react';
import {withTranslation} from 'react-i18next';
import {Field} from 'react-final-form'
import {Col} from 'shards-react';
import {getEntities, MainUrl, uploadMedia} from "#c/functions/index";

function FieldTextarea(props) {
  console.log('textAreaFiled',props);
  const {className, name,style,value} = props;
  // const {type, kind, size, className, name, label, placeholder, value} = field;

  let [theVal, setTheVal] = useState(value)

  const changeVal = (e) => {
    setTheVal(e.target.value)
  }
  return  <textarea name={name} className={className}  onChange={(e) => {changeVal(e)}} value={theVal} style={style}/>
}

export default withTranslation()(FieldTextarea);
