{namespace tpl.ui.ShareBox}

/**
 * Template.
 * @param id
 * @param showUploadPhotoButton
 */
{template .element}
<div id="{$id}" class="{css CSS_SHARE_BOX}">
  <div class="{css CSS_SHARE_BOX_TABLE}">
    <div class="{css CSS_SHARE_BOX_TR}">
      {if $showUploadPhotoButton}
      <div class="{css CSS_SHARE_BOX_TD} {css CSS_SHARE_BOX_TD_START}">
        // See http://bit.ly/peEMB8
        <a href="fb://upload/actions"{sp}
          class="{css CSS_UPLOAD_PHOTO_ICON}">
          {msg desc="upload photo"}
            upload photo
          {/msg}
        </a>
      </div>
      {/if}
      <div class="{css CSS_SHARE_BOX_TD}">
        <div class="{css CSS_SHARE_BOX_TEXT_WRAP}">
          <textarea id="{$id}_text" type="text" {sp}
            class="{css CSS_SHARE_BOX_TEXT}"{sp}
            placeholder="{msg desc="Share something"}Share something{/msg}">
          </textarea>
        </div>
      </div>
      <div class="{css CSS_SHARE_BOX_TD} {css CSS_SHARE_BOX_TD_END}">
        <input id="{$id}_send" type="button"{sp}
          value="{msg desc="share"}Share{/msg}"{sp}
          class="{css CSS_SHARE_BOX_SEND}"/>
      </div>
    </div>
  </div>
</div>
{/template}