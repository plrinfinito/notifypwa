document.getElementById('notification-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const commission = document.getElementById('commission').value;
    const options = {
        body: `Venda Realizada! Sua comissão: R$${commission}`,
        icon: 'icon.png'
    };

    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification('Notificação de Venda', options);
            } else {
                alert('Permissão para notificações negada.');
            }
        });
    } else {
        alert('Seu navegador não suporta notificações.');
    }
});