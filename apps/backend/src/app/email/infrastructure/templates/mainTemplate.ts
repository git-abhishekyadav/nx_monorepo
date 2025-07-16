/**
 * Please read mjml documentation
 * ==============================
 * You can edit or preview on:
 * https://mjml.io/try-it-live/F6ealgRTg
 */

export const mainTemplate = 
`
<mjml>
  <mj-body background-color="#F6F6F6">
    <mj-section padding-top="20px"></mj-section>
    <mj-wrapper padding-left="20px" padding-right="20px" background-color="#FFFFFF">
      <mj-section background-color="#FFFFFF">
        <mj-column>
          <mj-image width="800px" src="https://halo-assets.s3.amazonaws.com/emailEngine/APHA_logo.png"></mj-image>
          <mj-divider border-color="#595959"></mj-divider>
        </mj-column>
      </mj-section>

      <mj-section background-color="#FFFFFF" border="3px solid #F8F8F8">
        <mj-column>
          <mj-text>
            {{{content}}}
          </mj-text>
        </mj-column>
      </mj-section>

      <mj-section background-color="#FFFFFF" padding="0">
        <mj-column>
          <mj-text align="center">
            {{{footer}}}
          </mj-text>
        </mj-column>
      </mj-section>

      <mj-section background-color="#FFFFFF" padding="0">
        <mj-column>
          <mj-text align="center" color="#795548" font-size="16px">
            APHAMemberCare
          </mj-text>
          <mj-button align="center" line-height="1px" inner-padding="0 0" href="mailto:askAPHA@apha.com" background-color="transparent" color="black">
            askAPHA@apha.com
          </mj-button>
          <mj-text align="center" line-height="1px">
            (817) 222-6423
          </mj-text>
          <mj-text align="center" line-height="1px">
            PO Box 961023
          </mj-text>
          <mj-text align="center" line-height="1px">
            Fort Worth, TX 76161
          </mj-text>
        </mj-column>
      </mj-section> 
    </mj-wrapper>
    
     <mj-section>
        <mj-column>
          <mj-image width="300px" src="https://halo-assets.s3.amazonaws.com/emailEngine/footer.png">
          </mj-image>
        </mj-column>
      </mj-section>
    
  </mj-body>
</mjml>
`