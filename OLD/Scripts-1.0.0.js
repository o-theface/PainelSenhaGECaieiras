$(document).ready(function () {

    const tempoInicial = 600; // -- 600 segundos, 10 minutos --

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

            tempo = tempoInicial;

            playSound('AudioSenha');


            setTimeout(EscondeSenhaTelaCheia, 3300);


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

        if (tempo <= 0) {
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
    let images = [
        "./material/img01.jpg",
        "./material/img02.jpg",
        "./material/img03.jpg",
        "./material/img04.jpg",
        "./material/img05.jpg",
    ];
    var i = 0;
    window.setInterval(function () {
        $("#Anuncios img").attr("src", images[i]);
        i = (i == images.length - 1) ? 0 : i + 1;
    }, 15000);
});