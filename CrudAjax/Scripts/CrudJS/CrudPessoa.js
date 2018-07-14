//Load Data in Table when documents is ready  
$(document).ready(function () {
    loadData();
});

//Função para Carregar a Table 
function loadData() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.PessoaID + '</td>';
                html += '<td>' + item.Nome + '</td>';
                html += '<td>' + item.Idade + '</td>';
                html += '<td>' + item.Estado + '</td>';
                html += '<td>' + item.Pais + '</td>';
                html += '<td><a class="btn btn-warning btn-xs" href="#" onclick="return getbyID(' + item.PessoaID + ')">Edit</a>  <a class="btn btn-danger btn-xs" href="#" onclick="Delele(' + item.PessoaID + ')">Delete</a></td>';
                html += '</tr>';

              

            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Função para adicionar uma pessoa
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var pessObj = {
        PessoaID: $('#PessoaId').val(),
        Nome: $('#Nome').val(),
        Idade: $('#Idade').val(),
        Estado: $('#Estado').val(),
        Pais: $('#Pais').val()
    };
    $.ajax({
        url: "/Home/Add",
        data: JSON.stringify(pessObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Função para pegar uma pessoa pelo ID
function getbyID(PessoaID) {
    $('#Nome').css('border-color', 'lightgrey');
    $('#Idade').css('border-color', 'lightgrey');
    $('#Estado').css('border-color', 'lightgrey');
    $('#Pais').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Home/getbyID/" + PessoaID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#PessoaId').val(result.PessoaID);
            $('#Nome').val(result.Nome);
            $('#Idade').val(result.Idade);
            $('#Estado').val(result.Estado);
            $('#Pais').val(result.Pais);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//função para Alterar uma pessoa
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var pessObj = {
        PessoaID: $('#PessoaId').val(),
        Nome: $('#Nome').val(),
        Idade: $('#Idade').val(),
        Estado: $('#Estado').val(),
        Pais: $('#Pais').val(),
    };
    $.ajax({
        url: "/Home/Update",
        data: JSON.stringify(pessObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#PessoaId').val("");
            $('#Nome').val("");
            $('#Idade').val("");
            $('#Estado').val("");
            $('#Pais').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//função para deletar uma Pessoa
function Delele(ID) {
    var ans = confirm("Atenção! Deseja Deleta essa Pessoa?");
    if (ans) {
        $.ajax({
            url: "/Home/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//Função para limpar campos
function clearTextBox() {
    $('#PessoaId').val("");
    $('#Nome').val("");
    $('#Idade').val("");
    $('#Estado').val("");
    $('#Pais').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Nome').css('border-color', 'lightgrey');
    $('#Idade').css('border-color', 'lightgrey');
    $('#Estado').css('border-color', 'lightgrey');
    $('#Pais').css('border-color', 'lightgrey');
}

//Validando campos do formulario com Jquery
function validate() {
    var isValid = true;
    if ($('#Nome').val().trim() == "") {
        $('#Nome').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Nome').css('border-color', 'lightgrey');
    }
    if ($('#Idade').val().trim() == "") {
        $('#Idade').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Idade').css('border-color', 'lightgrey');
    }
    if ($('#Estado').val().trim() == "") {
        $('#Estado').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Estado').css('border-color', 'lightgrey');
    }
    if ($('#Pais').val().trim() == "") {
        $('#Pais').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Pais').css('border-color', 'lightgrey');
    }
    return isValid;
} 