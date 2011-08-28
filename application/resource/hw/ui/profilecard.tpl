{namespace tpl.ui.ProfileCard}

/**
 * Template.
 * @param id string
 */
{template .element}
<div id="{$id}" class="{css CSS_PROFILE_CARD}">
</div>
{/template}


/**
 * Template.
 * @param data
 */
{template .content}
<div class="{css CSS_PROFILE_CARD_CONTENT}">
  <img src="//graph.facebook.com/{$data['id']}/picture"{sp}
       class="{css CSS_PROFILE_CARD_CONTENT_IMG}"/>
  <strong class="{css CSS_PROFILE_CARD_CONTENT_NAME}">
    {$data['name']}
  </strong>
</div>
{/template}