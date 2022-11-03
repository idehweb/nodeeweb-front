import React, {useEffect, useState} from "react";
import {withTranslation} from "react-i18next";
import {dFormat, PriceFormat} from "#c/functions/utils";
import {useParams} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {Button} from 'shards-react';

import OptionBox from "#c/components/page-builder/OptionBox";
import Component from "#c/components/page-builder/Component";
// import ComponentOptionBox from "#c/components/page-builder/ComponentOptionBox";
import "#c/assets/styles/nodeeweb-page-builder.css";
import * as _ from 'lodash'
import {
  addBookmark,
  clearPost,
  getBlogPost,
  GetBuilder,
  isClient,
  loadPost,
  loveIt,
  MainUrl,
  SaveBuilder,
  savePost,
} from "#c/functions/index";
import {SnapChatIcon} from "#c/assets/index";
import DefaultOptions from "#c/components/page-builder/DefaultOptions";

import {toast} from "react-toastify";
import store from "../functions/store";


// let c = 0;
const Builder = () => {

}
const CreatePage = ({t}) => {

  const [c, setC] = useState(0);
  const [data, setData] = useState({});
  const [lan, setLan] = useState(store.getState().store.lan || "fa");

  const [state, setState] = useState({
    components: [],
    optionBox: false,
    excludeArray: [],
    sourceAddress: 'new',
    componentForSetting: {},
    componentOptionsBox: false,
  });
  const {components, optionBox, excludeArray, sourceAddress, componentForSetting, componentOptionsBox} = state;
  const params = useParams();
  let _id = params._id || null;
  let model = params.model || 'page';
  const load = (options = {}) => {
    if (_id)
      GetBuilder(model, _id).then(async r => {
        if (r) {
          setData(r);
        }
        if (r && r.elements) {
          setC(r.elements.length);
          setState({...state, components: r.elements});
          return (r.elements);
        }
      })
  }
  const save = (options = {}) => {
    // console.clear()
    // console.log("store ")
    // console.log('_id', _id, components)
    SaveBuilder(model, _id, {elements: components}).then(r => {
      console.log('r', r);
      if (r._id)
        toast(t('saved successfully.'), {
          type: "success"
        });
      // window.location.reload();
    }).catch(f => {
      console.log('f', f);
      toast(t('shit!'), {
        type: "warning"
      });
    })

  }
  const moveContent = (thisKey, theDestinationKey, address = 0) => {
    console.clear()
    console.log('moveContent...', thisKey, theDestinationKey, address)
    // setLoading(true);
    if (address === 0) {
      let tempContent = components[theDestinationKey];
      components[theDestinationKey] = components[thisKey];
      components[thisKey] = tempContent;
      // components.push(element)
      // console.log('components', components)
      // setComponents([...components]);
      setState({...state, components: components});


    } else {
      address = address.split('_');
      if (address[0] === 'component') {
        address.shift();
        let theNewComponents = components;
        let mainAddress = address;
        theNewComponents.forEach((comp, inde) => {
          let the_id = 'component_' + mainAddress[0];

          console.log('the_id', the_id, comp.id)
          if (!theNewComponents[inde].children) {
            theNewComponents[inde].children = [];
          }
          // if (!theNewComponents[inde]['children'][mainAddress[1]]) {
          //   theNewComponents[inde]['children'][mainAddress[1]]={};
          // }
          if (comp.id == the_id) {
            console.log(inde, ' ==> ', theDestinationKey, ' in:', mainAddress[1])
            console.log(theNewComponents[inde].children[mainAddress[1]])
            let tempContent = theNewComponents[inde].children[mainAddress[1]][theDestinationKey];
            console.log('tempContent', tempContent)
            theNewComponents[inde].children[mainAddress[1]][theDestinationKey] = theNewComponents[inde].children[mainAddress[1]][thisKey];
            theNewComponents[inde].children[mainAddress[1]][thisKey] = tempContent;
          }
        })
        setState({...state, components: theNewComponents});

        // console.log('address',address);
      }
    }
    // setComponents(components);
    // setLoading(false);

  }

  useEffect(() => {
    // console.clear();
    console.log('useEffect')
    load();
  }, []);
  useEffect(() => {

    console.log('useEffect...', state)
    // load();
  }, [state]);

  const toggleOptionBox = (extra) => {
    setState({...state, optionBox: !state.optionBox, ...extra})
  }
  const changeComponentSetting = (the_com, method, element) => {
    let address = '';
    console.log('the_com', the_com);
    console.log('change id:', the_com.id);
    console.log('method', method);
    console.log('element', element);
    console.log('components', components);
    the_com['settings'][method].fields = element;
    let tempArray = [];
    components.forEach((comp, j) => {
      console.log('#j:', j)
      if (the_com.id === comp.id) {
        console.log('we found it in parent route... the_com.id:', the_com.id, ' comp.id:', comp.id)
        tempArray.push(the_com);
      } else {
        console.log('maybe it is in row ' + j + '...')

        if (comp.children) {

          comp.children.forEach((c, x) => {
            console.log('check level ' + j + ' , ' + x + '...')
            if (the_com.id === c.id) {
              console.log('it is in level ' + j + ' , ' + x + '...', comp.children[x])
              console.log('update comp.children[' + x + ']', comp.children[x])
              comp.children[x] = the_com;

              address = [j, x];
            } else {
              console.log('comp.children[' + x + '] should be same')
              comp.children[x] = comp.children[x];

            }
            // console.log('c', c)
            if (the_com.id === c.id) {

              // console.log('it is in level ' + h + ' , ' + x + '...')
              address = [j];
            }
          });

        }
        console.log('comp', address)
        tempArray.push(comp);
      }
    });
    console.log('save components:', tempArray)
    setState({...state, components: tempArray})
  };
  const deleteItem = (id) => {
    // console.clear()
    let found_path = ''
    console.log('deleteItem...', id)
    console.log('components in:', components)
    let tempArray = [];
    components.forEach((comp, j) => {
      let deleteItem = false;
      if (id === comp.id) {
        //  delete this
        console.log('we found it...')
        deleteItem = true;
      }
      if (comp.children && !deleteItem) {
        console.log('we need to check children...', comp.children)
        let tempChildren = []
        comp.children.forEach((ch, j2) => {
          let deleteItem2 = false;
          if (id == ch.id) {
            console.log('we found it in: components[' + j + '][' + j2 + ']')

            deleteItem2 = true;
          }


          if (ch.children && !deleteItem2) {
            console.log('we need to check children 2...', ch.children)
            let tempChildren3 = []
            ch.children.forEach((ch3, j3) => {
              let deleteItem3 = false;
              if (id == ch3.id) {
                console.log('we found it in: components[' + j + '][' + j2 + '][' + j3 + ']')

                deleteItem3 = true;
              }
              if (ch3.children && !deleteItem3) {
                console.log('we need to check children 3...', ch.children)
                let tempChildren4 = []
                ch3.children.forEach((ch4, j4) => {
                  let deleteItem4 = false;
                  if (id == ch4.id) {
                    console.log('we found it in: components[' + j + '][' + j2 + '][' + j3 + '][' + j4 + ']')

                    deleteItem4 = true;
                  }

                  if (!deleteItem4) {
                    tempChildren4.push(ch4);
                  }

                });
                ch3.children = tempChildren4;
              }

              if (!deleteItem3) {
                tempChildren3.push(ch3);
              }

            });
            ch.children=tempChildren3;
          }
          if (!deleteItem2)
            tempChildren.push(ch);
        });
        comp.children=tempChildren;
      }


      if (!deleteItem)
        tempArray.push(comp);
    });

    let r = [...tempArray];
    console.log('components out:', r)

    setState({...state, components: tempArray});

  };

  const addToComponents = (element, extra) => {
    console.log('addToComponent: ', element)
    console.log('inside: ', sourceAddress)
    let theNewComponents = components,
      mainAddress = [];
    if (sourceAddress) {
      mainAddress = sourceAddress.split('_');
    }

    if (mainAddress[0] == 'new') {
      // console.log('addToComponents:', {...element, id: 'component_' + c})
      // console.log(mainAddress, theNewComponents)

      theNewComponents.push({...element, id: 'component_' + generateID()});
      setC(c + 1);
      setState({...state, components: theNewComponents, ...extra});

    } else {
      theNewComponents.forEach((compL1, indeL1) => {
        if ((compL1.id === sourceAddress)) {
          console.clear();
          console.log('we found it,...', compL1.id)
          if (!theNewComponents[indeL1]['children']) {
            theNewComponents[indeL1]['children'] = [];
          }
          theNewComponents[indeL1]['children'].push({
            ...element,
            id: 'component_' + generateID()
          })
          setState({...state, components: theNewComponents, ...extra});
          return;
        }
        if ((compL1.children)) {
          compL1.children.forEach((compL2, indeL2) => {
            if ((compL2.id === sourceAddress)) {

              console.log('we found it here level 1...', theNewComponents[indeL1]['children'][indeL2])
              if (!theNewComponents[indeL1]['children'][indeL2]['children']) {
                theNewComponents[indeL1]['children'][indeL2]['children'] = [];
              }
              theNewComponents[indeL1]['children'][indeL2]['children'].push({
                ...element,
                id: 'component_' + generateID()
              })
              setState({...state, components: theNewComponents, ...extra});
              return;
            }
            if ((compL2.children)) {

              compL2.children.forEach((compL3, indeL3) => {
                if ((compL3.id === sourceAddress)) {

                  console.log('we found it here level 3...', theNewComponents[indeL1]['children'][indeL2]['children'][indeL3])
                  if (!theNewComponents[indeL1]['children'][indeL2]['children'][indeL3]['children']) {
                    theNewComponents[indeL1]['children'][indeL2]['children'][indeL3]['children'] = [];
                  }
                  theNewComponents[indeL1]['children'][indeL2]['children'][indeL3]['children'].push({
                    ...element,
                    id: 'component_' + generateID()
                  })
                  setState({...state, components: theNewComponents, ...extra});
                  return;
                }
                if (compL3.children) {
                  compL3.children.forEach((compL4, indeL4) => {
                    if ((compL4.id === sourceAddress)) {

                      console.log('we found it here level 4...', theNewComponents[indeL1]['children'][indeL2]['children'][indeL3]['children'][indeL4])
                      if (!theNewComponents[indeL1]['children'][indeL2]['children'][indeL3]['children'][indeL4]['children']) {
                        theNewComponents[indeL1]['children'][indeL2]['children'][indeL3]['children'][indeL4]['children'] = [];
                      }
                      theNewComponents[indeL1]['children'][indeL2]['children'][indeL3]['children'][indeL4]['children'].push({
                        ...element,
                        id: 'component_' + generateID()
                      })
                      setState({...state, components: theNewComponents, ...extra});
                      return;
                    }
                  })
                }
              })
            }
          })

        }

      });
    }
  }
  const generateID = (tokenLen = 5) => {

    var text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < tokenLen; ++i)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  const addToComponents2 = (element, extra) => {
    console.log('addToComponents:', element)
    console.log('where?', sourceAddress)
    let theNewComponents = components;
    let mainAddress = [];
    if (sourceAddress) {
      mainAddress = sourceAddress.split('_');
    }
// let id_is
    console.log('mainAddress', mainAddress);
    if (mainAddress[0] == 'component') {
      mainAddress.shift();
      // console.log('tempMainAddress', mainAddress[0], mainAddress[1], theNewComponents)
      let the_id = 'component_' + mainAddress[0];
      theNewComponents.forEach((comp, inde) => {
        console.log('the_id', the_id, comp.id)
        if (!theNewComponents[inde].children) {
          theNewComponents[inde].children = [];
        }
        if ((comp.id == the_id) || (inde == mainAddress[0])) {
          console.log('theNewComponents[inde]', theNewComponents[inde])
          //make changes here
          if (mainAddress[1]) {
            if (!theNewComponents[inde]['children'][mainAddress[1]]) {
              theNewComponents[inde]['children'][mainAddress[1]] = [];
            }
            let ChildrenLength = theNewComponents[inde]['children'][mainAddress[1]].length;
            // if (!ChildrenLength)
            theNewComponents[inde]['children'][mainAddress[1]].push({
              ...element,
              id: 'component_' + inde + '_' + mainAddress[1] + '_' + ChildrenLength
            })

          }

        }
      })

      console.log('the newComponents are:', theNewComponents)
      setState({...state, components: theNewComponents, ...extra});
    }
    if (mainAddress[0] == 'new') {
      console.log('addToComponents:', {...element, id: 'component_' + c})
      console.log(mainAddress, theNewComponents)

      theNewComponents.push({...element, id: 'component_' + c});
      setC(c + 1);
      setState({...state, components: theNewComponents, ...extra});

    }
    // save();

  }

  console.log('componentForSetting', componentForSetting)
  // console.log('DefaultOptions', DefaultOptions)
  console.log('components', components)
  return (

    <div className={'nodeeweb-page-builder-wrapper'}>
      <div id="nodeeweb-page-builder" style={{height: "100vh", width: "100vw !important"}}>
        {components && components.map((component, index) => {
          if (!component) {
            return <></>
          }
          return <Component
            key={index}
            index={index}
            toggleOptionBox={toggleOptionBox}
            moveContent={moveContent}
            component={component}
            deleteItem={(e) => {
              // e.preventDefault();
              console.log('delete Item', e)
              deleteItem(e || component.id)
            }}

            // setSourceAddress={(e)=>{
            //   console.log('e',e)
            //   setState({...state, sourceAddress: e});
            //
            // }}
            changeComponentSetting={(e, j, d) => {
              console.log('changeComponentSetting', e, j, d);
              changeComponentSetting(e, j, d)
            }}
            length={components.length}
          />
        })}

        <div className={'add-component element'} onClick={(e) => {
          setState({...state, sourceAddress: 'new', excludeArray: [], optionBox: !state.optionBox});
          console.log('create exclude...');
        }}>
          <AddIcon/>
        </div>
      </div>

      <OptionBox defaultOptions={DefaultOptions} onClose={(e) => {
        console.log('setExcludeArray');
        toggleOptionBox();
      }} exclude={excludeArray} open={state.optionBox} addToComponents={addToComponents}/>


      <div className={'nodeeweb-fixed-bottom-bar'}>
        <div className={'npb-d-flex '}>
          <label
            style={{direction: 'ltr'}}>{data && (typeof data.title == 'object') ? data.title[lan] : data.title}</label>
          <span className={'npb-settings'}>
        <Button onClick={save}>
          Save
        </Button>
          </span>
        </div>
      </div>
    </div>
  );
};
export const PageServer = [
  {}
];
export default withTranslation()(CreatePage);
