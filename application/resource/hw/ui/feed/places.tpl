{namespace tpl.ui.feed.Places}

/**
 * template.
 * @param id
 * @param data
 */
{template .result}
<div id="{$id}_result">
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
      {param from: $item['from'] /}
      {param place: $item['place'] /}
      {param time: $item['created_time'] /}
    {/call}
  {/foreach}
</div>
{/template}

/**
 * template.
 * @param from
 * @param place
 * @param time
 */
{template .item_ private="true"}
<a href="/profile?id={$place['id']}"  class="{css CSS_PLACES_FEED_ITEM}">
  <img
    {sp}
    src="https://graph.facebook.com/{$place['id']}/picture"
    {sp}
    class="{css CSS_PLACES_FEED_ITEM_IMG}" />
  <div class="{css CSS_PLACES_FEED_ITEM_CONTEXT}">
    <div class="{css CSS_PLACES_FEED_ITEM_NAME}">{$from['name']}</div>
    <div class="{css CSS_PLACES_FEED_ITEM_PLACE}">{$place['name']}</div>
    <div class="{css CSS_PLACES_FEED_ITEM_TIME}">{$time}</div>
  </div>
</a>
{/template}