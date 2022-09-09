import React, {useEffect, useState} from 'react';
import {getTheSingleData,editRecord} from '#c/functions/index';
import CreateForm from "#c/components/components-overview/CreateForm";
import {toast} from "react-toastify";
import store from "#c/functions/store";
import {withTranslation} from 'react-i18next';

function Edit(props) {
  console.log('props', props)
  let {model, _id, t,rules} = props
  const [data, setData] = useState([]);
  const [fields, setFields] = useState([]);
  let theform = {
    add: {
      data: {
        // firstName: store.getState().store.firstName || '',
        // lastName: store.getState().store.lastName || '',
        // email: store.getState().store.email || '',
        // phoneNumber: store.getState().store.phoneNumber || '',
        type: store.getState().store.billingAddress.type || '',
        State: store.getState().store.billingAddress.State || '',
        City: store.getState().store.billingAddress.City || '',
        Title: store.getState().store.billingAddress.Title || ''
      },
      fields: [],
      buttons: [
        {
          type: 'small',
          header: [],
          body: ['title', 'text'],
          url: '/' + model + '/',
          name: t('Save'),
          className: 'ml-auto ffgg btn btn-accent btn-lg ',
          parentClass: 'pd-0',
          loader: true,
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
          onClick: async (e) => {
            let ref = this;
            console.log('this.data', this.state.checkOutBillingAddress.add.data);

            if (!this.state.checkOutBillingAddress.add.data.StreetAddress) {
              toast(t('Enter street address!'), {
                type: 'error'
              });
              return;
            }
            if (!this.state.checkOutBillingAddress.add.data.State) {
              toast(t('Enter state!'), {
                type: 'error'
              });
              return;
            }
            if (!this.state.checkOutBillingAddress.add.data.City) {
              toast(t('Enter city!'), {
                type: 'error'
              });
              return;
            }
            if (!this.state.checkOutBillingAddress.add.data.PostalCode) {
              toast(t('Enter postal code!'), {
                type: 'error'
              });
              return;
            }
            if (!this.state.checkOutBillingAddress.add.data.Title) {
              toast(t('Enter address title!'), {
                type: 'error'
              });
              return;
            }
            if (!this.state.checkOutBillingAddress.add.data.PhoneNumber) {
              toast(t('Enter phone number!'), {
                type: 'error'
              });
              return;
            }
            this.state.checkOutBillingAddress.add.fields.forEach((m, x) => {
              console.log('ref.state', ref.state);
              ref.state.checkOutBillingAddress.add.fields[x].value = '';
            });
            updateAddress(this.state.checkOutBillingAddress.add.data).then((response) => {
              // let len=
              onSetAddress(this.state.checkOutBillingAddress.add.data);
              if (response.success) {
                this.setState({
                  address: response.customer.address,
                  modals: false

                });
              }
            })

          },
        }
      ],
    },
  };
  useEffect(() => {
    // setSelectedCats(items)
    // if (action == 'list')
    getData();
    console.log('modelChanges')
  }, []);
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

    console.log('values',model,_id, values);
    editRecord(model,_id,values).then(e=>{
      console.log('e',e)
    })
  }

  return (
    <CreateForm
      rules={rules}
      onSubmit={onSubmit}
      buttons={theform.add.buttons}
      fields={fields}/>
  );
}

export default withTranslation()(Edit);
