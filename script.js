var players=[];
var count=[];
var data=[];
var colors=["darkred","darkblue","yellow","green","darkgray","turquoise"];
var eliminated=[];
var turn=0;
var size=0;
var max=[];
var flag=0;
var won=false;
function myFunction(){
    won=false;
    turn=0;
    flag=0;
    size=document.getElementById("mySelect").value;
    var ele=document.getElementById("box");
    ele.style.visibility="visible";
    ele.style.borderColor=colors[0];
    for(var i=0;i<size;i++){
        eliminated[i]=false;
        players.push(i);
    }
    for(var i=1;i<=72;i++){
        max[i]=3;
        document.getElementById("cell"+i).style.borderColor=colors[0];
        var ele=document.getElementById("cell"+i+"a");
        ele.style.animation = "";
        ele.classList.remove('a');
        var ele=document.getElementById("cell"+i+"b");
        ele.style.animation = "";
        ele.classList.remove('b');
        var ele=document.getElementById("cell"+i+"c");
        ele.style.animation = "";
        ele.classList.remove('c');
        count[i]=0;
        data[i]="";
    }
    max[1]=max[6]=max[67]=max[72]=1; 
    for(var i=7;i<67;i=i+6){
        max[i]=2;
    }
    max[2]=max[3]=max[4]=max[5]=2;
    max[68]=max[69]=max[70]=max[71]=2;
    for(var i=12;i<72;i=i+6){
        max[i]=2;
    }
}
function clicked(id){
    if(won==true){
        alert("Start a New Game");
    }else{
        var matches = id.match(/(\d+)/);
        if(count[matches[0]]===0){
            data[matches[0]]=colors[turn];
            count[matches[0]]=1;
            var ele=document.getElementById(id+"a");
            ele.classList.add('a');
            ele.style.backgroundColor=colors[turn];
            var last=turn;
            turn++;
            if(turn==size){
                flag=1;
                turn=0;
            }
            while(eliminated[turn]==true){
                turn++;
            }
            if(turn==size){
                turn=0;
            }
            if(turn==last){
               var temp=parseInt(last);
               temp=temp+1;
               alert("Player "+temp+" Won!!");
               won=true;
            }
            if(max[matches[0]]==count[matches[0]]){
                ele.style.animation = "move 3s infinite";
            }
            var ele=document.getElementById("box");
            ele.style.borderColor=colors[turn];
            for(var i=1;i<=72;i++){
                document.getElementById("cell"+i).style.borderColor=colors[turn];
            }
        }else{
            if(data[matches[0]]==colors[turn]){
                if(max[matches[0]]===count[matches[0]]){
                    var ele=document.getElementById(id+"a");
                    ele.style.animation = "";
                    ele.classList.remove('a');
                    var ele=document.getElementById(id+"b");
                    ele.style.animation = "";
                    ele.classList.remove('b');
                    var ele=document.getElementById(id+"c");
                    ele.style.animation = "";
                    ele.classList.remove('c');
                    count[matches[0]]=0;
                    data[matches[0]]="";     
                    if(max[matches[0]]==1){
                        if(matches[0]==1){
                            var temp=parseInt(matches[0]);
                            // next col
                            var cell=temp+1;
                            recursive("cell"+cell);
                            // next row
                            cell=temp+6;
                            recursive("cell"+cell);                           
                        }else if(matches[0]==6){
                            var temp=parseInt(matches[0]);
                            // prev col
                            var cell=temp-1;
                            recursive("cell"+cell);
                            // next row
                            cell=temp+6;
                            recursive("cell"+cell);
                        }else if(matches[0]==72){
                            var temp=parseInt(matches[0]);
                            // prev col
                            var cell=temp-1;
                            recursive("cell"+cell);
                            // prev row
                            cell=temp-6;
                            recursive("cell"+cell);
                        }else{
                            var temp=parseInt(matches[0]);
                            // next col
                            var cell=temp+1;
                            recursive("cell"+cell);
                            // prev row
                            cell=temp-6;
                            recursive("cell"+cell);
                        }
                    }else if(max[matches[0]]==2){
                        if(matches[0]>1 && matches[0]<6){
                            var temp=parseInt(matches[0]);
                            // next col
                            var cell=temp+1;
                            recursive("cell"+cell);
                            // prev col
                            cell=temp-1;
                            recursive("cell"+cell);
                            // next row
                            cell=temp+6;
                            recursive("cell"+cell);
                        }else if(matches[0]>67 && matches[0]<72){
                            var temp=parseInt(matches[0]);
                            // next col
                            var cell=temp+1;
                            recursive("cell"+cell);
                            // prev col
                            cell=temp-1;
                            recursive("cell"+cell);
                            // prev row
                            cell=temp-6;
                            recursive("cell"+cell);
                        }else if(matches[0]%6==0){
                            var temp=parseInt(matches[0]);
                            // prev col
                            var cell=temp-1;
                            recursive("cell"+cell);
                            // next row
                            cell=temp+6;
                            recursive("cell"+cell);
                            // prev row
                            cell=temp-6;
                            recursive("cell"+cell);
                        }else{
                            var temp=parseInt(matches[0]);
                            // next col
                            var cell=temp+1;
                            recursive("cell"+cell);
                            // next row
                            cell=temp+6;
                            recursive("cell"+cell);
                            // prev row
                            cell=temp-6;
                            recursive("cell"+cell);
                        }
                    }else{
                        var temp=parseInt(matches[0]);
                        // next col
                        var cell=temp+1;
                        recursive("cell"+cell);
                        // prev col
                        cell=temp-1;
                        recursive("cell"+cell);
                        // next row
                        cell=temp+6;
                        recursive("cell"+cell);
                        // prev row
                        cell=temp-6;
                        recursive("cell"+cell);
                    }
                }
                else{
                    count[matches[0]]++;
                    if(count[matches[0]]>1){
                        var ele=document.getElementById(id+"b");
                        ele.classList.add('b');
                        ele.style.backgroundColor=colors[turn];
                    } 
                    if(count[matches[0]]>2){
                        var ele=document.getElementById(id+"c");
                        ele.classList.add('c');
                        ele.style.backgroundColor=colors[turn];
                    }
                    if(max[matches[0]]==count[matches[0]]){
                        if(count[matches[0]]==1){
                            var ele=document.getElementById(id+"a");
                            ele.style.animation = "move 3s infinite";
                        }else if(count[matches[0]]==2){
                            var ele=document.getElementById(id+"a");
                            ele.style.animation = "move 3s infinite";
                            var ele=document.getElementById(id+"b");
                            ele.style.animation = "move 3s infinite";
                        }else{
                            var ele=document.getElementById(id+"a");
                            ele.style.animation = "move 3s infinite";
                            var ele=document.getElementById(id+"b");
                            ele.style.animation = "move 3s infinite";
                            var ele=document.getElementById(id+"c");
                            ele.style.animation = "move 3s infinite";
                        }
                    }
                }
                var last=turn;
                turn++;
                setTimeout(function(){
                    console.log("hello");
                    console.log(turn);
                    if(turn==size){
                        turn=0;
                    }
                    while(eliminated[turn]==true){
                        turn++;
                    }
                    if(turn==size){
                        turn=0;
                    }
                    if(turn==last){
                       var temp=parseInt(turn);
                       temp=temp+1;
                       alert("Player "+temp+" Won!!");
                       won=true;
                    }
                    var ele=document.getElementById("box");
                    ele.style.borderColor=colors[turn];
                    for(var i=1;i<=72;i++){
                        document.getElementById("cell"+i).style.borderColor=colors[turn];
                    }
                }, 200);
            }
            else{
               window.alert("Dekh kr chl na!!");
            }
        }
    }
} 
function recursive(id){
    var matches = id.match(/(\d+)/);
    if(count[matches[0]]===0){
        data[matches[0]]=colors[turn];
        count[matches[0]]=1;
        var ele=document.getElementById(id+"a");
        ele.classList.add('a');
        if(max[matches[0]]==count[matches[0]]){
            ele.style.animation = "move 3s infinite";
        }
        ele.style.backgroundColor=colors[turn];
    }else{
        if(max[matches[0]]===count[matches[0]]){
            var ele=document.getElementById(id+"a");
            ele.style.animation = "";
            var ele=document.getElementById(id+"b");
            ele.style.animation = "";
            var ele=document.getElementById(id+"c");
            ele.style.animation = "";
            count[matches[0]]=0;
            data[matches[0]]="";
            var ele=document.getElementById(id+"a");
            ele.classList.remove('a');
            var ele=document.getElementById(id+"b");
            ele.classList.remove('b');
            var ele=document.getElementById(id+"c");
            ele.classList.remove('c');
            if(max[matches[0]]==1){
                if(matches[0]==1){
                    var temp=parseInt(matches[0]);
                    // next col
                    var cell=temp+1;
                    recursive("cell"+cell);
                    // next row
                    cell=temp+6;
                    recursive("cell"+cell);
                }else if(matches[0]==6){
                    var temp=parseInt(matches[0]);
                    // prev col
                    var cell=temp-1;
                    recursive("cell"+cell);
                    // next row
                    cell=temp+6;
                    recursive("cell"+cell);
                }else if(matches[0]==72){
                    var temp=parseInt(matches[0]);
                    // prev col
                    var cell=temp-1;
                    recursive("cell"+cell);
                    // prev row
                    cell=temp-6;
                    recursive("cell"+cell);
                }else{
                    var temp=parseInt(matches[0]);
                    // next col
                    var cell=temp+1;
                    recursive("cell"+cell);
                    // prev row
                    cell=temp-6;
                    recursive("cell"+cell);
                }
            }else if(max[matches[0]]==2){
                if(matches[0]>1 && matches[0]<6){
                    var temp=parseInt(matches[0]);
                    // next col
                    var cell=temp+1;
                    recursive("cell"+cell);
                    // prev col
                    cell=temp-1;
                    recursive("cell"+cell);
                    // next row
                    cell=temp+6;
                    recursive("cell"+cell);
                }else if(matches[0]>67 && matches[0]<72){
                    var temp=parseInt(matches[0]);
                    // next col
                    var cell=temp+1;
                    recursive("cell"+cell);
                    // prev col
                    cell=temp-1;
                    recursive("cell"+cell);
                    // prev row
                    cell=temp-6;
                    recursive("cell"+cell);
                }else if(matches[0]%6==0){
                    var temp=parseInt(matches[0]);
                    // prev col
                    var cell=temp-1;
                    recursive("cell"+cell);
                    // next row
                    cell=temp+6;
                    recursive("cell"+cell);
                    // prev row
                    cell=temp-6;
                    recursive("cell"+cell);
                }else{
                    var temp=parseInt(matches[0]);
                    // next col
                    var cell=temp+1;
                    recursive("cell"+cell);
                    // next row
                    cell=temp+6;
                    recursive("cell"+cell);
                    // prev row
                    cell=temp-6;
                    recursive("cell"+cell);
                }
            }else{
                var temp=parseInt(matches[0]);
                // next col
                var cell=temp+1;
                recursive("cell"+cell);
                // prev col
                cell=temp-1;
                recursive("cell"+cell);
                // next row
                cell=temp+6;
                recursive("cell"+cell);
                // prev row
                cell=temp-6;
                recursive("cell"+cell);
            }
        }
        else{
            count[matches[0]]++;
            data[matches[0]]=colors[turn];
            var ele=document.getElementById(id+"a");
            ele.style.backgroundColor=colors[turn];
            if(count[matches[0]]>1){
                var ele=document.getElementById(id+"b");
                ele.classList.add('b');
                ele.style.backgroundColor=colors[turn];
            } 
            if(count[matches[0]]>2){
                var ele=document.getElementById(id+"c");
                ele.classList.add('c');
                ele.style.backgroundColor=colors[turn];
            }
            if(max[matches[0]]==count[matches[0]]){
                if(count[matches[0]]==1){
                    var ele=document.getElementById(id+"a");
                    ele.style.animation = "move 3s infinite";
                }else if(count[matches[0]]==2){
                    var ele=document.getElementById(id+"a");
                    ele.style.animation = "move 3s infinite";
                    var ele=document.getElementById(id+"b");
                    ele.style.animation = "move 3s infinite";
                }else{
                    var ele=document.getElementById(id+"a");
                    ele.style.animation = "move 3s infinite";
                    var ele=document.getElementById(id+"b");
                    ele.style.animation = "move 3s infinite";
                    var ele=document.getElementById(id+"c");
                    ele.style.animation = "move 3s infinite";
                }
            }
         }
        myFunction();
        function myFunction() {
            setTimeout(function(){
                for(var i=0;i<size;i++){
                    if(eliminated[i]==true){
                    continue;
                    }else{
                        var check=0;
                        for(var j=1;j<=72;j++){
                            if(data[j]==colors[i]){
                                check=1;
                                break;
                            }
                        }
                        if(check==0){
                            var out=parseInt(i);
                            out=out+1;
                            alert("Player "+out+" eliminated");
                            console.log(i);
                            eliminated[i]=true;
                        }
                    }
                }
            },100);
        }
    }
}
