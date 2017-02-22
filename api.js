var express =require("express");
var bodyParser=require("body-parser");
var users=express();
var leaderboard=express();
var app=express();
var body;
var id;
var baseDatos=
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
    var users=[

      {

     "name":baseDatos[0].name,
     "score":bscore

     },
     {

       "name":baseDatos[1].name,
        "score":baseDatos[1].score
     },
     {

       "name":baseDatos[2].name,
        "score":baseDatos[2].score
      },
     {

       "name":baseDatos[3].name,
        "score":baseDatos[3].score
      },
     {

       "name":baseDatos[4].name,
       "score":baseDatos[4].score
      },
     {

       "name":baseDatos[5].name,
        "score":baseDatos[0].score
     }
  ]
    id=req.params.id;
      if(id!=null){
          if(id==10){
              res.send(users[0]);
            }else {
              res.send("no existe");
            }
        }else {
          {
                res.send((users));

          }
      }
})


leaderboard.get("/:id?",function (req,res) {


  var datosposition=[

    {
   "position":baseDatos[0].position,
   "name":baseDatos[0].name

   },
   {
     "position":baseDatos[1].position,
     "name":baseDatos[1].name
   },
   {
     "position":baseDatos[2].position,
     "name":baseDatos[2].name
    },
   {
     "position":baseDatos[3].position,
     "name":baseDatos[3].name
    },
   {
     "position":baseDatos[4].position,
     "name":baseDatos[4].name
    },
   {
     "position":baseDatos[5].position,
     "name":baseDatos[5].name
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
    res.send(baseDatos);
}else {
  if(pageSize && page){
    try{
        var results=[];

        for(var i=formula;i < parseInt(formula) + parseInt(pageSize) ;i++){

            var verify=JSON.stringify(datosposition[i]);

          if(verify!=null){
           results.push((datosposition[i]));

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
