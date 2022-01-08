angular.module('luckDrawApp').factory('notificationService', function () {
    "ngInject";
    type = ['primary', 'info', 'success', 'warning', 'danger'];
    
        return {
            showNotification: function (message, icon = null, color = Math.floor((Math.random() * 4) + 1), delay) {
                $.notify({
                    icon: icon,
                    message: message
    
                }, {
                    type: type[color],
                    delay: delay,
                    z_index: 2000,
                    placement: {
                        from: 'top',
                        align: 'right'
                    }
                });
            },
        }
    
    });