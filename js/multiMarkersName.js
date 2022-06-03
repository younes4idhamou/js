var oXHR = new XMLHttpRequest();

    // Initiate request.
    oXHR.onreadystatechange = reportStatus;
    oXHR.open("GET", "https://firebasestorage.googleapis.com/v0/b/arforeveryone-prod.appspot.com/o", true);  // get json file.
    oXHR.send();
    
    
    function reportStatus() {
        if (oXHR.readyState == 4) {
            const obj = JSON.parse(this.responseText);
            console.log(obj.items.length)
            const len=obj.items.length/3
			var markersURLArray=[];
var markersNameArray=[];
AFRAME.registerComponent('markers_start',{
	init:function(){
		console.log('Add markers to the scene');

		var sceneEl = document.querySelector('a-scene');
		
		//list of the markers
		for(var i=0; i<this.len; i++)
		{
			var name=this.obj.items[k].name
			name=name.substring(4,name.length - 4)
			var url="https://firebasestorage.googleapis.com/v0/b/arforeveryone-prod.appspot.com/o/marker%2F"+name+".patt?alt=media&token=61b11ffb-034a-4a5e-9c26-5551b1acb023";
			markersURLArray.push(url);
			markersNameArray.push(name);
			//console.log(url);
		}

		for(var k=0; k<len; k++)
		{
		  var url='https://firebasestorage.googleapis.com/v0/b/arforeveryone-prod.appspot.com/o/obj%2F'+markersNameArray[k]+'.png?alt=media&token=be1c6df4-5908-4a61-b582-b401aed08884'
		  var markerEl = document.createElement('a-marker');
		  markerEl.setAttribute('type','pattern');
		  markerEl.setAttribute('url',markersURLArray[k]);
		  markerEl.setAttribute('id',markersNameArray[k]);
		  markerEl.setAttribute('registerevents','');
		  sceneEl.appendChild(markerEl);
		  //Adding an object to each marker
		  var textEl = document.createElement('a-entity');
		  
		  textEl.setAttribute('id','text');
		  textEl.setAttribute('gltf-model',url);
		  textEl.object3D.scale.set(0.4,0.4,0.4);
		  markerEl.appendChild(textEl);
		}
	}
});


//Detect marker found and lost
AFRAME.registerComponent('registerevents', {
		init: function () {
			const marker = this.el;

			marker.addEventListener("markerFound", ()=> {
				var markerId = marker.id;
				console.log('Marker Found: ', markerId);
			});

			marker.addEventListener("markerLost",() =>{
				var markerId = marker.id;
				console.log('Marker Lost: ', markerId);
			});
		},
	});

            
        }
    }
