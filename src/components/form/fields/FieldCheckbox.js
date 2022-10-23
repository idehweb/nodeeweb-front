import React, {useEffect, useState} from 'react';
import {withTranslation} from 'react-i18next';
import {Field} from 'react-final-form';
import {Col} from 'shards-react';
import {getEntities, MainUrl, uploadMedia} from "#c/functions/index";

function FieldCheckbox(props) {
  // console.clear();
console.log('checkbox')
  let {field, t} = props;
  let {type, kind, size, className, entity, searchbox = true, limit = 1000, name, label, placeholder, value} = field;

  let [checkboxes, setCheckBoxes] = useState([])
  let [search, setSearch] = useState('')
  // console.log('field object', field)
  useEffect(() => {
    if(limit){limit=parseInt(limit)}
    if (entity && checkboxes.length === 0)
      getEntities(entity, 0, limit).then((d) => {
        setCheckBoxes(d)
      }).catch((e) => {

      })
  }, [])
  // useEffect(() => {
  //   // if(limit){limit=parseInt(limit)}
  //   if (entity)
  //     getEntities(entity, 0, limit,search).then((d) => {
  //       setCheckBoxes(d)
  //     }).catch((e) => {
  //
  //     })
  // }, [search])
  // return;

  return <Col
    sm={size ? size.sm : ''}
    lg={size ? size.lg : ''}
    className={'MGD ' + className}>
    <Field name={name}
           // initialValue={()=> []}
    >
      {({input, meta}) => {
        return (
          <div><label htmlFor={name}>{label}</label>
            <div className={"checkbox-wrapper"}>
              {/*{searchbox && <input*/}
                {/*className={'searchBox'}*/}
                {/*type="text"*/}
                {/*onChange={(e) => {*/}
                  {/*setSearch(e.target.value)*/}
                {/*}}*/}
                {/*value={search}*/}
              {/*/>}*/}
              {checkboxes && checkboxes.map((ch, i) => {
                // console.log('checkboxes', checkboxes)

                return <label key={i} className={'checkbox-items'}><Field
                  name={name}
                  component="input"
                  type="checkbox"
                  value={ch._id}
                /><span>{ch.name.fa}</span></label>

              })}


            </div>
          </div>
        )
      }}
    </Field>
  </Col>

}


export default withTranslation()(FieldCheckbox);
