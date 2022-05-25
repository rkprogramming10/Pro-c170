AFRAME.registerComponent("create-markers", {

    //create async funtion here
    init: async function(){
        var main_scene=document.querySelector("#main-scene")
        var toy=await this.getToy()

        //TO map the toys
        toy.map(toy =>{
            var marker=document.createElement("a-marker")
            marker.setAttribute("id",toy.id)
            marker.setAttribute("type","pattern")
            marker.setAttribute("url",toy.marker_pattern_url)
            marker.setAttribute("cursor",{rayOrigin: "mouse"})
            marker.setAttribute("markerhandler",{})
            main_scene.appendChild(marker)

             var model = document.createElement("a-entity");
             model.setAttribute("id", `model-${toy.id}`);
             model.setAttribute("position", toy.model_geometry.position);
             model.setAttribute("rotation", toy.model_geometry.rotation);
             model.setAttribute("scale", toy.model_geometry.scale);
             model.setAttribute("gltf-model", `url-${toy.model_url}`);
             model.setAttribute("gesture-handler", {});
             marker.appendChild(model);

             var main_plane = document.createElement("a-plane");
             main_plane.setAttribute("id", `main_plane-${toy.id}`);
             main_plane.setAttribute("position", { x: 0, y: 0, z: 0 });
             main_plane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
             main_plane.setAttribute("width", 1.7);
             main_plane.setAttribute("height", 1.7);
             marker.appendChild(main_plane);

             var title_plane = document.createElement("a-plane");
             title_plane.setAttribute("id", `titlePlane-${toy.id}`);
             title_plane.setAttribute("position", { x: 0, y: 0.89, z: 0 });
             title_plane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
             title_plane.setAttribute("width", 1.69);
             title_plane.setAttribute("height", 0.3);
             title_plane.setAttribute("material", { color: "#F0C30F" });
             main_plane.appendChild(title_plane);

             var dish_title = document.createElement("a-entity");
             dish_title.setAttribute("id", `dish-title-${toy.id}`);
             dish_title.setAttribute("position", { x: 0, y: 0, z: 0.1 });
             dish_title.setAttribute("rotation", { x: 0, y: 0, z: 0 });
             dish_title.setAttribute("text", {
               font: "monoid",
               color: "black",
               width: 1.8,
               height: 1,
               align: "center",
               value: toy.age_group.toUpperCase(),
             });
             title_plane.appendChild(toy_title);

             var ingredients = document.createElement("a-entity");
             ingredients.setAttribute("id", `ingredients-${toy.id}`);
             ingredients.setAttribute("position", { x: 0, y: 0, z: 0.1 });
             ingredients.setAttribute("rotation", { x: 0, y: 0, z: 0 });
             ingredients.setAttribute("text", {
               font: "monoid",
               color: "black",
               width: 2,
               align: "center",
               value: dish.dish_name.toUpperCase(),
             });
             main_plane.appendChild(description);
        })
    },
    getToy:async function(){
    return await firebase.firestore().collection("toy").get().then(
      snap =>{
        return snap.docs.map(doc => doc.data())
      }
    )
    }
});