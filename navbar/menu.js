	var meny = Meny.create({
	menuElement: document.querySelector( ".meny" ),
	contentsElement: document.querySelector( ".contents" ),
// [optional] alignement du menu (top/right/bottom/left)
	position: Meny.getQuery().p || "left",
// [optional] hauteur du menu (pour la position top ou bottom)
	height: 200,
// [optional] largeur du menu (pour la position left ou right)
	width: 260,
// [optional] distance de déclenchement du menu par rapport au menu
	threshold: 40,
// [optional] utilisation des mouvement de la souris pour l"ouverture ou la fermeture
	mouse: true,
// [optional] utilisation de l"approche
	touch: true
	});
	if( Meny.getQuery().u && Meny.getQuery().u.match( /^http/gi ) ) {
		var contents = document.querySelector( ".contents" );
		contents.style.padding = "0px";
		contents.innerHTML = '<div class="cover"></div><iframe src="'+ Meny.getQuery().u + '" style="width: 100%; height: 100%; border: 0; position: absolute;"></iframe>';
	}
