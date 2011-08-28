{namespace tpl.ui.DockIcons}

/**
 * Template.
 * @param id
 */
{template .element}
<div id="{$id}" class="{css CSS_DOCK_ICONS}">
  <ul class="{css CSS_DOCK_ICONS_LIST}">
    {call .icon_}
      {param text: 'News Feed' /}
      {param type: 'newsfeed' /}
      {param href: '/home' /}
    {/call}
    {call .icon_}
      {param text: 'Profile' /}
      {param type: 'profile' /}
      {param href: '/profile' /}
    {/call}
    {call .icon_}
      {param text: 'Friends' /}
      {param type: 'friends' /}
      {param href: '/friends' /}
    {/call}
    {call .icon_}
      {param text: 'Messages' /}
      {param type: 'messages' /}
      {param href: '/messages' /}
    {/call}
    {call .icon_}
      {param text: 'Places' /}
      {param type: 'places' /}
      {param href: '/places' /}
    {/call}
    {call .icon_}
      {param text: 'Groups' /}
      {param type: 'groups' /}
      {param href: '/groups' /}
    {/call}
    {call .icon_}
      {param text: 'Events' /}
      {param type: 'events' /}
      {param href: '/events' /}
    {/call}
    {call .icon_}
      {param text: 'Photos' /}
      {param type: 'photos' /}
      {param href: '/albums' /}
    {/call}
    {call .icon_}
      {param text: 'Chat' /}
      {param type: 'chat' /}
      {param href: '/chat' /}
    {/call}
    {call .icon_}
      {param text: 'Notes' /}
      {param type: 'notes' /}
      {param href: '/notes' /}
    {/call}
  </ul>
</div>
{/template}


/**
 * template.
 * @param type
 * @param text
 * @param href
 */
{template .icon_ private="true"}
<li class="{css CSS_DOCK_ICON}">
  <a href="{$href}?id=me" class="{css CSS_DOCK_ICON_LINK}">
    <span class="icon-{$type} {css CSS_DOCK_ICON_IMG}"></span>
    <strong class="{css CSS_DOCK_ICON_TEXT}">{$text}</strong>
  </a>
</li>
{/template}