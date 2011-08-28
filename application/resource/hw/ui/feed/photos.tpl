{namespace tpl.ui.feed.Photos}

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
  <div class="{css CSS_PHOTOS_FEED_IMGS}" >
  {foreach $item in $data['data']}
    {call .item_}
      {param data: $item /}
    {/call}
  {/foreach}
  </div>
</div>
{/template}


/**
 * template.
 * @param data
 */
{template .item_ private="true"}
  {call .img_}
    {param src: $data['picture'] /}
    {param photoId: $data['id'] /}
    {param width: $data['width'] /}
    {param height: $data['height'] /}
    {param largeSrc: $data['source'] /}
  {/call}
{/template}


/**
 * template.
 * @param photoId
 * @param src
 * @param width
 * @param height
 * @param largeSrc
 */
{template .img_ private="true"}
<a href="/photo?id={$photoId}"  class="{css CSS_PHOTOS_FEED_IMG_LINK}" {sp}
   data-src="{$largeSrc}" />
  {if $width > $height}
    <img src="{$src}" class="{css CSS_PHOTOS_FEED_IMG_W}" />
  {else}
    <img src="{$src}" class="{css CSS_PHOTOS_FEED_IMG_H}" />
  {/if}
</a>
{/template}