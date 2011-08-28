{namespace tpl.ui.feed.Groups}

/**
 * template.
 * @param id
 * @param data
 */
{template .result}
<div id="{$id}_result" class="{css CSS_GROUPS_FEED}">
  {call .content_ data="all" /}
</div>
{/template}

/**
 * template.
 * @param data
 */
{template .content_ private="true"}
<div>
  {foreach $item in $data['data']}
    {call .item_}
      {param groupId: $item['id'] /}
      {param name: $item['name'] /}
      {param unreadCount: $item['unread'] /}
      {param accessToken: $data['access_token'] /}
    {/call}
  {/foreach}
</div>
{/template}

/**
 * template.
 * @param groupId
 * @param name
 * @param unreadCount
 * @param accessToken
 */
{template .item_ private="true"}
<a href="/profile?id={$groupId}"  class="{css CSS_GROUPS_FEED_ITEM}">
  <img
    {sp}
    src="https://graph.facebook.com/{$groupId}/picture?access_token={$accessToken}"
    {sp}
    class="{css CSS_GROUPS_FEED_ITEM_IMG}" />
  <span class="{css CSS_GROUPS_FEED_ITEM_NAME}">{$name}</span>
  {if $unreadCount > 0}
  <span class="{css CSS_GROUPS_FEED_ITEM_UNREAD_COUNT}">{$unreadCount}</span>
  {/if}
  <span class="{css CSS_GROUPS_FEED_ITEM_CHEVRON}">
    &#0155;
  </span>
</a>
{/template}