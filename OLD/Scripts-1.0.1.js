// -- Arquivo Versão: 1.0.1 --

$(document).ready(function () {

    const tempoInicial = 600; // -- 600 segundos, 10 minutos --
    const heightPadrao = 1920; // -- Tamanho vertical da tela --
    const widthPadrao = 1080; // -- Tamanho horizontal da tela --
    const heightLogo = 200; // -- Altura da logo --
    const widthLogo = 400; // -- Largura da logo --

    //console.log(x);
    //console.log(y);
    var tempo = tempoInicial;
    var senha = "";

    $(document).on('keypress', function (e) {
        //alert(e.keyCode);

        if (e.keyCode != 13) {
            if (senha.length < 4)
                senha = senha + e.key;
        }

        // -- '=', '/', '*', '-', '+', '.' --        
        if (e.keyCode == 61 || e.keyCode == 47 || e.keyCode == 42 || e.keyCode == 45 || e.keyCode == 43 || e.keyCode == 46) {
            senha = "";
        }

        $("#DigitaSenha").text(senha);

        var valor = $("#DigitaSenha").val();
        valor = senha;

        if (e.keyCode == 13 && valor != "") {

            // -- Roda os valores das senhas anteriores --
            $("#SenhaAnterior4").text($("#SenhaAnterior3").text());
            $("#SenhaAnterior3").text($("#SenhaAnterior2").text());
            $("#SenhaAnterior2").text($("#SenhaAnterior1").text());
            $("#SenhaAnterior1").text($("#SenhaAtual").text());

            $("#SenhaDigitada").text(valor);

            $("#SenhaAtual").text(valor);

            // -- Vrifica a quantidade de caracteres da senha para acertar o tamanho de exibição --
            if (valor.length <= 3)
                $("span").css("font-size", "27em");
            else if (valor.length >= 4)
                $("span").css("font-size", "20em");

            EscondeAnuncios();
            ExibeSenhaTelaCheia();

            tempo = tempoInicial; // -- Reseta o tempo de aparição do descanso de tela --

            playSound('AudioSenha');

            setTimeout(EscondeSenhaTelaCheia, 3500);

            $("#DigitaSenha").text("");
            senha = "";
            $("#DigitaSenha").select();
        }
    });

    function ExibeSenhaTelaCheia() {
        $("#AreaUtil").hide();
        $("#SenhaTelaCheia").show();
    }


    function EscondeSenhaTelaCheia() {
        $("#SenhaTelaCheia").hide();
        $("#AreaUtil").show();
        $("#DigitaSenha").select();
    };

    function playSound(sampleName) {
        var sample = document.getElementById(sampleName);
        sample.play();
    }

    // -- Temporizador para aparecer os anúncios --
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

    // -- Gera numeros aleatorios para posição inicial da imagem de descanso de tela dentro da área da tela --
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
});