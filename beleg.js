var categories = [
  { name: "Länge", units: [ 
	{ name: "Millimeter", value: 1 }, 
    { name: "Centimeter", value: 10 },
    { name: "Dezimeter", value: 100 },
    { name: "Meter", value:1000 },
    { name: "Kilometer", value:1000000 }
  ]},
  { name: "Datengröße", units: [
	{ name: "Byte", value: 1 },
	{ name: "Kilobyte", value: 1000 },
	{ name: "Kibibyte", value: 1024 }, 
	{ name: "Megabyte", value: (1000 * 1000) },
	{ name: "Mebibyte", value: (1024 * 1024) },
	{ name: "Gigabyte", value: (1000 * 1000 * 1000) },
	{ name: "Gibibyte", value: (1024 * 1024 * 1024) }
  ]}, 
  { name: "Zeit", units: [
	{ name: "Millisekunde", value: 1 },
	{ name: "Sekunde", value: 1000 },
	{ name: "Minute", value: 60000 }, 
	{ name: "Stunde", value: 3600000 }
  ]}, 
  { name: "Fläche", units: [ 
	{ name: "Millimeter^2", value: 1 },
	{ name: "Centimeter^2", value: 100 },
	{ name: "Dezimeter^2", value: 10000 },
	{ name: "Meter^2", value: 1000000 }, 
	{ name: "Kilometer^2", value: 1000000000000 }
	]}
];

var sourcebefore, targetbefore;
//was sin diese Daten mit den names
//was sind diese units, bestehend aus Objekten mit name und Value??

// diese Funktion wird zum start ausgeführt
// document.getElementById("categorySelect") nimmt sich das select mit ensprechender ID (Kategorien)
// dem select werden neue Options angefügt, welche den Inhalt des Array "categories[]" besitzen
// danach kommen zwei Funktionen denen die Unit-Inhalte von der ersten Kategorie übergeben werden
function onInit() {
  var categorySelect = document.getElementById("categorySelect"); 

  for (let i = 0; i < categories.length; i++) {
    categorySelect.options[i] = new Option(categories[i].name, "cat" + (i + 1));
  }
  setSourceUnitOptions(categories[0].units);
  setTargetUnitOptions(categories[0].units);
}
// eine Funktion, die beim Kategoriewechsel aufgerufen wird, quasie dem select mit ID = "categorySelect"
// mit dem Index (der gar nicht definiert wird?) des ausgewählten Objektes und dem Array übergeben wir
// dessen Units an die Funktionen  
function onCategoryChanged(event) {
  var units = categories[event.target.selectedIndex].units;
	//alert(event.target.selectedIndex);
  setSourceUnitOptions(units);
  setTargetUnitOptions(units);
}
// der Variablen "Element" wird die Eigenschaft des select's mit der ID "sourceUnitSelect" übergeben
// diese Variable mit Elementeigenschaft wird mit den units der Kategorie übergeben
function setSourceUnitOptions(units) {
  var element = document.getElementById("sourceUnitSelect");
  setSelectOptions(element, units);
}
// das selbe spiel wie bei der Funktion darüber, nur mit anderen select
function setTargetUnitOptions(units) {
  var element = document.getElementById("targetUnitSelect");
  setSelectOptions(element, units);
}
// element.options.length = 0; setzt die Anzahl der Options auf Null
// danach werden dem select wieder Options angelegt, die die Informationen der Units aus der ausgewählten Kategorie
// übergeben
function setSelectOptions(element, units) {
  element.options.length = 0;
	
  for (let i = 0; i < units.length; i++) {
    element.options[i] = new Option(units[i].name, "option" + (i + 1));
  }
  if(element.id == "targetUnitSelect"){
	element.selectedIndex = "1";
  }
  sourcebefore = document.getElementById("sourceUnitSelect").selectedIndex;
  targetbefore = document.getElementById("targetUnitSelect").selectedIndex;
  //alert(sourcebefore);
  //alert(element.selectedIndex);
}

// wir holen uns zuerst die ausgewählte Kategorie, dann die ausgewählten Options in source und target,
// dann stellen wir fest in welchem input wir schreiben und schreiben dessen ID auf source, um dann target
// die ID des anderen Inputs zu geben
// danach holen wir uns die Umrechnungszahlen und die Variable im input der Quelle 
function calculate(event) {
  var category, sourceUnit, targetUnit,
      source, sourceVal, target, targetVal, x, y;
  var temp;
  var sourceIndex = document.getElementById("sourceUnitSelect").selectedIndex;
  var targetIndex = document.getElementById("targetUnitSelect").selectedIndex;
  category = categories[document.getElementById("categorySelect").selectedIndex];
  sourceUnit = category.units[document.getElementById("sourceUnitSelect").selectedIndex];
  targetUnit = category.units[document.getElementById("targetUnitSelect").selectedIndex];

  if(sourceIndex == targetIndex){	
	sourceUnit = category.units[targetbefore];
	targetUnit = category.units[sourcebefore];
	document.getElementById("sourceUnitSelect").selectedIndex = targetbefore;
  	document.getElementById("targetUnitSelect").selectedIndex = sourcebefore;
	temp = sourcebefore;
	sourcebefore=targetbefore;
	targetbefore=temp;
  }
  else{
	sourcebefore = document.getElementById("sourceUnitSelect").selectedIndex;
  	targetbefore = document.getElementById("targetUnitSelect").selectedIndex;	
  }

  source = document.getElementById((event.target.id == "right" ? "right" : "left"));
  target = document.getElementById((source.id == "right" ? "left" : "right"));
//alert(source); <- info über element und nicht id des Elementes
//alert(source.id); <- id des Elementes
  sourceVal = source.value;

  x = sourceUnit.value;
  y = targetUnit.value;
  
  if (source.id == "left") {
	targetVal = sourceVal * (x / y);
  }
  else {
	targetVal = sourceVal * (y / x);
  }
  if(sourceVal != "") {
  	target.value = targetVal;
  }
}


