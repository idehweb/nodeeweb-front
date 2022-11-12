import React, {useEffect, useState} from 'react';
import {withTranslation} from 'react-i18next';
import {Field} from 'react-final-form'
import {Col} from 'shards-react';
// import {MainUrl, uploadMedia} from "#c/functions/index";
import {getEntitiesForAdmin, MainUrl, uploadMedia} from "#c/functions/index";

function FieldSelect(props) {
  // console.clear();
  let {field, t} = props;
  // console.log('field', field);
  // const {type, kind, size, className, name, label,options=[], placeholder,value} = field;
  let {type, kind, size, className, entity, optionName, optionValue, onChange, searchbox = true, options = [], limit = 1000, name, label, placeholder, value} = field;

  let [theVal, setTheVal] = useState(value)
  // console.log('field object', field)

  let [list, setList] = useState(options || [])
  let [search, setSearch] = useState('')
  // console.log('field object', field)
  useEffect(() => {
    if (limit) {
      limit = parseInt(limit)
    }
    if (entity && list.length === 0)
      getEntitiesForAdmin(entity, 0, limit).then((d) => {
        setList(d)
      }).catch((e) => {

      })
  }, [])
  // return;
  return <Col
    sm={size ? size.sm : ''}
    lg={size ? size.lg : ''}
    className={'MGD ' + className}>
    <label htmlFor={name}>{label ? t(label) : t(name)}</label>

    <Field
      name={name}
      component="select"
      type="select"
      allowNull={true}
      className="mb-2 form-control"
      // value={theVal}
      // defaultValue={theVal}
      onChange={(e) => {
        // console.log('e',e.target.value,field)
        setTheVal(e.target.value);
        if (onChange) {
          let ty = list.filter((i, idx) => {
              console.log(i['value'], e.target.value)
              if (optionValue)
                return (i[optionValue] == e.target.value)
              if (!optionValue)
                return (i['value'] == e.target.value)

            }
          );
          // console.log('ty', ty)
          if (ty && ty[0] && ty[0].values)
            e.list = ty[0].values;
          field.setValue(name, e.target.value);

          onChange(e)
        }
        else
          field.setValue(name, e.target.value);
      }}
    >
      <option/>
      {list && list.map((ch, c) => {
        return <option key={c} value={optionValue ? ch[optionValue] : ch.value}>
          {optionName ? ch[optionName] : t(ch.label)}
        </option>
      })}

    </Field>

  </Col>
}

export default withTranslation()(FieldSelect);
