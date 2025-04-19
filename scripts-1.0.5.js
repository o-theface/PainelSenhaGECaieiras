// -- Arquivo Vers�o: 1.0.5 --

$(document).ready(function () {

    const tempoInicial = 600; // -- 600 segundos, 10 minutos --
    const heightPadrao = 1920; // -- Tamanho vertical da tela --
    const widthPadrao = 1080; // -- Tamanho horizontal da tela --
    const heightLogo = 200; // -- Altura da logo --
    const widthLogo = 400; // -- Largura da logo --
    var calledOrderTimeout = 4000; // -- Tempo que a senha chamada fica na tela --

    //console.log(x);
    //console.log(y);
    var tempo = tempoInicial;
    var senha = "";

    $(window).on('load', function () {
        // Show #AreaUtil when the window is fully loaded
        $("#AreaUtil").show();
        $("#Config").show();
        $("#SenhaTelaCheia").hide();
        $("#Anuncios").hide();
    });

    $(document).on('keydown', function(event) {
        if (event.keyCode === 27) { // 27 is the keyCode for Esc
            EscondeSenhaTelaCheia();
            HideConfig();
            EscondeAnuncios();
        }
    });

    $(document).on('keypress', function (e) {
        //alert(e.keyCode);

        // -- Show config --
        if ((e.keyCode == 67) || (e.keyCode == 99))  { // -- C ou c--
            ShowConfig();
        }        

        // -- Enquanto est� exibindo a senha na tela, n�o aceita entrada de outros caracteres --
        if ($("#DigitaSenha").val() !== "---") {

            if (e.keyCode != 13) {
                if (senha.length < 3)
                    senha = senha + e.key;
            }

            // -- '=', '/', '*', '-', '+', '.' --        
            if (e.keyCode == 61 || e.keyCode == 47 || e.keyCode == 42 || e.keyCode == 45 || e.keyCode == 43 || e.keyCode == 46) {
                $("#DigitaSenha").text("");
                senha = "";
                $("#DigitaSenha").select();
            }

            $("#DigitaSenha").val(senha);

            var valor = $("#DigitaSenha").val();
            valor = senha;

            if (e.keyCode == 13 && valor != "") {

                // -- Roda os valores das senhas anteriores, caso n�o exista a senha chamada --
                $("#SenhaAnterior4").text($("#SenhaAnterior3").text());
                $("#SenhaAnterior3").text($("#SenhaAnterior2").text());
                $("#SenhaAnterior2").text($("#SenhaAnterior1").text());
                $("#SenhaAnterior1").text($("#SenhaAtual").text());

                $("#SenhaDigitada").text(valor);

                $("#SenhaAtual").text(valor);

                $("#DigitaSenha").val("---");
                //alert($("#DigitaSenha").val());

                // -- Vrifica a quantidade de caracteres da senha para acertar o tamanho de exibi��o --
                /*if (valor.length <= 3)
                    $("span").css("font-size", "27em");
                else if (valor.length >= 4)
                    $("span").css("font-size", "20em");*/

                // -- M�ximo de 3 valores no visor --
                //$("span").css("font-size", "30em");


                EscondeAnuncios();
                ExibeSenhaTelaCheia();

                tempo = tempoInicial; // -- Reseta o tempo de apari��o do descanso de tela --




                // -- Toca o audio inicial de chamada --
                playSound('AudioSenha');

                // -- Prepara o som do n�mero chamado e toca-o --
                //var senhaNum = parseInt(senha);
                //$("#AudioSenhaNumero").attr("src", "media/SenhasNumeros/Senha (" + senhaNum + ").wav");
                //$("#AudioSenhaNumero").attr("src", "media/notify.wav");
                //setTimeout(function () { playSound('AudioSenhaNumero') }, 100);

                if (calledOrderTimeout > 0) {
                    setTimeout(EscondeSenhaTelaCheia, calledOrderTimeout);
                };

                $("#DigitaSenha").text("");
                senha = "";
                $("#DigitaSenha").select();
            }
        }
    });

    // -- Saveconfig onClick --
    $("#ConfigSave").on('click', function () {
        SaveConfig();
        LoadConfig();
        HideConfig();
    });

    function ExibeSenhaTelaCheia() {
        $("#AreaUtil").hide();
        $("#Config").hide();
        $("#SenhaTelaCheia").show();
    }


    function EscondeSenhaTelaCheia() {
        $("#SenhaTelaCheia").hide();
        $("#AreaUtil").show();
        $("#DigitaSenha").select();

        // -- Ao "esconder" a tela da senha chamada, libera digita��o de caracteres --
        $("#DigitaSenha").val("");
        senha = "";
        $("#DigitaSenha").select();
    };

    function playSound(sampleName) {
        var sample = document.getElementById(sampleName);
        sample.play();
    }

    function ShowConfig() {        
        $("#AreaUtil").hide();
        $("#SenhaTelaCheia").hide();
        $("#Config").show();
    }

    function HideConfig() {
        $("#Config").hide();
        $("#SenhaTelaCheia").hide();
        $("#AreaUtil").show();
        $("#DigitaSenha").select();

        // -- Ao "esconder" a tela da senha chamada, libera digita��o de caracteres --
        $("#DigitaSenha").val("");
        senha = "";
        $("#DigitaSenha").select();
    };


    // -- Temporizador para aparecer os an�ncios --
    setInterval(function () {
        tempo--;
        //console.log("Diminuiu tempo: " + tempo);

        if (tempo == 0) {
            ExibeAnuncios();
        }

        if (tempo == -10) {
            tempo = -1;
        }


    }, 1000);

    function ExibeAnuncios() {
        $("#AreaUtil").hide();
        $("#Anuncios").show();
    }

    function EscondeAnuncios() {
        $("#Anuncios").hide();
        $("#AreaUtil").show();
    }


    // -- Altera as imagens da tela de descanso --
    //let images = [
    //    "./material/img01.jpg",
    //    "./material/img02.jpg",
    //    "./material/img03.jpg",
    //    "./material/img04.jpg",
    //    "./material/img05.jpg",
    //];
    //var i = 0;
    //window.setInterval(function () {
    //    $("#Anuncios img").attr("src", images[i]);
    //    i = (i == images.length - 1) ? 0 : i + 1;
    //}, 15000);


    // -- Faz a Logo do Sesc Andar pela tela --
    var dir_h = 'right';
    var dir_v = 'down';

    // -- Gera numeros aleatorios para posi��o inicial da imagem de descanso de tela dentro da �rea da tela --
    //var x = Math.floor(Math.random() * (widthPadrao - widthLogo));
    //var y = Math.floor(Math.random() * (heightPadrao - heightLogo));
    //$("#logoDescanso").offset({ top: y, left: x });


    setInterval(function () {
        var step = 1;
        var posicao = $("#logoDescanso").offset();
        var x = posicao.left;
        var y = posicao.top;

        if (x >= widthPadrao)
            x = widthPadrao / 4;

        if (y >= heightPadrao)
            y = heightPadrao / 4;

        //console.log("x: " + x + " y: " + y);

        if (x > (widthPadrao - widthLogo)) {
            dir_h = 'left';
        }
        if (x <= 0) {
            dir_h = 'right';
        }

        if (dir_h == 'right') {
            x = x + step;
        }
        else {
            x = x - step;
        }

        if (y >= (heightPadrao - heightLogo)) {
            dir_v = 'up';
        }

        if (y <= 0) {
            dir_v = 'down';
        }

        if (dir_v == 'down') {
            y = y + step;
        }
        else {
            y = y - step;
        }

        $("#logoDescanso").offset({ top: y, left: x });
    }, 10); // -- Para alterar a velocidade da logo, altere esse valor --

    // -- Save Configuration --
    function SaveConfig() {
        // -- Salva as configura��es --
        var config = {
            main : {
                backgroundColor: $("#mainBackgroundColor").val(),
                actualOrderTimeout: $("#mainActualOrderTimeout").val(),                
            },
            actualOrder: {
                backgroundColor: $("#actualOrderBackgroundColor").val(),                
                textColor: $("#actualOrderTextColor").val(),
                fontSize: $("#actualOrderFontSize").val(),
            },
            lastOrders: {
                labelTextColor: $("#lastOrdersLabelTextColor").val(),
                labelFontSize: $("#lastOrdersLabelFontSize").val(),
                backgroundColor: $("#lastOrdersBackgroundColor").val(),
                textColor: $("#lastOrdersTextColor").val(),
                fontSize: $("#lastOrdersFontSize").val(),
            },
            fullScreenOrder: {                
                backgroundColor: $("#fullScreenOrderBackgroundColor").val(),
                textColor: $("#fullScreenOrderTextColor").val(),
                fontSize: $("#fullScreenOrderFontSize").val(),
            },
        };

        // -- Salva no localStorage --
        localStorage.setItem('config', JSON.stringify(config));
    }
    // -- Load Configuration --
    function LoadConfig() {
        // -- Carrega as configura��es --
        var config = JSON.parse(localStorage.getItem('config'));
        if (config) {
            // -- Carrega as configura��es --
            $("#mainBackgroundColor").val(config.main.backgroundColor);
            $("#mainActualOrderTimeout").val(config.main.actualOrderTimeout);

            $("#actualOrderBackgroundColor").val(config.actualOrder.backgroundColor);
            $("#actualOrderTextColor").val(config.actualOrder.textColor);
            $("#actualOrderFontSize").val(config.actualOrder.fontSize);

            $("#lastOrdersLabelTextColor").val(config.lastOrders.labelTextColor);
            $("#lastOrdersLabelFontSize").val(config.lastOrders.labelFontSize);            
            $("#lastOrdersBackgroundColor").val(config.lastOrders.backgroundColor);
            $("#lastOrdersTextColor").val(config.lastOrders.textColor);
            $("#lastOrdersFontSize").val(config.lastOrders.fontSize);

            $("#fullScreenOrderBackgroundColor").val(config.fullScreenOrder.backgroundColor);
            $("#fullScreenOrderTextColor").val(config.fullScreenOrder.textColor);
            $("#fullScreenOrderFontSize").val(config.fullScreenOrder.fontSize);

            // -- Aplica as configura��es --
            $("body").css("background-color", config.main.backgroundColor);
            calledOrderTimeout = config.main.actualOrderTimeout * 1000; // -- Converte para milissegundos --

            $("#actualOrderLabelContainer").css("background-color", config.actualOrder.backgroundColor);
            $("#actualOrderLabel").css("color", config.actualOrder.textColor);
            $("#actualOrderLabel").css("font-size", config.actualOrder.fontSize + "px");
            $("#actualOrderInfo").css("background-color", config.actualOrder.backgroundColor);
            $("#SenhaAtual").css("color", config.actualOrder.textColor);
            $("#SenhaAtual").css("font-size", config.actualOrder.fontSize + "px");

            $("#lastOrdersLabel").css("color", config.lastOrders.labelTextColor);
            $("#lastOrdersLabel").css("font-size", config.lastOrders.labelFontSize + "px");
            $(".lastOrdersBackground").css("background-color", config.lastOrders.backgroundColor);
            $(".lastOrdersText").css("color", config.lastOrders.textColor);
            $(".lastOrdersText").css("font-size", config.lastOrders.fontSize + "px");
            $("#SenhaTelaCheia").css("background-color", config.fullScreenOrder.backgroundColor);
            $("#SenhaDigitada").css("color", config.fullScreenOrder.textColor);
            $("#SenhaDigitada").css("font-size", config.fullScreenOrder.fontSize + "px");            
        }
    }
    // -- Load Configuration on page load --
    LoadConfig();
});
