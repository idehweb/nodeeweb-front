import React, {useEffect, useState} from 'react';
import {withTranslation} from 'react-i18next';
import {Field, Form} from 'react-final-form'
import {Button, Col, Container, Row} from 'shards-react';
import {useSelector} from "react-redux";
import {MainUrl, uploadMedia} from "#c/functions/index";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import {
  FieldArray,
  FieldBoolean,
  FieldCheckbox,
  FieldCheckboxes,
  FieldJson,
  FieldNumber,
  FieldObject,
  FieldPrice,
  FieldSelect,
  FieldServer,
  FieldText,
  FieldTextarea
} from "#c/components/form/fields";

function CreateForm(props) {
  // console.clear()
  // console.log('==> input: ',props)
  let {fields, rules = {fields: []},theFields=false, t} = props;
  // console.clear();


  const themeData = useSelector((st) => st.store.themeData);
  if (!themeData) {
    // console.log('not themeData', themeData);

    return
  }
  // console.log('fields', fields);
  // console.log('rules', {...{fields:rules.fields}});
  const [theRules, setTheRules] = useState({...{fields:rules.fields}});
  useEffect(() => {
    // console.log('useEffect',rules)

    if (!theRules || (theRules && !theRules.fields) || (theRules.fields && !theRules.fields[0])) {
      Object.keys(fields).forEach((fi) => {
        let typ = typeof fields[fi];
        // console.log('typ instanceof' ,fields[fi]);
        if (fields[fi] instanceof Array) {
          typ = 'select';
        }
        rules.fields.push({
          "name": fi,
          "type": typ
        })
      })
      setTheRules(rules)
    }else{
      setTheRules(rules)

    }
  }, []);

  const TheField = (field) => {
    // console.log('field', field);
    if (!field) {
      return <>no field</>
    }
    const {type, kind, size, className, options, disabled = false, name, label, placeholder} = field;
    // console.log('themeData',  themeData['models']);
    // moment(field.value, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]", true).isValid())

    if (type == 'date') {
      // console.log('date')
      return <Col
        sm={size ? size.sm : ''}
        lg={size ? size.lg : ''}
        className={'MGD ' + className}>
        <label htmlFor={name}>{label}</label>
        <Field
          name={name}
          component="input"
          type="date"
          placeholder={placeholder || label}
          className="mb-2 form-control"
        />

      </Col>
    }
    if ((type == 'string' || type=='input') || !type) {
      // console.log('string')

      return <Col
        sm={size ? size.sm : ''}
        lg={size ? size.lg : ''}
        className={'MGD ' + className}>
        <label htmlFor={name}>{label}</label>
        <Field
          name={name}
          component="input"
          type="text"
          placeholder={placeholder || label}
          className="mb-2 form-control"
          disabled={disabled}
        />

      </Col>
    }
    if (type == 'price') {
      // console.log('string')

      return <FieldPrice field={field}/>
    }
    if (type == 'json') {
      // console.log('string')

      return <FieldJson field={field}/>
    }
    if (type == 'object') {
      return <FieldObject field={field}/>
    }
    if (type == 'array') {
      return <FieldArray field={field}/>

    }
    if (type == 'checkbox') {
      // console.clear()
      // console.log(field)
      return <FieldCheckbox field={field}/>

    }
    if (type == 'checkboxes') {
      // console.clear()
      // console.log(field)
      return <FieldCheckboxes field={field}/>

    }
    if (type == 'radio') {
      // console.clear()
      // console.log(field)
      return <FieldCheckbox field={field}/>

    }
    if (type == 'select') {
      return <FieldSelect field={field}/>

    }
    if (type == 'server') {
      return <FieldServer field={field}/>

    }
    if (type == 'number') {
      return <FieldNumber field={field}/>

      // return <Col
      //   sm={size ? size.sm : ''}
      //   lg={size ? size.lg : ''}
      //   className={'MGD ' + className}>
      //   <label htmlFor={name}>{t(label)}</label>
      //   <Field
      //     name={name}
      //     component="input"
      //     type="number"
      //     placeholder={placeholder || label}
      //     className="mb-2 form-control"
      //   />
      // </Col>
    }
    if (type == 'textarea') {
      return <Col
        sm={size ? size.sm : ''}
        lg={size ? size.lg : ''}
        className={'MGD ' + className}>
        <label htmlFor={name}>{label}</label>
        <Field
          name={name}
          component="input"
          type="text"
          placeholder={placeholder || label}
          className="mb-2 form-control"
        />
      </Col>
    }
    if (type == 'boolean') {
      return <FieldBoolean field={field}/>
    }
    if (type == 'image') {
      // console.log('image')
      return <Col
        sm={size ? size.sm : ''}
        lg={size ? size.lg : ''}
        className={'MGD ' + className}>
        <label htmlFor={name}>{t(label)}</label>
        <Field
          name={name} className="mb-2 form-control">
          {props => {
            console.log('props', props)
            return (
              <div className={'max-width100'}>
                <img style={{width:"100px"}} src={MainUrl + '/' + props.input.value}/>
                {!props.input.value && <input
                  name={props.input.name}
                  onChange={(props) => {
                    let {target} = props
                    console.log(props)
                    console.log(target.files[0])
                    uploadMedia(target.files[0], (e) => {
                      // console.log('e', e)
                    }).then(x => {
                      if (x.success && x.media && x.media.url) {
                        // console.log('set', name, x.media.url)

                        field.setValue(name, x.media.url)
                      }
                    })
                  }}

                  type={'file'}
                />}
                {props.input.value && <div className={'posrel'}><img src={MainUrl + '/' + props.input.value}/><Button onClick={(e)=>{
                  field.setValue(name, '')
                }} className={'removeImage'}><RemoveCircleOutlineIcon/></Button></div>}
              </div>
            )
          }}
        </Field>


      </Col>
    }
    if (type == 'images') {
      // console.log('image')
      return <Col
        sm={size ? size.sm : ''}
        lg={size ? size.lg : ''}
        className={'MGD ' + className}>
        <label htmlFor={name}>{label}</label>
        <Field
          name={name} className="mb-2 form-control">
          {props => {
            return (
              <div className={'max-width100'}>
                {!props.input.value && <input
                  name={props.input.name}
                  onChange={(props) => {
                    let {target} = props
                    uploadMedia(target.files[0], (e) => {
                      console.log('e', e)
                    }).then(x => {
                      if (x.success && x.media && x.media.url) {

                        field.setValue(name, x.media.url)
                      }
                    })
                  }}

                  type={'file'}
                />}
                {props.input.value && <img src={MainUrl + '/' + props.input.value}/>}
              </div>
            )
          }}
        </Field>


      </Col>
    }

  }

  const onSubmit = async v => {
    console.log('onSubmit',v)
    if (props.onSubmit) {
      let values = v;
      if (theRules && theRules.fields)
        theRules.fields.forEach((item, i) => {
          if (item.type == 'object' && values[item.name] instanceof Array && item.value) {
            let obj = {};
            item.value.forEach((its) => {
              if (its)
                obj[its.property] = its.value
            })
            values[item.name] = obj;
          }
        })
      props.onSubmit(values)
    }
  }
  console.log('render',theRules)
  if (themeData)
    return (
      <div className="fields pt-2">
        <Form
          onSubmit={onSubmit}
          initialValues={fields}
          mutators={{
            setValue: ([field, value], state, {changeValue}) => {
              changeValue(state, field, () => value)
            },
          }}
          render={({
                     handleSubmit, form, submitting, pristine, values
                   }) => (
            <form onSubmit={handleSubmit}>
              <Container>
                <Row>
                  {theFields && theFields.map((field, index) => {
                    if (fields[field.name]) {
                      field.value = fields[field.name]
                    }
                    let lastObj = {
                      id: index,
                      type: field.type,
                      label: field.name,
                      name: field.name,
                      size: {
                        sm: 6,
                        lg: 6,
                      },
                      onChange: (text) => {
                      },
                      className: 'rtl',
                      placeholder: '',
                      child: [],
                      ...field

                    };
                    if (field.value) {
                      lastObj['value'] = field.value;
                    }
                    return (<TheField key={index} {...lastObj} setValue={form.mutators.setValue}/>);
                  })}
                  {!theFields && theRules?.fields?.map((field, index) => {
                    if (fields[field.name]) {
                      field.value = fields[field.name]
                    }
                    let lastObj = {
                      id: index,
                      type: field.type,
                      label: field.name,
                      name: field.name,
                      size: {
                        sm: 6,
                        lg: 6,
                      },
                      onChange: (text) => {
                      },
                      className: 'rtl',
                      placeholder: '',
                      child: [],
                      ...field

                    };
                    if (field.value) {
                      lastObj['value'] = field.value;
                    }
                    return (<TheField key={index} {...lastObj} setValue={form.mutators.setValue}/>);
                  })}
                  <div className="buttons">
                    <Button type="submit">
                      {t('Submit')}
                    </Button>
                  </div>
                </Row>
              </Container>
            </form>)}
        />
      </div>
    );
  else return <></>
}

export default withTranslation()(CreateForm);
