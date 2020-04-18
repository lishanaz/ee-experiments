
const dotSize = 1;

// let params = { x0:0.9, y0:.9, a:2/3, b:4/3, c:1, d:10}
let params = { x0:10, y0:10, a:1.1, b:.4, c:.1, d:.4}

let inputs = {x0:createObjectFromId("x0"), 
                y0:createObjectFromId("y0"), 
                a:createObjectFromId("a"), 
                b:createObjectFromId("b"), 
                c:createObjectFromId("c"),
                d:createObjectFromId("d")}

let graph = document.getElementById("graph");
let ctx = graph.getContext("2d");
ctx.translate(0,graph.height);
ctx.scale(3,-3);

setInputsFromParams();
drawGraph();

setupOnInput("x0");
setupOnInput("y0");
setupOnInput("a");
setupOnInput("b");
setupOnInput("c");
setupOnInput("d");


function drawGraph(){
    ctx.clearRect(0,0,graph.width, graph.height);
    let x = params["x0"];
    let y = params["y0"];
    let a = params["a"];
    let b = params["b"];
    let c = params["c"];
    let d = params["d"];
    let dt = 0.1;
    for (let i=1; i<500; i+=dt)
    {
        console.log("t ", i, ": x = ", x.toFixed(1), " y = ", y.toFixed(1));
        ctx.fillStyle = "green";
        ctx.fillRect(i,x,dotSize,dotSize);
        ctx.fillStyle = "red";    
        ctx.fillRect(i,y,dotSize,dotSize);

        let dxDt = a*x - b*x*y;
        let dyDt = c*x*y - d*y;

        x += dxDt * dt;
        y += dyDt * dt;
    }
    console.log("Finally, x = ", x, "y = ", y);
}

function setInputsFromParams(){
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            inputs[key].sliderElem.value = params[key];
            inputs[key].textElem.value = params[key];
        }
    }
}

function createObjectFromId(id){
    let elem = document.getElementById(id);
    let textElem = document.getElementById(id+"Text");
    return {
        sliderElem: elem,
        textElem: textElem
    };
}

function setupOnInput(id){
    inputs[id].sliderElem.oninput = function ()
    {
        params[id] = parseFloat(inputs[id].sliderElem.value);
        inputs[id].textElem.value = params[id];
        drawGraph();
    }
    inputs[id].textElem.oninput = function ()
        {
            params[id] = parseFloat(inputs[id].textElem.value);
            inputs[id].sliderElem.value = params[id];
            drawGraph();
        }
}






// function foo () {
//     return 7;
// }

// function bar (x) {
//     return function () { return x + 1; }
// }

// function baz (x) {
//     return function (z) { return x + z; };
// }

// let alpha = foo;
// console.log(foo());
// console.log(alpha());

// function setup(){
//     console.log("Knock knock. Who's there?")
// }
// function boohoo(){
//     console.log("boo. boo hoo? please don't cry.")
// }
// // function tank(){

// //     console.log("tank. tank who? you're welcome.")
// // }

// console.log(bar(6)());

// let zoo = bar(6);
// console.log(zoo());
// console.log(baz(4)(2))


