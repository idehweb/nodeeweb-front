import React from 'react';
import Swiper from "#c/components/swiper";
import ProductsSlider, {ProductsSliderServer} from "#c/components/components-overview/ProductsSlider";
import PostSlider, {PostSliderServer} from "#c/components/components-overview/PostSlider";
import NavbarSearch from '#c/components/layout/MainNavbar/NavbarSearch';
import MainNavbar from '#c/components/layout/MainNavbar/MainNavbar';
import {getEntities, Logout, MainUrl, toggleCardbar, toggleSearch} from "#c/functions/index";
import PostCard from "#c/components/Home/PostCard";
import LoadMore from "#c/components/page-builder/loadmore";
import * as Icons from "@mui/icons-material";
import {Button} from "shards-react";
import {useSelector} from "react-redux";

export function ShowElement(p) {
  // console.log("\n\n\nShowElement", p);

  let {element, content} = p;
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
      return <TheButton element={element} content={content}/>;
    case "hr":
      return <Hr element={element} content={content}/>;
    case "header":
      return <HEADER element={element} content={content}/>;
    case "text":
      return <TITLE element={element} content={content}/>;
    case "TEXTBOX":
      return <TEXTBOX element={element} content={content}/>;
    case "swiper-container":
      return <SLIDER element={element} content={content}/>;
    case "slider":
      return <SWIPERWrapper element={element} content={content}/>;
    case "loadmore":
      return <TheLoadMore element={element} content={content}/>;
    case "Slide":
      return <SWIPERSlide element={element} content={content}/>;
    case "ProductSlider":
      return <ProductSlider element={element} content={content}/>;
    case "ProductElement":
      return <ProductElement element={element} content={content}/>;
    case "TEXTNODE":
      return <TEXTNODE element={element} content={content}/>;
    case "PostSlider":
      return <PostSlider element={element} content={content}/>;
    case "row":
      return <GRID_LAYOUT element={element} content={content}/>;
    case "Cell":
      return <GRID_COL element={element} content={content}/>;
    case "col":
      return <GRID_COL element={element} content={content}/>;
    case "Content":
      return <Content {...p} element={element} content={content}/>;
    case "CAROUSEL":
      return <CAROUSEL element={element} content={content}/>;
    case "image":
      return <IMAGE element={element} content={content}/>;
    case "navigation":
      return <TheMainNavbar element={element} content={content}/>;
    case "searchbar":
      return <NavbarSearch type={'append'}/>;
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
  let {text, iconFont, direction, link, display, target = "_blank"} = fields;
  let style = setStyles({...fields, direction: direction, display: display});
  if (link) {

    return <a href={link} target={target} style={style}>
      {(iconFont && Icons[iconFont]) && <span>{React.createElement(Icons[iconFont])}</span>}
      <span>{text}</span>
    </a>
  }
  return <div style={style}>
    {(iconFont && Icons[iconFont]) && <span>{React.createElement(Icons[iconFont])}</span>}
    <span>{text}</span>
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
  let {text, iconFont, action, classess} = fields;
  let style = setStyles(fields);

  if (iconFont && action) {
// return <CardSidebar />
    if (action == 'toggleCart') {
      // console.log(handleCard)
      return <Button onClick={() => {
        // console.clear()
        console.log('element', element)
        handleCard();
      }} className={' posrel ' + classess} style={style}>{Icons[iconFont] &&
      <span>{React.createElement(Icons[iconFont])}</span>}<span className={'badge'}
                                                                theme="info">{card && card.length}</span><span>{text}</span></Button>

    }
    return <a href={action} className={classess}><Button style={style}>{Icons[iconFont] &&
    <span>{React.createElement(Icons[iconFont])}</span>}<span>{text}</span></Button></a>

  }
  if (iconFont) {

    return <Button className={classess} style={style}>{Icons[iconFont] &&
    <span>{React.createElement(Icons[iconFont])}</span>}<span>{text}</span></Button>

  }
  return <Button className={classess} style={style}>{text}</Button>
}

export function Hr({element}) {
  let {type, components, classes, settings, handleCard, card} = element;
  let {general} = settings;
  let {fields} = general;
  let {text, iconFont, action, classess} = fields;
  let style = setStyles(fields);

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

function setStyles(fields) {
  let style = {};
  let {textAlign, color, float, borderRadius, direction, width, maxWidth, height, maxHeight, backgroundColor, margin, padding, fontWeight, fontSize, lineHeight, display} = fields
  if (borderRadius) {
    style['borderRadius'] = borderRadius;
  }
  if (color) {
    style['color'] = color;
  }
  if (textAlign) {
    style['textAlign'] = textAlign;
  }
  if (display) {
    style['display'] = display;
  }
  if (direction) {
    style['direction'] = direction;
  }

  if (width) {
    style['width'] = width;
  }
  if (maxWidth) {
    style['maxWidth'] = maxWidth;
  }
  if (height) {
    style['height'] = height;
  }
  if (maxHeight) {
    style['maxHeight'] = maxHeight;
  }

  if (float) {
    style['float'] = float;
  }
  if (backgroundColor) {
    style['backgroundColor'] = backgroundColor;
  }
  if (margin) {
    style['margin'] = margin;
  }
  if (padding) {
    style['padding'] = padding;
  }
  if (fontWeight) {
    style['fontWeight'] = fontWeight;
  }
  if (fontSize) {
    style['fontSize'] = fontSize;
  }
  if (lineHeight) {
    style['lineHeight'] = lineHeight;
  }
  return style;
}

export function CAROUSEL({element}) {
  let {type, fields} = element;
  return "CAROUSEL";

}

export function SWIPER({element}) {
  let {type, components} = element;
  // console.clear()
  // console.log(components);
  if (components)
    return components.map((com, index) => {
      // console.log("TITLE", com)
      return <ShowElement key={index} element={com}/>
    })

}

export function SWIPERWrapper(props) {
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
  // console.log('fields', Boolean(arrows))
  if (entity) {
    if (entity == 'product')
      return <ProductsSlider/>
    if (entity == 'post')
      return <PostSlider/>
  } else
    return <Swiper
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
        return <ShowElement key={index} element={com} content={content}/>
      }) : (children instanceof Array) ? children.map((com, index) => {
        // return 'false'
        return <ShowElement key={index} element={com} content={content}/>
      }) : ''}

    </Swiper>

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

export function SWIPERSlide(props) {
  let {element, content} = props;
  let {type, children, classes, kind, text, src} = element;
  // console.clear();
  // console.log('props',props)
  if (children)
    return children.map((com, index) => {
      // console.log("SWIPERSlide", com)
      return <div
        className={'SWIPERSlide ' + (classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : "")}>
        {kind == 'link' && <a href={"#"}><ShowElement key={index} element={com} content={content}/></a>}
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
  let {element, content} = props
  // let {type, components, children, classes, handleCard, card} = element;
  // console.log("GRID_LAYOUT", props);
  let {type, components, classes, children, settings, handleCard, card} = element;
  let {general} = settings;
  let {fields} = general;
  if (!fields) {
    return
  }
  let {link, title, src} = fields;
  let style = setStyles(fields);


  return <div
    className={"posrel row grid-layout " + (classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : "")}
    style={style}>
    {children && children.map((item, k) => {
      // console.log("item.name", item.name);
      // return <div
      //   key={k}
      //   className={"col " + (typeof classes == 'string' ? classes : classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : "")}>
      //   {item instanceof Array && item.map((tr,trx) => <ShowElement key={trx} element={{...tr,handleCard:handleCard,card:card}}/>)}
      //   {!(item instanceof Array) && <ShowElement key={k+'98'} element={item} content={content}/>}
      // </div>;
      return <ShowElement key={k} element={{...item, handleCard: handleCard, card: card}}/>
      // {item instanceof Array && item.map((tr,trx) => <ShowElement key={trx} element={{...tr,handleCard:handleCard,card:card}}/>)}

    })}</div>;
  // switc¬h (type) {
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

  const {element, content} = props;

  const {payload, type, components, classes, children, settings, handleCard, card} = element;
  let {general} = settings;
  let {fields} = general;
  let {showInDesktop, showInMobile,direction,display} = fields;
  // console.log("GRID_COL ", classes);
  let style = setStyles({...fields, direction: direction, display: display});

  return <div
    style={style}
    className={" col  " + (showInDesktop ? ' showInDesktop ' : '') + (showInMobile ? ' showInMobile ' : '') + (typeof classes == 'string' ? classes : classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : "")}>
    {/*<div className={'m-2'}>{JSON.stringify(element.children)}</div>*/}
    {children && children.map((child, ch) => {
      // return JSON.stringify(child);
      return <ShowElement element={{...child, handleCard: handleCard, card: card}} key={ch} content={{}}/>

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

  // console.log('PageBuilder ===>', props)
  let {elements, content, kind = 'container-fluid', maxWidth = '100%',data} = props;
  // let html = elements.html;
  // if (elements && elements.pages && elements.pages[0] && elements.pages[0].frames && elements.pages[0].frames[0] && elements.pages[0].frames[0].component && elements.pages[0].frames[0].component.components)
  //     elements = elements.pages[0].frames[0].component.components;
  // console.log('elements', elements)
  const cardVisible = useSelector((st) => !!st.store.cardVisible);
  let card = useSelector((st) => st.store.card || []);

  const handleTheCard = () => {
    // console.log('handleTheCard')
    toggleCardbar(cardVisible)
  };

// console.clear();
  return (
    <div className={kind} style={{maxWidth: maxWidth}}>
      {/*<div*/}
      {/*dangerouslySetInnerHTML={{__html: html}}*/}
      {/*/>*/}
      {elements && elements.map((element, index) => {
        // console.log('#' + index + ' element', element)
        element.handleCard = () => {
          // console.log('handleCard')
          handleTheCard()
        };
        element.card = card;
        element.data = data;
        return <ShowElement content={content} key={index} element={element}/>
      })}
    </div>
  );
}
