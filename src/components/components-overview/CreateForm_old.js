import React from 'react';

import {Button, Col, FormCheckbox, FormInput, FormRadio, FormSelect, FormTextarea, Row} from 'shards-react';
import store from '#c/functions/store';
import {withTranslation} from 'react-i18next';
import {GeolocationControl, Map, Placemark, SearchControl, YMaps} from 'react-yandex-maps';

let myMap, ym;

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    let {fields, id} = this.props;
    this.state = {
      fields: fields,
      idx: id,
      st: '',
      val: 0
    };
  }

  changeEveryThing(fields, index, event) {
    console.log('fields',fields)
    console.log('index',index)
    console.log('event.target.value',event.target.value)
    fields[index].value = event.target.value;
    this.setState({fields: fields});
  }

  returnFieldType(pr) {
    let {type,onChange, value, index = '',placeholder='',disabled=false} = pr;
    console.log('pr', pr)
    if ((type == 'input' || type == 'string') && value) {
      return <FormInput
        onChange={(event) => {
          onChange(event.target.value);
          this.changeEveryThing(this.state.fields, index, event);
        }}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        className="mb-2"
      />
    } else if ((type == 'boolean') && value) {
      return <input value={value}/>
    } else if (type == 'object' && value) {
      return <div>
        <span>{index}</span>
        <span>
          {typeof value == 'string' && this.returnFieldType({type: 'input', value})}
          {/*{typeof value=='object' && this.returnFieldType({type:'object',value})}*/}
          {typeof value == 'object' && Object.keys(value).map((val) => {
            console.log('tge val', val)
            return <div className={'theobject'}>
              <FormInput
                onChange={(event) => {
                  onChange(event.target.value);
                  this.changeEveryThing(this.state.fields, index, event);
                }}
                value={val}
                placeholder={placeholder}
                disabled={disabled}
                className="mb-2"
              />
              {typeof value[val]}
              {typeof value[val] == 'object' && this.returnFieldType({type: 'object', value:value[val]})}
              {typeof value[val] == 'string' && this.returnFieldType({type: 'input', value:value[val]})}
            </div>
          })}
                </span></div>

    } else {
      return <FormInput
        onChange={(event) => {
          onChange(event.target.value);
          this.changeEveryThing(this.state.fields, index, event);
        }}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        className="mb-2"
      />;
    }

  }

  returnField(fields) {
    console.log('fields', fields)
    fields = fields.map((field, index) => {
      if (field.type && field.type === 'object' && (field.value instanceof Array)) {
        return (
          <Col
            key={index}
            sm={field.size.sm}
            lg={field.size.lg}
            className={'MGD ' + field.className}>
            <label htmlFor="feLastName">{field.label}</label>

            <div>{field.value.map((val, index) => {
              return this.returnFieldType({...field,type: 'object', value: val, index: index})
            })}</div>

          </Col>
        );
      }
      if (field.type && field.type === 'object' && !(field.value instanceof Array)) {
        return (
          <Col
            key={index}
            sm={field.size.sm}
            lg={field.size.lg}
            className={'MGD ' + field.className}>
            <label htmlFor="feLastName">{field.label}</label>

            {(field && field.value && !(field.value instanceof Array)) && Object.keys(field.value).map((val) => {
              // console.log('field.value',val)
              // return this.returnField(field.value[val])
              return this.returnFieldType({...field,type: typeof field.value[val], value: field.value[val], index: index})

              // return <><input value={val} name={'label'}/><input value={field.value[val]} name={'value'}/></>

            })}
          </Col>
        );
      }

      if (field.type && field.type === 'input') {
        return (
          <Col
            key={index}
            sm={field.size.sm}
            lg={field.size.lg}
            className={'MGD ' + field.className}>
            <label htmlFor="feLastName">{field.label}</label>

            <FormInput
              onChange={(event) => {
                field.onChange(event.target.value);
                this.changeEveryThing(fields, index, event);
              }}
              value={field.value}
              placeholder={field.placeholder}
              disabled={field.disabled}
              className="mb-2"
            />
          </Col>
        );
      }
      if (field.type && field.type === 'tel') {
        return (
          <Col
            key={index}
            sm={field.size.sm}
            lg={field.size.lg}
            className={'MGD ' + field.className}>
            <label htmlFor="feLastName">{field.label}</label>

            <FormInput
              onChange={(event) => {
                field.onChange(event.target.value);
                this.changeEveryThing(fields, index, event);
              }}
              type={'tel'}
              value={field.value}
              placeholder={field.placeholder}
              disabled={field.disabled}
              className="mb-2"
            />
          </Col>
        );
      }
      if (field.type && field.type === 'map') {
        let interval;

        // if (myMap)
        function handleAddress() {
          if (myMap) {
            let coords = myMap.getCenter();
            console.log('coords', coords);
            ym.geocode(coords).then(function (res) {
              let firstGeoObject = res.geoObjects.get(0);
              let cityname = [firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(), firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()].filter(Boolean).join(', ');
              console.log('firstGeoObject.getAddressLine()', cityname);
              let jh = val + 1;

              clearInterval(interval);
              let cc = field.onChange({cityname});
              console.log('cc:', cc);

              fields[cc].value = cityname;
              console.log('val:', jh);

              REF.setState({val: jh});


            });
          }
        }

        return (
          <Col
            key={index}
            sm={field.size.sm}
            lg={field.size.lg}
            className={'MGD ' + field.className}>
            <label htmlFor="feLastName">{field.label}</label>

            <YMaps query={{apikey: "cbb54d12-0750-4af8-ba24-f434b692963b", lang: 'en_US'}}>
              <div style={{width: '100%'}} className={'locationabrel'}>
                <Map instanceRef={ref => (myMap = ref)} onLoad={(e) => {
                  console.log('e', e);
                  ym = e;
                  let m = 0;
                  interval = setInterval(function () {
                    console.log('m', m += 2);
                    handleAddress();
                  }, 2000);
                }} modules={["Placemark", "geocode"]}
                     onClick={(e) => {
                       // const coords = e.get("coords");
                       // console.log('coords', coords);
                       // ym.events.add('actionend', function (e) {
                       //   console.log('hghjk');
                       // });
                       handleAddress();
                       // this.setState({ coords: coords })35.69562931522265, 51.342168285405606
                     }} width={'100%'} height={'300px'}
                     defaultState={{center: [35.69562931522265, 51.342168285405606], zoom: 9}}>
                  <SearchControl options={{float: 'right'}}/>
                  {/*<ZoomControl options={{ float: 'right' }} />*/}
                  <i className="material-icons locationab" onClick={handleAddress}>location_on</i>
                  <GeolocationControl/>
                </Map>
              </div>
            </YMaps>
          </Col>
        );
      }
      if (field.type && field.type === 'email') {
        return (
          <Col
            key={index}
            sm={field.size.sm}
            lg={field.size.lg}
            className={'MGD'}>
            <label htmlFor="feLastName">{field.label}</label>

            <FormInput
              type="email"
              onChange={(event) => {
                field.onChange(event.target.value);
                this.changeEveryThing(fields, index, event);
              }}
              value={field.value}
              placeholder={field.placeholder}
              className="mb-2 ltr"
            />
          </Col>
        );
      }
      if (field.type && field.type === 'button') {
        return (
          <Col
            key={index}
            sm={field.size.sm}
            lg={field.size.lg}
            className={'MGD'}>
            <Button
              onClick={(event) => field.onClick(event.target.value)}
              className="form-control mb-2 button-field">
              {field.title}
            </Button>
          </Col>
        );
      }
      if (field.type && field.type === 'textarea') {
        return (
          <Col key={index} sm={field.size.sm} lg={field.size.lg} className={'MGD ' + field.className}>
            <label htmlFor="feTexe">{field.label}</label>
            <FormTextarea
              onChange={(event) => {
                field.onChange(event.target.value);
                this.changeEveryThing(fields, index, event);
              }}
              value={field.value}
              id={field.id}
              placeholder={field.placeholder}
              className="mb-2"
            />
          </Col>
        );
      }
      if (field.type && field.type === 'title') {
        return (
          <Col key={index} sm={field.size.sm} lg={field.size.lg}>
            <span class="kjhghjk">{field.title}</span>
            <div>
              <div
                id={'defvgbnb'}
                className="d-inline-block item-icon-wrapper ytrerty gv"
                dangerouslySetInnerHTML={{__html: field.html}}
              />
            </div>
          </Col>
        );
      }
      if (field.type && field.type === 'number') {
        return (
          <Col
            key={index}
            sm={field.size.sm}
            lg={field.size.lg}
            className={'MGD ' + field.className}>
            <label htmlFor="feLastName">{field.label}</label>
            <FormInput
              onChange={(event) => {
                field.onChange(event.target.value);
                this.changeEveryThing(fields, index, event);
              }}
              type={'number'}
              value={field.value}
              placeholder={field.placeholder}
              className="mb-2 ltr"
            />
          </Col>
        );
      }
      if (field.type && field.type === 'checkbox') {
        let allPostData = store.getState().store.allPostData || {};
        let thearr = allPostData[field.label];
        console.log('thearr', thearr);
        return (
          <Col key={index} sm={field.size.sm} lg={field.size.lg}>
            <label>{field.label}</label>
            {field.children &&
            field.children.forEach((child) => {
              let thebool;
              if (allPostData[field.label] instanceof Array) {
                thebool = allPostData[field.label].indexOf(child.value);
                if (thebool > -1) {
                  thebool = true;
                } else {
                  thebool = false;
                }
              }
              return (
                <FormCheckbox
                  defaultChecked={thebool}
                  onChange={(event) => {
                    // console.log('event.target.value',event.target.value);
                    field.onChange(child.value);
                    // this.changeEveryThing(fields, index, event);
                  }}
                  className="mb-2">
                  {child.name}
                </FormCheckbox>
              );
            })}
          </Col>
        );
      }
      if (field.type && field.type === 'radioButton') {
        // let allPostData = store.getState().store.allPostData || {};
        // let thearr = allPostData[field.label];
        let st = field.st;
        console.log('field.st', field.st);
        return (
          <Col key={index} sm={field.size.sm} lg={field.size.lg}>
            {field.label && <label>{field.label}</label>}
            <Row>
              {field.children &&
              field.children.map((child, ch) => {
                let thebool;
                // if (allPostData[field.label] instanceof Array) {
                //   thebool = allPostData[field.label].indexOf(child.value);
                //   if (thebool > -1) {
                //     thebool = true;
                //   } else {
                //     thebool = false;
                //   }
                // }
                return (
                  <Col key={ch} sm={child.size.sm} lg={child.size.lg}>

                    <FormRadio
                      // defaultChecked={thebool}
                      checked={st === child.value}
                      onChange={(event) => {
                        // console.log('event.target.value',event.target.value);
                        field.onChange(child.value);
                        st = child.value;
                        this.setState({st: st});
                        console.log('st', st);
                        // this.changeEveryThing(fields, index, event);
                      }}
                      className="mb-0">
                      {child.name}
                    </FormRadio>
                  </Col>
                );
              })}
            </Row>
          </Col>
        );
      }
      if (field.type && field.type === 'empty') {
        return (
          <Col
            key={index}
            className={'empty ' + field.className}
            sm={field.size.sm}
            lg={field.size.lg}></Col>
        );
      }
      if (field.type && field.type === 'selectOption') {

        return (
          <Col
            key={index}
            className={'select-col MGD'}
            sm={field.size.sm}
            lg={field.size.lg}>
            <label htmlFor="feLastName">{field.label}</label>

            <FormSelect
              onChange={(event) => {
                if (field.returnEverything) {
                  // console.clear();
                  console.log(event.target.value);
                  field.onChange(field.children[event.target.value]);

                } else {
                  field.onChange(event.target.value);
                }
                this.changeEveryThing(fields, index, event);
              }}>
              <option value="N">{field.selectOptionText}</option>
              {field.children && field.children.map((item, index) => {
                let vv = '';

                if (field.returnEverything) {
                  vv = index;
                } else {
                  vv = item['value'];
                }
                return (
                  <option key={index} value={vv}>
                    {item.name}
                  </option>
                );
              })}
            </FormSelect>
          </Col>
        );
      }
      if (field.type && field.type === 'selectOption-dynamic') {
        // console.clear();
        console.log('condition', field.condition);
        return (
          <Col
            key={index}
            className="select-col"
            md={field.size.md}
            xs={field.size.xs}
            sm={field.size.sm}
            lg={field.size.lg}>
            <FormSelect
              onChange={(event) => field.onChange(event.target.value)}>
              <option value="0">{field.selectOptionText}</option>
              {data.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.name}
                  </option>
                );
              })}
            </FormSelect>
            {/* <se onChange={(event)=> field.onChange( event.target.value)} value={field.value} placeholder={field.placeholder} className="mb-2" /> */}
          </Col>
        );
      }
      return 0;
    })
    return fields
  }

  render() {
    let REF = this;
    let {buttons, t, data, id, fields} = this.props;
    let {val} = this.state;

    console.log('fields tx', fields);
    return [
      fields &&
      this.returnField(fields),
      buttons &&
      buttons.map((button, index) => {
        return (
          <Col
            key={index}
            md={button.size.md}
            xs={button.size.xs}
            sm={button.size.sm}
            lg={button.size.lg}
            className={'buttons-parent-col ' + button.parentClass}>
            <Button
              onClick={(event) => button.onClick(event.target.value)}
              className={'button-small ' + button.className}
              theme="success">
              {t(button.name)}
            </Button>
          </Col>
        );
      }),
    ];
  }
}

export default withTranslation()(CreateForm);
