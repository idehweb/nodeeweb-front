import React from 'react';
import Swiper from "#c/components/swiper";
import ProductsSlider, {ProductsSliderServer} from "#c/components/components-overview/ProductsSlider";

export function ShowElement(p) {
    console.log("ShowElement", p);

    let {element, content} = p;
    let {name, type} = element;
    // console.log("name", name);

    switch (type) {
        case "text":
            return <TITLE element={element}/>;
        case "image":
            return <IMAGE element={element}/>;
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
        case "text":
            return <TITLE element={element} content={content}/>;
        case "TEXTBOX":
            return <TEXTBOX element={element} content={content}/>;
        case "swiper-container":
            return <SLIDER element={element} content={content}/>;
        case "Slider":
            return <SWIPERWrapper element={element} content={content}/>;
        case "Slide":
            return <SWIPERSlide element={element} content={content}/>;
        case "ProductSlider":
            return <ProductSlider element={element} content={content}/>;
        case "TEXTNODE":
            return <TEXTNODE element={element} content={content}/>;
        case "PostSlider":
            return <PostSlider element={element} content={content}/>;
        case "Row":
            return <GRID_LAYOUT element={element} content={content}/>;
        case "Cell":
            return <GRID_COL element={element} content={content}/>;
        case "Col":
            return <GRID_COL element={element} content={content}/>;
        case "Content":
            return <Content {...p} element={element} content={content}/>;
        case "CAROUSEL":
            return <CAROUSEL element={element} content={content}/>;
        default :
            return <></>
    }
}


export function TEXTNODE({element}) {
    let {content, classes} = element;
    // console.clear()
    console.log('element', element)

    return <div
        className={'p-node ' + (classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : "")}> {content}</div>;
    // return <div className={'the-title'}><ShowElement element={component}/></div>;


}

export function TITLE({element}) {
    let {type, components, classes} = element;
    return components && components.map((com, index) => {
        console.log("TITLE", classes)
        return <div className={'p-title ' + (classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : "")}>
            <ShowElement key={index} element={com}/></div>
    })
    // return <div className={'the-title'}><ShowElement element={component}/></div>;


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
    let {type, components, classes} = element;
    console.clear()
    console.log("SWIPERWrapper", components)

    if (components)
        return <Swiper
            perPage={1}
            arrows={true}
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
        >{components.map((com, index) => {
            return <ShowElement key={index} element={com} content={content}/>
        })}</Swiper>

}

export function SWIPERSlide(props) {
    let {element, content} = props;
    let {type, components, classes,kind,text,src} = element;
    console.clear();
    console.log('props',props)
    if (components)
        return components.map((com, index) => {
            // console.log("SWIPERSlide", com)
            return <div
                className={'SWIPERSlide ' + (classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : "")}>
                {kind=='link' && <a href={"#"}><ShowElement key={index} element={com} content={content}/></a>}
                {/*{kind=='text' && <a href={"#"}><ShowElement key={index} element={com} content={content}/></a>}*/}
                {/*{kind=='image' && <a href={"#"}><ShowElement key={index} element={com} content={content}/></a>}*/}
                {/*<ShowElement key={index} element={com} content={content}/>*/}

            </div>
        })
    else
        return <div
            className={'SWIPERSlide ' + (classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : "")}>
            {kind=='text' && text}
            {kind=='image' && <img src={src}/>}
        </div>


}

export function TEXTBOX(element) {
    let {type, fields} = element;

    return "TEXTBOX";

}

export function ProductSlider(element) {
    let {type, fields} = element;
    // cat_id={"629692c48153533551655409"}
    return <ProductsSlider delay={1100}/>;
    // return "ProductSlider";

}

export function PostSlider(element) {
    let {type, fields} = element;

    return "PostSlider";

}

export function IMAGE({element}) {
    let {type, attributes, classes} = element;
    // console.clear()
    // console.log(element);
    return <img className={' ' + (classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : "")}
                src={attributes.src}/>

}

export function SLIDER(props) {
    let {element, content} = props
    let {type, components, classes} = element;
    return "SLIDER";

}

export function GRID_LAYOUT(props) {
    let {element, content} = props
    let {type, components, classes} = element;
    console.log("GRID_LAYOUT", props);


    return <div
        className={"limited posrel row grid-layout " + (classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : "")}>{components && components.map((item, k) => {
        // console.log("item.name", item.name);
        return <ShowElement key={k} element={item} content={content}/>;
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

    const {payload, type, components, classes} = element;
    console.log("GRID_COL ", classes);

    return <div
        className={"col " + (typeof classes == 'string' ? classes : classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : "")}>
        {components && components.map((item, i) => {
            // console.log("item.id", item.id);
            return <ShowElement {...props} element={item} key={i} content={content}/>;
        })}
    </div>;
}

export function Content(props) {
//    console.clear();
    const {element, content} = props;
    console.log("props ", element, content);

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
    console.log('props', props)
    let {elements, content} = props;
    // let html = elements.html;
    // if (elements && elements.pages && elements.pages[0] && elements.pages[0].frames && elements.pages[0].frames[0] && elements.pages[0].frames[0].component && elements.pages[0].frames[0].component.components)
    //     elements = elements.pages[0].frames[0].component.components;
    // console.log('elements', elements)
// console.clear();
    return (
        <div className={'page-builder'}>
            {/*<div*/}
            {/*dangerouslySetInnerHTML={{__html: html}}*/}
            {/*/>*/}
            {elements && elements.map((element, index) => {
                console.log('#' + index + ' element', element)
                return <ShowElement content={content} key={index} element={element}/>
            })}
        </div>
    );
}
