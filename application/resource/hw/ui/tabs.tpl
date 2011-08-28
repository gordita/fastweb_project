{namespace tpl.ui.Tabs}

/**
 * Template.
 * @param id
 */
{template .element}
<ul id="{$id}" class="{css CSS_TABS} {css CSS_BLUE_GRADIENT_BOX}">
</ul>
{/template}


/**
 * Template.
 * @param id
 * @param text
 */
{template .tab}
<li id="{$id}"{sp}
    tabindex="1"{sp}
    class="{css CSS_TAB} {css CSS_BLUE_GRADIENT_BOX}">
  {$text}
</li>
{/template}