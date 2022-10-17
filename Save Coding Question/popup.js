// var programObj;
let url;
document.addEventListener("DOMContentLoaded", async () => {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.scripting.executeScript(
        {
            
            target: { tabId: tab.id },
            function: selectCoding,
        },

        
        
    );
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var data = new FormData()
    data.append('programName',request.programName)
    // data.append('desc',request.desc)
    data.append('code',request.code)
    data.append('url',sender.tab.url)
    
    console.log("message can send");
    // let url = 'http://localhost/notetaker/addnote.php'
    fetch(url,{
        method: 'POST',
        body: data
    }).then((response)=> response.text())
    .then((data)=>{
        console.log("Success: ", data)
        sendResponse({status: "note added"})
    })
    .catch((error)=>{
        console.error('Error:',error)
    });
    return true
});



async function selectCoding() {
    url=window.location.url;
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

        // download(programName+".txt",selection);
      
        sendRequest(programName,selection);
    }


    function documentMouseDown(event) {
        if (getComputedStyle(span).display === "block" && event.target.id !== "clickBtn") {
            // console.log(event.target.id);
            span.style.display = "none";
            window.getSelection().empty();
        }
    }



    function sendRequest(programName,code) {
        chrome.runtime.sendMessage(
            {
                programName: programName,
                // desc: desc,
                code: code
            },
            (response)=>{
                // console.log(response)
                console.log("response"+response);
            }
        )
    
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