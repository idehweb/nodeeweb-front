import React from 'react';
import {Field} from 'react-final-form'
import { Col, Container, Row} from 'shards-react';
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
  FieldRadio,
  FieldTextarea
} from "#c/components/form/fields";
import {setStyles} from "../../../functions"

 const StepDetail = (props) => {


  const {content,activeStep} = props;
  const childs = content[activeStep].children;

  const TheField = (valuesvalues) => {
    // const [selectValue,setSelectValue] = React.useState('');
    const {values} = valuesvalues;
    console.log('ggggg222gggg',valuesvalues);

    if (!values) {
      return <>no field</>
    }
    const {type,style, kind, size, className, options, disabled = false, name, label, placeholder} = values;
    const {settings} = values;
    const {general} = settings;
    const {fields} = general;
    let dynamicStyle = setStyles(fields)
    if (name === 'steps') {
      return <DemoSteps field={values}/>
    }
    if ((name==='button')) {
      return <Col
        sm={fields.sm ? fields.sm : ''}
        lg={fields.lg ? fields.lg : ''}
        className={'MGD ' + className}>
        <label htmlFor={name}>{fields.label}</label>
        <Field
          name={fields.name}
          component="button"
          type="button"
          placeholder={fields.placeholder ? fields.placeholder : ''}
          className="mb-2 form-control"
          disabled={disabled}
          style={dynamicStyle}

        />
      </Col>
    }
    if ((name==='input')) {
      return <Col
        sm={fields.sm ? fields.sm : ''}
        lg={fields.lg ? fields.lg : ''}
        className={'MGD ' + className}>
        <label htmlFor={name}>{fields.label}</label>
        <Field
          name={fields.name}
          component="input"
          type="text"
          placeholder={fields.placeholder ? fields.placeholder : ''}
          className="mb-2 form-control"
          disabled={disabled}
          style={dynamicStyle}

        />
      </Col>
    }
    if (name === 'checkbox') {
      // console.clear()
      // console.log(field)
      return  <Col
      sm={fields.sm ? fields.sm : ''}
        lg={fields.lg ? fields.lg : ''}
      className={'MGD ' + className}>
      <Field name={name}
        // initialValue={()=> []}
      >
        {({input, meta}) => {
          return (
            <div><label htmlFor={name}>{fields.label}</label>
              <div className={"d-flex "}>
                {fields.options && fields.options.map((checkbox, i) => {
                  return <label key={i} className={'checkbox-items p-1'}>
                    <Field
                    name={fields.name}
                    component="input"
                    style={dynamicStyle}
                    type="checkbox"
                    value={checkbox.value}
                  />
                    <span>{checkbox.title}</span>
                  </label>
                })}


              </div>
            </div>
          )
        }}
      </Field>
    </Col>

    }

    if (name === 'radio') {
      return  <Col
      sm={fields.sm ? fields.sm : ''}
      lg={fields.lg ? fields.lg : ''}
      className={'MGD ' + className}>
      <Field name={name}
        // initialValue={()=> []}
      >
        {({input, meta}) => {
          return (
            <div><label htmlFor={name}>{fields.label}</label>
              <div className={"d-flex "}>
                {fields.options && fields.options.map((ch, i) => {
                  return <label key={i} className={'checkbox-items p-1'}>
                    <Field
                    name={fields.name}
                    component="input"
                    style={dynamicStyle}
                    type="radio"
                    value={ch.value}
                  />
                    <span>{ch.title}</span>
                  </label>
                })}


              </div>
            </div>
          )
        }}
      </Field>
    </Col>
    }
    if (name === 'select') {
      return <Col
      sm={fields.sm ? fields.sm : ''}
      lg={fields.lg ? fields.lg : ''}
      className={'MGD ' + className}>
      <label htmlFor={name}>{fields.label}</label>
      <Field
        name={fields.name}
        component="select"
        type="select"
        allowNull={true}
        className="mb-2 form-control"
        // value={selectValue}
        // onChange={(e) => {setSelectValue(e.target.value)}}
      >
        <option value="">{'انتخاب کنید'}</option>
        {fields.options && fields.options.map((ch, c) =>
            <option key={c} value={ch.value}>
              {ch.title}
            </option>
        )}
      </Field>
    </Col>

    }
     if (name === 'textarea') {
      return <Col
      sm={fields.sm ? fields.sm : ''}
      lg={fields.lg ? fields.lg : ''}
        className={'MGD ' + className}>
        <label htmlFor={name}>{fields.label}</label>
        <FieldTextarea
          name={fields.name}
          style={dynamicStyle}
          placeholder={fields.placeholder  ?fields.placeholder : ''}
          className="mb-2 form-control"
        />
      </Col>
    }
  }

  return (
    <Container>
    <Row>
      {childs && childs.map((field, index) => {
        return (<TheField key={index} values={field}/>);
      })}
    </Row>
  </Container>
  );
};
export default React.memo(StepDetail)
