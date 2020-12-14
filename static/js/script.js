$(document).ready(function(){
    let clipboard = new ClipboardJS('.copy-btn');
    $('.short-link-box').hide();
    $('.qrcode-box').hide();
    $('.shorten-btn').click(function() {
        $.ajax({
            type: 'POST',
            url: '/yayoi/',
            data: {
                url: $('.source-url').val()
            },
            success: function (data) {
                let loc = "http://localhost:4000/";
                data.href =  loc;
                data.path = 'static/qrcode/';
                data.extension = {
                    png: '.png', 
                    svg: '.svg'
                };
                $.shortenURL = data;
                $('.short-url').text(loc + 'yayoi/redirect/' + data.uuid);
                $('.qrcode').attr('src', $.shortenURL.href + $.shortenURL.path + data.uuid + $.shortenURL.extension.png);
                $('.png-download').attr('href', $.shortenURL.href + 'yayoi/download/' + $.shortenURL.uuid + '/' + $.shortenURL.extension.png.substring(1));
                $('.svg-download').attr('href', $.shortenURL.href + 'yayoi/download/' + $.shortenURL.uuid + '/' + $.shortenURL.extension.svg.substring(1));
                $('.copy-btn').attr('data-clipboard-text', $.shortenURL.href + 'yayoi/redirect/' + data.uuid);
                $('.short-link-box').show();
                $('.qrcode-box').show();
            },
            dataType: 'json'
        });
    });

    $('.copy-btn').click(function() {
        let tooltip = tippy('.copy-btn', {
            content: "Copied!",
            placement: 'bottom',
          })[0];
        tooltip.show();
        setTimeout(function() {
            $('.copy-btn').removeAttr('data-tooltip');
          tooltip.hide();
        }, 1200);
    });
    
});