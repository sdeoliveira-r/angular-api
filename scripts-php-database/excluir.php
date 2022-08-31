<?php

//Incluir a conexão
include("conexao.php");

//Obter dados
$obterDados = file_get_contents("php://input");

//Extrair os dados do JSON
$extrair = json_decode($obterDados);

//Separar os dados do JSON
$idCurso = $extrair->cursos->idCurso;

$idCurso = ($_GET['idCurso'] !== null && (int)$_GET['idCurso'] > 0)? mysqli_real_escape_string($conexao, (int)$_GET['idCurso']) : false;

if(!$idCurso)
{
  return http_response_code(400);
}

$sql = "DELETE FROM cursos WHERE idCurso=$idCurso LIMIT 1";

if(mysqli_query($conexao, $sql))
{
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }
  
?>

