var express =require("express");
var bodyParser=require("body-parser");
var users=express();
var leaderboard=express();
var app=express();
var body;
var id;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function (req,res) {
res.send(":v menú :v ");
})

app.use("/users",users);
app.use("/leaderboard",leaderboard);

users.post("/",function(req,res){
   body=req.body;
  console.log(body);

})

users.get("/:id?",function (req,res) {
    var bscore;

    try{
      bscore = body.score;
    }catch(err){
      bscore="100";
    }
    var datos=[{ Username: "hoyos", score: bscore ,id:"15"},
                { Username: "otro :v", score: 1000 ,id:"no definido"}
  ]
    id=req.params.id;
      if(id!=null){
          if(id==15){
              res.send(datos[0]);
            }else {
              res.send("no existe");
            }
        }else {
          {
                res.send((datos));

          }
      }
})


leaderboard.get("/:id?",function (req,res) {

  var datosLeaderboard=
[
               {

              "position":1,
              "id": "10",
              "name":"danilo",
              "score":500

              },
              {

              "position":2,
              "id": "11",
              "name":"montes",
              "score":400

              },
              {

              "position":3,
              "id": "12",
              "name":"agus",
              "score":300

            },
              {

              "position":4,
              "id": "13",
              "name":"jara",
              "score":200

            },
              {

              "position":5,
              "id": "14",
              "name":"cristian",
              "score":100

            },
              {

              "position":6,
              "id": "15",
              "name":"nn",
              "score":0

              }
]
  var datosposition=[

    {

   "position":datosLeaderboard[0].position,

   "name":datosLeaderboard[0].name,


   },
   {

   "position":2,

   "name":"montes",


   },
   {

   "position":3,

   "name":"agus",


    },
   {

   "position":4,

   "name":"jara",


    },
   {

   "position":5,

   "name":"cristian",


    },
   {

   "position":6,

   "name":"nn",


   }
]
  var query=req.query;
  var page=req.query.page;
  var pageSize=req.query.pageSize;
  var formula= ((pageSize*page)-(pageSize-1))-1;
  var queryString=JSON.stringify(query);
  id=req.params.id;
  if(id!=null){
      if(id==10){
          res.send(datosposition[0] );

        }else {
          res.send("no existe");
        }
    }else{
if(queryString=="{}"){
    res.send(datosLeaderboard);
}else {
  if(pageSize && page){
    try{
        var results=[];

        for(var i=formula;i < parseInt(formula) + parseInt(pageSize) ;i++){

            var verify=JSON.stringify(datosLeaderboard[i]);

          if(verify!=null){
           results.push((datosLeaderboard[i]));

          }else {
            break;
          }

        }
        res.send(results);
    }
    catch (err){
      res.send("faltan usuarios laura sad");
    }
  }else {

    res.send("datos erroneos");
    }

}
}
})
app.listen(process.env.PORT|| 3000)
