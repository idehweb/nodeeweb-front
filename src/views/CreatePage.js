import React, {useEffect} from "react";
import {withTranslation} from "react-i18next";
import {dFormat, PriceFormat} from "#c/functions/utils";
import {useParams} from "react-router-dom";

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
import store from "../functions/store";
// import { Link, useNavigate, useParams } from "react-router-dom";
// let obj = ;
// let the_id='';
// import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css'
import 'grapesjs/dist/grapes.min.js'
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css'
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.js'
import "#c/components/page-builder/contentslider/index"
import "#c/components/page-builder/countdown/index"
import '#assets/styles/grape.css'

// import '../components/page-builder/productslider/index'
const CreatePage = (props) => {
  let editor;
  let params = useParams();
  let _id = params._id || null;
  useEffect(() => {

    const blocks = [
      {
        id: 'text',
        label: 'Text',
        category: 'Basic',
        media: `<svg style="width:48px;height:48px" viewBox="0 0 24 24">
<path fill="currentColor" d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z" />
</svg>`,
        activate: true,
        content: {
          type: 'text',
          content: 'Insert your text here',
          style: {padding: '10px'},
        }
      }
    ];
    // console.clear();
    // console.log('returnTheBuilderUrl', returnTheBuilderUrl())
    const sessionStoragePlugin = (editor) => {
      // As sessionStorage is not an asynchronous API,
      // the `async` keyword could be skipped
      editor.Storage.add('session', {
        async load(options = {}) {
          // var x={"_id":"62d68468e6f556cc36cd72a5","active":true,"description":"","excerpt":"","views":[{"userIp":"::1","createdAt":"2022-07-20T17:38:23.843Z"},{"userIp":"::1","createdAt":"2022-07-20T17:39:29.481Z"},{"userIp":"::1","createdAt":"2022-07-20T17:42:14.411Z"},{"userIp":"::1","createdAt":"2022-07-21T09:21:22.623Z"},{"userIp":"::1","createdAt":"2022-07-22T08:38:23.443Z"},{"userIp":"::1","createdAt":"2022-07-22T08:38:44.345Z"},{"userIp":"::1","createdAt":"2022-07-22T10:50:27.293Z"},{"userIp":"::1","createdAt":"2022-07-22T10:50:38.045Z"},{"userIp":"::1","createdAt":"2022-07-22T10:51:52.740Z"},{"userIp":"::1","createdAt":"2022-07-22T10:54:01.472Z"},{"userIp":"::1","createdAt":"2022-07-22T10:54:05.536Z"},{"userIp":"::1","createdAt":"2022-07-22T10:54:12.705Z"},{"userIp":"::1","createdAt":"2022-07-22T10:54:22.612Z"},{"userIp":"::1","createdAt":"2022-07-22T10:54:31.892Z"},{"userIp":"::1","createdAt":"2022-07-22T10:54:34.353Z"},{"userIp":"::1","createdAt":"2022-07-22T11:06:17.389Z"},{"userIp":"::1","createdAt":"2022-07-22T11:10:49.793Z"},{"userIp":"::1","createdAt":"2022-07-22T11:14:13.078Z"},{"userIp":"::1","createdAt":"2022-07-22T11:16:21.512Z"},{"userIp":"::1","createdAt":"2022-07-22T12:06:06.145Z"},{"userIp":"::1","createdAt":"2022-07-22T12:21:26.942Z"},{"userIp":"::1","createdAt":"2022-07-22T12:21:43.025Z"},{"userIp":"::1","createdAt":"2022-07-22T12:22:14.622Z"},{"userIp":"::1","createdAt":"2022-07-22T12:22:23.469Z"},{"userIp":"::1","createdAt":"2022-07-22T12:23:59.072Z"},{"userIp":"::1","createdAt":"2022-07-22T12:24:55.920Z"},{"userIp":"::1","createdAt":"2022-07-22T12:35:50.769Z"},{"userIp":"::1","createdAt":"2022-07-22T12:41:04.234Z"},{"userIp":"::1","createdAt":"2022-07-22T12:43:33.396Z"},{"userIp":"::1","createdAt":"2022-07-22T12:45:10.571Z"},{"userIp":"::1","createdAt":"2022-07-22T12:45:48.081Z"},{"userIp":"::1","createdAt":"2022-07-22T12:47:05.666Z"},{"userIp":"::1","createdAt":"2022-07-22T12:47:20.423Z"},{"userIp":"::1","createdAt":"2022-07-22T12:47:27.572Z"},{"userIp":"::1","createdAt":"2022-07-22T12:47:32.499Z"},{"userIp":"::1","createdAt":"2022-07-22T12:48:34.644Z"},{"userIp":"::1","createdAt":"2022-07-22T12:48:56.005Z"},{"userIp":"::1","createdAt":"2022-07-22T12:49:26.526Z"},{"userIp":"::1","createdAt":"2022-07-22T12:49:31.780Z"},{"userIp":"::1","createdAt":"2022-07-22T12:49:47.671Z"},{"userIp":"::1","createdAt":"2022-07-22T12:49:51.888Z"},{"userIp":"::1","createdAt":"2022-07-22T12:50:10.700Z"},{"userIp":"::1","createdAt":"2022-07-22T12:50:21.430Z"},{"userIp":"::1","createdAt":"2022-07-22T12:50:40.397Z"},{"userIp":"::1","createdAt":"2022-07-22T12:50:53.409Z"},{"userIp":"::1","createdAt":"2022-07-22T12:50:57.218Z"},{"userIp":"::1","createdAt":"2022-07-22T12:51:43.626Z"},{"userIp":"::1","createdAt":"2022-07-22T12:51:48.424Z"},{"userIp":"::1","createdAt":"2022-07-22T20:26:30.649Z"},{"userIp":"::1","createdAt":"2022-07-22T20:27:16.238Z"},{"userIp":"::1","createdAt":"2022-07-22T20:27:44.025Z"},{"userIp":"::1","createdAt":"2022-07-22T20:27:51.731Z"},{"userIp":"::1","createdAt":"2022-07-22T20:28:48.193Z"},{"userIp":"::1","createdAt":"2022-07-22T20:30:06.037Z"},{"userIp":"::1","createdAt":"2022-07-22T20:30:23.757Z"},{"userIp":"::1","createdAt":"2022-07-22T20:30:50.210Z"},{"userIp":"::1","createdAt":"2022-07-22T20:33:01.415Z"},{"userIp":"::1","createdAt":"2022-07-22T20:33:21.611Z"},{"userIp":"::1","createdAt":"2022-07-22T20:33:36.899Z"},{"userIp":"::1","createdAt":"2022-07-22T20:36:04.899Z"},{"userIp":"::1","createdAt":"2022-07-22T20:36:46.236Z"},{"userIp":"::1","createdAt":"2022-07-22T20:42:08.471Z"},{"userIp":"::1","createdAt":"2022-07-22T20:48:13.898Z"},{"userIp":"::1","createdAt":"2022-07-22T20:54:28.878Z"},{"userIp":"::1","createdAt":"2022-07-22T20:54:42.133Z"},{"userIp":"::1","createdAt":"2022-07-22T20:56:52.195Z"},{"userIp":"::1","createdAt":"2022-07-22T20:58:55.011Z"},{"userIp":"::1","createdAt":"2022-07-22T20:59:04.142Z"},{"userIp":"::1","createdAt":"2022-07-22T20:59:22.965Z"},{"userIp":"::1","createdAt":"2022-07-22T21:01:54.301Z"},{"userIp":"::1","createdAt":"2022-07-22T21:05:53.980Z"},{"userIp":"::1","createdAt":"2022-07-23T11:44:12.199Z"},{"userIp":"::1","createdAt":"2022-07-23T11:44:15.177Z"},{"userIp":"::1","createdAt":"2022-07-23T11:44:20.349Z"},{"userIp":"::1","createdAt":"2022-07-23T14:50:34.963Z"},{"userIp":"::1","createdAt":"2022-07-23T15:06:01.517Z"},{"userIp":"::1","createdAt":"2022-07-24T14:42:08.281Z"},{"userIp":"::1","createdAt":"2022-07-24T14:42:12.710Z"},{"userIp":"::1","createdAt":"2022-07-24T14:42:17.959Z"},{"userIp":"::1","createdAt":"2022-07-26T14:01:57.221Z"},{"userIp":"::1","createdAt":"2022-07-26T14:02:01.731Z"}],"slug":"home","title":{"fa":"خانه","en":"home"},"elements":{"assets":[],"styles":[{"selectors":[{"name":"row","private":1}],"style":{"display":"table","padding-top":"10px","padding-right":"10px","padding-bottom":"10px","padding-left":"10px","width":"100%"}},{"selectors":[{"name":"cell","private":1}],"style":{"width":"100%","display":"block"},"mediaText":"(max-width: 768px)","atRuleType":"media"},{"selectors":["cell30"],"style":{"width":"100%","display":"block"},"mediaText":"(max-width: 768px)","atRuleType":"media"},{"selectors":["cell70"],"style":{"width":"100%","display":"block"},"mediaText":"(max-width: 768px)","atRuleType":"media"},{"selectors":[{"name":"cell","private":1}],"style":{"width":"8%","display":"table-cell","height":"75px"}},{"selectors":["#ir0c"],"style":{"color":"black"}},{"selectors":["#imyj"],"style":{"padding":"10px"}}],"pages":[{"frames":[{"component":{"type":"wrapper","stylable":["background","background-color","background-image","background-repeat","background-attachment","background-position","background-size"],"attributes":{"id":"ihqd"},"components":[{"name":"Row","droppable":".cell","resizable":{"tl":0,"tc":0,"tr":0,"cl":0,"cr":0,"bl":0,"br":0,"minDim":1},"classes":[{"name":"row","private":1}],"components":[{"name":"Cell","draggable":".row","resizable":{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2},"classes":[{"name":"cell","private":1}],"components":[{"type":"text","attributes":{"id":"imyj"},"components":[{"type":"textnode","content":"Insert your text here"}]}]},{"name":"Cell","draggable":".row","resizable":{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2},"classes":[{"name":"cell","private":1}],"components":[{"name":"Row","droppable":".cell","resizable":{"tl":0,"tc":0,"tr":0,"cl":0,"cr":0,"bl":0,"br":0,"minDim":1},"classes":[{"name":"row","private":1}],"components":[{"name":"Cell","draggable":".row","resizable":{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2},"classes":[{"name":"cell","private":1}],"components":[{"type":"image","attributes":{"id":"ir0c","src":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+"}}]}]}]}]}]}}],"type":"main","id":"vVNyejX4Cxdptlr3"}],"html":"<body id=\"ihqd\"><div class=\"row\"><div class=\"cell\"><div id=\"imyj\">Insert your text here</div></div><div class=\"cell\"><div class=\"row\"><div class=\"cell\"><img id=\"ir0c\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+\"/></div></div></div></div></body>","js":""},"kind":"page","status":"published","photos":[],"createdAt":"2022-07-19T10:16:08.365Z","updatedAt":"2022-07-19T10:16:08.365Z","__v":0};
          // const data = editor.getProjectData();
          // console.log(data)
          if (_id)
            await GetBuilder(_id).then(async r => {
              console.log('r', r.elements);
              //sessionStorage.setItem(options.key, JSON.stringify(r.elements));
              editor.setComponents(r.elements.pages[0].frames[0].component.components);
              editor.setStyle(r.elements.styles);
              return (r.elements);

            })
          //     .catch(f => {
          //     // toast((f.message), {
          //     //     type: "error"
          //     // });
          //     console.log('f', f);
          // })
          // let str = sessionStorage.getItem(options.key);
          // console.log("xxxload ", str);
          // let obj = JSON.parse(str);
          // // delete obj.js;
          // // delete obj.html;
          // return x.elements;
        },

        async store(data, options = {}) {
          console.log("store ")
          console.log('_id',_id)
          // console.log('_id',)
          SaveBuilder(_id, {...data, html: editor.getHtml(), js: editor.getJs(),css:editor.getCss()}).then(r => {
            sessionStorage.setItem(options.key, JSON.stringify(data));

            console.log('r', r);
          }).catch(f => {
            console.log('f', f);
          })
          sessionStorage.setItem(options.key, JSON.stringify(data));

        }
      });
    };
    editor = grapesjs.init({
      container: '#gjs',
      height: '100vh',
      width: '100%',
      // plugins: ['gjs-preset-webpage', 'grapesjs-swiper-slider',],
      plugins: ['gjs-component-productslider', 'gjs-component-countdown', 'gjs-preset-webpage', 'grapesjs-swiper-slider', sessionStoragePlugin],
      // blocManager: {
      //     custom: true,
      //     blocks,
      // },

      storageManager: {
        // type: 'remote',
        // stepsBeforeSave: 1,
        // options: {
        //     remote: {
        //         urlLoad: returnTheBuilderUrl(_id,type),
        //         urlStore: returnTheBuilderUrl(_id,type),
        //         // The `remote` storage uses the POST method when stores data but
        //         // the json-server API requires PATCH.
        //         fetchOptions: opts => (opts.method === 'POST' ?  { method: 'PATCH' } : {}),
        //         // As the API stores projects in this format `{id: 1, data: projectData }`,
        //         // we have to properly update the body before the store and extract the
        //         // project data from the response result.
        //         onStore: data => ({ id: _id, data }),
        //         onLoad: result => result.data,
        //         headers: {
        //             'token': tok,
        //             "Origin": "http://localhost:3001",
        //             "Host": "localhost:3001",
        //             "Accept": "application/json, text/plain, */*",
        //             "Content-Type": "application/json"
        //         }
        //     }
        // },
        id: 'gjs-',
        autosave: true,
        storeComponents: true,
        storeStyles: true,
        storeHtml: true,
        storeCss: true,
        // type: 'remote',
        // autosave: true,         // Store data automatically
        // autoload: true,
        // params: { page_id: _id },
        contentTypeJson: true,
        // storeComponents: true,
        // storeStyles: true,
        // storeHtml: true,
        // storeCss: true,
        // headers: {
        //     'Content-Type': 'application/json',
        //     'token': tok,
        // }
        type: 'session',
        options: {
          session: {key: 'myKey'}
        }
      },

      deviceManager: {
        devices:
          [
            {
              id: 'desktop',
              name: 'Desktop',
              width: '',
            },
            {
              id: 'tablet',
              name: 'Tablet',
              width: '768px',
              widthMedia: '992px',
            },
            {
              id: 'mobilePortrait',
              name: 'Mobile portrait',
              width: '320px',
              widthMedia: '575px',
            },
          ]
      },
      pluginsOpts: {
        'grapesjs-preset-webpage': {
          blocksBasicOpts: {
            blocks: ['link'],
            flexGrid: 1,
          },
          blocks: ['link-block', 'quote', 'text-basic'],
        },
      },
    })
    editor.Panels.addButton
    ('options',
      [{
        id: 'save-db',
        className: 'fa fa-floppy-o',
        command: 'save-db',
        attributes: {title: 'Save DB'}
      }, {
        id: 'view-front',
        className: 'fa fa-eye',
        command: 'view-front',
        attributes: {title: 'View at front mode'}
      }]
    );
    // Add the command
    editor.Panels.getButton('options', 'sw-visibility').set('active', true);
    editor.Commands.add
    ('save-db', {
      run: function (editor, sender) {
        sender && sender.set('active'); // turn off the button

        editor.store().then(e => {
          // console.log('e',e);
          // if(e._id)
          // toast(("saved"), {
          //     type: "success"
          // });
          // else
          //     toast(("error"), {
          //     type: "error"
          // });
        }).catch(e => {
          // toast(("catch error"), {
          //     type: "error"
          // });
        }); // extract data
      }
    });
    editor.Commands.add
    ('view-front', {
      run: function (editor, sender) {
        let anchor = document.createElement('a');
        anchor.href = BASE_URL + '/page/' + _id + '';
        anchor.target = "_blank";
        anchor.click();
        // sender && sender.set('active'); // turn off the button
        // editor.store(); // extract data
      }
    });
    // to load data inital
    // editor.setComponents(JSON.parse(value.components));
    // editor.setStyle(JSON.parse(value.styles));
    editor.on('storage:load', function (e) {
      console.log('Loaded ', e);
    });
    editor.on('storage:store', function (e) {
      console.log('Stored ', e);

      // console.log(e.pages[0].frames[0].component)
      // const data = editor.getProjectData();
      // console.log(data)
      // SaveBuilder(_id,type,e,{
      //     token:tok
      // }).then(r=>{
      //     console.log('r',r);
      // }).catch(f=>{
      //     console.log('f',f);
      // })
      // storageManager.store(data);
    });
    // editor.BlockManager.add('Nodeeweb', {
    //     label: 'Nodeeweb',
    //     attributes: {
    //         title: 'Insert product slider'
    //     },
    //     category: "the cat",
    //     // category: '',
    //     content:<div className={'the-dlider'}>fff</div>
    //     // ...
    // })
    // const cssRule = editor.Css.setRule('.swiper-container-horizontal', { overflow: 'hidden' });
    // , {
    //         atRuleType: 'media',
    //             atRuleParams: '(min-width: 500px)'
    //     }
    //     cssRule.getAtRule();
//         const css = editor.Css;
//         const addedRules = css.addRules('.my-cls{ color: red } @media (max-width: 992px) { .my-cls{ color: darkred } }');
// // Check rules
//         addedRules.map(rule => rule.toCSS());
  }, [])


  return (


    <div id="gjs" style={{height: "100vh", width: "100vw !important"}}>
      kjhghj
    </div>
  );
};
export const PageServer = [
  {
    func: loadPost,
    params: "6217502008d0e437d6b4ad97"
  }
];
export default withTranslation()(CreatePage);
