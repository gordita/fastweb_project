{namespace tpl.layout.StackRows}

/**
 * Template.
 * @param id string
 */
{template .element}
<div id="{$id}" class="{css CSS_STACK_ROWS_LAYOUT}">
</div>
{/template}


/**
 * Template.
 * @param id string
 */
{template .head}
<div class="{css CSS_STACK_ROWS_LAYOUT_HEAD}">
  <div class="{css CSS_STACK_ROWS_LAYOUT_CELL}">
    <div id="{$id}_content" class="{css CSS_STACK_ROWS_LAYOUT_CONTENT}"></div>
  </div>
</div>
{/template}


/**
 * Template.
 * @param id string
 */
{template .body}
<div class="{css CSS_STACK_ROWS_LAYOUT_BODY}">
  <div class="{css CSS_STACK_ROWS_LAYOUT_CELL}">
    <div id="{$id}_content" class="{css CSS_STACK_ROWS_LAYOUT_CONTENT}"></div>
  </div>
</div>
{/template}


/**
 * Template.
 * @param id string
 */
{template .foot}
<div class="{css CSS_STACK_ROWS_LAYOUT_FOOT}">
  <div class="{css CSS_STACK_ROWS_LAYOUT_CELL}">
    <div id="{$id}_content" class="{css CSS_STACK_ROWS_LAYOUT_CONTENT}"></div>
  </div>
</div>
{/template}