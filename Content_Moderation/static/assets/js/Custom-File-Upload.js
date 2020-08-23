var fileInput = document.getElementById('user_group_logo');

fileInput.onchange = function(e){
    var fullPath = fileInput.value;
    if (fullPath) {
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
        $('#user_group_label').text(filename);
    }
};

