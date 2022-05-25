AFRAME.registerComponent("markerhandler",{
    init: async function(){

        //Get the toy collection from firebase database
        var toy = await this.getToy();

        //marker found event
        this.el.addEventListner("markerFound", () => {
            this.handlemarkerFound(toy, markerId);
        });

        //markerLost event
        this.el.addEventListner("markerLost", () => {
            this.handlemarkerLost();
        });
    },

handlemarkerFound: function (toy, markerId) {
    //changing button div visibility
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display= "flex";

    var ratingButton = document.getElementById("rating-button");
    var orderButton = document.getElementById("order-botton");

    //Handling Click Events

    ratingButton.addEventListener("click", function(){
        swal({
            icon: "Warning",
            title: "Rate Toy",
            text: "Work In Progress"
        });
    });

    orderButton.addEventListener("click", () =>{
        swal({
          icon: "https://i.imgur.com/4NZ6uLY.jpg",
          title: "Thanks For Order!",
          text: "Your order will deliver Soon!!!!"
        });
    });

    // Changing Model scale to initial scale
    var Toy = toy.filter(Toy => toy.id === markerId)[0];

    var model = document.querySelector(`#model-${toy.id}`);
    model.setAttribute("position", toy.model_geaometry.position);
    model.setAttribute("rotation", toy.model_geaometry.rotation);
    model.setAttribute("scale", toy.model_geaometry.scale);
},

handlemarkerLost: function (){
    //changing button div visibility

    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "none";
},
//Get the toys collection from firestore database

getToy: async function(){
    return await firebase.firestore().collection("toy").get().then(snap => {
        return snap.docs.map(doc => doc.data());
    });
}
});