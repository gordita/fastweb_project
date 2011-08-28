{namespace tpl.ui.Dots}

/**
 * Template.
 * @param id string
 */
{template .element}
<div id="{$id}" class="{css CSS_DOTS}">
</div>
{/template}


/**
 * template.
 * @param selected
 */
{template .dot}
  {if $selected}
    <span class="{css CSS_DOTS_DOT} {css CSS_DOTS_DOT_SELECTED}">
    </span>
  {else}
    <span class="{css CSS_DOTS_DOT}">
    </span>
  {/if}
{/template}