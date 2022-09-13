import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge, Button, ButtonGroup, Col, Container, Row } from "shards-react";
import Gallery from "#c/components/single-post/Gallery";

import store from "../functions/store";
import { withTranslation } from "react-i18next";
import {
  addBookmark,
  clearPost,
  getBlogPost,
  isClient,
  getPage,
  loadPost,
  loveIt,
  MainUrl,
  savePost
} from "#c/functions/index";
import { SnapChatIcon } from "#c/assets/index";
import Loading from "#c/components/Loading";
import PageBuilder from "#c/components/page-builder/PageBuilder";
import Style from "#c/components/Style";
import { useSelector } from "react-redux";
import CONFIG from "#c/config";
import ShareIcon from "@mui/icons-material/Share";
// import { Link, useNavigate, useParams } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// let obj = ;
// let the_id='';
import { RWebShare } from "react-web-share";

const MainContent = (props) => {
  console.log("props", props);
  let { match, location, history, t, url } = props;

  let page = useSelector((st) => {
    // console.log("st.store", st.store.productSliderData);
    return st.store.page || [];
  });
  // window.scrollTo(0, 0);
  let params = useParams();
  let the_id = params._id;
  // let search = false;
  // let history = useNavigate();


  const [mainId, setMainId] = useState(the_id);
  const [tab, setTab] = useState("description");
  const [state, setState] = useState(isClient ? [] : (page || []));
  const [lan, setLan] = useState(store.getState().store.lan || "fa");


  const getThePost = (_id='home') => {
    return new Promise(function(resolve, reject) {

      // getBlogPost(_id).then((d = {}) => {
      getPage(_id).then((d = {}) => {
        console.log("set _id to show:", d);
        if(d._id) {
          savePost({
            mainList: d.mainList,
            catChoosed: d.catChoosed,
            countryChoosed: d.countryChoosed,
            categories: d.categories,
            elements: d.elements,
            mainCategory: d.mainCategory
          });
          resolve({
            load: true,
            title: d.title,
            description: d.description,
            photos: d.photos,
            _id: d._id,
            updatedAt: d.updatedAt,
            kind: d.kind,
            elements: d.elements,
            thumbnail: d.thumbnail,
            excerpt: d.excerpt,
            views: d.views
          });
        }else{
          reject({
            load: true,
            notfound:true
          });
        }
      });
    });
  };
  if (isClient)
    useEffect(() => {
      // let mounted = true;
      let { _id, title } = params;

      console.log("useEffect", _id, the_id, mainId);

      getThePost(the_id)
        .then(items => {
          // console.log('items',items,the_id);
          // if (mounted) {
          setState(items);
          if (isClient)
            window.scrollTo(0, 0);
          // }
        }).catch(e=>{
        setState(e);


      });
      // return () => mounted = false;
    }, [the_id]);

  // useEffect(() => {
  //   let { _id, title } = params;
  //   console.log("useEffect", _id, the_id, mainId);
  //   // if (mainId != _id) {
  //   getThePost(_id).then(res=>setState(state => ({ ...state, ...res })));
  //   window.scrollTo(0, 0);
  //   // }
  //
  // }, [the_id]);


  let {
    load,
    title,
    description,
    photos,
    redirect,
    _id,
    thumbnail,
    excerpt,
    notfound,
    enableAdmin = false,
    views = null,elements=null
  } = state;
  if (redirect && isClient) return <Navigate to={redirect}/>;
  if (!load && isClient) return <Loading/>;
  if (load && notfound && isClient) return <div>not found</div>;
  // console.log("product", title, lan, encodeURIComponent(title[lan]));
  console.log('isClient',isClient);
  return (

    <Container className="main-content-container p-0 pb-4 kiuytyuioiu bg-white" key={0}>

      {/*{elements.html && <div*/}
        {/*className="d-inline-block item-icon-wrapper mt-3 ki765rfg hgfd"*/}
        {/*dangerouslySetInnerHTML={{ __html: elements.html }}*/}
      {/*/>}*/}
      {/*<Style css={elements.css}/>*/}
      <PageBuilder elements={elements.pages[0].frames[0].component.components}/>
    </Container>
  );
}
export default withTranslation()(MainContent);
