import React from 'react';
import {withTranslation} from 'react-i18next';
import {Field, Form} from 'react-final-form'
import {Col} from 'shards-react';

function CreateForm(props) {
  // console.log('props', props);
  let {fields, rules} = props;
  console.clear();
  console.log(fields, rules);
  // const {fields} = rules;
  // let [count, setcount] = useState(0);
  // let [Navigate, SetNavigate] = useState(null);
  // let card = useSelector((st) => st.store.card || []);
  // let history = useNavigate();
  // useEffect(() => {
  //   console.log('useEffect count...',count);
  //   return;
  //   // setcount(count);
  // }, [count]);
  // useEffect(() => {
  //   return;
  //   console.log('useEffect card...',card);
  //
  //   let find = false;
  //   card.map((isx, xs) => {
  //     if (isx._id === item._id) {
  //       find = true;
  //     }
  //   });
  //   if (!find) {
  //     count = 0;
  //     // setcount(count);
  //
  //   }
  // }, [card]);
  // card.map((isx, xs) => {
  //   if (isx._id === item._id) {
  //     count = (isx.count);
  //   }
  // });
  // const refreshCard = ()=>{
  //
  // };
  // if (Navigate) {
  //   console.log('Navigate',Navigate);
  //   // history(Navigate)
  //   // return <Navigate to={Navigate}/>;
  // }
  // if ((item.single && !item.in_stock) || (item.single && !item.quantity)) {
  //   return <div className={'outOfStock '+item.type}>
  //     <CloseIcon/>{t("out of stock")}</div>
  // }
  // if(item.type==='normal'){
  //   if(item.quantity===0 || !item.in_stock)
  //     return <div className={'outOfStock '+item.type}><CloseIcon/>{t("out of stock")}</div>
  // }
  //
  // let mojud=false;
  // if(variable && !item.single){
  //   if(item.combinations) {
  //     item.combinations.map((com) => {
  //       if (com.in_stock) {
  //         mojud = true;
  //       }
  //     })
  //   }
  //   if(!mojud){
  //     return <div className={'outOfStock variablestock'}><CloseIcon/>{t("out of stock")}</div>
  //   }
  // }
  const TheField = (field) => {
    console.log('field', field, field.type);
    // moment(field.value, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]", true).isValid())
    if (!field) {
      return <></>
    }
    if (field.type == 'date') {
      return <Col
        sm={field.size ? field.size.sm : ''}
        lg={field.size ? field.size.lg : ''}
        className={'MGD ' + field.className}>
        <label htmlFor="feLastName">{field.label}</label>
        <Field
          name={field.name}
          component="input"
          type="date"
          placeholder={field.placeholder || field.label}
          className="mb-2"
        />

      </Col>
    }
    if (field.type == 'string' || !field.type) {
      return <Col
        sm={field.size ? field.size.sm : ''}
        lg={field.size ? field.size.lg : ''}
        className={'MGD ' + field.className}>
        <label htmlFor="feLastName">{field.label}</label>
        <Field
          name={field.name}
          component="input"
          type="text"
          placeholder={field.placeholder || field.label}
          className="mb-2"
        />

      </Col>
    }
    if (field.type == 'object') {
      return <Col
        sm={field.size ? field.size.sm : ''}
        lg={field.size ? field.size.lg : ''}
        className={'MGD ' + field.className}>
        <label htmlFor="feLastName">{field.label} - object</label>
        <Field
          name={'key' + field.label}
          component="input"
          type="text"
          placeholder={'key'}
          className="mb-2"
        />
        <Field
          name={field.name}
          component="input"
          type="text"
          placeholder={'value'}
          className="mb-2"
        />

      </Col>
    }
    if (field.type == 'number') {
      return <Col
        sm={field.size ? field.size.sm : ''}
        lg={field.size ? field.size.lg : ''}
        className={'MGD ' + field.className}>
        <label htmlFor="feLastName">{field.label}</label>
        <Field
          name={field.name}
          component="input"
          type="number"
          placeholder={field.placeholder || field.label}
          className="mb-2"
        />

      </Col>
    }
    if (field.type == 'boolean') {
      return <Col
        sm={field.size ? field.size.sm : ''}
        lg={field.size ? field.size.lg : ''}
        className={'MGD ' + field.className}>
        <label htmlFor="feLastName">{field.label}</label>
        <Field
          name={field.name}
          component="input"
          type="number"
          placeholder={field.placeholder || field.label}
          className="mb-2"
        />

      </Col>
    }
    if (field.type == 'image') {
      return <Col
        sm={field.size ? field.size.sm : ''}
        lg={field.size ? field.size.lg : ''}
        className={'MGD ' + field.className}>
        <label htmlFor="feLastName">{field.label}</label>
        <Field
          name={field.name}
          component="input"
          type="number"
          placeholder={field.placeholder || field.label}
          className="mb-2"
        />

      </Col>
    }
  }

  const onSubmit = async values => {
    console.log(JSON.stringify(values, 0, 2))
    if (props.onSubmit) {
      props.onSubmit(values)
    }
  }
  console.log("fields:", fields)
  console.log("rules:", rules)
  if (!rules || (rules && !rules.fields) || (rules.fields && !rules.fields[0])) {
    console.log('ful')
    rules = {};
    rules.fields = [];
    Object.keys(fields).forEach((fi) => {
      rules.fields.push({
        "name": fi,
        "type": typeof fields[fi]
      })
    })
  }
  console.log('rules', rules.fields)
  return (
    <div className="fields">
      <Form
        onSubmit={onSubmit}
        initialValues={fields}
        render={({handleSubmit, form, submitting, pristine, values}) => (
          <form onSubmit={handleSubmit}>
            {/*{fields && Object.keys(fields).map((fieldName, index) => {*/}
            {/*let field = fields[fieldName];*/}
            {/*console.log(fieldName, ':', field)*/}
            {/*let lastObj = {*/}
            {/*type: 'input',*/}
            {/*label: fieldName,*/}
            {/*name: fieldName,*/}

            {/*size: {*/}
            {/*sm: 6,*/}
            {/*lg: 6,*/}
            {/*},*/}
            {/*onChange: (text) => {*/}
            {/*// setFields([...fields,])*/}
            {/*// this.state.checkOutBillingAddress.add.data[d] = text;*/}
            {/*},*/}
            {/*className: 'rtl',*/}
            {/*placeholder: '',*/}
            {/*child: [],*/}
            {/*value: field || '',*/}
            {/*};*/}
            {/*return (<TheField key={index} {...lastObj} />);*/}
            {/*})}*/}
            {rules && rules.fields && rules.fields.map((field, index) => {
              // console.log(fieldName, ':', field)
              let lastObj = {
                type: field.type,
                label: field.name,
                name: field.name,
                size: {
                  sm: 6,
                  lg: 6,
                },
                onChange: (text) => {
                  // setFields([...fields,])
                  // this.state.checkOutBillingAddress.add.data[d] = text;
                },
                className: 'rtl',
                placeholder: '',
                child: [],
              };
              return (<TheField key={index} {...lastObj} />);
            })}
            <div className="buttons">
              <button type="submit">
                Submit
              </button>
            </div>
          </form>)}
      />
    </div>
  );
}

export default withTranslation()(CreateForm);
