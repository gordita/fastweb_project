{namespace tpl.ui.feed.Notifications}

/**
 * template.
 * @param id
 * @param data
 */
{template .result}
<div id="{$id}_result">
  {call .listItems_}
  {param items: $data['data'] /}
  {/call}
</div>
{/template}


/**
 * template.
 * @param items
 */
{template .listItems_ private="true"}
<ul>
  {foreach $item in $items}
  {call .listitem_}
  {param item: $item /}
  {/call}
  {/foreach}
</ul>
{/template}


/**
 * template.
 * @param item
 */
{template .listitem_ private="true"}
<li class="{css CSS_FEED_LIST_ITEM} {css CSS_NOTIFICATION_FEED_LIST_ITEM}">
  <a href="/message?id={$item['id']}"{sp}
    class="{css CSS_NOTIFICATION_FEED_LINK}">
    <div class="{css CSS_FEED_LIST_ITEM_GRID}">
      <div class="{css CSS_FEED_LIST_ITEM_ROW}">
        <div class="{css CSS_FEED_LIST_ITEM_SIDE}">
          {call .icon_ data="all" /}
        </div>
        <div class="{css CSS_FEED_LIST_ITEM_CONTEXT}">
          <span class="{css CSS_NOTIFICATION_FEED_NAME}">
            {$item['title']}
          </span>
          <span class="{css CSS_NOTIFICATION_FEED_TIME}">
            {$item['updated_time']}
          </span>
        </div>
      </div>
    </div>
  </a>
</li>
{/template}

/**
 * template.
 * @param item
 */
{template .icon_ private="true"}
  <img
    class="{css CSS_FEED_ITEM_USER_IMG}"{sp}
    src="//graph.facebook.com/{$item['from']['id']}/picture"{sp}
    alt=""/>
{/template}