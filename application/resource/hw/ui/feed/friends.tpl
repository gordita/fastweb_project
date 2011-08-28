{namespace tpl.ui.feed.Friends}

/**
 * template.
 * @param id
 * @param groups
 */
{template .result}
<div id="{$id}_result" class="{css CSS_FRIENDS_FEED}">
  {call .content_ data="all" /}
</div>
{/template}

/**
 * template.
 * @param id
 * @param groups
 */
{template .content_ private="true"}
<div >
  {foreach $group in $groups}
    <h4 id="{$id}_{$group.id}" class="{css CSS_FRIENDS_FEED_GROUP_LABEL}">
      {$group.label}
    </h4>
    {foreach $friend in $group}
      {call .item_}
        {param userId: $friend['id'] /}
        {param name: $friend['name'] /}
        {param picture: $friend['picture'] /}
      {/call}
    {/foreach}
  {/foreach}
</div>
{/template}

/**
 * template.
 * @param userId
 * @param name
 * @param picture
 */
{template .item_ private="true"}
<a href="/profile?id={$userId}"  class="{css CSS_FRIENDS_FEED_ITEM}">
  <img src="{$picture}" class="{css CSS_FRIENDS_FEED_ITEM_PICTURE}" />
  <span href="/profile?id={$userId}" class="{css CSS_FRIENDS_FEED_ITEM_NAME}">
    {$name}
  </span>
</a>
{/template}