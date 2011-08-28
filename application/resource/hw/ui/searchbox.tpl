{namespace tpl.ui.SearchBox}

/**
 * Template.
 * @param id
 * @param text
 */
{template .element}
<div id="{$id}" class="{css CSS_SEARCH_BOX}">
  <input type="search" id="{$id}_text" {sp}
    class="{css CSS_SEARCH_BOX_TEXT}"{sp}
    placeholder="{$text}" />
</div>
{/template}