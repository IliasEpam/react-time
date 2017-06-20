export var basicURI = location.origin;
export function getTemplate(fileName) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: 'templates/' + fileName + '.html',
            dataType: 'html',
            success: function(data) {
                resolve(data);
            },
            error: function(request, status, error) {
                console.log('ERROR template ' + fileName + '.html ' + request.status + ' ' + error);
            }
        })
    });
};
export function corsApiVkRequest() {
    return new Promise(function(resolve, reject) {
        var token = localStorage.getItem('cat-shop-token');
        var url = 'https://api.vk.com/method/users.get?PARAMETERS&access_token=' + token;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            crossDomain: true,
            success: function(data) {
                resolve(data);
            }
        })
    });
};

export function manipulateClasses(selector, actionClass, action) {
    var selectedElements = document.querySelectorAll(selector);
    if (action === 'add') {
        for (var i = 0; i < selectedElements.length; i++) {
            selectedElements[i].classList.add(actionClass);
        }
    } else if (action === 'remove') {
        for (var i = 0; i < selectedElements.length; i++) {
            selectedElements[i].classList.remove(actionClass);
        }
    } else if (action === 'toggle') {
        for (var i = 0; i < selectedElements.length; i++) {
            selectedElements[i].classList.toggle(actionClass);
        }
    }
};

export function scrollTo(destination) {
    $("html, body").animate({ scrollTop: destination }, "slow");
}

export function delegateEvent(element, e, selector, handler) {
    element.addEventListener(e, function(event) {
        var targetElement = event.target;
        while (targetElement && targetElement !== this) {
            if (targetElement.matches(selector)) {
                handler.call(targetElement, event);
            }
            targetElement = targetElement.parentNode;
        }
    });
}