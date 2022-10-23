import React, {useEffect, useState} from "react";
import {withTranslation} from "react-i18next";
import {dFormat, PriceFormat} from "#c/functions/utils";
import {useParams} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {Button} from 'shards-react';

import OptionBox from "#c/components/page-builder/OptionBox";
import Component from "#c/components/page-builder/Component";
import ComponentOptionBox from "#c/components/page-builder/ComponentOptionBox";
import "#c/assets/styles/nodeeweb-page-builder.css";

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

const defaultOptions = [{
  "label": "Slider",
  "name": "slider",
  "addable": false,
  "settings": {
    "general": [{"name": "_id", "type": "string"}, {"name": "type", "type": "select", "children": []}],
    "design": [{"name": "padding", "type": "string"}],
  }
}, {
  "label": "Row",
  "name": "row",
  "addable": true,
  "settings": {
    "general": {"colCount": 1},
    "design": [{"name": "padding", "type": "string"}],
  }
}, {
  "label": "Html",
  "name": "html",
  "addable": true,
  "settings": {
    "general": {"colCount": 1},
    "design": [{"name": "padding", "type": "string"}],
  }
}, {
  "label": "Grid Entity",
  "name": "grid",
  "addable": true,
  "settings": {
    "general": {"colCount": 1},
    "design": [{"name": "padding", "type": "string"}],
  }
}];
// let c = 0;
const Builder=()=>{

}
const CreatePage = ({t}) => {

  const [c, setC] = useState(0);
  const [data, setData] = useState({});
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
  useEffect(() => {
    // console.clear();
    console.log('useEffect')
    load();
  }, []);
  useEffect(() => {

    console.log('useEffect...', state)
    // load();
  }, [state]);
  const save = (options = {}) => {
    console.log("store ")
    console.log('_id', _id, components)
    SaveBuilder(model, _id, {elements: components}).then(r => {
      console.log('r', r);
    }).catch(f => {
      console.log('f', f);
    })

  }
  const toggleOptionBox = () => {
    console.log('close option box...')
    setState({...state, optionBox: !optionBox});

  }
  const toggleComponentOptionsBox = () => {
    console.log('close component option box...',componentOptionsBox)
    if (componentOptionsBox)
      setState({...state, componentOptionsBox: false,componentForSetting:{}});
    else
      setState({...state, componentOptionsBox: true});
  }
  const addToComponents = (element) => {
    console.log('addToComponents', element, sourceAddress)
    let theNewComponents = components;
    let mainAddress = [];
    if (sourceAddress) {
      mainAddress = sourceAddress.split('_');
    }

    console.log('mainAddress', mainAddress);
    if (mainAddress[0] == 'component') {
      mainAddress.shift();
      console.log('tempMainAddress', mainAddress[0], mainAddress[1], theNewComponents[mainAddress[0]])
      if (!theNewComponents[mainAddress[0]].children) {
        theNewComponents[mainAddress[0]].children = [];
      }
      let r = 0;
      if (!theNewComponents[mainAddress[0]]['children'][mainAddress[1]]) {
//push to create it
        do {

          theNewComponents[mainAddress[0]]['children'].push([]);
        } while (!theNewComponents[mainAddress[0]]['children'][mainAddress[1]]);
      }
      let l = theNewComponents[mainAddress[0]]['children'][mainAddress[1]].length;
      theNewComponents[mainAddress[0]]['children'][mainAddress[1]].push({
        ...element,
        id: 'component_' + mainAddress[0] + '_' + mainAddress[1] + '_' + l
      })
      console.log('theNewComponents[' + mainAddress[0] + '][\'children\'][' + mainAddress[1] + ']', theNewComponents[mainAddress[0]]['children'][mainAddress[1]])
      // console.log('theNewComponents[mainAddress[0]][\'children\']',theNewComponents[mainAddress[0]]['children'][mainAddress[1]])
      // settheNewComponents([...theNewComponents])
      setState({...state, components: theNewComponents});

      // if(!components[mainAddress[0]][mainAddress[1]]['children']){
      //   components[mainAddress[0]][mainAddress[1]]['children']=[];
      // }else{
      //   r=components[mainAddress[0]][mainAddress[1]]['children'].length;
      // }
      // components[mainAddress[0]][mainAddress[1]]['children'].push({...element, id: 'component_' + mainAddress[0]+'_'+mainAddress[1]+'_'+r})
      //

    }
    if (mainAddress[0] == 'new') {
      console.log('addToComponents:', {...element, id: 'component_' + c})
      console.log(mainAddress, theNewComponents)

      theNewComponents.push({...element, id: 'component_' + c});
      setC(c + 1);
      setState({...state, components: theNewComponents});

    }
  }
  const findItem = (id) => {
    console.clear()
    console.log('id', id)
    let address = [];

    components.forEach((comp, j) => {
      if (id === comp.id) {
        address = [j];
      }
      if (comp.children) {
        for (let h = 0; h < comp.children.length; h++) {
          let ch = comp.children[h];
          console.log(ch)
          if (ch)
            ch.forEach((c, x) => {
              if (id === c.id) {
                address = [j, h, x];
              }
              console.log('c', c)
              if (id === ch.id) {
                address = [j, h];
              }
            });
        }
      }
    });
    return address;
  }
  const deleteItem = (id) => {
    console.log('deleteItem...', id, components)
    let tempArray = [];
    components.forEach((comp, j) => {
      if (id !== comp.id) {

        if (comp.children) {
          for (let h = 0; h < comp.children.length; h++) {
            let ch = comp.children[h], tr = [];
            console.log(ch)
            if (ch)
              ch.forEach((c, x) => {
                if (id !== c.id) {
                  tr.push(c);
                }

              });

            comp.children[h] = tr

          }


        }
        tempArray.push(comp);

      }
    });

    setState({...state, components: components});

  }
  const changeComponentSetting = (method, theComponentForSetting) => {
    // console.clear();
    let tc = componentForSetting;
    let address = [];
    console.log('components:', components)
    console.log('method:', method)
    console.log('component:', theComponentForSetting)
    console.log('componentForSettingnt:', componentForSetting.id)
    tc['settings'][method] = theComponentForSetting;
    let gid = tc.id;
    // componentForSetting = component;
    let newComps = components, tempArray = [];
    newComps.forEach((comp, j) => {
      if (gid === comp.id) {
        address = [j];
        tempArray.push(tc);
      } else {
        tempArray.push(comp);
      }
      if (comp.children) {
        for (let h = 0; h < comp.children.length; h++) {
          let ch = comp.children[h];
          console.log(ch)
          if (ch)
            ch.forEach((c, x) => {
              if (gid === c.id) {
                address = [j, h, x];
              }
              console.log('c', c)
              if (gid === ch.id) {
                address = [j, h];
              }
            });
        }
      }
    });
    console.log('address', address)
    setState({...state, components: tempArray})
    // if (component)
    //   setComponentForSetting({...component})
  }

  const moveContent = (thisKey, theDestinationKey, address = 0) => {
    console.clear()
    console.log('moveContent...', thisKey, theDestinationKey, address)
    // setLoading(true);
    let tempContent = components[theDestinationKey];
    if (address === 0) {
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
        let theList = components[address[0]].children[address[1]];
        tempContent = theList[theDestinationKey];
        theList[theDestinationKey] = theList[thisKey];
        theList[thisKey] = tempContent;
        components[address[0]].children[address[1]] = theList;
        // console.log('components[address[0]].children[address[1]]',components[address[0]].children[address[1]])
        // setComponents([...components]);
        setState({...state, components: components});

        // address.forEach((adr)=>{
        //   console.log(components[address[0]].children[address[1]])
        // })
        // console.log('address',address);
      }
    }
    // setComponents(components);
    // setLoading(false);

  }
  //
  // if (loading) {
  //   return <></>
  // }
  console.log('componentForSetting', componentForSetting)
  console.log('defaultOptions', defaultOptions)
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
            component={component}
            moveContent={(e, d, s = 0) => moveContent(e, d, s)}
            setComponentForSetting={(e) => {
              console.log('setComponentForSetting...', e)
              setState({...state, componentForSetting: e, componentOptionsBox: !componentOptionsBox});
            }}
            toggleComponentOptionsBox={toggleComponentOptionsBox}
            setSourceAddress={() => {
              setState({...state, sourceAddress: 'new'})
            }}
            setExcludeArray={(e) => {
            }}
            toggleOptionBox={() => {
              toggleOptionBox()
            }}
            length={components.length}
          />
        })}

        <div className={'add-component element'} onClick={(e) => {
          // setSourceAddress('new');
          setState({...state, sourceAddress: 'new', excludeArray: []});
          console.log('create exclude...');
          toggleOptionBox()
        }}>
          <AddIcon/>
        </div>
      </div>

      <OptionBox defaultOptions={defaultOptions} onClose={(e) => {
        console.log('setExcludeArray');
        // setExcludeArray([]);
        setState({...state, sourceAddress: 'new', excludeArray: []});

        toggleOptionBox()
      }} exclude={excludeArray} open={optionBox} addToComponents={addToComponents}/>

      <ComponentOptionBox componentForSetting={componentForSetting}
                          onClose={(e) => toggleComponentOptionsBox()}
                          open={componentOptionsBox}
                          deleteItem={deleteItem}
                          changeComponentSetting={(method, e) => {
                            console.log('change component settings...', method, e)
                            changeComponentSetting(method, e);
                          }}
      />
      <div className={'nodeeweb-fixed-bottom-bar'}>
        <div className={'npb-d-flex '}>
          <label style={{direction: 'ltr'}}>{data && data.title}</label>
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
