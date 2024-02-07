$(document).ready(function () {
  $("#selectric").on("change", function () {
    // código de simulação atual
  });

  $("button[type='submit']").on("click", function () {
    var valorSolicitado = parseFloat(
      $("#ValorSolicitado")
        .val()
        .replace("R$ ", "")
        .replace(".", "")
        .replace(",", ".")
    );
    var prazo = parseInt($("#selectric").val());
    var juros = 1.8;

    if (
      !isNaN(valorSolicitado) &&
      valorSolicitado >= 500 &&
      valorSolicitado <= 50000
    ) {
      var valorTotal = valorSolicitado * (1 + (juros / 100) * prazo);
      var valorParcela = valorTotal / prazo;
      $("#ValorParcela").val("R$ " + valorParcela.toFixed(2).replace(".", ","));
    } else {
      $("#ValorParcela").val("0,00");
    }
  });
});

function formatarValor(input) {
  // Remove tudo que não é dígito
  var valor = input.value.replace(/\D/g, "");

  // Adiciona a vírgula como separador de decimal
  valor = valor.replace(/(\d{2})$/, ",$1");

  // Adiciona o ponto como separador de milhar
  valor = valor.replace(/(\d+)(\d{3},\d{2})$/, "$1.$2");

  // Atualiza o valor no campo
  input.value = valor;
}

window.onscroll = function () {
  var button = document.getElementById("whatsapp-button");

  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    button.style.opacity = "1";
  } else {
    button.style.opacity = "0";
  }
};
