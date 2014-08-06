$("#frm").validate({
    errorLabelContainer: $("div.growlUI"),
    errorClass: "ipt-error",
    submitHandler: function(){
        $("#frm").ajaxSubmit({
            dataType: "json",
            beforeSubmit:function(){
                $(".videoinfo-cont").fadeOut();
                $.blockUI({
                    message: "Please wait...",
                    fadeIn: 900,
                    fadeOut: 700,
                    showOverlay: true,
                    css: {
                        border: 'none',
                        backgroundColor: '#52C5B1',
                        opacity: 1.0,
                        color: '#fff',
                        'z-index': 9999999999,
                        'box-shadow': '0 0 10px #444444',
                        'border-radius': '10px'
                    }
                });
            },
            success: function(data, status){
                if(data.sucesso){
//                    console.log(data.video.streams);
                    $(".videoinfo .video-img")
                        .attr("src", "")
                        .attr('src', data.video.thumbnail);

                    $(".videoinfo .video-url")
                        .attr("href", "")
                        .attr('href', data.video.url);

                    $(".videoinfo .video-title")
                        .empty()
                        .html(data.video.title);

                    $(".videoinfo .clearfix")
                        .empty()
                        .append("<p>Author: " + data.video.author + "</p>")
                        .append("<p> Duration: " + data.video.duration + "</p>");

                    for(i=0; i < data.video.streams.length; i++){
                        $(".videoinfo .clearfix").append('<a target="_blank" href="' + data.video.streams[i][3] + '" download="' + data.video.streams[i][3] + '">' + data.video.streams[i][0] + '(' + data.video.streams[i][1] +')</a> | ');
                    }

                    $(".videoinfo-cont").fadeIn();

                    console.log(data.video.thumbnail);
                    $.unblockUI();
                } else {
                    $.blockUI({
                        message: data.error,
                        fadeIn: 500,
                        fadeOut: 700,
                        timeout: 4000,
                        showOverlay: false,
                        css: {
                            border: 'none',
                            backgroundColor: '#52C5B1',
                            opacity: 1.0,
                            color: '#fff',
                            'z-index': 9999999999,
                            'box-shadow': '0 0 10px #444444',
                            'border-radius': '10px'
                        }
                    });


                }

            }

        });

    },

    invalidHandler: function(form, validator) {
        $('#frm input[name=videoUrl]')
            .popover({trigger: "manual", placement:"top", content:"Enter a valid link youtube video"})
            .popover('show');
        setTimeout(function(){
            $('#frm input[name=videoUrl]').popover('hide');
        }, 3000)
    },

    rules: {
        videoUrl: {
            required: true
        }
    }
});
