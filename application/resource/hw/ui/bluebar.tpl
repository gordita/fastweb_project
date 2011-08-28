{namespace tpl.ui.BlueBar}

/**
 * Template.
 * @param id
 * @param backUrl
 */
{template .element}
  <div id="{$id}" class="{css CSS_BLUE_BAR} {css CSS_BLUE_GRADIENT_BOX}">
    <div class="{css CSS_TABLE}">
      <div class="{css CSS_TR}">
        {if $backUrl}
        <div class="{css CSS_TD}">
          <a href="{$backUrl}" class="{css CSS_BLUEBAR_BACK}">&lsaquo;</a>
        </div>
        <div class="{css CSS_TD} {css CSS_DIVIDER}"></div>
        {/if}
        <div class="{css CSS_TD}">
          <a href="/" class="{css CSS_BLUEBAR_LOGO}">fastweb</a>
        </div>
      </div>
    </div>
  </div>
{/template}