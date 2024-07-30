import toastr from 'toastr';
toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-bottom-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "6000",
    timeOut: "8000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
}

function addNotificationMessage(message, title = null) {
    toastr.info(message, title);
}
function addWarningMessage(message, title = null) {
    toastr.warning(message, title);
}
function addSuccessMessage(message, title = null) {
    toastr.success(message, title);
}
function addErrorMessage(message, title = null) {
    toastr.error(message, title);
}
function clearMessage() {
    toastr.clear();
}

export {
    addErrorMessage,
    addNotificationMessage,
    addSuccessMessage,
    addWarningMessage,
    clearMessage
}
