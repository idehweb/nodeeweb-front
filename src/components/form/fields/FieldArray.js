import React ,{useState} from 'react';
import {withTranslation} from 'react-i18next';
import {Field} from 'react-final-form'
import {Col} from 'shards-react';
import {MainUrl, uploadMedia} from "#c/functions/index";

function FieldObject(props) {
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
      name={name} className="mb-2 form-control">
      {props => {
        let {input}=props;
        // let {value}=inputinput;
        let obj=[{}];
        if(input.value){
          obj=input.value;
        }
        return JSON.stringify(obj)
        console.log('Object.keys(obj) for ',props.input.name,':', input.value)
        console.log('props', obj)
        if(typeof input.value =='object'){
          let y=obj.map((theKey,inx)=>{
            // console.log('theKey',theKey)
            return (
              <ParseObjectToInput theKey={theKey} theVal={theVal} {...props} />
            )
          });
          return y;
        }


        }}
    </Field>


  </Col>

}
function ParseObjectToInput(props) {
  let {theKey,theVal,input}=props
  // if(!input){
    return
  // }
  let {value}=input
  return <div className={'max-width100'}>
    <div className={'width-less'}>
      <label htmlFor={theKey}>theKey</label>
      <input
        name={props.input.name}
        className={'ltr '}
        onChange={(e) => {
          console.log('props.target.value', e.target.value);
          let obj = {};
          // window.f = e.target.value;
          obj[e.target.value] = '';
          console.log('theKey', props.input)
          // field.theKey=props.target.value
          // field.setValue(name, obj)

        }}
        type={'text'}
        value={theKey}
        placeholder={'key'}
      />
    </div>
    <div className={'width-more'}>


      {(typeof input.value =='string') && <><label htmlFor={name}>value</label><input
        name={props.input.name}
        onChange={(e) => {
          let obj = {};
          // obj[window.f] = e.target.value;
          // field.setValue(name, obj)
        }}
        type={'text'}
        placeholder={'value'}
        value={theVal[theKey]}

      /></>}
      {(typeof input.value =='object') && Object.keys(theVal[theKey]).map((theKey2,inx)=>{
        // return JSON.stringify(theKey2)
        return <><div className={'width-more'}>
          <label>{theKey2}</label>
          <input
            name={props.input.name}
            className={'ltr '}
            onChange={(e) => {
              console.log('props.target.value', e.target.value);
              let obj = {};
              // window.f = e.target.value;
              obj[e.target.value] = '';
              console.log('theKey', props.input)
              // field.theKey=props.target.value
              // field.setValue(name, obj)

            }}
            type={'text'}
            value={JSON.stringify(theVal[theKey][theKey2])}
          />
        </div>
        </>
      })}


    </div>
  </div>
}
export default withTranslation()(FieldObject);
