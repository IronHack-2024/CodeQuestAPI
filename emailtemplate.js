const getEmailTemplate = (question, optionA, optionB, optionC) => `<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
<!--[if gte mso 15]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
<meta charset="UTF-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>*|MC:SUBJECT|*</title>
<!--[if !mso]><!--><link rel="stylesheet" type="text/css" id="newGoogleFontsStatic" href="https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding:400,400i,700,700i,900,900i"/><!--<![endif]--><style>          img{-ms-interpolation-mode:bicubic;} 
          table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} 
          .mceStandardButton, .mceStandardButton td, .mceStandardButton td a{mso-hide:all !important;} 
          p, a, li, td, blockquote{mso-line-height-rule:exactly;} 
          p, a, li, td, body, table, blockquote{-ms-text-size-adjust:100%; -webkit-text-size-adjust:100%;} 
          @media only screen and (max-width: 480px){
            body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:none !important;} 
          }
          .mcnPreviewText{display: none !important;} 
          .bodyCell{margin:0 auto; padding:0; width:100%;}
          .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font{line-height:100%;} 
          .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} 
          a[x-apple-data-detectors]{color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important;} 
            body{height:100%; margin:0; padding:0; width:100%; background: #ffffff;}
            p{margin:0; padding:0;} 
            table{border-collapse:collapse;} 
            td, p, a{word-break:break-word;} 
            h1, h2, h3, h4, h5, h6{display:block; margin:0; padding:0;} 
            img, a img{border:0; height:auto; outline:none; text-decoration:none;} 
            a[href^="tel"], a[href^="sms"]{color:inherit; cursor:default; text-decoration:none;} 
            li p {margin: 0 !important;}
            .ProseMirror a {
                pointer-events: none;
            }
            @media only screen and (max-width: 640px){
                .mceClusterLayout td{padding: 4px !important;} 
            }
            @media only screen and (max-width: 480px){
                body{width:100% !important; min-width:100% !important; } 
                body.mobile-native {
                    -webkit-user-select: none; user-select: none; transition: transform 0.2s ease-in; transform-origin: top center;
                }
                body.mobile-native.selection-allowed a, body.mobile-native.selection-allowed .ProseMirror {
                    user-select: auto;
                    -webkit-user-select: auto;
                }
                colgroup{display: none;}
                img{height: auto !important;}
                .mceWidthContainer{max-width: 660px !important;}
                .mceColumn{display: block !important; width: 100% !important;}
                .mceColumn-forceSpan{display: table-cell !important; width: auto !important;}
                .mceColumn-forceSpan .mceButton a{min-width:0 !important;}
                .mceBlockContainer{padding-right:16px !important; padding-left:16px !important;} 
                .mceTextBlockContainer{padding-right:16px !important; padding-left:16px !important;} 
                .mceBlockContainerE2E{padding-right:0px; padding-left:0px;} 
                .mceSpacing-24{padding-right:16px !important; padding-left:16px !important;}
                .mceImage, .mceLogo{width: 100% !important; height: auto !important;} 
                .mceFooterSection .mceText, .mceFooterSection .mceText p{font-size: 16px !important; line-height: 140% !important;}
            }
            div[contenteditable="true"] {outline: 0;}
            .ProseMirror h1.empty-node:only-child::before,
            .ProseMirror h2.empty-node:only-child::before,
            .ProseMirror h3.empty-node:only-child::before,
            .ProseMirror h4.empty-node:only-child::before {
                content: 'Heading';
            }
            .ProseMirror p.empty-node:only-child::before, .ProseMirror:empty::before {
                content: 'Start typing...';
            }
            .mceImageBorder {display: inline-block;}
            .mceImageBorder img {border: 0 !important;}
body, #bodyTable { background-color: rgb(244, 244, 244); }.mceText, .mcnTextContent, .mceLabel { font-family: "Nanum Gothic Coding", monospace; }.mceText, .mcnTextContent, .mceLabel { color: rgb(0, 52, 7); }.mceText h1 { margin-bottom: 0px; }.mceText h2 { margin-bottom: 0px; }.mceText p { margin-bottom: 0px; }.mceText label { margin-bottom: 0px; }.mceText input { margin-bottom: 0px; }.mceSpacing-24 .mceInput + .mceErrorMessage { margin-top: -12px; }.mceText h1 { margin-bottom: 0px; }.mceText h2 { margin-bottom: 0px; }.mceText p { margin-bottom: 0px; }.mceText label { margin-bottom: 0px; }.mceText input { margin-bottom: 0px; }.mceSpacing-12 .mceInput + .mceErrorMessage { margin-top: -6px; }.mceInput { background-color: transparent; border: 2px solid rgb(208, 208, 208); width: 60%; color: rgb(77, 77, 77); display: block; }.mceInput[type="radio"], .mceInput[type="checkbox"] { float: left; margin-right: 12px; display: inline; width: auto !important; }.mceLabel > .mceInput { margin-bottom: 0px; margin-top: 2px; }.mceLabel { display: block; }.mceText p, .mcnTextContent p { color: rgb(0, 52, 7); font-family: "Nanum Gothic Coding", monospace; font-size: 17px; font-weight: bold; line-height: 150%; text-align: left; direction: ltr; }.mceText h1, .mcnTextContent h1 { color: rgb(255, 255, 255); font-family: "Nanum Gothic Coding", monospace; font-size: 26px; font-weight: bold; line-height: 150%; text-align: center; direction: ltr; }.mceText h2, .mcnTextContent h2 { color: rgb(65, 253, 91); font-family: "Nanum Gothic Coding", monospace; font-size: 18px; font-weight: bold; line-height: 150%; text-align: center; direction: ltr; }.mceText a, .mcnTextContent a { color: rgb(65, 253, 91); font-style: normal; font-weight: bold; text-decoration: none; direction: ltr; }.mceSectionHeader .mceText h1, .mceSectionHeader .mcnTextContent h1 { }.mceSectionBody .mceText h1, .mceSectionBody .mcnTextContent h1 { }.mceSectionBody .mceText h2, .mceSectionBody .mcnTextContent h2 { }.mceSectionBody .mceText p, .mceSectionBody .mcnTextContent p { }.mceSectionFooter .mceText p, .mceSectionFooter .mcnTextContent p { }.mceSectionFooter .mceText a, .mceSectionFooter .mcnTextContent a { font-style: normal; }
@media only screen and (max-width: 480px) {
            .mceText p { margin: 0px; font-size: 16px !important; line-height: 150% !important; }
          }
@media only screen and (max-width: 480px) {
            .mceText h1 { font-size: 31px !important; line-height: 150% !important; }
          }
@media only screen and (max-width: 480px) {
            .mceText h2 { font-size: 25px !important; line-height: 150% !important; }
          }
@media only screen and (max-width: 480px) {
            .mceBlockContainer { padding-left: 16px !important; padding-right: 16px !important; }
          }
@media only screen and (max-width: 480px) {
            .mceButtonContainer { width: fit-content !important; max-width: fit-content !important; }
          }
@media only screen and (max-width: 480px) {
            .mceButtonLink { padding: 18px 28px !important; font-size: 16px !important; }
          }
#dataBlockId-76 p, #dataBlockId-76 h1, #dataBlockId-76 h2, #dataBlockId-76 h3, #dataBlockId-76 h4, #dataBlockId-76 ul { text-align: center; }</style></head>
<body>
<!--*|IF:MC_PREVIEW_TEXT|*-->
<!--[if !gte mso 9]><!----><span class="mcnPreviewText" style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;">*|MC_PREVIEW_TEXT|*</span><!--<![endif]-->
<!--*|END:IF|*-->
<center>
<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="background-color: rgb(244, 244, 244);">
<tbody><tr>
<td class="bodyCell" align="center" valign="top">
<table id="root" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody data-block-id="3" class="mceWrapper"><tr><td style="background-color:#f4f4f4;background-position:center;background-repeat:no-repeat;background-size:cover" align="center" valign="top" class="mceSectionHeader"><!--[if (gte mso 9)|(IE)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="660" style="width:660px;"><tr><td><![endif]--><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px" role="presentation"><tbody><tr><td style="background-color:#ffffff" class="mceWrapperInner" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="2"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td style="padding-top:0;padding-bottom:0" class="mceColumn" data-block-id="-8" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td class="mceGutterContainer" id="gutterContainerId-66" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate" role="presentation"><tbody><tr><td style="background-color:#003407;padding-top:12px;padding-bottom:12px;padding-right:0;padding-left:0" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="66" id="section_21526ba99662700addec865f69cd4a5a" class="mceLayout"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td class="mceColumn" data-block-id="-12" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td align="center" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="-7"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td class="mceColumn" data-block-id="-15" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="71"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover;padding-top:0px;padding-bottom:0px" valign="top"><table border="0" cellpadding="0" cellspacing="24" width="100%" style="table-layout:fixed" role="presentation"><colgroup><col span="1" width="8.333333333333332%"/><col span="1" width="8.333333333333332%"/><col span="1" width="8.333333333333332%"/><col span="1" width="8.333333333333332%"/><col span="1" width="8.333333333333332%"/><col span="1" width="8.333333333333332%"/><col span="1" width="8.333333333333332%"/><col span="1" width="8.333333333333332%"/><col span="1" width="8.333333333333332%"/><col span="1" width="8.333333333333332%"/><col span="1" width="8.333333333333332%"/><col span="1" width="8.333333333333332%"/></colgroup><tbody><tr><td style="padding-top:0;padding-bottom:0" class="mceColumn" data-block-id="68" valign="top" colspan="3" width="25%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td style="background-color:#003407;padding-top:0;padding-bottom:0;padding-right:0;padding-left:24px" class="mceBlockContainer" align="right" valign="top"><span class="mceImageBorder" style="border:0;border-radius:0;vertical-align:top;margin:0"><img data-block-id="72" width="63.449999999999996" height="auto" style="width:63.449999999999996px;height:auto;max-width:63.449999999999996px !important;border-radius:0;display:block" alt="" src="https://mcusercontent.com/950aade7ef40ce13abf1178e1/images/7eba0ff7-e5d5-0245-e908-5db3e7959b39.png" role="presentation" class="imageDropZone mceLogo"/></span></td></tr></tbody></table></td><td style="padding-top:0;padding-bottom:0" class="mceColumn" data-block-id="70" valign="top" colspan="9" width="75%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0" valign="top"><table width="100%" style="border:0;background-color:#003407;border-radius:0;border-collapse:separate"><tbody><tr><td style="padding-left:24px;padding-right:24px;padding-top:12px;padding-bottom:12px" class="mceTextBlockContainer"><div data-block-id="73" class="mceText" id="dataBlockId-73" style="width:100%"><h1 class="last-child">Code Quest API Subscription!</h1></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr></tbody><tbody data-block-id="7" class="mceWrapper"><tr><td style="background-color:#f4f4f4" align="center" valign="top" class="mceSectionBody"><!--[if (gte mso 9)|(IE)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="660" style="width:660px;"><tr><td><![endif]--><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px" role="presentation"><tbody><tr><td style="background-color:#ffffff" class="mceWrapperInner" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="6"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td style="padding-top:0;padding-bottom:0" class="mceColumn" data-block-id="-9" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td valign="top"><div data-block-id="15" class="mceCode"><link href="https://fonts.googleapis.com/css?family=Oxygen" rel="stylesheet"/></div></td></tr><tr><td class="mceGutterContainer" id="gutterContainerId-42" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate" role="presentation"><tbody><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:0;padding-left:0" class="mceLayoutContainer" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="42" id="section_c6f153ab5d55032022de75514b1ab454" class="mceLayout"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td class="mceColumn" data-block-id="-11" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td align="center" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="-5"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td class="mceColumn" data-block-id="-14" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="47"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover;padding-top:0px;padding-bottom:0px" valign="top"><table border="0" cellpadding="0" cellspacing="24" width="100%" style="table-layout:fixed" role="presentation"><colgroup><col span="1" width="8.333333333333332%"/><col span="1" width="8.333333333333332%"/><col span="1" width="8.333333333333332%"/><col span="1" width="8.333333333333332%"/><col span="1" width="8.333333333333332%"/><col span="1" width="8.333333333333332%"/><col span="1" width="8.333333333333332%"/><col span="1" width="8.333333333333332%"/><col span="1" width="8.333333333333332%"/><col span="1" width="8.333333333333332%"/><col span="1" width="8.333333333333332%"/><col span="1" width="8.333333333333332%"/></colgroup><tbody><tr><td style="padding-top:0;padding-bottom:0" class="mceColumn" data-block-id="44" valign="top" colspan="9" width="75%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0" valign="top"><table width="100%" style="border:0;border-radius:0;border-collapse:separate"><tbody><tr><td style="padding-left:47px;padding-right:0;padding-top:12px;padding-bottom:12px" class="mceTextBlockContainer"><div data-block-id="48" class="mceText" id="dataBlockId-48" style="width:100%"><p>Welcome Space Quester.</p><p class="last-child">You have reached your weekly challenge to the next level.</p></div></td></tr></tbody></table></td></tr></tbody></table></td><td style="padding-top:0;padding-bottom:0" class="mceColumn" data-block-id="46" valign="top" colspan="3" width="25%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:43px;padding-left:0" class="mceBlockContainer" align="center" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:141px" role="presentation" data-block-id="49" class="mceButtonContainer"><tbody><tr><!--[if !mso]><!--></tr><tr class="mceStandardButton"><td style="background-color:#003407;border-radius:8px;text-align:center" class="mceButton" valign="top"><a href="" target="_blank" class="mceButtonLink" style="background-color:#003407;border-radius:8px;border:2px solid #41fd5b;color:#ffffff;display:block;font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size:16px;font-weight:normal;font-style:normal;padding:16px 28px;text-decoration:none;min-width:30px;text-align:center;direction:ltr;letter-spacing:0px" rel="noreferrer">Learn more</a></td></tr><tr><!--<![endif]--></tr><tr>
<!--[if mso]>
<td align="center">
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml"
xmlns:w="urn:schemas-microsoft-com:office:word"
href=""
style="v-text-anchor:middle; width:122px; height:72px;"
arcsize="7%"
strokecolor="#41fd5b"
strokeweight="2px"
fillcolor="#003407">
<v:stroke dashstyle="solid"/>
<w:anchorlock />
<center style="
color: #ffffff;
display: block;
font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
font-size: 16;
font-style: normal;
font-weight: normal;
letter-spacing: 0px;
text-decoration: none;
text-align: center;
direction: ltr;"
>
Learn more
</center>
</v:roundrect>
</td>
<![endif]-->
</tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="padding-top:45px;padding-bottom:45px;padding-right:45px;padding-left:45px" class="mceGutterContainer" id="gutterContainerId-5" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate" role="presentation"><tbody><tr><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0" valign="top"><table width="100%" style="border-width:2px;border-style:solid;border-color:#41fd5b;background-color:#003407;border-radius:4px;border-collapse:separate"><tbody><tr><td style="padding-left:24px;padding-right:24px;padding-top:12px;padding-bottom:12px" class="mceTextBlockContainer"><div data-block-id="5" class="mceText" id="dataBlockId-5" style="width:100%"><h1>The Question of the Week is:</h1><h2>${question}</h2><p class="last-child"><br/></p></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr></tbody><tbody data-block-id="13" class="mceWrapper"><tr><td style="background-color:#f4f4f4" align="center" valign="top" class="mceSectionFooter"><!--[if (gte mso 9)|(IE)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="660" style="width:660px;"><tr><td><![endif]--><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px" role="presentation"><tbody><tr><td style="background-color:#ffffff" class="mceWrapperInner" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="12"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td style="padding-top:0;padding-bottom:0" class="mceColumn" data-block-id="-10" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td style="padding-top:8px;padding-bottom:8px;padding-right:8px;padding-left:8px" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="74" id="section_84e332b645b190e23f44791e12de8453" class="mceFooterSection"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover" valign="top"><table border="0" cellpadding="0" cellspacing="12" width="100%" role="presentation"><tbody><tr><td style="padding-top:0;padding-bottom:0" class="mceColumn" data-block-id="-3" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td style="padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px" class="mceGutterContainer" id="gutterContainerId-76" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate" role="presentation"><tbody><tr><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0" align="center" valign="top"><table width="100%" style="border-width:4px;border-style:solid;border-color:#003407;border-radius:0;border-collapse:separate"><tbody><tr><td style="padding-left:16px;padding-right:16px;padding-top:12px;padding-bottom:11px" class="mceTextBlockContainer"><div data-block-id="76" class="mceText" id="dataBlockId-76" style="display:inline-block;width:100%"><p class="last-child"><a href="*|ARCHIVE|*">  <span style="font-size: 11px">View email in browser</span></a><span style="font-size: 11px">,</span> <a href="*|UPDATE_PROFILE|*"><span style="font-size: 11px">update your preferences</span></a> <span style="font-size: 11px"> or   </span><a href="*|UNSUB|*"><span style="font-size: 11px">unsubscribe</span></a><span style="font-size: 11px"> </span><span style="font-size: 8px">*|EMAIL|*</span></p></div></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td class="mceLayoutContainer" align="center" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="-2"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td class="mceColumn" data-block-id="-13" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td align="center" valign="top"><div><div data-block-id="77"><a href="http://eepurl.com/i2_iLA" target="_blank" rel="noopener noreferrer"><img style="max-width:100%" width="137" height="53" alt="Email Marketing Powered by Mailchimp" title="Mailchimp Email Marketing" src="https://cdn-images.mailchimp.com/monkey_rewards/intuit-mc-rewards-2.png"/></a></div></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr></tbody></table>
</td>
</tr>
</tbody></table>
</center>
<script type="text/javascript"  src="/LAIkjaDDjrtfxNrj4XME75RPUyk/9zVEtbfXLh4VSi/NVoDVEdKPA/XG1QSHgY/DgoB"></script></body></html>`