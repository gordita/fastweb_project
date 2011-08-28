{namespace tpl.ui.feed.Base}

/**
 * template.
 * @param id string
 */
{template .element}
<div id="{$id}">
  {call .loading_ /}
</div>
{/template}


/**
 * template.
 * @param error
 * @param type
 * @param id
 */
{template .error}
<div id="{$id}_error" class="{css CSS_FEED_ERROR}">
  {msg desc="feed error"}
  Oops. Something went wrong. Try again and reload later.
  {/msg}

  {if $error}
  <div class="{css CSS_FEED_ERROR_REASON}">
    {if $type}
      {$type}<br />
    {/if}
    {$error}
  </div>
  {/if}
</div>
{/template}


/**
 * template.
 * @param id
 */
{template .empty}
<div id="{$id}_empty" class="{css CSS_FEED_ITEM_EMPTY}">
  {msg desc="feed empty"}
    No content available for now.
  {/msg}
</div>
{/template}


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
 */
{template .loading_ private="true"}
<div class="{css CSS_FEED_LOADING}">
  <div class="{css CSS_LOADING_INDICATIOR}">
    <i class="{css CSS_LOADING_INDICATIOR_L}"></i>
    <i class="{css CSS_LOADING_INDICATIOR_M}"></i>
    <i class="{css CSS_LOADING_INDICATIOR_R}"></i>
  </div>
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
  {param defer: (index($item) > 3) /}
  {/call}
  {/foreach}
</ul>
{/template}


/**
 * template.
 * @param item
 * @param defer
 */
{template .listitem_ private="true"}
<li class="{css CSS_FEED_LIST_ITEM}{sp}
           {if $defer}{css CSS_DEFER_ELEMENT}{/if}">

  <div class="{css CSS_FEED_LIST_ITEM_GRID}">
    <div class="{css CSS_FEED_LIST_ITEM_ROW}">
      <div class="{css CSS_FEED_LIST_ITEM_SIDE}">
        {call .icon_ data="all" /}
      </div>
      <div class="{css CSS_FEED_LIST_ITEM_CONTEXT}">
        {call .likeOrComment_ data="all" /}
        {call .namelink_ data="all" /}
        {call .itemContent_ data="all" /}
      </div>
    </div>
  </div>
</li>
{/template}

/**
 * template.
 * @param item
 */
{template .likeOrComment_ private="true"}
  {if $item['actions']}
    {if length($item['actions']) == 2}
    <div tabindex="1"{sp}
         cmd="like_or_comment"{sp}
         class="{css CSS_FEED_LIST_ITEM_LIKE_OR_RESPOND}">
      {call .likeOrCommentActions_ data="all" /}
    </div>
  {/if}
  {/if}
{/template}
  
  
/**
 * template.
 * @param item
 */
{template .likeOrCommentActions_ private="true"}
  <div class="{css CSS_FEED_LIST_ITEM_LIKE_OR_RESPOND_POPUP}">
    <a cmd="{$item['actions'][1]['name']}"{sp}
       nohref="{$item['actions'][1]['link']}"{sp}
       class="{css LIKE_BUTTON} {css ICON_BUTTON}">
       {msg desc="like button text"}Like{/msg}
    </a>
    <a cmd="{$item['actions'][0]['name']}"{sp}
       nohref="{$item['actions'][0]['link']}"{sp}
       class="{css ICON_BUTTON}">
      {msg desc="comment button text"}Comment{/msg}
    </a>
    <i class="{css CSS_SHADOW_LEFT}"></i>
    <i class="{css CSS_SHADOW_RIGHT}"></i>
  </div>
{/template}  

/**
 * template.
 * @param item
 */
{template .namelink_ private="true"}
  {if $item['from']}
    <a
      href="//www.facebook.com/profile.php?id={$item['from']['id']}"{sp}
      class="{css CSS_FEED_LIST_ITEM_NAME_LINK}">
      {$item['from']['name']}
    </a>
  {/if}
{/template}


/**
 * template.
 * @param item
 */
{template .icon_ private="true"}
  {if $item['from']}
    <img
      class="{css CSS_FEED_LIST_ITEM_ICON}"{sp}
      src="//graph.facebook.com/{$item['from']['id']}/picture"{sp}
      alt=""/>
  {elseif $item['icon']}
    <img
      class="{css CSS_FEED_LIST_ITEM_ICON}"{sp}
      src="{$item['icon']}"{sp}
      alt=""/>
  {/if}
{/template}


/**
 * template.
 * @param src
 */
{template .cssImage_ private="true"}
   <span class="{css CSS_IMAGE}" style="background-image:url({$src})">
   </span>
{/template}


/**
 * template.
 * @param item
 */
{template .itemContent_ private="true"}
  {switch $item['type']}
    {case 'video'}
      {call .videoItem_ data="all" /}
    {case 'status'}
      {call .statusItem_ data="all" /}
    {case 'link'}
      {call .linkItem_ data="all" /}
    {case 'photo'}
      {call .photoItem_ data="all" /}
    {default}
      ### {$item['type']} ###
  {/switch}
{/template}


/** 
 * template.
 * @param item
 */
{template .videoItem_ private="true"}
  <div class="{css CSS_FEED_LIST_ITEM_VIDEO}">
    <h4>
      <a href="{$item['source']}">{$item['name']}</a>
    </h4>
    {if $item['caption']}
    <div class="{css CSS_FEED_LIST_ITEM_MINOR_TEXT}">
      {$item['caption']}
    </div>
    {/if}
    {if $item['description']}
    <div class="{css CSS_FEED_LIST_ITEM_VIDEO_DESCRIPTION}">
      {$item['description']}
    </div>
    {/if}
  </div>
{/template}


/**
 * template.
 * @param item
 */
{template .statusItem_ private="true"}
  <div class="{css CSS_FEED_LIST_ITEM_STATUS}">
    {if $item['message']}
      {$item['message']}
    {/if}
  </div>
{/template}


/**
 * template.
 * @param item
 */
{template .linkItem_ private="true"}
  {if $item['message']}
    <div class="{css CSS_FEED_LIST_ITEM_LINK_MESSAGE}">
      {$item['message']}
    </div>
  {/if}
  {if $item['description']}
    {if $item['link']}
      <div>
        <a href="{$item['link']}">
         {$item['description']}
        </a>
      </div>
    {/if}
  {/if}
  {if $item['caption']}
    <div class="{css CSS_FEED_LIST_ITEM_MINOR_TEXT}">
      {$item['caption']}
    </div>
  {/if}
{/template}


/**
 * template.
 * @param item
 */
{template .photoItem_ private="true"}
  {if $item['link']}
    {if $item['name']}
      <div>
        <a href="{$item['link']}">{$item['name']}</a>
      </div>
      {if $item['properties']}
        {foreach $property in $item['properties']}
          {if $property['text']}
            {if $property['name']}
              <span>{$property['name']}{sp}:{sp}</span>
            {/if}
            {if $property['href']}
              <a href="{$property['href']}">{$property['text']}</a>
            {else}
              {$property['text']}
            {/if}
            <br />
          {/if}
        {/foreach}
      {/if}
    {/if}

    {if $item['picture']}
      <a
        href="{$item['link']}"{sp}
        class="{css CSS_FEED_LIST_ITEM_PHOTO_LINK}">
        // {call .cssImage_}
        //   {param src: $item['picture'] /}
        // {/call}
        <img src="{$item['picture']}"{sp}
          class="{css CSS_FEED_LIST_ITEM_PHOTO_IMG}" />
      </a>
    {/if}
  {/if}
{/template}


/**
 * template.
 * @param item
 */
{template .actions_ private="true"}
  {if $item['actions']}
    {if length($item['actions']) > 0}
      {$item['actions'][length($item['actions'])-1]}
    {/if}
  {/if}
{/template}