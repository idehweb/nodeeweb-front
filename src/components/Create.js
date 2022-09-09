import React from 'react';
import {getTheSingleData,createRecord} from '#c/functions/index';
import CreateForm from "#c/components/components-overview/CreateForm";
import {withTranslation} from 'react-i18next';

function Create(props) {
  console.log('props', props)
  let {model, _id, t, rules} = props
  let {fields} = rules
  // const [data, setData] = useState([]);
  // const [fields, setFields] = useState([]);

  // useEffect(() => {
  //   // setSelectedCats(items)
  //   // if (action == 'list')
  //   // getData();
  //   console.log('modelChanges')
  // }, []);
  const getData = () => {
    //   const { t } = this.props;
    let formVals = [];
    getTheSingleData('admin', model, _id).then((data = []) => {
      Object.keys(data).forEach((d) => {
        let lastObj = {
          type: 'input',
          label: t(d),
          name: d,

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (text) => {
            // setFields([...fields,])
            // this.state.checkOutBillingAddress.add.data[d] = text;
          },
          className: 'rtl',
          placeholder: t(d),
          child: [],
          value: data[d] || '',
        };
        if (typeof data[d] == 'object') {
          lastObj.type = 'object';

        }
        if (typeof data[d] == 'number') {
          lastObj.type = 'number';
        }
        if (typeof data[d] == 'string') {

        }
        // console.log('type of ',d,typeof data[d])
        formVals.push(lastObj)

      })
      console.log('formVals', formVals)
      setData(data);
      setFields(data);
    });
  }
  const onSubmit = (values) => {

    console.log('values', values);
    createRecord(model,values).then(e=>{
      console.log('e',e)
    })
  }

  console.clear()
  // console.log('rules', rules);
  let c = {};
  if (fields)
    fields.forEach((d) => {
      c[d.name] = ''
    });
  // console.log('fields', fields)
  return (
    <CreateForm
      onSubmit={onSubmit}
      rules={rules}
      buttons={[]}
      fields={c}/>
  );
}

export default withTranslation()(Create);
