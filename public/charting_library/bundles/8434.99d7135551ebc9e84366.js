(self.webpackChunktradingview=self.webpackChunktradingview||[]).push([[8434],{33214:e=>{e.exports={loader:"loader-38qh0l_K",static:"static-38qh0l_K",item:"item-38qh0l_K","tv-button-loader":"tv-button-loader-38qh0l_K",black:"black-38qh0l_K",white:"white-38qh0l_K",gray:"gray-38qh0l_K",primary:"primary-38qh0l_K","loader-initial":"loader-initial-38qh0l_K","loader-appear":"loader-appear-38qh0l_K"}},66406:e=>{e.exports={loaderWrap:"loaderWrap-2SapxxDI",big:"big-2SapxxDI",loader:"loader-2SapxxDI"}},30160:e=>{e.exports={item:"item-f5BaKrKq",interactive:"interactive-f5BaKrKq",hovered:"hovered-f5BaKrKq",disabled:"disabled-f5BaKrKq",active:"active-f5BaKrKq",shortcut:"shortcut-f5BaKrKq",normal:"normal-f5BaKrKq",big:"big-f5BaKrKq",iconCell:"iconCell-f5BaKrKq",icon:"icon-f5BaKrKq",checkmark:"checkmark-f5BaKrKq",content:"content-f5BaKrKq",label:"label-f5BaKrKq",checked:"checked-f5BaKrKq",toolbox:"toolbox-f5BaKrKq",showToolboxOnHover:"showToolboxOnHover-f5BaKrKq",arrowIcon:"arrowIcon-f5BaKrKq",subMenu:"subMenu-f5BaKrKq",invisibleHotkey:"invisibleHotkey-f5BaKrKq"}},52221:e=>{e.exports={row:"row-3B5H2q5m",line:"line-3B5H2q5m",hint:"hint-3B5H2q5m"}},39049:e=>{e.exports={menu:"menu-1Jmy26Oy"}},85848:e=>{e.exports={item:"item-1-SF84yU",emptyIcons:"emptyIcons-1-SF84yU",loading:"loading-1-SF84yU",disabled:"disabled-1-SF84yU",interactive:"interactive-1-SF84yU",hovered:"hovered-1-SF84yU",normal:"normal-1-SF84yU",big:"big-1-SF84yU",icon:"icon-1-SF84yU",label:"label-1-SF84yU",title:"title-1-SF84yU",nested:"nested-1-SF84yU",shortcut:"shortcut-1-SF84yU",remove:"remove-1-SF84yU"}},81885:e=>{e.exports={separator:"separator-LcIsiH9i"}},15169:e=>{e.exports={button:"button-3B9fDLtm",disabled:"disabled-3B9fDLtm",active:"active-3B9fDLtm",hidden:"hidden-3B9fDLtm"}},73226:(e,t,n)=>{"use strict";n.d(t,{Loader:()=>c});var s,o=n(67294),r=n(94184),a=n(8596),i=n(33214),l=n.n(i);!function(e){e[e.Initial=0]="Initial",e[e.Appear=1]="Appear",e[e.Active=2]="Active"}(s||(s={}));class c extends o.PureComponent{constructor(e){super(e),this._stateChangeTimeout=null,this.state={state:s.Initial}}render(){const{className:e,color:t="black",staticPosition:n}=this.props,s=r(l().item,{[l()[t]]:Boolean(t)});return o.createElement("span",{className:r(l().loader,n&&l().static,e,this._getStateClass())},o.createElement("span",{className:s}),o.createElement("span",{className:s}),o.createElement("span",{className:s}))}componentDidMount(){this.setState({state:s.Appear}),this._stateChangeTimeout=setTimeout(()=>{this.setState({state:s.Active})},2*a.dur)}componentWillUnmount(){this._stateChangeTimeout&&(clearTimeout(this._stateChangeTimeout),this._stateChangeTimeout=null)}_getStateClass(){switch(this.state.state){case s.Initial:return l()["loader-initial"];case s.Appear:return l()["loader-appear"];default:return""}}}},87361:(e,t,n)=>{"use strict";n.d(t,{ActionsTable:()=>M});var s=n(67294),o=n(52221);function r(e){return s.createElement("tr",{className:o.row},s.createElement("td",null,s.createElement("div",{className:o.line})),s.createElement("td",null,s.createElement("div",{
className:o.line}),e.hint?s.createElement("div",{className:o.hint},e.hint):null))}var a=n(16282),i=n(94184),l=n.n(i),c=n(53400),u=n(43367),h=n(96404);var p=n(14303),m=n(65043),d=n(57330),v=n(17722),b=n(78243),f=n(47642),_=n(30160);class x extends s.PureComponent{constructor(){super(...arguments),this._handleMouseOver=e=>{(function(e){const t=e.sourceCapabilities;let n=t&&t.firesTouchEvents;return void 0===n&&(n=h.touch),n})(e.nativeEvent)||this.props.onMouseOver&&this.props.onMouseOver()},this._handleClickToolbox=e=>{e.stopPropagation(),this.props.onClickToolbox&&this.props.onClickToolbox()}}render(){const{hasSubItems:e,shortcutHint:t,hint:n,invisibleHotkey:o,favourite:r,theme:a=_,size:l="normal"}=this.props,c=this.props.checkable&&this.props.checkboxInput?"label":"div";return s.createElement(s.Fragment,null,s.createElement("tr",{className:i(a.item,!this.props.noInteractive&&a.interactive,this.props.hovered&&a.hovered,this.props.disabled&&a.disabled,this.props.active&&a.active,this.props.selected&&a.selected,a[l]),onClick:this.props.onClick,onMouseOver:this._handleMouseOver,ref:this.props.reference,"data-action-name":this.props.actionName},void 0!==r&&s.createElement("td",null,s.createElement(m.FavoriteButton,{className:a.favourite,isFilled:r,onClick:this.props.onFavouriteClick})),s.createElement("td",{className:i(a.iconCell),"data-icon-cell":!0},this._icon(a)),s.createElement("td",{className:a.contentCell},s.createElement(c,{className:a.content},s.createElement("span",{className:i(a.label,this.props.checked&&a.checked),"data-label":!0},this.props.label),this._toolbox(a),e&&s.createElement("span",{className:a.arrowIcon,dangerouslySetInnerHTML:{__html:f},"data-submenu-arrow":!0}),!e&&t&&!u.CheckMobile.any()&&s.createElement(d.Hint,{className:i(o&&a.invisibleHotkey),text:t}),!e&&!t&&n&&s.createElement(d.Hint,{text:n})))),s.createElement("tr",{className:a.subMenu},s.createElement("td",null,this.props.children)))}_icon(e){if(this.props.checkable){if(this.props.checkboxInput)return s.createElement(c.CheckboxInput,{className:i(e.icon,e.checkboxInput),checked:this.props.checked});if(this.props.checked){const t=!this.props.icon&&!this.props.iconChecked,n=this.props.iconChecked||this.props.icon||b;return s.createElement("span",{className:i(e.icon,t&&e.checkmark),dangerouslySetInnerHTML:{__html:n},"data-icon-checkmark":t})}return this.props.icon?s.createElement("span",{className:e.icon,dangerouslySetInnerHTML:{__html:this.props.icon}}):s.createElement("span",{className:e.icon})}return this.props.icon?s.createElement("span",{className:e.icon,dangerouslySetInnerHTML:{__html:this.props.icon}}):null}_toolbox(e){return this.props.toolbox?s.createElement("span",{className:i(e.toolbox,this.props.showToolboxOnHover&&e.showToolboxOnHover),onClick:this._handleClickToolbox,"data-toolbox":!0},this._renderToolboxContent()):null}_renderToolboxContent(){if(this.props.toolbox)switch(this.props.toolbox.type){case v.ToolboxType.Delete:return s.createElement(p.RemoveButton,{onClick:this.props.toolbox.action})}return null}}
var C=n(56806),g=n(79424),E=n(87438),k=n(76553);var S=n(2291),w=n(73226),y=n(66406);function N(e){const{size:t="normal"}=e;return s.createElement(x,{size:t,label:s.createElement("div",{className:l()(y.loaderWrap,y[t])},s.createElement(w.Loader,{className:y.loader})),noInteractive:!0,onMouseOver:e.onMouseOver})}class I extends s.PureComponent{constructor(e){super(e),this._itemRef=null,this._menuElementRef=s.createRef(),this._menuRef=null,this._handleClick=e=>{e.isDefaultPrevented()||this.state.disabled||(this._hasSubItems()?this._showSubMenu():(this.state.doNotCloseOnClick||(0,g.globalCloseMenu)(),this.props.action.execute(),this._trackEvent(),this.props.onExecute&&this.props.onExecute(this.props.action)))},this._handleClickToolbox=()=>{(0,g.globalCloseMenu)()},this._handleItemMouseOver=()=>{this._showSubMenu(),this._setCurrentContextValue()},this._handleMenuMouseOver=()=>{this._setCurrentContextValue()},this._showSubMenu=()=>{this.props.onShowSubMenu(this.props.action)},this._calcSubMenuPos=e=>function(e,t,n={x:0,y:10}){if(t){const{left:n,right:s,top:o}=t.getBoundingClientRect(),r=document.documentElement.clientWidth,a={x:n-e,y:o},i={x:s,y:o};return(0,k.isRtl)()?n<=e?i:a:r-s>=e?i:a}return n}(e,this._itemRef),this._updateState=e=>{this.setState(e.getState())},this._setItemRef=e=>{this._itemRef=e},this._handleMenuRef=e=>{this._menuRef=e},this._registerSubmenu=()=>{var e;return null===(e=this.context)||void 0===e?void 0:e.registerSubmenu(this.props.action.id,e=>(0,a.ensureNotNull)(this._itemRef).contains(e)||null!==this._menuElementRef.current&&this._menuElementRef.current.contains(e))},this.state={...this.props.action.getState()}}componentDidMount(){this.props.action.onUpdate().subscribe(this,this._updateState),this.state.subItems.length&&(this._unsubscribe=this._registerSubmenu()),this.props.reference&&(this._itemRef=this.props.reference.current)}componentDidUpdate(e,t){var n,s,o;t.loading!==this.state.loading&&(null===(s=(n=this.props).onRequestUpdate)||void 0===s||s.call(n)),0===t.subItems.length&&this.state.subItems.length>0&&(this._unsubscribe=this._registerSubmenu()),t.subItems.length>0&&0===this.state.subItems.length&&(null===(o=this._unsubscribe)||void 0===o||o.call(this)),t.subItems!==this.state.subItems&&null!==this._menuRef&&this._menuRef.update()}componentWillUnmount(){this.props.action.onUpdate().unsubscribe(this,this._updateState),this._unsubscribe&&this._unsubscribe()}render(){var e,t,n;const o=null!==(e=this.state.jsxLabel)&&void 0!==e?e:this.state.label,r=(null===(t=this.context)||void 0===t?void 0:t.current)?this.context.current===this.props.action.id:this.props.isSubMenuOpened;return this.state.loading?s.createElement(N,{size:this.state.size}):s.createElement(x,{theme:this.props.theme,reference:null!==(n=this.props.reference)&&void 0!==n?n:this._setItemRef,onClick:this._handleClick,onClickToolbox:this._handleClickToolbox,onMouseOver:this._handleItemMouseOver,hovered:r,hasSubItems:this._hasSubItems(),actionName:this.state.name,checkboxInput:this.props.checkboxInput,selected:this.props.selected,
...this.state,label:o},s.createElement(C.ContextMenu,{isOpened:r,items:this.state.subItems,position:this._calcSubMenuPos,menuStatName:this.props.menuStatName,parentStatName:this._getStatName(),menuElementReference:this._menuElementRef,onMouseOver:this.state.subItems.length?this._handleMenuMouseOver:void 0,ref:this._handleMenuRef}))}_setCurrentContextValue(){var e;this.state.subItems.length&&(null===(e=this.context)||void 0===e||e.setCurrent(this.props.action.id))}_hasSubItems(){return this.state.subItems.length>0}_trackEvent(){const e=this._getStatName();(0,E.trackEvent)("ContextMenuClick",this.props.menuStatName||"",e)}_getStatName(){return[this.props.parentStatName,this.state.statName].filter(e=>Boolean(e)).join(".")}}I.contextType=S.SubmenuContext;class M extends s.PureComponent{constructor(e){super(e),this._handleShowSubMenu=e=>{const t=e.getState();this.setState({showSubMenuOf:t.subItems.length?e:void 0})},this.state={}}render(){return s.createElement("table",null,s.createElement("tbody",null,this.props.items.map(e=>this._item(e))))}static getDerivedStateFromProps(e,t){return!e.parentIsOpened&&t.showSubMenuOf?{showSubMenuOf:void 0}:null}_item(e){switch(e.type){case"separator":return s.createElement(r,{key:e.id,hint:e.getHint()});case"action":return s.createElement(I,{key:e.id,action:e,onShowSubMenu:this._handleShowSubMenu,isSubMenuOpened:this.state.showSubMenuOf===e,menuStatName:this.props.menuStatName,parentStatName:this.props.parentStatName,onRequestUpdate:this.props.onRequestUpdate})}}}},56806:(e,t,n)=>{"use strict";n.d(t,{ContextMenu:()=>S,OverlapContextMenu:()=>w});var s=n(67294),o=n(94184),r=n.n(o),a=n(36668),i=n(90901),l=n(13894),c=n(80556),u=n(87361),h=n(94004),p=n(68521),m=n(81885);function d(e){return s.createElement("li",{className:m.separator})}var v=n(90590),b=n(57374),f=n(79424);function _(e){const{action:t}=e,[n,o]=(0,s.useState)(()=>t.getState()),[r,a]=(0,s.useState)(!1),i=!!n.subItems.length,l=i&&r;return(0,s.useEffect)(()=>{const e=()=>o(t.getState());return t.onUpdate().subscribe(null,e),()=>{t.onUpdate().unsubscribe(null,e)}},[]),s.createElement(v.ContextMenuItem,{...n,onClick:function(e){if(n.disabled||e.defaultPrevented)return;if(i)return void a(!0);n.doNotCloseOnClick||(0,f.globalCloseMenu)();t.execute()},isLoading:n.loading,isHovered:l},l&&s.createElement(b.Drawer,{onClose:c},s.createElement(g,{items:n.subItems,parentAction:t,closeNested:c})));function c(e){e&&e.preventDefault(),a(!1)}}var x=n(23060),C=n(2958);function g(e){const{items:t,parentAction:n,closeNested:o}=e,r=!Boolean(n)&&t.every(e=>!Boolean("separator"!==e.type&&(e.getState().icon||e.getState().checkable)));return s.createElement(x.EmptyIconsContext.Provider,{value:r},s.createElement("ul",null,n&&s.createElement(s.Fragment,null,s.createElement(v.ContextMenuItem,{label:n.getState().label,isTitle:!0,active:!1,disabled:!1,subItems:[],checkable:!1,checked:!1,doNotCloseOnClick:!1,icon:C,onClick:o}),s.createElement(d,null)),t.map(e=>{switch(e.type){case"action":return s.createElement(_,{key:e.id,action:e});case"separator":
return s.createElement(d,{key:e.id})}})))}const E=s.createContext(null);var k=n(39049);class S extends s.PureComponent{constructor(e){super(e),this._menuRef=s.createRef(),this._handleRequestUpdate=()=>{this.update()},this._handleClose=()=>{this.props.onClose&&this.props.onClose()},this._handleOutsideClickClose=e=>{const{doNotCloseOn:t,onClose:n}=this.props;!n||void 0!==t&&t.contains(e.target)||n()},this._handleFocusOnOpen=()=>{var e,t;(null===(e=this.props.menuElementReference)||void 0===e?void 0:e.current)&&this.props.takeFocus&&(null===(t=this.props.menuElementReference)||void 0===t||t.current.focus({preventScroll:!0}))},this.state={}}render(){const{isOpened:e,onClose:t,items:n,doNotCloseOn:o,menuStatName:a,parentStatName:m,takeFocus:d,...v}=this.props;return e?s.createElement(h.DrawerManager,null,s.createElement(c.KeyboardDocumentListener,{keyCode:27,eventType:"keyup",handler:this._handleClose}),s.createElement(p.MatchMedia,{rule:"screen and (max-width: 428px)"},t=>this._isDrawer(t)?s.createElement(E.Provider,{value:{type:"drawer"}},s.createElement(b.Drawer,{onClose:this._handleClose,position:"Bottom","data-name":v["data-name"]},s.createElement(g,{items:n}))):s.createElement(E.Provider,{value:{type:"menu"}},s.createElement(l.OutsideEvent,{handler:this._handleOutsideClickClose,mouseDown:!0,touchStart:!0,reference:this.props.menuElementReference},t=>s.createElement(i.Menu,{...v,reference:t,className:r()(k.menu,"context-menu"),onClose:this._handleClose,noMomentumBasedScroll:!0,ref:this._menuRef,tabIndex:d?-1:void 0,onOpen:this._handleFocusOnOpen},s.createElement(u.ActionsTable,{items:n,menuStatName:a,parentStatName:m,parentIsOpened:e,onRequestUpdate:this._handleRequestUpdate})))))):null}update(){this._menuRef.current&&this._menuRef.current.update()}_isDrawer(e){return void 0===this.props.mode?e:"drawer"===this.props.mode}}const w=(0,a.makeOverlapable)(S)},57330:(e,t,n)=>{"use strict";n.d(t,{Hint:()=>i});var s=n(67294),o=n(94184),r=n.n(o),a=n(30160);function i(e){const{text:t="",className:n}=e;return s.createElement("span",{className:r()(a.shortcut,n)},t)}},90590:(e,t,n)=>{"use strict";n.d(t,{ContextMenuItem:()=>d});var s=n(67294),o=n(94184),r=n.n(o),a=n(49775),i=n(73226),l=n(23060),c=n(57330),u=n(12343),h=n(655),p=n(37978),m=n(85848);function d(e){const{isTitle:t,isLoading:n,isHovered:o,active:d,checkable:v,disabled:b,checked:f,icon:_,iconChecked:x,hint:C,subItems:g,label:E,onClick:k,children:S,toolbox:w,jsxLabel:y,size:N="normal"}=e,I=(0,s.useContext)(l.EmptyIconsContext),M=!!g.length;return n?s.createElement("li",{className:r()(m.item,m.loading,m[N])},s.createElement(i.Loader,null)):s.createElement("li",{className:r()(m.item,m.interactive,t&&m.title,b&&m.disabled,o&&m.hovered,d&&m.active,I&&m.emptyIcons,m[N]),onClick:k},s.createElement(a.Icon,{className:r()(m.icon),icon:function(){if(v&&f)return x||_||u;return _}()}),s.createElement("span",{className:r()(m.label)},null!=y?y:E),!!w&&s.createElement(a.Icon,{onClick:function(){w&&w.action()},className:m.remove,icon:p}),!M&&C&&s.createElement(c.Hint,{
className:m.shortcut,text:C}),M&&s.createElement(a.Icon,{className:m.nested,icon:h}),S)}},23060:(e,t,n)=>{"use strict";n.d(t,{EmptyIconsContext:()=>s});const s=n(67294).createContext(!1)},80556:(e,t,n)=>{"use strict";n.d(t,{KeyboardDocumentListener:()=>o});var s=n(67294);class o extends s.PureComponent{constructor(){super(...arguments),this._handleKeyDown=e=>{e.keyCode===this.props.keyCode&&this.props.handler(e)}}componentDidMount(){document.addEventListener(this.props.eventType||"keydown",this._handleKeyDown,!1)}componentWillUnmount(){document.removeEventListener(this.props.eventType||"keydown",this._handleKeyDown,!1)}render(){return null}}},13894:(e,t,n)=>{"use strict";n.d(t,{OutsideEvent:()=>o});var s=n(47165);function o(e){const{children:t,...n}=e;return t((0,s.useOutsideEvent)(n))}},36668:(e,t,n)=>{"use strict";n.d(t,{makeOverlapable:()=>r});var s=n(67294),o=n(4735);function r(e){return class extends s.PureComponent{render(){const{isOpened:t,root:n}=this.props;if(!t)return null;const r=s.createElement(e,{...this.props,zIndex:150});return"parent"===n?r:s.createElement(o.Portal,null,r)}}}},14303:(e,t,n)=>{"use strict";n.d(t,{RemoveButton:()=>u});var s=n(79881),o=n(67294),r=n(94184),a=n(49775),i=n(36535),l=n(15169);const c={remove:(0,s.t)("Remove")};function u(e){const{className:t,isActive:n,onClick:s,title:u,hidden:h,"data-name":p="remove-button",...m}=e;return o.createElement(a.Icon,{...m,"data-name":p,className:r(l.button,"apply-common-tooltip",n&&l.active,h&&l.hidden,t),icon:i,onClick:s,title:u||c.remove})}},2958:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.5 20L11 14.5 16.5 9"/></svg>'},655:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18" fill="none"><path stroke="currentColor" d="M8 5l3.5 3.5L8 12"/></svg>'},78243:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 14" width="18" height="14"><path fill="currentColor" d="M6 11.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41-10.59 10.58z"/></svg>'},12343:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M7 15l5 5L23 9"/></svg>'},36535:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="currentColor" d="M9.707 9l4.647-4.646-.707-.708L9 8.293 4.354 3.646l-.708.708L8.293 9l-4.647 4.646.708.708L9 9.707l4.646 4.647.708-.707L9.707 9z"/></svg>'},37978:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18" fill="none"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M9.7 9l4.65-4.65-.7-.7L9 8.29 4.35 3.65l-.7.7L8.29 9l-4.64 4.65.7.7L9 9.71l4.65 4.64.7-.7L9.71 9z"/></svg>'}}]);