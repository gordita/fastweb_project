{namespace tpl.ui.feed.Albums}

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
  <div class="{css CSS_FEED_HEAD}">
    <h3 class="{css CSS_FEED_HEAD_TEXT}">
      {msg desc="my albums"}My Albums{/msg}
    </h3>
    <div class="{css CSS_FEED_COUNT_TEXT}">
      {msg desc="albums count"}
        {length($data['data'])}
        {sp}
        albums
      {/msg}
    </div>
  </div>
  {foreach $album in $data['data']}
    {call .albumItem_}
      {param item: $album /}
      {param accessToken: $data['access_token'] /}
    {/call}
  {/foreach}
{/template}

/**
 * template.
 * @param item
 * @param accessToken
 */
{template .albumItem_ private="true"}
{if $item['count']}
  <a href="{$item['link']}" class="{css CSS_ALBUMS_FEED_ITEM}">
    <img
      {sp}
      src="https://graph.facebook.com/{$item['cover_photo']}/picture?type=album&access_token={$accessToken}"
      {sp}
      class="{css CSS_ALBUMS_FEED_ITEM_IMG}" />
    <span class="{css CSS_ALBUMS_FEED_ITEM_CONTENT}">
      <strong class="{css CSS_ALBUMS_FEED_ITEM_NAME}">
        {$item['name']}
      </strong>
      <span class="{css CSS_ALBUMS_FEED_ITEM_COUNT}">
        {$item['count']}
        {sp}
        {msg desc="photos count"}photos{/msg}
      </span>
    </span>
  </a>
{/if}
{/template}