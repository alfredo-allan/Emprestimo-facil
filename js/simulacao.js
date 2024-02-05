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
