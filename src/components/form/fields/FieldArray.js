import React, {useState} from 'react';
import {withTranslation} from 'react-i18next';
import {Field} from 'react-final-form'
import {Button, Col} from 'shards-react';
import {MainUrl, uploadMedia} from "#c/functions/index";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  FieldBoolean,
  FieldCheckbox,
  FieldNumber,
  FieldObject,
  FieldPrice,
  FieldSelect,
  FieldServer,
  FieldText,
  FieldTextarea
} from "#c/components/form/fields";

function FieldArray(props) {
  // console.clear();
  let {field, t} = props;
  const {type, kind, size, className, name, label, placeholder, value=[], child,setValue} = field;
 if(!(value instanceof Array)){
   return
 }
  // return JSON.stringify(typeof value);
  let [theArray, setArray] = useState(value || [])
  // let [theVal, setTheVal] = useState(value)
  // console.log('field object', field)
  const addChild = () => {
    let temp = theArray;
    temp.push(child);
    console.log('temp', temp);

    setArray(prevState => {
      return [...temp]
    });
  }
  const removeChild = (ke) => {
    let temp = [];
    theArray.forEach((tr, d) => {
      if (d !== ke) {
        temp.push(tr);
      }
    })

    setArray(prevState => {
      return [...temp]
    });
  }
  // return 'hi2'

  // return;
  // console.log('theVal',theVal)
  return <Col
    sm={size ? size.sm : ''}
    lg={size ? size.lg : ''}
    className={'MGD arrayField ' + className}>

    <div className={'col d-flex justify-content-sb'}>
      <label htmlFor={name}>{label ? t(label) : t(name)}</label>
      <Button size={"small"} className={'flLeft p-1'} onClick={(e) => {
      e.preventDefault();
      addChild();
    }}><AddIcon/></Button>
    </div>
    <Field
      name={name} className="mb-2 form-control">
      {props => {
        let {input} = props;
        // let {value}=inputinput;
        let obj = [{}];
        if (input.value) {
          obj = input.value;
        }
        // return JSON.stringify(theArray);
        return theArray.map((ch, ke) => {
          return <div className={'row array-child-' + ke} key={ke}>
            {child && child.map((ch2,ch2x) => {
              // return name+' '+ch2.name;
              // ch2.name=ch2.name+ch2x
              if(ch2.type=='object'){
                // return JSON.stringify(ch);
                // return JSON.stringify(ch2);

                return <FieldObject key={ch2x} field={{...ch2,value:(ch && ch2.name) ? ch[ch2.name] : {},name:name+"["+ke+"]["+ch2.name+"]",setValue:setValue}}/>

              }
              if (ch2.type == 'string') {
                // return <span className={'col'}><input className={'form-control'} placeholder={ch2.name}/></span>
                return <FieldText key={ch2x} field={{...ch2,value:(ch && ch2.name) ? ch[ch2.name] : "",name:name+"["+ke+"]["+ch2.name+"]",setValue:setValue}}/>
              }
              if (ch2.type == 'color') {
                // return <span className={'col'}><input className={'form-control'} placeholder={ch2.name}/></span>
                return <FieldText key={ch2x} field={{...ch2,value:(ch && ch2.name) ? ch[ch2.name] : "",name:name+"["+ke+"]["+ch2.name+"]",setValue:setValue}}/>

              }
              if (ch2.type == 'price') {
                // return <span className={'col'}><input className={'form-control'} placeholder={ch2.name}/></span>
                return <FieldPrice key={ch2x} field={ch2}/>
              }
              if (ch2.type == 'number') {
                // return <span className={'col'}><input className={'form-control'} placeholder={ch2.name}/></span>
                return <FieldNumber key={ch2x} field={ch2}/>
              }
              if (ch2.type == 'select') {
                // return <span className={'col'}><input className={'form-control'} placeholder={ch2.name}/></span>
                return <FieldSelect key={ch2x} field={{...ch2,name:name+"["+ke+"]["+ch2.name+"]",setValue:setValue}}/>
              }
              if (ch2.type == 'boolean') {
                // return <span className={'col'}><input className={'form-control'} placeholder={ch2.name}/></span>
                return <FieldBoolean key={ch2x} field={ch2}/>
              }
            })}
            <span><Button onClick={(e) => {
              e.preventDefault();
              removeChild(ke);
            }}><RemoveCircleOutlineIcon/></Button></span>
          </div>;
        });

        // return JSON.stringify(obj)
        // console.log('Object.keys(obj) for ',props.input.name,':', input.value)
        // console.log('props', obj)
        // if(typeof input.value =='object'){
        //   let y=obj.map((theKey,inx)=>{
        //     // console.log('theKey',theKey)
        //     return (
        //       <ParseObjectToInput theKey={theKey} theVal={theVal} {...props} />
        //     )
        //   });
        //   return y;
        // }


      }}
    </Field>


  </Col>

}

function ParseObjectToInput(props) {
  let {theKey, theVal, input} = props
  // if(!input){
  return
  // }
  let {value} = input
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


      {(typeof input.value == 'string') && <><label htmlFor={name}>value</label><input
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
      {(typeof input.value == 'object') && Object.keys(theVal[theKey]).map((theKey2, inx) => {
        // return JSON.stringify(theKey2)
        return <>
          <div className={'width-more'}>
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

export default withTranslation()(FieldArray);
