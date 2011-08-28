{namespace tpl.ui.scroll.Scrubber}

/**
 * Template.
 * @param id
 */
{template .element}
  <div id="{$id}" class="{css CSS_SCRUBBER}" tabindex="1">
    <div class="{css CSS_SCRUBBER_ICON}" id="{$id}_icon" ></div>
  </div>
{/template}


/**
 * Template.
 */
{template .label}
  <div class="{css CSS_SCRUBBER_LABEL}">
  </div>
{/template}