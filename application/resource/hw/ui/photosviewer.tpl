{namespace tpl.ui.PhotosViewer}

/**
 * @param id
 */
{template .element}
<div id="{$id}" class="{css CSS_PHOTOS_VIEWER}">
  <div id="{$id}_content" class="{css CSS_PHOTOS_VIEWER_CONTENT}">
  </div>
  <div class="{css CSS_PHOTOS_VIEWER_BOTTOM_BAR}" id="{$id}_bottom">
    <i id="{$id}_prev" class="{css CSS_PHOTOS_VIEWER_NAV}" tabindex="1">
      &larr;
    </i>
    <i id="{$id}_next" class="{css CSS_PHOTOS_VIEWER_NAV}" tabindex="1">
      &rarr;
    </i>
  </div>
</div>
{/template}


/**
 * template.
 * @param id
 */
{template .empty}
<div id="{$id}_empty" class="{css CSS_PHOTOS_VIEWER_EMPTY}">
  {msg desc="feed empty"}
  No content available for now.
  {/msg}
</div>
{/template}


/**
 * template.
 * @param error
 * @param type
 * @param id
 */
{template .error}
<div id="{$id}_error" class="{css CSS_PHOTOS_VIEWER_ERROR}">
  {msg desc="feed error"}
  Oops. Something went wrong. Try again and reload later.
  {/msg}

  {if $error}
  <div class="{css CSS_PHOTOS_VIEWER_ERROR_REASON}">
    {if $type}
    {$type}<br/>
    {/if}
    {$error}
  </div>
  {/if}
</div>
{/template}


/**
 * Template.
 * @param id
 * @param elementId
 * @param width
 * @param height
 * @param left
 * @param top
 */
{template .photo}
<div id="{$id}_{$elementId}"{sp}
  style="width:{$width}px;height:{$height}px;left:{$left}px;top:{$top};"{sp}
  src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="{sp}
  class="{css CSS_PHOTOS_VIEWER_PHOTO}">
</div>
{/template}



/**
 * Template.
 * @param src
 */
{template .img}
  <img src="{$src}" class="{css CSS_PHOTOS_VIEWER_IMG}" />
{/template}

