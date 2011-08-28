{namespace tpl.ui.StartScreen}

/**
 * Template.
 * @param id string
 */
{template .element}
<div id="{$id}" class="{css CSS_START_SCREEN} {css CSS_CENTER_LAYOUT}">
  <div class="{css CSS_CENTER_LAYOUT_WRAP_ONE}">
     <div class="{css CSS_CENTER_LAYOUT_WRAP_TWO}">
       <div class="{css CSS_START_SCREEN_LOGO}">fastweb</div>
         <div id="{$id}_login"{sp}
           class="{css CSS_START_SCREEN_LOGIN_BUTTON} {css CSS_BUTTON_BLUE}"{sp}
           tabindex="1">
           {msg desc="login"}Login{/msg}
         </div>
         <div id="{$id}_loading" class="{css CSS_LOADING_INDICATIOR}">
           <i class="{css CSS_LOADING_INDICATIOR_L}"></i>
           <i class="{css CSS_LOADING_INDICATIOR_M}"></i>
           <i class="{css CSS_LOADING_INDICATIOR_R}"></i>
         </div>
       </div>
     </div>
  </div>
</div>
{/template}