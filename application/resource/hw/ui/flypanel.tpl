{namespace tpl.ui.FlyPanel}

/**
 * Template.
 * @param id
 */
{template .element}
<div id="{$id}" class="
  {css CSS_FLY_PANEL_LAUNCH_BUTTON} {css CSS_BLUE_GRADIENT_BOX}">
  &nbsp;
</div>
{/template}


/**
 * Template.
 * @param id
 * @param caption
 */
{template .panel}
<div id="{$id}_panel"  tabindex="1" class="{css CSS_FLY_PANEL}">
  <div tabindex="1" id="{$id}_panelCaption" class="
    {css CSS_FLY_PANEL_LAUNCH_BUTTON} {css CSS_BLUE_GRADIENT_BOX}">
    {{$caption}}
  </div>
  <div class="{css CSS_FLY_PANEL_BODY}" id="{$id}_panelBody">
  </div>
</div>
{/template}

