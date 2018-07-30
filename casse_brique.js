



function startgame(){  //permet de lancer le jeu
	myGameArea.start();
}


//objets
var myGameArea = {  //objet qui permet de gérer l'environnement global du jeu
	canvas : document.createElement("canvas"),       //contient le canvas
	//
	start : function(){
		this.canvas.style = "border : solid black 1px; width : 75%;height : 50%; margin-top:5%; margin-left:12%;";  //on configure la taille, position et bordure du canvas
        this.context = this.canvas.getContext("2d");   //on crée une propriété contexte
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.barre = new barre();
		this.balle = new balle();
		this.update();   //on initialise l'écran
    },
	update : function(){   //met à jour le jeu
		this.context.fillStyle = "#FFFFFF";  //on effece le contenu
		this.context.fillRect(0,0,1000,1000);
		this.barre.draw(this.context);   //on replace la barre
		
		this.balle.draw(this.context);
	},
	
	detectCollBarreBord:function(){
		if (this.balle.PositionX-this.balle.rayon < 0){
			if (this.balle.direction < Math.PI){
				this.balle.direction = this.balle.direction -2*(this.balle.direction-Math.PI*0.5);
				}
			else {
			}
			return true;
		}
		if (this.balle.PositionX+this.balle.rayon > 300){
			this.balle.direction = this.balle.direction + Math.PI*0.5;
			return true;
		}
		if (this.balle.PositionY-this.balle.rayon < 0){
			this.balle.direction = this.balle.direction + Math.PI*0.5;
			return true;
		}
		if (this.balle.PositionY+this.balle.rayon > 150){
			this.balle.direction = this.balle.direction + Math.PI*0.5;
			return true;
		}
		return false;
		
	}
	
	
	
}	


function barre() {  //objet qui gère la barre
	this.taille = 80;      //longueur
	this.hauteur = 8;		// hauteur
	this.positionY = 125;    //position verticale
	this.positionX = 100;    //position horizontale
	this.color = "#FF0000";   // couleur
	this.vitesse = 2;   //vitesse de déplacement de la barre
	this.draw = function (ctx){  //dessine la barre
		ctx.fillStyle = this.color;   //on choisi la couleur
		ctx.fillRect(this.positionX,this.positionY,this.taille,this.hauteur);  //on dessine un rectangle
	};
	
	this.addLeft = function(){  //on déplace la barre à gauche
		if (this.positionX>0)  //on vérifie que l'on ne sort pas du cadre
			this.positionX -= this.vitesse; 
	};
	this.addRight = function(){  //on déplace la barre à droite
		if (this.positionX-this.taille<140)//on vérifie que l'on ne sort pas du cadre
			this.positionX += this.vitesse; 
	};
	

	}

function balle(){
	this.PositionX = 50;
	this.PositionY = 50;
	this.rayon = 5;
	this.color = "#00FF00";
	this.direction = -3;
	this.vitesse = 1;
	this.draw = function(ctx){
		ctx.fillStyle = this.color;   //on choisi la couleur
		ctx.beginPath();
		ctx.arc(this.PositionX,this.PositionY,this.rayon,0,Math.PI*2); 
		ctx.fill();
		ctx.closePath();
	};
	this.nextPos = function(){
		this.PositionX += this.vitesse*Math.cos(this.direction);
		this.PositionY += this.vitesse*Math.sin(this.direction);
	};
	
	
}	
	
	
	
	
	
//évènements
document.addEventListener('keydown', function(e) {   //s'éxécute après évènement clavier
			if (e.keyCode== 68)   //si on appuit sur d
				myGameArea.barre.addRight();  //...on avance à droite
			if (e.keyCode== 81)          //si on appuit sur q
				myGameArea.barre.addLeft();  //...on avance à gauche
			
		});
//boucle principale
setInterval(function(){
	myGameArea.detectCollBarreBord();
	myGameArea.balle.nextPos();
	myGameArea.update();
	},20);   //s'éxécute toute les 20 millisecondes

startgame();     //on lance le jeu