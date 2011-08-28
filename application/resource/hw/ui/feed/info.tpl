{namespace tpl.ui.feed.Info}

/**
 * template.
 * @param id
 * @param data
 */
{template .result}
<div id="{$id}_result">
  {call .textItem_}
    {param label: 'Birthday' /}
    {param value: $data['birthday'] /}
  {/call}
  {call .locationItem_}
    {param label: 'Location' /}
    {param value: $data['location'] /}
  {/call}
  {call .objItem_}
    {param label: 'Hometown' /}
    {param value: $data['hometown'] /}
  {/call}
  {call .textItem_}
    {param label: 'Web Site' /}
    {param value: $data['website'] /}
  {/call}
  {call .workItem_}
    {param label: 'Work' /}
    {param value: $data['work'] /}
  {/call}
  {call .eduItem_}
    {param label: 'Education' /}
    {param value: $data['education'] /}
  {/call}
  {call .textItem_}
    {param label: 'Link' /}
    {param value: $data['link'] /}
  {/call}
  {call .textItem_}
    {param label: 'Gender' /}
    {param value: $data['gender'] /}
  {/call}
</div>
{/template}



/**
 * template.
 * @param label
 * @param value
 */
{template .textItem_ private="true"}
  {if $value}
    <div class="{css CSS_INFO_FEED_ITEM}">
      <strong class="{css CSS_INFO_FEED_ITEM_LABEL}">
        {$label}
      </strong>
      <div>
        {$value}
      </div>
    </div>
  {/if}
{/template}


/**
 * template.
 * @param label
 * @param value
 */
{template .locationItem_ private="true"}
  {if $value}
    <div class="{css CSS_INFO_FEED_ITEM}">
      <strong class="{css CSS_INFO_FEED_ITEM_LABEL}">
        {$label}
      </strong>
      <div>
        {if $value['city']}{$value['city']}{/if}{sp}
        {if $value['state']}{$value['state']}{/if}{sp}
        {if $value['country']}{$value['city']}{/if}
      </div>
    </div>
  {/if}
{/template}


/**
 * template.
 * @param label
 * @param value
 */
{template .objItem_ private="true"}
  {if $value}
    <div class="{css CSS_INFO_FEED_ITEM}">
      <strong class="{css CSS_INFO_FEED_ITEM_LABEL}">
        {$label}
      </strong>
      <div>
        {$value['name']}
      </div>
    </div>
  {/if}
{/template}


/**
 * template.
 * @param label
 * @param value
 */
{template .workItem_ private="true"}
  {if $value}
    {if length($value) > 0}
      <div class="{css CSS_INFO_FEED_ITEM}">
        <strong class="{css CSS_INFO_FEED_ITEM_LABEL}">
          {$label}
        </strong>
        <div>
          {foreach $work in $value}
            {$work['employer']['name']}
            {if not isLast($work)}
            ,{sp}
            {/if}
          {/foreach}
        </div>
      </div>
    {/if}
  {/if}
{/template}

/**
 * template.
 * @param label
 * @param value
 */
{template .eduItem_ private="true"}
  {if $value}
    {if length($value) > 0}
      <div class="{css CSS_INFO_FEED_ITEM}">
        <strong class="{css CSS_INFO_FEED_ITEM_LABEL}">
          {$label}
        </strong>
        <div>
          {foreach $work in $value}
            {$work['school']['name']}
            {if not isLast($work)}
            ,{sp}
            {/if}
          {/foreach}
        </div>
      </div>
    {/if}
  {/if}
{/template}
    
