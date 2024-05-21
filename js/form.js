$(document).ready(function() {

    $("#register").click(function() {
        event.preventDefault();
        var fio_input_reg = $("#inputEmail").val();
        var test_fio = /^([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,}|[А-ЯA-Z][\x27а-яa-z]{1,}\-([А-ЯA-Z][\x27а-яa-z]{1,}|(оглы)|(кызы)))\040[А-ЯA-Z][\x27а-яa-z]{1,}(\040[А-ЯA-Z][\x27а-яa-z]{1,})?$/;
        var myRe3 = test_fio.test(fio_input_reg);
        console.log(myRe3);
        if (myRe3 == false) {
            $('#fio_div').remove();
            $('.fio_div').append('<p id="fio_div" class="ps-2 text-danger">Заполните поле ФИО через пробелы на русском языке</p>')
        }

        var password1_input_reg = $("#inputPassword").val();
        var test_password1 = /(?=.*[A-Z])/;
        var myRe8 = test_password1.test(password1_input_reg);
        console.log(myRe8);
        if (myRe8 == false) {
            $('#password_div').remove();
            $('.password_div').append('<p id="password_div" class="ps-2 text-danger">Используйте в пароле хотя бы одну заглавную букву</p>')
        }
       
    })
})