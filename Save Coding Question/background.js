// var programObj;


// chrome.webNavigation.onDOMContentLoaded.addListener({
//     callback: selectCoding,
//     // filters?: object,
// });
document.addEventListener("DOMContentLoaded", async () => {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
        webNavigation:true
    });

    chrome.webNavigation.onDOMContentLoaded.addListener(
        {
            // target: { tabId: tab.id },
            // function: selectCoding,
            callback: selectCoding,
        },

        
    );
});


async function selectCoding() {

    const body = document.getElementsByTagName("BODY")[0];
    const span = document.createElement("button");
    const textNode = document.createTextNode("Save As Coding");
    let selection = "";
    try {

        span.addEventListener('click', btnClick);

        document.addEventListener("mousedown", documentMouseDown);


        body.addEventListener('mouseup', async (e) => {
            setTimeout(() => {
                selection = window.getSelection().toString();
                if (selection != "") {
                    spanAdd(e);
                }
            }, 0);

        });
    }
    catch (err) {
        console.error(err);
    }


    function spanAdd(e) {
        const x = e.pageX;
        const y = e.pageY;
        span.style.left = `${x}px`;
        span.style.top = `${y}px`;
        span.style.display = "block";
        span.style.padding = "10px";
        // span.style.width="50px";
        // span.style.height="50px";
        span.style.color = "white";
        span.style.background = "linear-gradient(to right,blue,black)";
        span.style.outline = "none";
        span.style.cursor = "pointer";
        span.style.position = "absolute";
        span.setAttribute("id", "clickBtn");
        // span.id="clickBtn";
        span.appendChild(textNode)
        body.appendChild(span);
    }


    function btnClick(event) {

        let programName = "";
        while (programName == "") {
            programName = prompt("Enter Program Name:");
        }

        span.style.display = "none";
        // console.log(selection);
        window.getSelection().empty();

        download(programName+".txt",selection);
      

    }


    function documentMouseDown(event) {
        if (getComputedStyle(span).display === "block" && event.target.id !== "clickBtn") {
            // console.log(event.target.id);
            span.style.display = "none";
            window.getSelection().empty();
        }
    }


    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
    }

}



// const save_program=()=>{
//     let ProgramArray = [];
//     let localTodos = localStorage.getItem("ProgramArray");   
//     if (localTodos != null) {
//         ProgramArray = JSON.parse(localTodos);
//     }   
//     let programObj = {
//         name: programName,
//         program: selection
//     };

//     ProgramArray.push(programObj);   
//     localStorage.setItem("ProgramArray", JSON.stringify(ProgramArray));

//     show_program();
// }


// const show_program = () => {
//     let programString = localStorage.getItem("ProgramArray");
//     let content = "";
//     if (programString == null) {
//         //no todo
//         content += "<h3 class='text-white'>NO TODO TO SHOW</h3>";
//     } else {
//         let program = JSON.parse(programString);
//         for (let prog of ProgramArray.reverse()) {
//             content += `
          
          
//           <div class='card mt-2'>
//             <div class='card-body'>
//                    <h3>${prog.name}</h3>
//                    <p>${prog.program}</p> 
//             </div>    
//           </div>
          
          
//           `;
//         }
//     }

//     document.getElementById("main-content").innerHTML = content;
// };






// show_program();
// save_program();