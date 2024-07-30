<template>
    <header id="jl-main-header" class="jl-main-header">
        <button type="button" class="navbar-toggle mobile-navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <i class="jli jl-menu"></i>
        </button>
        <div id="header-banners" class="header-banners"></div>
        <div class="flex ai-center jc-center">
            <div class="jl-subscription hidden-xs mr18"></div>
            <button class="dropdown-toggle refer-btn jl-button-green mr18">
                <span class="jl-logo">
                    <img src="https://cdn.joblogic.com/bundles/images/logo/JoblogicSmallLogo-dark.svg">
                </span>
                <span><span class="jl-localization jl-localted">Refer &amp; Earn</span></span>
                <i class="jli jl-chevron-double-right"></i>
            </button>
            <div id="xero-integration">
                <button data-toggle="tooltip" data-placement="bottom" data-original-title="Required Credential" class="xero-integration mr18 RequiredCredential"><i class="jli jl-cloud jli-36px"></i>
                    <i class="jli jl-help jli-18px"></i>
                </button>
            </div>

            <div id="bellNotificationVM" class="mr18 notification-wrapper">
                <button class="notification-bell">
                    <i class="jli jl-bell jli-36px"></i>
                    <span class="notification-count">4</span>
                    <span class="notification-bar hidden"></span>
                </button>
                <div class="notification-panel">
                    <div class="notification-content">
                        <div class="notification-footer text-center">
                            <span class="jl-localization jl-localted">You have no new notifications.</span>
                        </div>
                    </div>
                </div>
                <div class="notification-panel-single">
                    <div class="notification-single-content">
                        <div class="notification-single-body">

                        </div>
                    </div>
                </div>
            </div>

            <div class="action-menu-expand btn-menu-wrapper mr18 help-menu">
                <button class="dropdown-toggle jl-button-blue" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    <i class="jli jl-help"></i>
                    <span><span class="jl-localization jl-localted">Help</span></span>
                </button>
                <ul class="dropdown-menu dropdown-menu-right">
                    <li><a href="https://www.joblogic.com/knowledge-base/joblogic-web" target="_blank" rel="noopener noreferrer"><span class="jl-localization jl-localted">Knowledge Base</span></a></li>
                    <li><a href="https://www.joblogic.com/videos/" target="_blank" rel="noopener noreferrer"><span class="jl-localization jl-localted">Videos</span></a></li>
                    <hr class="mv6">
                    <li><a href="https://www.joblogic.com/latest-releases/" target="_blank" rel="noopener noreferrer"><span class="jl-localization jl-localted">New Releases</span></a></li>
                    <hr class="mv6">
                    <li><span class="jl-localization jl-localted"><a href="https://www.joblogic.com/contact-us/" target="_blank" rel="noopener noreferrer">Contact Us</a></span></li>
                    <br>
                    <li><a class="liveChatMenu openIntercom"><img id="lo_green_blinker" width="16" height="16" style="width: 16px; height: 16px; border: none; padding: 0px; margin: 0px 0px 0px 3px; opacity: 1;" src="https://d10lpsik1i8c69.cloudfront.net/graphics/blink_green.png" align="right" alt=""><span class="jl-localization jl-localted">Live Chat</span></a></li>
                    <li><a href="https://www.surveymonkey.co.uk/r/D7CWTQV" target="_blank" rel="noopener noreferrer"><span><span class="jl-localization jl-localted">Feedback</span></span></a></li>
                </ul>
            </div>
            <div class="jl-profile-thumb-wrap btn-menu-wrapper">
                <div class="dropdown">
                    <a href="#" data-toggle="dropdown" aria-expanded="true" id="accountMenu" class="dropdown-toggle profile-thumb">
                        <span>Profile</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-right">
                        <li>
                            <div class="flex jc-start ai-center jl-profile-thumb-wrap no-wrap mb12">
                                <span class="profile-thumb popup-thumb">
                                   <span>Profile</span>
                                </span>
                                <span id="jsUserName" class="not-detect-translate fw600 color-gray-title jl-profile-username">A Nhan To </span>
                            </div>
                        </li>
                        <li>
                            <a href="https://devgo.joblogic.com/Staff/Detail/2" id="profileMenu">
                                <span class="jl-localization jl-localted">Profile</span>
                            </a>
                        </li>
                        <hr class="mv6">
                        <li>
                            <a href="https://devgo.joblogic.com/Account/LogOff" id="logOffMenu">
                                <span class="jl-localization jl-localted">Log Off</span>
                            </a>
                        </li>
                    </ul>
                </div>
        </div>
    </header>
</template>
<script>
export default {
    name: 'Header'
}
</script>