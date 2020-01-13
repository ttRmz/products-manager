<?php
class DaoProduct {
	const TABLE_NAME = "produit";
	static $pdo;
	 public static function connect() {		
		 if (!isset($pdo) ){
			$hote = 'localhost';
			$nom_bdd = 'formation';
			$utilisateur = 'root';
			$mot_de_passe ='root';
			self::$pdo = new PDO('mysql:host='.$hote.';dbname='.$nom_bdd, $utilisateur, $mot_de_passe, 
								array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'UTF8'"));
			self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		 }
		 return self::$pdo;
	 }

	 public static function findProduct($idProduct) {		
		if ($pdo = self::connect()) {
			$requete = $pdo->prepare("SELECT * FROM ".self::TABLE_NAME ." WHERE `id_produit` = :id");
			$requete->bindParam(':id', $idProduct);	
			$requete->execute();
			$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
			return $resultats;
		}
		return null;	 
	}
	
	
	 public static function findAllProduct() {		
		if ($pdo = self::connect()) {
			$requete = $pdo->prepare("SELECT * FROM ".self::TABLE_NAME );
			$requete->execute();
			$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
			return $resultats;
		}
		return null;
	 }


	 public static function addProduct($produit) {		
		if ($pdo = self::connect()) {
			try{
				$sql = "INSERT INTO ". self::TABLE_NAME  
					."(libelle, prix_unitaire, reference, id_fournisseur)" 
					."VALUES (:libelle, :prix_unitaire, :reference,:id_fournisseur)";
			$stmt= $pdo->prepare($sql);
			$stmt->execute($produit);
			$idProduct=$pdo->lastInsertId();
			return self::findProduct($idProduct);
			}
			catch(exception $e){
				echo $e->getMessage();
			}
		}
		return null;	 
	}
	 public static function updateProduct($produit) {			
		$params = array();
		$clauseWhere = "";
		foreach ($produit as $attr => $val ){
			if ($attr == "id_produit") $clauseWhere = "id_produit = $val";						
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
			return self::findProduct($produit["id_produit"]);
		}
		return null;	 
	}
	
	public static function deleteProduct($idProduct) {		
		if (($pdo = self::connect()) && !empty($idProduct)) {
			$sql = "DELETE FROM ".self::TABLE_NAME ." WHERE `id_produit` = $idProduct";
			return $pdo->exec($sql);  
		}
		return false;
	}
}
