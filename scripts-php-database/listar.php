<?php

//Incluir conexão
include("conexao.php");

//Vetor
$cursos = [];

//Sql
$sql = "SELECT * FROM cursos";

//Executar
if($executar = mysqli_query($conexao, $sql))
{
    //Índice
    $indice = 0;

    //Laço
    while($linha = mysqli_fetch_assoc($executar)) 
    {
        $cursos[$indice]['idCurso']    = $linha['idCurso'];
        $cursos[$indice]['nomeCurso']  = $linha['nomeCurso'];
        $cursos[$indice]['valorCurso'] = $linha['valorCurso'];
        $indice++;
    }
    //JSON
    echo json_encode(['cursos'=>$cursos]);
}
else
{
    http_response_code(404);
}

//Testes
//var_dump($cursos);

?>
