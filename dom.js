/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('advBtn');
    element.addEventListener('click', function () {
        adv_walk();
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('advModify');
    element.addEventListener('click', function () {
        adv_modify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('addelement');
    element.addEventListener('click', function () {
        addNewElement();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('safedelete');
    element.addEventListener('click', function () {
        safeDelete();
    });


    element = document.getElementById('deletebyselector');
    element.addEventListener('click', function () {
        deletebyselector();
    });


    element = document.getElementById('basicclone');
    element.addEventListener('click', function () {
        basicclone();
    });

    element = document.getElementById('advancedclone');
    element.addEventListener('click', function () {
        advancedclone();
    });

}






var walk_text = "";
function walk() {
    walk_text = "";

   let el;

   el = document.getElementById('p1');
   showNode(el);

   el = el.firstChild;
   showNode(el);

   el = el.nextSibling;
   showNode(el);

   el = el.lastChild;
   showNode(el);

   el = el.parentNode.parentNode.parentNode;
   showNode(el);

   el = el.querySelector('section > *');
   showNode(el);

    // alert(walk_text);

    var textarea = document.getElementById('textarea');

    textarea.value = walk_text;

}

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    // alert(`Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}`);
    walk_text = walk_text + `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n\n`;
}

function adv_walk() {
    document.getElementById("textarea").value = "";

    node_recursion(document.documentElement, 0);
}


function node_recursion(node, depth) {
    document.getElementById("textarea").value += "    ".repeat(depth) + node.nodeName + "\n";

    var currentchild = node.firstElementChild;
    while (currentchild) {
        node_recursion(currentchild, depth + 1);
        currentchild = currentchild.nextElementSibling;
    }
}


function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}


function adv_modify() {
    var colors_array = [
        getComputedStyle(document.documentElement).getPropertyValue("--darkcolor1"),
        getComputedStyle(document.documentElement).getPropertyValue("--darkcolor2"),
        getComputedStyle(document.documentElement).getPropertyValue("--darkcolor3"),
        getComputedStyle(document.documentElement).getPropertyValue("--darkcolor4"),
        getComputedStyle(document.documentElement).getPropertyValue("--darkcolor5"),
        getComputedStyle(document.documentElement).getPropertyValue("--darkcolor6")
    ];

    document.querySelector("h1").textContent = "DOM Manipulation is Fun!";
    document.querySelector("h1").style.color = colors_array[Math.floor(Math.random() * colors_array.length)];

    document.querySelector("p").classList.toggle("shmancy");

}



function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}


function addNewElement() {
    var type = document.getElementById("elementType").value;
    var content = document.getElementById("elementContent").value;

    var elem;
    var date = new Date().toLocaleString();
    
    if (type === "textNode") {
        if(content == ""){
            content = "New Text Node - " + date;
        }
        elem = document.createTextNode(content);
    } else if (type === "comment") {
        if(content == ""){
            content = "New Comment - " + date;
        }
        elem = document.createComment(content);
    } else if (type === "element") {
        if(content == ""){
            content = "New Element - " + date;
        }
        elem = document.createElement("div");
        elem.textContent = content;
    }

    document.getElementById("output").appendChild(elem);


}


function remove() {
  document.body.removeChild(document.body.lastChild);
}


function safeDelete() {
    let lastchild = document.body.lastChild;
    let secondlastchild = document.body.lastChild.previousSibling;
    // alert(secondlastchild.nodeName);

    
    while(lastchild){
        let lastChild = secondlastchild.previousSibling;
        let secondlastChild = lastChild.previousSibling;

        if(secondlastchild.nodeName != "SECTION" && lastchild.nodeName != "SECTION"){
            document.body.removeChild(lastchild);
            document.body.removeChild(secondlastchild);    
        }
        
        lastchild = lastChild;
        secondlastchild = secondlastChild;
    }
    
}

function deletebyselector() {
    document.querySelectorAll(document.getElementById("selectorInput").value).forEach(function (elem) {
        elem.remove();
    });
}

function basicclone() {
    document.getElementById("output").appendChild(document.getElementById("p1").cloneNode(true));
}


function advancedclone() {
    var clonedCard = document.getElementById("cardTemplate").content.cloneNode(true);
    clonedCard.querySelector("p").textContent += "\nCloned Card ID: " + Math.floor(Math.random() * 100);
    document.getElementById("output").appendChild(clonedCard);
}


window.addEventListener('DOMContentLoaded', init);

