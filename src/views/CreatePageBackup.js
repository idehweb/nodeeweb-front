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
import grapesjs from 'grapesjs';
import grapesjsPresetWebpage from 'grapesjs-preset-webpage';
import 'grapesjs/dist/css/grapes.min.css'
import 'grapesjs/dist/grapes.min.js'
import "#c/components/page-builder/box/index"
import '#assets/styles/grape.css'
const CreatePage = (props) => {
  let editor;
  let params = useParams();
  let _id = params._id || null;
  let model = params.model || 'page';
  console.clear();
  console.log('model',model);
  useEffect(() => {

    const sessionStoragePlugin = (editor) => {
      editor.Storage.add('session', {
        async load(options = {}) {
          if (_id)
            await GetBuilder(model,_id).then(async r => {
              console.log('r', r.elements);
              if(r && r.elements) {
                editor.setComponents(r.elements.pages[0].frames[0].component.components);
                editor.setStyle(r.elements.styles);
                return (r.elements);
              }
            })
        },

        async store(data, options = {}) {
          console.log("store ")
          console.log('_id',_id)
          SaveBuilder(model,_id, {...data, html: editor.getHtml(), js: editor.getJs(),css:editor.getCss()}).then(r => {
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
      plugins: [
        // 'gjs-component-box',
        // 'gjs-component-productslider',
        // 'gjs-component-countdown',
        // 'gjs-preset-webpage',
        // 'grapesjs-swiper-slider',
        grapesjsPresetWebpage,
        sessionStoragePlugin
      ],

      storageManager: {
        id: 'gjs-',
        autosave: true,
        storeComponents: true,
        storeStyles: true,
        storeHtml: true,
        storeCss: true,
        contentTypeJson: true,
        type: 'session',
        options: {
          session: {key: 'nodeewebBuilder'}
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
        }).catch(e => {
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
      }
    });
    editor.on('storage:load', function (e) {
      console.log('Loaded ', e);
    });
    editor.on('storage:store', function (e) {
      console.log('Stored ', e);

    });
  }, [])


  return (


    <div id="gjs" style={{height: "100vh", width: "100vw !important"}}>

    </div>
  );
};
export const PageServer = [
  { }
];
export default withTranslation()(CreatePage);
