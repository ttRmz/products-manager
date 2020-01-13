<?php
class DaoUser {
	const TABLE_NAME = "user";
	static $pdo;
	 public static function connect() {		
		 if (!isset($pdo) ){
			$hote = 'localhost';
			$nom_bdd = 'express';
			$utilisateur = 'root';
			$mot_de_passe ='';
			self::$pdo = new PDO('mysql:host='.$hote.';dbname='.$nom_bdd, $utilisateur, $mot_de_passe, 
								array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'UTF8'"));
			self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		 }
		 return self::$pdo;
	 }
	 public static function login($login, $pwd){
		if ($pdo = self::connect()) {
			$sql = "SELECT * FROM ".self::TABLE_NAME."  WHERE login = '$login' and password ='$pwd'";
			echo $sql;		// x' or '1
			$requete = $pdo->prepare($sql);
			$requete->execute();
			$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
			return $resultats;
		}
		return null;	 
	 }
	 public static function find($idUser) {		
		if ($pdo = self::connect()) {
			$requete = $pdo->prepare("SELECT * FROM ".self::TABLE_NAME ." WHERE `id_user` = :id");
			$requete->bindParam(':id', $idUser);	
			$requete->execute();
			$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
			return $resultats;
		}
		return null;	 
	}
	
	
	 public static function findAll() {		
		if ($pdo = self::connect()) {
			$requete = $pdo->prepare("SELECT * FROM ".self::TABLE_NAME );
			$requete->execute();
			$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
			return $resultats;
		}
		return null;
	 }


	 public static function add($user) {		
		if ($pdo = self::connect()) {
			$sql = "INSERT INTO ". self::TABLE_NAME  
					."(nom, prenom, login, password, email, profil)" 
					."VALUES (:nom, :prenom, :login, :password, :email, :profil)";
			$stmt= $pdo->prepare($sql);
			$stmt->execute($user);
			$idUser=$pdo->lastInsertId();
			return self::find($idUser);
		}
		return null;	 
	}
	 public static function update($user) {			
		$params = array();
		$clauseWhere = "";
		foreach ($user as $attr => $val ){
			if ($attr == "id_user") $clauseWhere = "id_user = $val";						
			else {
				$valeur = (is_numeric($val))?$val:"'$val'";
				$params[] = "$attr = $valeur";
			}
		}	
		$clauseUpdate = implode(", ", $params);
		if (($pdo = self::connect()) && !empty($clauseUpdate) && !empty($clauseWhere)) {
			$sql = "UPDATE ". self::TABLE_NAME  
					." SET $clauseUpdate WHERE $clauseWhere" ;
 			$x =$pdo->exec($sql);
			return self::find($user["id_user"]);
		}
		return null;	 
	}
	
	public static function delete($idUser) {		
		if (($pdo = self::connect()) && !empty($idUser)) {
			$sql = "DELETE FROM ".self::TABLE_NAME ." WHERE `id_user` = $idUser";
			return $pdo->exec($sql);  // returns 0 or 1
		}
		return false;
	}
}

function testDaoInsert(){
  $newUser =	array("nom"=>"Peltier","prenom"=>"Augustin","login"=>"newLogin2","password"=>"unPawd","email"=>"pa3@free.fr","profil"=>1);
  try{
	  $insertedUser = DaoUser::add($newUser);
	  var_dump($insertedUser);
	} catch (Exception $e) {
			echo "Echec ". $e->getMessage();
	}			  
}
function testDaoUpdate(){
  $aUser = array("id_user"=> 13,"nom"=>"Peltier","prenom"=>"Augustin","login"=>"newLogin2","password"=>"unPawd","email"=>"pa2@free.fr","profil"=>1);
  try{
	  $updatedUser = DaoUser::update($aUser);
	  var_dump($updatedUser);
	} catch (Exception $e) {
			echo "Echec ". $e->getMessage();
	}			  
}

function testDaoDelete(){
  $idUser = 13;
  try{
	  DaoUser::delete($idUser);
	} catch (Exception $e) {
			echo "Echec ". $e->getMessage();
	}			  
}
