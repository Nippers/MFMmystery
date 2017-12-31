
var width = 600;
var height = 367;
var canvas = document.getElementById("canvas");

canvas.width = width*2;
canvas.height = height*2;

canvas.style.width = width+"px";
canvas.style.height = height+"px";

ctx = canvas.getContext("2d");

canvas.getContext("2d").scale(2,2);

    var player = {
        //x: width/2,
        x: 200,
        //y: -70,
        y: 250,
        //width: 70,
        width: 41,
        height: 94,
        speed: 3,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false,
        goingRight: true,
        imgOffsetY: 0,
        imgOffsetX:0,
        frames:7,
        //name: "karenGeorgia"
        name: "karen"
    },
    keys = [],
    friction = 0.8,//does this do anything?
    gravity = 0.25;


var city=({name:"city", x:0, y:200, width:600, height:200});
var elvis=({name:"elvis", x:player.x+100, y:player.y+70, width:27, height:30, attacking:false, frames:3, imgOffsetY:0, imgOffsetX:27});
var fountain=({name:"fountain", x:width*2-185, y:190, width:85, height:115, frames:3, imgOffsetX:0, imgOffsetY:0, animSpeed:7});
var library=({name:"libraryBackground", x:1396, y:-56, width:1000, height:348});
var library2=({name:"libraryBackground2", x:1396, y:library.y-390, width:1000, height:390});
var librarySign=({name:"librarySign", x:library.x-255, y:0, width:160, height:60, imgOffset:0});
var libraryDoor=({name:"libraryDoor", x:library.x-96, y:90, width:96, height:200});
var librarian=({name:"librarian", x:library.x+900, y:library.y-99, width:70, height:100, frames:2, imgOffsetX:0, imgOffsetY:0, animSpeed:30});
var libraryTables=({name:"libraryTables", x:library.x+400, y:library.y+240, width:587, height:180});
var ladder=({name:"ladder", x:library.x+400, y:library.y+156, width:45, height:173});
var ladder2=({name:"ladder", x:library.x+500, y:library2.y+220, width:45, height:173});

//var hotel1=({name:"hotel1", x:width*2, y:90, width:800, height:500});
//var hotel2=({name:"hotel2", x:width*2, y:-110, width:800, height:500});
//var hotel3=({name:"hotel3", x:width*2, y:-310, width:800, height:500});
//var hotel4=({name:"hotel4", x:width*2, y:-510, width:800, height:500});
var elevator=({name:"elevator", x:2058, y:190, width:142, height:125, goingUp:true});
var waterTower=({name:"waterTower", x:width*2, y:-1010, width:244, height:500});
var ballroom=({name:"ballroom", x:-800, y:-1260, width:1000, height:405, imgOffset:0});
var ballroomStairs=({name:"ballroomStairs", x:-630, y:-1260, width:243, height:352});
var ballroom2=({name:"ballroom2", x:-800, y:-1580, width:1000, height:320});
var skylight=({name:"skylight", x:ballroom2.x+255, y:ballroom2.y, width:400, height:322, boxWidth:400, boxHeight:350});
var balcony=({name:"balcony", x:ballroom.x+ballroom.width-10, y:ballroom2.y, width:210, height:670});
var forestSign=({name:"forestSign", x:ballroom.x+1500, y:ballroom.y+270, width:63, height:80});
var listSign=({name:"listSign", x:ballroom.x+1550, y:ballroom.y+240, width:63, height:110});
var well = ({name:"well", x:ballroom.x+110, y:ballroom.y+820, width:90, height:228, frames:14, imgOffsetX:0, imgOffsetY:0, animSpeed:20});
var graves = ({name:"graves", x:well.x+180, y:well.y+130, width:85, height:50});
var grate = ({name:"grate", x:-width-85, y:height+90, width:96, height:160});
var pipes = ({name:"pipes", x:grate.x+700, y:grate.y-80, width:500, height:160});
var pipes2 = ({name:"pipes2", x:grate.x+200, y:grate.y-80, width:330, height:120, frames:5, imgOffsetX:0, animSpeed:10});
var pipes3 = ({name:"pipes2", x:grate.x+1650, y:grate.y-80, width:330, height:120, frames:5, imgOffsetX:0, animSpeed:10});
var ratsPipe = ({name:"ratsPipe", x:grate.x+2005, y:grate.y+60, width:85, height:50});
var manhole = ({name:"manhole", x:-200, y:height-10, width:80, height:20});
var home = ({name:"home", x:50, y:107, width:250, height:250});
var kitten = ({name:"kitten", x:home.x+70, y:home.y+155, width:17, height:25, frames:4, imgOffsetX:0, imgOffsetY:0, animSpeed:30});
var mimi = ({name:"mimi", x:home.x+100, y:home.y+170, width:51, height:50, frames:2, imgOffsetX:0, imgOffsetY:0, animSpeed:50});
var steven = ({name:"steven", x:-360, y:318, width:54, height:123, frames:4, imgOffsetX:0, imgOffsetY:0, animSpeed:20});
var mailbox = ({name:"mailbox", x:home.x+300, y:home.y+1186, width:40, height:65, imgOffsetX:0});

var bigfoot = ({name:"bigfoot", x:-700, y:190, width:1, height:1, frames:4, imgOffsetX:0, imgOffsetY:0, animSpeed:15, goingRight:true, speed:.5, leftX:home.x-120, rightX:home.x+320, on:false});
var well2 = ({name:"well2", x:-690, y:345, width:80, height:125});
var sewerLadder = ({name:"sewerLadder", x:manhole.x+7, y:manhole.y+20, width:65, height:200});

var killers = [];
killers.push({name:"rat", x:grate.x+700, y:grate.y+75, width:27, height:28, dead:false, imgOffsetY:28, imgOffsetX:0,animSpeed:12, frames:3, goingRight:false, speed:.6, leftX:grate.x+grate.width+10, rightX:grate.x+2060});
killers.push({name:"rat", x:grate.x+600, y:grate.y+75, width:27, height:28, dead:false, imgOffsetY:28, imgOffsetX:0,animSpeed:12, frames:3, goingRight:false, speed:1, leftX:grate.x+grate.width+10, rightX:grate.x+2060});
killers.push({name:"rat", x:grate.x+550, y:grate.y+75, width:27, height:28, dead:false, imgOffsetY:28, imgOffsetX:0,animSpeed:12, frames:3, goingRight:false, speed:1.5, leftX:grate.x+grate.width+10, rightX:grate.x+2060});
killers.push({name:"ratBabies", x:grate.x+200, y:grate.y+68, width:47, height:28, dead:false, imgOffsetY:28, imgOffsetX:0,animSpeed:12, frames:4, goingRight:false, speed:.6, leftX:grate.x+grate.width+10, rightX:grate.x+2040});
//ground level
//killers.push({name:"doctor", x:200, y:345, width:40, height:95, dead:false, imgOffsetY:0, imgOffsetX:40,animSpeed:7,frames:3,goingRight:false,speed:.3,leftX:-250,rightX:width*2-210});
//killers.push({name:"doctor", x:600, y:345, width:40, height:95, dead:false, imgOffsetY:95, imgOffsetX:40, animSpeed:7,frames:3,goingRight:true,speed:.3,leftX:-250,rightX:width*2-230});
//killers.push({name:"nurse", x:-200, y:343, width:40, height:97, dead:false, imgOffsetY:0, imgOffsetX:40,animSpeed:6,frames:3,goingRight:true,speed:1,leftX:-250,rightX:width*2-230});
//hotel
/*
killers.push({name:"unterweger", x:1400, y:-37, width:47, height:118, dead:false, imgOffsetX:47,animSpeed:12,frames:5,goingRight:true,speed:1,leftX:1400,rightX:2045});
killers.push({name:"ramirez", x:1450, y:-27, width:47, height:110, dead:false, imgOffsetX:40,animSpeed:7,frames:7,goingRight:true,speed:.3,leftX:1400,rightX:2045});
killers.push({name:"unterweger", x:1600, y:-245, width:47, height:118, dead:false, imgOffsetX:84,animSpeed:10,frames:5,goingRight:true,speed:1,leftX:1400,rightX:2045});
killers.push({name:"unterweger", x:1800, y:-445, width:47, height:118, dead:false, imgOffsetX:131,animSpeed:12,frames:5,goingRight:true,speed:1,leftX:1400,rightX:2045});
killers.push({name:"ramirez", x:1850, y:-435, width:47, height:110, dead:false, imgOffsetX:40,animSpeed:7,frames:7,goingRight:true,speed:.3,leftX:1400,rightX:2045});
killers.push({name:"ramirez", x:1600, y:-635, width:47, height:110, dead:false, imgOffsetX:40,animSpeed:6,frames:7,goingRight:true,speed:1,leftX:1400,rightX:2045});
killers.push({name:"unterweger", x:1800, y:-642, width:47, height:118, dead:false, imgOffsetX:47,animSpeed:10,frames:5,goingRight:true,speed:2,leftX:1400,rightX:2045});
killers.push({name:"unterweger", x:2000, y:-642, width:47, height:118, dead:false, imgOffsetX:94,animSpeed:12,frames:5,goingRight:true,speed:1,leftX:1400,rightX:2045});
killers.push({name:"ramirez", x:1400, y:180, width:47, height:110, dead:false, imgOffsetX:47, goingRight:true, frames:7, animSpeed:10, leftX: 1400, rightX:2160, speed:1});
*/
//list mansion
killers.push({name:"johnList", x:-200, y:-1015, width:107, height:105, dead:false, imgOffsetY:0, imgOffsetX:107, goingRight:true, frames:5, animSpeed:10, leftX:200, rightX:700, speed:.5});
killers.push({name:"johnList", x:200, y:-1015, width:107, height:105, dead:false, imgOffsetY:0, imgOffsetX:107, goingRight:true, frames:5, animSpeed:10, leftX:-200, rightX:700, speed:.5});

var ghosts = [];
//ghosts.push({name:"elisa", x:1800, y:160, width:15, height:92, imgOffsetY:0, imgOffsetX:0});
//ghosts.push({name:"elisa", x:1800, y:-620, width:15, height:92, imgOffsetY:0, imgOffsetX:0});

var cookies = [];
cookies.push({name:"cookie", x:550, y:300, width:19, height:19, eaten:false});

cookies.push({name:"cookie", x:990, y:300, width:19, height:19, eaten:false});
cookies.push({name:"cookie", x:1120, y:300, width:19, height:19, eaten:false});
cookies.push({name:"cookie", x:1245, y:250, width:19, height:19, eaten:false});

cookies.push({name:"cookie", x:1550, y:150, width:19, height:19, eaten:false});
cookies.push({name:"cookie", x:1700, y:110, width:19, height:19, eaten:false});

cookies.push({name:"cookie", x:1550, y:-50, width:19, height:19, eaten:false});
//cookies.push({name:"cookie", x:1700, y:-90, width:19, height:19, eaten:false});
//cookies.push({name:"cookie", x:1850, y:-50, width:19, height:19, eaten:false});

cookies.push({name:"cookie", x:1550, y:-250, width:19, height:19, eaten:false});
//cookies.push({name:"cookie", x:1700, y:-290, width:19, height:19, eaten:false});
cookies.push({name:"cookie", x:1850, y:-250, width:19, height:19, eaten:false});

//cookies.push({name:"cookie", x:2000, y:-550, width:19, height:19, eaten:false});
//cookies.push({name:"cookie", x:2050, y:-550, width:19, height:19, eaten:false});
//cookies.push({name:"cookie", x:2100, y:-550, width:19, height:19, eaten:false});
//cookies.push({name:"cookie", x:2150, y:-550, width:19, height:19, eaten:false});
cookies.push({name:"cookie", x:2200, y:-550, width:19, height:19, eaten:false});

cookies.push({name:"cookie", x:ballroom.x+700, y:ballroom.y-180, width:19, height:19, eaten:false});
cookies.push({name:"cookie", x:ballroom.x+800, y:ballroom.y-180, width:19, height:19, eaten:false});
cookies.push({name:"cookie", x:ballroom.x+900, y:ballroom.y-180, width:19, height:19, eaten:false});
cookies.push({name:"cookie", x:ballroom.x+1250, y:ballroom.y-180, width:19, height:19, eaten:false});
//sewer
cookies.push({name:"cookie", x:grate.x+400, y:grate.y, width:19, height:19, eaten:false});
cookies.push({name:"cookie", x:ratsPipe.x+30, y:ratsPipe.y-15, width:19, height:19, eaten:false});

var dialog = [];
dialog.push({speaker:"karen", more:true, text:"I woke up this morning in an existential fug."});
dialog.push({speaker:"karen", more:true, text:"I should probably go to work, but I don&#39t really feel like it."});
dialog.push({speaker:"karen", more:true, text:"Something&#39s missing. I think it&#39s important, but I can&#39t remember what it is."});
dialog.push({speaker:"karen", more:true, text:"Do you know, Elvis?"});
dialog.push({speaker:"elvis", more:true, text:"I don&#39t know, Karen."});
dialog.push({speaker:"elvis", more:true, text:"Cats aren&#39t subject to the pointless existential yearnings of humans."});
dialog.push({speaker:"elvis", more:true, text:"When cats experience feelings of emptiness, it is the result of boredom or hunger."});
dialog.push({speaker:"elvis", more:true, text:"Perhaps a cookie would make you feel better."});
dialog.push({speaker:"karen", more:true, text:"I don&#39t think a cookie will solve this mystery, Elvis."});
dialog.push({speaker:"elvis", more:true, text:"In that case, might I suggest a visit to the library?"});
dialog.push({speaker:"elvis", more:true, text:"I&#39ve often found that a reference librarian can answer the most challenging questions."});
dialog.push({speaker:"karen", more:true, text:"Good idea, Elvis. Let&#39s go to the library."});
dialog.push({speaker:"elvis", more:false, text:""});
dialog.push({speaker:"librarian", more:true, text:"How can I help you?"});
dialog.push({speaker:"karen", more:true, text:"Something&#39s missing. Do you know what it is?"});
dialog.push({speaker:"librarian", more:true, text:"Nope, but go check your mail. Maybe someone sent you an informative letter."});
dialog.push({speaker:"librarian", more:true, text:"And here&#39s a book you might like.<img src='smallSacrifices.jpg' style='width:120px'>"});
dialog.push({speaker:"librarian", more:false, text:""});

var dialogCount = 0;
var conversationCount = 0;

var boxes = [];

//elevator floor
boxes.push({x:2058, y:310, width:142, height:5, skin:"rect"});
//well wall
boxes.push({x:well.x+well.width-20, y:well.y+150, width:10, height:600, skin:"no"});
//floor
boxes.push({x:-700, y:height-10, width:2000, height: 20, skin:"rect"});
//boxes.push({x:-width+580, y:height-10, width:width*3, height: 20, skin:"rect"});

//topiary
boxes.push({x:-100, y:225, width:46, height:135, skin:"topiary"});
//boxes.push({x:-20, y:225, width:46, height:135, skin:"topiary"});
//boxes.push({x:-20, y:290, width:46, height:135, skin:"topiary"});
boxes.push({x:(width*2-46)+895, y:-645, width:46, height:135, skin:"topiary"});

//sewer floor
boxes.push({x:-width-230, y:height+250, width:width*3+200, height: 20, skin:"rect"});
boxes.push({x:fountain.x, y:fountain.y+fountain.height, width:fountain.width, height: 35, skin:"rect"});
//right stairs
boxes.push({x:700, y:380, width:40, height:40, skin:"square"});
boxes.push({x:820, y:320, width:20, height:20, skin:"square"});
boxes.push({x:850, y:290, width:40, height:40, skin:"square"});
boxes.push({x:970, y:40, width:50, height:50, skin:"square"});
boxes.push({x:1100, y:20, width:60, height:60, skin:"square"});
//left wall
boxes.push({x:-width-150,y:-460, width:96, height:1000, skin:"wall"});
//right wall
boxes.push({x:1300, y:-910, width:96, height:1000, skin:"wall"});
boxes.push({x:1300, y:290, width:96, height:450, skin:"shortWall"});
//stairs to list mansion
boxes.push({x:width*2-200, y:-910, width:50, height:50, skin:"square"});
boxes.push({x:width*2-350, y:-910, width:30, height:30, skin:"square"});
boxes.push({x:width*2-450, y:-910, width:20, height:20, skin:"square"});
//library floors
boxes.push({x:1396, y:290, width:1000, height:200, skin:"lib"});
boxes.push({x:1446, y:90, width:320, height:10, skin:"rect"});//2nd floor
boxes.push({x:1850, y:90, width:340, height:10, skin:"rect"});//2nd floor
boxes.push({x:library.x+50, y:-55, width:130, height:10, skin:"rect"});//3rd floor
boxes.push({x:library.x+255, y:library.y, width:700, height:10, skin:"rect"});//librarian's platform

boxes.push({x:1300, y:-325, width:660, height:10, skin:"rect"});
boxes.push({x:1300, y:-526, width:210, height:16, skin:"rect"});
boxes.push({x:1750, y:-526, width:500, height:16, skin:"rect"});
//right hotel wall
boxes.push({x:library.x+library.width, y:-510, width:96, height:1000, skin:"wall"});
//list platform
boxes.push({x:-800, y:-910, width:1600, height:60, skin:"rect"});
//ballroom stairs
boxes.push({x:ballroomStairs.x+130, y:ballroomStairs.y+315, width:30, height:2, skin:"no"});
boxes.push({x:ballroomStairs.x+100, y:ballroomStairs.y+285, width:30, height:2, skin:"no"});
boxes.push({x:ballroomStairs.x+70, y:ballroomStairs.y+255, width:30, height:2, skin:"no"});
boxes.push({x:ballroomStairs.x+40, y:ballroomStairs.y+225, width:30, height:2, skin:"no"});
boxes.push({x:ballroomStairs.x+10, y:ballroomStairs.y+195, width:30, height:2, skin:"no"});
boxes.push({x:ballroomStairs.x-10, y:ballroomStairs.y, width:10, height:ballroomStairs.height, skin:"no"});
boxes.push({x:ballroom2.x, y:ballroom2.y, width:10, height:ballroom2.height, skin:"no"});

boxes.push({x:ballroomStairs.x+120, y:ballroomStairs.y+120, width:10, height:2, skin:"no"});
boxes.push({x:ballroomStairs.x+150, y:ballroomStairs.y+90, width:10, height:2, skin:"no"});
boxes.push({x:ballroomStairs.x+180, y:ballroomStairs.y+60, width:10, height:2, skin:"no"});
boxes.push({x:ballroomStairs.x+210, y:ballroomStairs.y+30, width:10, height:2, skin:"no"});

boxes.push({x:well2.x+well2.width, y:well2.y+50, width:1, height:20, skin:"no"});
//ballroom 2nd floor
boxes.push({x:ballroom2.x+420, y:ballroom2.y+ballroom2.height-10, width:780, height:10, skin:"no"});
//forest
boxes.push({x:800, y:-430, width:40, height:40, skin:"square"});
boxes.push({x:750, y:-380, width:20, height:20, skin:"square"});
boxes.push({x:660, y:-325, width:20, height:20, skin:"square"});
boxes.push({x:ballroom.x+190, y:ballroom.y+1000, width:1600, height:40, skin:"rect"});
var stayOutOfTheForestSign = ({name:"stayOutOfTheForestSign", x:ballroom.x+1600, y:ballroom.y+915, width:55, height:85});
//sewer
boxes.push({x:grate.x, y:grate.y, width:30, height:grate.height, skin:"no"});//grate
boxes.push({x:grate.x+1780, y:grate.y+95, width:30, height:30, skin:"square"});
boxes.push({x:grate.x+1300, y:grate.y+35, width:400, height:30, skin:"rect"});
killers.push({name:"freeway1", x:grate.x+1350, y:grate.y+5, width:113, height:38, dead:false, imgOffsetY:0, imgOffsetX: 113, goingRight:true, frames:5, animSpeed:10, speed:0, leftX:grate.x, rightX:grate.x+3000});
killers.push({name:"freeway2", x:grate.x+1550, y:grate.y-30, width:65, height:65, dead:false, imgOffsetY:0, imgOffsetX: 62, goingRight:true, frames:4, animSpeed:15, speed:0, leftX:grate.x, rightX:grate.x+3000});
boxes.push({x:grate.x+1230, y:grate.y+45, width:20, height:20, skin:"square"});
boxes.push({x:pipes.x, y:pipes.y+102, width:290, height:10, skin:"no"});
boxes.push({x:pipes.x+300, y:pipes.y+135, width:200, height:10, skin:"no"});
//forest
killers.push({name:"owl", x:ballroom.x+600, y:ballroom.y+800, width:63, height:91, dead:false, imgOffsetY:0, imgOffsetX:63, goingRight:true, frames:3, animSpeed:30, leftX:ballroom.x+500, rightX:ballroom.x+1520, speed:2});
killers.push({name:"owl", x:ballroom.x+500, y:ballroom.y+830, width:63, height:91, dead:false, imgOffsetY:0, imgOffsetX:63, goingRight:true, frames:3, animSpeed:30, leftX:ballroom.x+500, rightX:ballroom.x+1520, speed:3});
killers.push({name:"pishushkin", x:ballroom.x+400, y:ballroom.y+890, width:47, height:111, dead:false, imgOffsetX:47, goingRight:true, frames:5, animSpeed:25, leftX:ballroom.x+500, rightX:ballroom.x+1540, speed:1.2});
killers.push({name:"pishushkin", x:ballroom.x+500, y:ballroom.y+890, width:47, height:111, dead:false, imgOffsetX:47, goingRight:true, frames:5, animSpeed:20, leftX:ballroom.x+500, rightX:ballroom.x+1540, speed:1.5});
killers.push({name:"pishushkin", x:ballroom.x+300, y:ballroom.y+890, width:47, height:111, dead:false, imgOffsetX:47, goingRight:true, frames:5, animSpeed:30, leftX:ballroom.x+500, rightX:ballroom.x+1540, speed:1});
cookies.push({name:"cookie", x:ballroom.x+1750, y:ballroom.y+870, width:19, height:19, eaten:false});
cookies.push({name:"cookie", x:ballroom.x+900, y:ballroom.y+850, width:19, height:19, eaten:false});
cookies.push({name:"cookie", x:ballroom.x+250, y:ballroom.y+850, width:19, height:19, eaten:false});

var trees1 = [];
for (i=0;i<30;i++){
  var x = Math.random()*((ballroom.x+1200)-(ballroom.x+400))+(ballroom.x+400);
  var h = Math.random()*(350-250)+250;
  var w = Math.random()*(h-h*.4)+h*.4;
  var n = Math.random();
  trees1.push({name:"pineTree4", x:x, y:ballroom.y+1000-h, width:h*.733, height:h});
}
var trees2 = [];
for (i=0;i<20;i++){
  var x = Math.random()*((ballroom.x+1300)-(ballroom.x+300))+(ballroom.x+300);
  var h = Math.random()*(350-150)+150;
  var w = Math.random()*(h-h*.4)+h*.4;
  var n = Math.random();
  if(n>.5){
    n="pineTree";
  }else{
    n="pineTree1";
  }
  trees2.push({name:n, x:x, y:ballroom.y+1000-h, width:w, height:h});
}

var rungs=[];
//library ladder
rungs.push({x:ladder.x, y:ladder.y+120, width:45, height:5});
rungs.push({x:ladder.x, y:ladder.y+50, width:45, height:5});
//2nd floor ladder
rungs.push({x:library.x+200, y:library.y+70, width:10, height:5});
//3rd floor ladder
rungs.push({x:ladder2.x, y:ladder2.y+120, width:45, height:5});
rungs.push({x:ladder2.x, y:ladder2.y+50, width:45, height:5});

//ballroom stairs landing
rungs.push({x:ballroomStairs.x+40, y:ballroomStairs.y+150, width:60, height:10});
//ballroom second floor
rungs.push({x:ballroom2.x, y:ballroom2.y+ballroom2.height-18, width:ballroom2.width+200, height:1});

rungs.push({x:waterTower.x+100, y:waterTower.y+390, width:42, height:2});
rungs.push({x:waterTower.x+100, y:waterTower.y+290, width:42, height:2});
rungs.push({x:waterTower.x+100, y:waterTower.y+190, width:42, height:2});
rungs.push({x:waterTower.x, y:waterTower.y+169, width:200, height:2});
//rungs.push({x:hotel4.x+280, y:hotel4.y+80, width:50, height:2});
//rungs.push({x:hotel4.x+300, y:hotel4.y+3, width:30, height:2});

rungs.push({x:manhole.x, y:manhole.y, width:manhole.width, height:5});
rungs.push({x:manhole.x, y:manhole.y+60, width:manhole.width, height:5});
rungs.push({x:manhole.x, y:manhole.y+120, width:manhole.width, height:5});

var movingObjects = []; //for moving the viewport
movingObjects.push(ladder2,ladder,librarian,mailbox,sewerLadder,well2,bigfoot,home,kitten,mimi,steven,manhole,stayOutOfTheForestSign,listSign,graves,ratsPipe,pipes,pipes2,pipes3,grate,well,forestSign,balcony,skylight,ballroom2,ballroomStairs,ballroom,waterTower,fountain,elevator,librarySign,library,library2,libraryDoor);

for(i=0;i<boxes.length;i++){
	movingObjects.push(boxes[i]);
}
for(i=0;i<rungs.length;i++){
	movingObjects.push(rungs[i]);
}
for(i=0;i<killers.length;i++){
	movingObjects.push(killers[i]);
}
for(i=0;i<ghosts.length;i++){
	movingObjects.push(ghosts[i]);
}
for(i=0;i<cookies.length;i++){
	movingObjects.push(cookies[i]);
}
for(i=0;i<trees2.length;i++){
	movingObjects.push(trees2[i]);
}
var pics = [];


pics.push(mailbox,bigfoot,home,kitten,mimi,steven,stayOutOfTheForestSign,graves,pipes2,pipes3,sewerLadder,forestSign,listSign,skylight,ballroom2,ballroom,library,library2,ladder,ladder2,waterTower,librarySign,elvis,player,balcony,ballroomStairs,elevator,libraryDoor,fountain,well,well2,grate,manhole,pipes,librarian,libraryTables);

for(i=0;i<killers.length;i++){
	pics.push(killers[i]);
}
pics.push(ratsPipe);
for(i=0;i<ghosts.length;i++){
	pics.push(ghosts[i]);
}
for(i=0;i<cookies.length;i++){
	pics.push(cookies[i]);
}

var animations = [];


var soundOn=true;
//sound files
var hitSound = new Audio('hit.wav');
var cookieSound = new Audio('cookie.wav');
var killSound = new Audio('kill.wav');
//var beginingSong = new Audio('MFMtheme1.wav');
var song = new Audio('MFMthemeClassical.wav');
var cecilSong = new Audio('hotel.wav');
var waterTowerSounds = new Audio('waterTowerSounds.wav');
var listSong = new Audio('DminorFugue.mp3');
var forestSong = new Audio('forest.wav');
var sewerSong = new Audio('sewerSong.wav');
var diceSound = new Audio('dice.wav');
//initialize some variables
var cookieCount = 0;
var karenHealth = 100;
var georgiaHealth = 100;
var frameCount = 0;//loops from 0 to 1000
var stopSpeechTimer = 500;
var viewportNorm = 103;

var mailCount=0;

if(soundOn){
  song.loop=true;
  //beginningSong.play();
}
function update() {

  if(frameCount<1000){
	   frameCount++;
  }else{
    frameCount=0;
  }

//ladder
var touching = overlap(player,ladder);
if(touching && player.grounded){
  ladder.x = player.x;
}
touching = overlap(player,ladder2);
if(touching && player.grounded){
  ladder2.x = player.x;
}
rungs[0].x = ladder.x;
rungs[1].x = ladder.x;
rungs[3].x = ladder2.x;
rungs[4].x = ladder2.x;
//dialog
  if(conversationCount<1 && (player.x > (home.x+home.width))){
    conversationCount++;
    dialogNext();
  }
  var dir = colCheck(player,librarian,1);
  if(conversationCount<2 && dir!==null){
    conversationCount++;
    dialogCount = 13;
    dialogNext();
    mailbox.y = home.y+186;
  }

//background sounds
  if(player.x<ballroom.x+ballroom.width+700 && player.y<ballroom.y+ballroom.height-40){
    song.pause();

    if(soundOn){
      //song.volume = 0.1;
      listSong.play();
    }else{
      song.pause();
      listSong.pause();
    }
  }else if(player.x<ballroom.x+ballroom.width+800 && player.y>ballroom.y+ballroom.height && player.y<ballroom.y+ballroom.height+500){
    if(soundOn){
      song.play();
      forestSong.play();
    }else{
      song.pause();
      forestSong.pause();
    }
  }else if(player.x>library.x-5){
    listSong.pause();
    song.pause();
    if(soundOn){
      cecilSong.play();
      if(player.y<waterTower.y+waterTower.height){
        waterTowerSounds.play();
      }else{
        waterTowerSounds.pause();
      }
    }else{
      waterTowerSounds.pause();
      cecilSong.pause();
    }
  }else if (player.y>home.y+home.height){
    //song.pause();
    if(soundOn){
      //song.volume=0.1;
      sewerSong.play();
      diceSound.play();
    }else{
      sewerSong.pause();
      diceSound.pause();
    }
  //}else if(player.x<ballroom.x+ballroom.width&&player.y>ballroom.y+ballroom.height&&player.y<ballroom.y+ballroom.height+400){
    //forestSong.play();
  }else{
    cecilSong.pause();
    listSong.pause();
    waterTowerSounds.pause();
    sewerSong.pause();
    diceSound.pause();
    forestSong.pause();
    if(soundOn){
      //song.volume=1;
      song.play();
    }
  }

    // check keys
    if (keys[38]) {
        // up arrow
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            //jumpSound.play();
            player.grounded = false;
            player.velY = -player.speed * 2;
        }
    }
    if (keys[39]) {
        // right arrow
        if (player.velX < player.speed) {
        	if (player.x < width-250){
            player.velX++;
           }else{
           for(i=0;i<movingObjects.length;i++){
           	 movingObjects[i].x -= player.speed;
             movingObjects[i].leftX-=player.speed;
             movingObjects[i].rightX-=player.speed;
           }
           city.x -= player.speed/5;
           libraryTables.x -= player.speed*1.2;
           for(i=0;i<trees1.length;i++){
             trees1[i].x -= player.speed/1.5;
           }
          }
        }
      player.goingRight = true;
      if(player.imgOffsetX < player.width*(player.frames-3)){
        if(frameCount%7===0){
          player.imgOffsetX +=player.width;
        }
      }else{
        player.imgOffsetX=player.width;
      }
    }
    if (keys[37]) {
        // left arrow
        if (player.velX > -player.speed) {
        	if (player.x > 150){
            player.velX--;
          }else{
          for(i=0;i<movingObjects.length;i++){
           	movingObjects[i].x += player.speed;
            movingObjects[i].leftX+=player.speed;
            movingObjects[i].rightX+=player.speed;
           }
           city.x += player.speed/5;
           libraryTables.x += player.speed*1.2;
           for(i=0;i<trees1.length;i++){
             trees1[i].x += player.speed/1.5;
           }
          }
        }
      player.goingRight = false;
      if(player.imgOffsetX < player.width*(player.frames-3)){
        if(frameCount%7===0){
          player.imgOffsetX +=player.width;
        }
      }else{
        player.imgOffsetX=player.width;
      }
    }
    if(keys[32]){
      //space key
      if(elvis.x>0 && elvis.x+elvis.width<width){
        if(cookieCount>0){
          if(player.goingRight){
            elvis.x += 4;
          }else{
            elvis.x -= 4;
          }
          elvis.imgOffsetX = 0;
          elvis.attacking = true;
        }
      }
    }else{
      if(keys[37]||keys[39]){
        if(frameCount%5===0){
          if(elvis.imgOffsetX<elvis.width*(elvis.frames-1)){
            elvis.imgOffsetX += elvis.width;
          }else{
            elvis.imgOffsetX = elvis.width;
          }
        }
      }else{
        elvis.imgOffsetX = elvis.width;
      }
      if(elvis.attacking===true){
        elvis.attacking=false;
        cookieCount--;
      }
    }

    if(player.jumping){
      //if(karenHealth>0 && georgiaHealth>0){
        //player.imgOffsetX = player.width*8;
      //}else{
        player.imgOffsetX = player.width*6;
      //}
    }
    if(!keys[37] && !keys[39] && !keys[38] && !keys[32]){
      player.imgOffsetX=0;
    }
    if(karenHealth>0||georgiaHealth>0){
      if(!keys[32]){
        elvis.x = player.x-50;
      }
      elvis.y=player.y+63;
    }else{
      elvis.x=player.x;
      elvis.y=player.y;
      gravity=.15;
    }
    if(player.goingRight===true){
      player.imgOffsetY = 0;
      elvis.imgOffsetY = 0;
    }else{
      player.imgOffsetY = player.height;
      elvis.imgOffsetY = elvis.height;
    }

    player.velX *= friction;
    player.velY += gravity;
    player.grounded = false;//remove & he does weird flying stuff
    //boxes
    for (var i = 0; i < boxes.length; i++){
        var dir = colCheck(player, boxes[i], 1);
        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            player.velY *= -1;
        }
    }
    //water tower ladder
    for (i = 0; i < rungs.length; i++){
      var dir = colCheck(player, rungs[i], 0);
      if (dir === "b") {
        player.grounded = true;
        player.jumping = false;
      }
    }
    //mailbox
      var dir = colCheck(player, mailbox, 1);
      if (dir === "l") {
        mailbox.imgOffsetX=40;
        if(mailCount<1){
          mailCount++;
          readMail(1);
        }
      }

    //elvis kills killers
    for (i=0; i<killers.length; i++){
      if(cookieCount>0){
        dir = colCheck(elvis, killers[i], 0);
        if((dir==="l" || dir==="r" || dir==="b") && keys[32]){
          killers[i].dead=true;
          if(soundOn){
            killSound.play();
          }
        }
      }
    }
    //killers hurt player
    for (i=0; i<killers.length; i++){
      if(killers[i].dead===false){
        dir = colCheck(player, killers[i], 1);
        if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
            if(killers[i].name==="fire"){
              if(karenHealth>0 & georgiaHealth>0){
                player.imgOffsetX=player.width*7;
              }else{
                player.imgOffsetX=player.width*5;
              }
              if(soundOn){
                hitSound.play();
              }
                karenHealth-=.5;
                georgiaHealth-=.5;
            }
        }
        if(karenHealth>0&&georgiaHealth>0){
          if(dir==="r"){
            if(soundOn){
              hitSound.play();
            }
            player.imgOffsetX=player.width*5;
            karenHealth-=.5;
          }else if (dir==="l"){
            if(soundOn){
              hitSound.play();
            }
            player.imgOffsetX=player.width*6;
            georgiaHealth-=.5;
          }
        }else if(karenHealth>0 || georgiaHealth>0){
          if(dir==="l"||dir==="r"){
            if(soundOn){
              hitSound.play();
            }
            player.imgOffsetX=player.width*5;
            if(player.name==="karen"){
              karenHealth-=.5;
            }else if (player.name==="georgia"){
              georgiaHealth-=.5;
            }
          }
        }
      }
    }
    if(karenHealth<.1 && georgiaHealth<.1){
      viewportNorm = 40;
      player.width=elvis.width;
      player.height=elvis.height;
      elvis.x=player.x;
      elvis.y=player.y;
      player.imgOffsetY=600;
    }

    for(i=0;i<killers.length;i++){
      if(typeof(killers[i].animSpeed)==="number" && killers[i].dead===false){
        animate(killers[i],1);
      }
      if(killers[i].dead){
        killers[i].imgOffsetX=0;
        if(killers[i].height>0){
          killers[i].height-=.8;
        }else{
          killers[i].width=0;
          killers[i].height=0;
        }
      }
    }
    animate(fountain,0);
    animate(well,0);
    animate(pipes2,0);
    animate(pipes3,0);
    animate(kitten,0);
    animate(mimi,0);
    animate(steven,0);
    animate(librarian,0);
    if(bigfoot.on){
      animate(bigfoot,1);
    }

    if(player.y+player.height > grate.y+60 && player.x>grate.x+31){
      player.x--;
    }

    for (i=0; i<cookies.length; i++){
      if(cookies[i].eaten===false){
        dir = colCheck(player, cookies[i], 1);
        if(dir!==null){
          cookies[i].width=1;
          cookies[i].height=1;
          cookies[i].eaten=true;
          //cookies.splice(i, 1);
          cookieCount++;
          if(soundOn){
            cookieSound.play();
          }
        }
      }
    }


    if(player.grounded){
         player.velY = 0;
    }

    //move viewport up
    if(player.grounded && player.y < height/1.5){
    	for(i=0; i<movingObjects.length; i++){
      	movingObjects[i].y+=2;
      }
      for(i=0; i<trees1.length; i++){
      	trees1[i].y+=2;
      }
      player.y +=2;
      city.y+=.8;
      libraryTables.y +=2;
    }
    //move viewport down
    if(player.y>height-viewportNorm){
    	for(i=0; i<movingObjects.length; i++){
      	movingObjects[i].y-=2;
      }
      for(i=0; i<trees1.length; i++){
      	trees1[i].y-=2;
      }
      city.y-=.8;
      libraryTables.y -= 2;
    }
    player.x += player.velX;
    player.y += player.velY;


//jiblet Y offset
  if(player.goingRight === true){
  	jibletOffsetY = 0;
  }else{
  	jibletOffsetY = player.height;
  }

//elevator goes up and down
if(elevator.goingUp===true){
  elevator.y-=2;
  boxes[0].y-=2;
  //player.y-=1.5;
  if(elevator.y<library2.y){
    elevator.goingUp=false;
  }
}else{
  elevator.y+=2;
  boxes[0].y+=2;
  //player.y+=1.5;
  if(elevator.y>library.y+250){
    elevator.goingUp=true;
  }
}


//fires in list mansion
if(player.x>ballroom.x && player.x<ballroom.x+ballroom.width && player.y<ballroom.y+ballroom.height){
  if(frameCount%200===0){
    var yf = Math.random();
    if(yf>.5){
      yf=ballroom2.y+235;//height of 2nd floor fires
      xf = Math.random()*500+ballroom.x+500;
    }else{
      yf=ballroom.y+300;
      xf = Math.random()*1000+ballroom.x;
    }
    killers.push({name:"fire", x:xf, y:yf, width:41, height:77, dead:false, imgOffsetX:41, goingRight:true, frames:4, animSpeed:7, leftX: 1400, rightX:2160, speed:0});
    movingObjects.push(killers[killers.length-1]);
    pics.push(killers[killers.length-1]);
  }
}

//sign flicker
/*
var random = Math.random();
if(random>.8){
  motelSign.imgOffset=motelSign.width;
}else{
  motelSign.imgOffset=0;
}
*/
//ballroom lights flicker
//dir=colCheck(player, rungs[0]);
if((player.x>ballroomStairs.x && player.x<ballroomStairs.x+100&&player.y+player.height>ballroom.y&&player.y<ballroom.y+80) || (player.x>ballroomStairs.x+400 && player.x<ballroomStairs.x+600)){
  ballroom.imgOffset=ballroom.width;
}else{
  ballroom.imgOffset=0;
}
//ghosts flicker
for(i=0;i<ghosts.length;i++){
  random = Math.random();
  if(random>.5){
    ghosts[i].imgOffsetX=0;
  }else{
    ghosts[i].imgOffsetX=ghosts[i].width;
  }
  if(random>.5 && ghosts[i].x<library.x+library.width){
    ghosts[i].x+=3;
  }else if (ghosts[i].x>library.x){
    ghosts[i].x-=3;
  }else{
    ghosts[i].x+=3;
  }
}

  //erase the canvas
 		ctx.clearRect(0, 0, width, height);

   //draw stuff on the canvas
   	//sky
    var grd = ctx.createLinearGradient(0,height,0,0);
    //grd.addColorStop(0,"#336699");//dark blue
    //grd.addColorStop(1,"black");
    grd.addColorStop(0,"#8ff0f9");//light blue
    grd.addColorStop(1,"#336699");
    ctx.fillStyle=grd;
    ctx.fillRect(0,0,width,height);

    drawTwo(city);

    //sewer
    ctx.fillStyle="#1a0000";
    ctx.fillRect(grate.x,grate.y-80,2100,250);

    //draw boxes
  	for(i=0;i<boxes.length;i++){
      if(boxes[i].skin !== "no"){
      var image = document.getElementById(boxes[i].skin+"Pic");
    		draw(image, 0, 0, image.width, image.height, boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
      }
  	}
    for(i=0;i<trees1.length;i++){
      var image = document.getElementById(trees1[i].name+"Pic");
    	draw(image, 0, 0, image.width, image.height, trees1[i].x, trees1[i].y, trees1[i].width, trees1[i].height);
  	}

  for(i=0; i<pics.length; i++){
    drawTwo(pics[i]);
  }

  for(i=0;i<trees2.length;i++){
    var image = document.getElementById(trees2[i].name+"Pic");
    draw(image, 0, 0, image.width, image.height, trees2[i].x, trees2[i].y, trees2[i].width, trees2[i].height);
  }

  //ctx.fillStyle="rgba(255,255,255,.5)";
  //ctx.fillRect(0,0,width,45);

  //sewer sludge
  ctx.fillStyle = "rgba(102, 51, 0, .8)";
  ctx.fillRect(grate.x-130,grate.y+90,2220,grate.height-40);

  for (i=0;i<cookieCount;i++){
    image = document.getElementById("cookiePic");
    draw(image, 0, 0, image.width, image.height,25*i+10, 10, image.width, image.height);
  }

//health counters at the top
  //karen
  /*
  image = document.getElementById("karenHeadPic");
  draw(image, 0, 0, image.width, image.height,0, 10, image.width, image.height);
  ctx.fillStyle="black";
  ctx.fillRect(28,13,104,19);
  if(karenHealth>0){
    if(karenHealth>70){
      ctx.fillStyle="lime";
    }else if(karenHealth>30){
      ctx.fillStyle="orange";
    }else{
      ctx.fillStyle="red";
    }
    ctx.fillRect(30,15,karenHealth,15);
  }else{
    image = document.getElementById("deadKarenHeadPic");
    draw(image, 0, 0, image.width, image.height,0, 10, image.width, image.height);

    if(georgiaHealth>0){
      player.name="georgia";
      player.width=32;
      player.height=92;
      player.frames=7;
    }
  }
  //georgia
  image = document.getElementById("georgiaHeadPic");
  draw(image, 0, 0, image.width, image.height,150, 10, image.width, image.height);
  //ctx.rect(179,14,102,17);
  //ctx.stroke();
  ctx.fillStyle="black";
  ctx.fillRect(178,13,104,19);
  if(georgiaHealth>0){
    if(georgiaHealth>70){
      ctx.fillStyle="lime";
    }else if(georgiaHealth>30){
      ctx.fillStyle="orange";
    }else{
      ctx.fillStyle="red";
    }
    ctx.fillRect(180,15,georgiaHealth,15);
  }else{
    image = document.getElementById("deadGeorgiaHeadPic");
    draw(image, 0, 0, image.width, image.height,150, 10, image.width, image.height);
    if(karenHealth>0){
      player.name="karen";
      player.width=41;
      player.height=94;
      player.frames=7;
    }
  }
  */
//ending
/*
if(player.y>home.y&&player.y<home.y+home.height&&player.x>home.x&&player.x<home.x+home.width&&home.x+home.width>0){
  done = true;
}
if(done===true){
  if(player.x<home.x+20){
    mimi.imgOffsetY=mimi.height;
  }
  document.getElementById("replayButton").style.display="inline";
  if(georgiaHealth>0){
    if(karenHealth>0){
      //sasquatch throwing confetti
      bigfoot.on=true;
      bigfoot.width=150;
      bigfoot.height=250;
      steven.imgOffsetY=steven.height;
      steven.y = mimi.y-72;
      steven.x = mimi.x+70;
      var endingText = "Everyone stayed sexy and didn't get murdered. You win!";
    }else{
      var endingText = "But you let Karen get murdered, so that's not super amazing.";
    }
  }else{
    //steven.imgOffsetY=steven.height*2;
    if(karenHealth>0){
      var endingText = "But you let Georgia get murdered, so that's not super amazing.";
    }else{
      var endingText = "But you let Karen and Georgia get murdered. That's horrible.";
    }
  }
  ctx.font = "18px Courier";
  ctx.fillStyle = "white";
  ctx.fillText("Elvis! You made it home!",10,80);
  ctx.fillText(endingText,10,110);
}
*/

}//end main loop

function animate(killer,start){
  //simple non-interactive animations
  if(frameCount%killer.animSpeed===0){
  	if(killer.imgOffsetX < killer.width*(killer.frames-1)){
  		killer.imgOffsetX += killer.width;
    }else{
    	killer.imgOffsetX=start*killer.width;
    }
  }
  if(killer.goingRight===true){
    killer.x+=killer.speed;
    if(typeof(killer.imgOffsetY)==="number"){
      killer.imgOffsetY=0;
    }
    if(killer.x>killer.rightX){
      killer.goingRight=false;
    }
  }else if(killer.goingRight===false){
    killer.x-=killer.speed;
    if(typeof(killer.imgOffsetY)==="number"){
      killer.imgOffsetY=killer.height;
    }
    if(killer.x<killer.leftX){
      killer.goingRight=true;
    }
  }
}//end animate function

function drawTwo(pic){
  //draw things that overlap with the viewport
  if(pic.x+pic.width>0 && pic.x<700){
  	if(pic.y+pic.height>0 && pic.y<450){
      if(typeof(pic.imgOffsetY)==="number"){
        if(pic.height>0){
          ctx.drawImage(document.getElementById(pic.name+"Pic"),pic.imgOffsetX+.3,pic.imgOffsetY+.5,pic.width-1,pic.height-1,pic.x,pic.y,pic.width-1,pic.height-1);
        }
      }else if(typeof(pic.imgOffsetX)==="number"){
        ctx.drawImage(document.getElementById(pic.name+"Pic"),pic.imgOffsetX+.3,.5,pic.width-1,pic.height-1,pic.x,pic.y,pic.width-1,pic.height-1);
      }else if(typeof(pic.imgOffset)==="number"){
        ctx.drawImage(document.getElementById(pic.name+"Pic"),pic.imgOffset,0,pic.width,pic.height,pic.x,pic.y,pic.width,pic.height);
      }else{
    	    ctx.drawImage(document.getElementById(pic.name+"Pic"),0,0,pic.width,pic.height,pic.x,pic.y,pic.width,pic.height);
      }
    }
  }
}//end draw function

function draw(image, xOffset, yOffset, width, height, x, y, boxWidth, boxHeight){
  //draw images on canvas
	if(x+boxWidth>0 && x<700){
  	if(y+boxHeight>0 && y<450){
    	ctx.drawImage(image,xOffset,yOffset,width,height,x,y,boxWidth,boxHeight);
    }
  }
}//end draw function



function colCheck(shapeA, shapeB, solid) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                if(solid===1){
                  shapeA.y += oY;
                }
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                if(solid===1){
                  shapeA.x += oX;
                }
            } else {
                colDir = "r";
                if(solid===1){
                  shapeA.x -= oX;
                }
            }
        }
    }
    return colDir;
}

function toggleSound(){
  if(soundOn){
    soundOn=false;
    song.pause();
    document.getElementById('soundButton').src="volume.png";
  }else{
    soundOn="true";
    song.play();
    document.getElementById('soundButton').src="mute.png";
  }
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});


window.addEventListener("load", function () {
    //update();
    //start();
});

function start(){
  document.getElementById("startScreen").style.display="none";
  //document.getElementById("rightBox").style.display="block";
  setInterval(function(){update();}, 16);
}

function dialogNext(){
  document.getElementById("letterBox").style.display="none";
  document.getElementById("rightBox").style.display="block";
  document.getElementById("headPic").innerHTML = '<img src="'+dialog[dialogCount].speaker+'Head.png" width="50px" style="float:left">';

  if(dialog[dialogCount].speaker === "karen"){
    document.getElementById("headPic").style.float="left";
  }else{
    document.getElementById("headPic").style.float="right";
  }

  var dialogBox = document.getElementById("dialogBox");
  dialogBox.innerHTML = dialog[dialogCount].text;

  if(dialog[dialogCount].more===false){
    document.getElementById("rightBox").style.display = "none";
  }else{
    dialogCount ++;
  }

}//end dialog function

function readMail(letter){
  document.getElementById("letterBox").style.display="block";
}

function closeLetter(){
  document.getElementById("letterBox").style.display="none";
}

function overlap(shapeA, shapeB){
  if((shapeA.x+shapeA.width>shapeB.x || shapeA.x<shapeB.x+shapeB.width) && shapeA.y+shapeA.height>shapeB.y && shapeA.y+shapeA.height<shapeB.y+shapeB.height){
    var touching = true;
  }else{
    touching = false;
  }
  return touching;
}
