import React from 'react';
import Swiper from "#c/components/swiper";
import ProductsSlider, {ProductsSliderServer} from "#c/components/components-overview/ProductsSlider";
import PostSlider, {PostSliderServer} from "#c/components/components-overview/PostSlider";
import NavbarSearch from '#c/components/layout/MainNavbar/NavbarSearch';
import MainNavbar from '#c/components/layout/MainNavbar/MainNavbar';
import {getEntities, Logout, MainUrl, setStyles, toggleCardbar, toggleSearch, toggleSidebar} from "#c/functions/index";
import PostCard from "#c/components/Home/PostCard";
import Sidemenu from "#c/components/page-builder/sidemenu";
import LoadMore from "#c/components/page-builder/loadmore";
import Pagination from "#c/components/page-builder/pagination";
import Form from "#c/components/page-builder/form";
import * as Icons from "@mui/icons-material";
import {Button} from "shards-react";
import {useSelector} from "react-redux";

export function ShowElement(p) {
  // console.log("\n\n\nShowElement", p);

  let {element, content,params} = p;
  if (!element) {
    return
  }
  let {name, type} = element;
  if (element['custom-name']) {
    name = element['custom-name'];
  }
  // console.log("name:", name);
  // console.log("type:", type);

  switch (type) {
    case "text":
      return <TITLE element={element}/>;
    // case "image":
    //     return <IMAGE element={element}/>;
    case "textnode":
      return <TEXTNODE element={element}/>;
    case "swiper-wrapper":
      return <SWIPERWrapper element={element}/>;
    case "swiper-slide":
      return <SWIPERSlide element={element}/>;
    case "swiper-container":
      return <SWIPER element={element}/>;
  }

  switch (name) {
    case "html":
      return <div>html</div>;
    case "button":
      return <TheButton element={element} content={content} params={params}/>;
    case "hr":
      return <Hr element={element} content={content}  params={params}/>;
    case "header":
      return <HEADER element={element} content={content}  params={params}/>;
    case "text":
      return <TITLE element={element} content={content}  params={params}/>;
    case "TEXTBOX":
      return <TEXTBOX element={element} content={content}  params={params}/>;
    case "swiper-container":
      return <SLIDER element={element} content={content}  params={params}/>;
    case "slider":
      return <SWIPERWrapper element={element} content={content}  params={params}/>;
    case "loadmore":
      return <TheLoadMore element={element} content={content}  params={params}/>;
    case "pagination":
      return <ThePagination element={element} content={content}  params={params}/>;
    case "form":
      return <TheForm element={element} content={content}  params={params}/>;
    case "Slide":
      return <SWIPERSlide element={element} content={content}  params={params}/>;
    case "ProductSlider":
      return <ProductSlider element={element} content={content}  params={params}/>;
    case "ProductElement":
      return <ProductElement element={element} content={content}  params={params}/>;
    case "TEXTNODE":
      return <TEXTNODE element={element} content={content}  params={params}/>;
    case "PostSlider":
      return <PostSlider element={element} content={content}  params={params}/>;
    case "row":
      return <GRID_LAYOUT element={element} content={content}  params={params}/>;
    case "Cell":
      return <GRID_COL element={element} content={content}  params={params}/>;
    case "col":
      return <GRID_COL element={element} content={content}  params={params}/>;
    case "Content":
      return <Content {...p} element={element} content={content}/>;
    case "CAROUSEL":
      return <CAROUSEL element={element} content={content}/>;
    case "image":
      return <IMAGE element={element} content={content}  params={params}/>;
    case "navigation":
      return <TheMainNavbar element={element} content={content}  params={params}/>;
    case "searchbar":
      return <NavbarSearch type={'append'} />;
    case "sidemenu":
      return <Sidemenu element={element} content={content}  params={params} />;
    default :
      return <></>
  }
}


export function TEXTNODE({element}) {
  let {content, classes} = element;
  // console.clear()
  // console.log('element', element)

  return <div
    className={'p-node ' + (classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : "")}> {content}</div>;
  // return <div className={'the-title'}><ShowElement element={component}/></div>;


}

export function TITLE({element}) {
  let {type, components, classes, settings} = element;
  let {general} = settings;
  let {fields} = general;
  let {text, iconFont, direction, link, display, showInDesktop, showInMobile, target = "_blank"} = fields;
  let style = setStyles({...fields, direction: direction, display: display});
  if (link) {

    return <a href={link} target={target} style={style}
              className={(showInDesktop ? ' showInDesktop ' : '') + (showInMobile ? ' showInMobile ' : '')}>
      {(iconFont && Icons[iconFont]) && <span>{React.createElement(Icons[iconFont])}</span>}
      <span dangerouslySetInnerHTML={{__html: text}}/>
      {/*<div*/}
      {/*dangerouslySetInnerHTML={{__html: html}}*/}
      {/*/>*/}
    </a>
  }
  return <div style={style}
              className={(showInDesktop ? ' showInDesktop ' : '') + (showInMobile ? ' showInMobile ' : '')}>
    {(iconFont && Icons[iconFont]) && <span>{React.createElement(Icons[iconFont])}</span>}
    <span dangerouslySetInnerHTML={{__html: text}}/>

  </div>

  // }
  // return <div style={style}>{text}</div>
}

export function TheMainNavbar({element}) {
  let {type, components, classes, settings} = element;
  let {general} = settings;
  let {fields} = general;
  let {text, iconFont, direction, link, display, target = "_blank"} = fields;
  let style = setStyles({...fields, direction: direction, display: display});

  return <MainNavbar element={element} style={style} setStyles={setStyles}/>

  // }
  // return <div style={style}>{text}</div>
}

export function TheButton({element}) {
  let {type, components, classes, settings, handleCard, card} = element;
  let {general} = settings;
  let {fields} = general;
  let {text, iconFont, action, classess, showInMobile, showInDesktop} = fields;
  let style = setStyles(fields);
// return JSON.stringify(fields)
  if (iconFont && action) {
// return <CardSidebar />
    if (action == 'toggleCart') {
      // console.log(handleCard)
      return <Button onClick={() => {
        // console.clear()
        console.log('element', element)
        handleCard();
      }} className={' posrel ' + classess + (showInMobile ? ' showInMobile ' : '')} style={style}>{Icons[iconFont] &&
      <span>{React.createElement(Icons[iconFont])}</span>}<span className={'badge'}
                                                                theme="info">{card && card.length}</span><span>{text}</span></Button>

    }
    if (action == 'toggleMenu') {
      // console.log(handleCard)
      return <Button onClick={() => {
        // console.clear()
        console.log('element', element)
        toggleSidebar();
      }} className={' posrel ' + classess + (showInMobile ? ' showInMobile ' : '')} style={style}>{Icons[iconFont] &&
      <span>{React.createElement(Icons[iconFont])}</span>}<span>{text}</span></Button>

    }
    return <a href={action} className={classess + (showInMobile ? ' showInMobile ' : '')}><Button
      style={style}>{Icons[iconFont] &&
    <span>{React.createElement(Icons[iconFont])}</span>}<span>{text}</span></Button></a>

  }
  if (iconFont) {

    return <Button className={classess + (showInMobile ? ' showInMobile ' : '')} style={style}>{Icons[iconFont] &&
    <span>{React.createElement(Icons[iconFont])}</span>}<span>{text}</span></Button>

  }
  if (action)
    return <a href={action}><Button className={classess + (showInMobile ? ' showInMobile ' : '')}
                                    style={style}>{text}</Button></a>
  return <Button className={classess + (showInMobile ? ' showInMobile ' : '')} style={style}>{text}</Button>
}

export function Hr({element}) {
  let {type, components, classes, settings, handleCard, card} = element;
  let {general} = settings;
  let {fields} = general;
  let {text, iconFont, action, classess} = fields;
  let style = setStyles(fields);
// return JSON.stringify(style)
  return <hr className={classess} style={style}/>
}

export function HEADER({element}) {
  let {type, components, classes, settings} = element;
  let {general} = settings;
  let {fields} = general;
  let {text} = fields;
  let style = setStyles(fields);

  return <div style={style}>{text}</div>
}


export function CAROUSEL({element}) {
  let {type, fields} = element;
  return "CAROUSEL";

}

export function SWIPER({element}) {
  let {type, components,params} = element;
  // console.clear()
  // console.log(components);
  if (components)
    return components.map((com, index) => {
      // console.log("TITLE", com)
      return <ShowElement params={params} key={index} element={com}/>
    })

}

export function SWIPERWrapper(props) {
  let {element, content,params} = props;
  let {type, children, settings, classes} = element;
  let {general} = settings;
  let {fields} = general;
  if (!fields) {
    return
  }
  let {entity, arrows = true, perPage = 1, margin, customQuery} = fields;
  // console.clear()
  let style = setStyles(fields);

  if (arrows == 'false') {
    arrows = false;
  }
  // console.log('fields', Boolean(arrows))
  if (entity) {
    if (entity == 'product')
      return <ProductsSlider customQuery={customQuery}/>
    if (entity == 'post')
      return <PostSlider customQuery={customQuery}/>
  } else
    return <div className={'the-swipppper-parent'} style={style}><Swiper
      perPage={parseInt(perPage)}
      arrows={Boolean(arrows)}
      type={"slide"}
      breakpoints={{
        1024: {
          perPage: 1
        },
        768: {

          perPage: 1
        },
        640: {

          perPage: 1
        },
        320: {

          perPage: 1
        }
      }}
      className={"p-0 m-0 " + (classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : "")}
    >

      {(children && children[0] instanceof Array) ? children[0].map((com, index) => {
        return <ShowElement params={params} key={index} element={com} content={content}/>
      }) : (children instanceof Array) ? children.map((com, index) => {
        // return 'false'
        return <ShowElement params={params} key={index} element={com} content={content}/>
      }) : ''}

    </Swiper></div>

}

export function TheLoadMore(props) {
  let {element, content} = props;
  let {type, children, settings, classes} = element;
  let {general} = settings;
  let {fields} = general;
  if (!fields) {
    return
  }
  let {entity, arrows = true, perPage = 1} = fields;
  // console.clear()
  if (arrows == 'false') {
    arrows = false;
  }
// return JSON.stringify(element.data)
  return <LoadMore element={element}/>

}

export function ThePagination(props) {
  let {element, content, params} = props;
  let {type, children, settings, classes} = element;
  let {general} = settings;
  let {fields} = general;
  if (!fields) {
    return
  }
  let {entity, arrows = true, perPage = 1} = fields;
  // console.clear()
  if (arrows == 'false') {
    arrows = false;
  }
  console.log('props', props)
// return JSON.stringify(element.data)
  return <Pagination element={element}  params={params}/>

}
export function TheForm(props) {
  let {element, content} = props;
  let {type, children, settings, classes} = element;
  let {general} = settings;
  let {fields} = general;
  if (!fields) {
    return
  }
  let {entity, arrows = true, perPage = 1} = fields;
  // console.clear()
  if (arrows == 'false') {
    arrows = false;
  }
  console.log('props', props)
// return JSON.stringify(element.data)
  return <Form element={element}/>

}

export function SWIPERSlide(props) {
  let {element, content,params} = props;
  let {type, children, classes, kind, text, src} = element;
  // console.clear();
  // console.log('props',props)
  if (children)
    return children.map((com, index) => {
      // console.log("SWIPERSlide", com)
      return <div
        className={'SWIPERSlide ' + (classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : "")}>
        {kind == 'link' && <a href={"#"}><ShowElement params={params} key={index} element={com} content={content}/></a>}
        {/*{kind=='text' && <a href={"#"}><ShowElement key={index} element={com} content={content}/></a>}*/}
        {/*{kind=='image' && <a href={"#"}><ShowElement key={index} element={com} content={content}/></a>}*/}
        {/*<ShowElement key={index} element={com} content={content}/>*/}

      </div>
    })
  else
    return <div
      className={'SWIPERSlide ' + (classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : "")}>
      {kind == 'text' && text}
      {kind == 'image' && <img src={src}/>}
    </div>


}

export function ProductElement(props) {
  console.clear();
  // console.log(props)
  return <PostCard item={props}/>


}

export function TEXTBOX(element) {
  let {type, fields} = element;

  return "TEXTBOX";

}

// export function ProductSlider(element) {
//   let {type, fields} = element;
//   // cat_id={"629692c48153533551655409"}
//   // return <ProductsSlider delay={1100}/>;
//   // return "ProductSlider";
//
// }

// export function PostSlider(element) {
//   let {type, fields} = element;
//
//   return "PostSlider";
//
// }

export function IMAGE({element}) {
  // let {settings, classes} = element;

  let {type, components, classes, settings} = element;
  let {general} = settings;
  let {fields} = general;
  if (!fields) {
    return
  }
  let {link, title, src} = fields;
  let style = setStyles(fields);
  // console.clear()
  if (link) {
    return <a href={link} alt={title}><img title={title} style={style}
                                           className={' ' + (classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : "")}
                                           src={MainUrl + '/' + (src ? src : link)}/></a>

  }
  return <img title={title} style={style}
              className={' ' + (classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : "")}
              src={MainUrl + '/' + (src ? src : link)}/>

}

export function SLIDER(props) {
  let {element, content} = props
  let {type, components, classes} = element;
  return "SLIDER";

}

export function GRID_LAYOUT(props) {
  let {element, content,params} = props
  // let {type, components, children, classes, handleCard, card} = element;
  // console.log("GRID_LAYOUT", props);
  let {type, components, classess, children, settings, handleCard, card} = element;
  let {general} = settings;
  let {fields} = general;
  if (!fields) {
    return
  }
  let {link, title, src, classes} = fields;
  let style = setStyles(fields);


  return <div
    // className={"posrel row grid-layout " + (classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : "")}
    className={"posrel row grid-layout " + (classes ? classes : "")}
    style={style}>
    {children && children.map((item, k) => {
      // console.log("item.name", item.name);
      // return <div
      //   key={k}
      //   className={"col " + (typeof classes == 'string' ? classes : classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : "")}>
      //   {item instanceof Array && item.map((tr,trx) => <ShowElement key={trx} element={{...tr,handleCard:handleCard,card:card}}/>)}
      //   {!(item instanceof Array) && <ShowElement key={k+'98'} element={item} content={content}/>}
      // </div>;
      return <ShowElement params={params} key={k} element={{...item, handleCard: handleCard, card: card}}/>
      // {item instanceof Array && item.map((tr,trx) => <ShowElement key={trx} element={{...tr,handleCard:handleCard,card:card}}/>)}

    })}</div>;
  // switc??h (type) {
  //     case 'SLIDER':
  //         return "slider";
  //     case "GRID_LAYOUT":
  //         return "GRID_LAYOUT";
  //     case "GRID_COL":
  //         return "GRID_COL";
  //     default :
  //         return <></>
  // }
}

export function GRID_COL(props) {
  // console.clear();

  const {element, content,params} = props;

  const {payload, type, components, children, settings, handleCard, card} = element;
  let {general} = settings;
  let {fields} = general;
  let {showInDesktop, showInMobile, direction, display, classess, classes} = fields;
  // console.log("GRID_COL ", classes);
  let style = setStyles({...fields, direction: direction, display: display});
// return JSON.stringify(style);
  return <div
    style={style}
    className={" col  " + (classess ? classess + ' ' : ' ') + (showInDesktop ? ' showInDesktop ' : '') + (showInMobile ? ' showInMobile ' : '') + (typeof classes == 'string' ? classes : classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : "")}>
    {/*<div className={'m-2'}>{JSON.stringify(element.children)}</div>*/}
    {children && children.map((child, ch) => {
      // return JSON.stringify(child);
      return <ShowElement params={params} element={{...child, handleCard: handleCard, card: card}} key={ch} content={{}}/>

    })}
  </div>;
}

export function Content(props) {
//    console.clear();
  const {element, content} = props;
  // console.log("Content ");

  // const {payload, type, components, classes} = element;
  if (element && element.content && content && content[element.content])
    return content[element.content];
  // return <div className={"col " + (typeof classes =='string' ? classes : classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : "")}>
  //     {components && components.map((item,i) => {
  //         // console.log("item.id", item.id);
  //         return <ShowElement element={item} key={i}/>;
  //     })}
  // </div>;
}


export default function PageBuilder(props) {
  // console.clear();

  console.log('PageBuilder ===>', props)
  let {elements, content, style = {}, kind = 'container-fluid', maxWidth = '100%', data, description = null,params} = props;
  // let html = elements.html;
  // if (elements && elements.pages && elements.pages[0] && elements.pages[0].frames && elements.pages[0].frames[0] && elements.pages[0].frames[0].component && elements.pages[0].frames[0].component.components)
  //     elements = elements.pages[0].frames[0].component.components;
  // console.log('elements', elements)
  const cardVisible = useSelector((st) => !!st.store.cardVisible);
  let card = useSelector((st) => st.store.card || []);
  // let menu = useSelector((st) => st.store.menuVisible);

  const handleTheCard = () => {
    // console.log('handleTheCard')
    toggleCardbar(cardVisible)
  };
  let elemStyle = {...style}
// console.clear();
  if (maxWidth) {
    elemStyle['maxWidth'] = maxWidth;
  }
  return (
    <div className={kind} style={elemStyle}>
      {/*<div*/}
      {/*dangerouslySetInnerHTML={{__html: html}}*/}
      {/*/>*/}
      {/*{JSON.stringify(params)}*/}
      {description &&

      <div className={kind}>

        <div className={"pt-5"} id={"description"}>
          {description && <div
            className="d-inline-block item-icon-wrapper ki765rfg  hgfd mb-5"
            dangerouslySetInnerHTML={{__html: description.fa ? description.fa : description}}
          />}
          {description && description.fa && description.fa.rendered && <div
            className="d-inline-block item-icon-wrapper ki765rfg  hgfd mb-5"
            dangerouslySetInnerHTML={{__html: description.fa.rendered}}
          />}

        </div>
      </div>
      }
      {elements && elements.map((element, index) => {
        // console.log('#' + index + ' element', element)
        element.handleCard = () => {
          // console.log('handleCard')
          handleTheCard()
        };
        element.card = card;
        // element.data = data;
        return <ShowElement content={content} key={index} element={element} params={params}/>
      })}
    </div>
  );
}
