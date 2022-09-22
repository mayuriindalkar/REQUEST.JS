const axios = require("axios");
const fs=require('fs')
const read=require("readline-sync")
console.log("****WELCOME TO NAVGURUKUL MERAKI LEARNING****")
var1=axios.get("https://api.merakilearn.org/courses")
const obj1=new Promise((resolve,reject)=>{ 
  resolve(var1);
})
obj1.then((resolv)=>{
  data=resolv.data
  fs.writeFileSync("data.json",JSON.stringify(data,null,3)) 
  serial_no=1
  for(i in data){
    console.log(serial_no,data[i]["name"],data[i]["id"]);
  serial_no+=1}
  course_no=read.questionInt("Enter your course number which you want to learn : ")
  console.log(data[course_no-1]["name"],data[course_no-1]["id"])
  a=data[course_no-1]["id"]
  var2=axios.get("http://api.merakilearn.org/courses/"+String(a)+"/exercises")
  const obj2=new Promise((resolve,reject)=>{ 
    resolve(var2);
  })
  obj2.then((resolv)=>{
    data2=resolv.data
    fs.writeFileSync("data2.json",JSON.stringify(data2,null,3)) 
    var s_no=1
    var main_point=[]
    var sub_point=[]
    for (var j in data2["course"]["exercises"]){
        if (data2["course"]["exercises"][j]["parent_exercise_id"]==null){
            console.log(s_no,data2["course"]["exercises"][j]["name"])
            console.log("   ",1,data2["course"]["exercises"][j]["slug"])
            s_no+=1 
            main_point.push(data2["course"]["exercises"][j])
            sub_point.push(data2["course"]["exercises"][j])
            continue   } 
        if (data2["course"]["exercises"][j]["parent_exercise_id"]==data2["course"]["exercises"][j]["id"]){
            console.log(s_no,data2["course"]["exercises"][j]["name"])
            main_point.push(data2["course"]["exercises"][j])
            s_no+=1 
            }c=1
        for (i in  data2["course"]["exercises"]){
            if (data2["course"]["exercises"][j]["parent_exercise_id"]!=data2["course"]["exercises"][j]["id"]){
                console.log("   ",c,data2["course"]["exercises"][j]["name"])
                sub_point.push(data2["course"]["exercises"][j])
                c+=1
                break}}}
// # with open("point.json","w") as q:
// #     json.dump(main_point,q,indent=4)
    topic_no=read.questionInt("Choose Topic : ")
    for (var k=0; k<main_point.length;k++){
        if (topic_no==k+1){
          console.log(topic_no,main_point[k]["name"]);
          console.log(main_point[k]["content"])
          var a=main_point[k]["parent_exercise_id"]}}
    s=1
    name=[]
    content=[]
    for (var d=1; d<sub_point.length;d++){
        if (sub_point[d]["parent_exercise_id"]==a){
            console.log("   ",s,sub_point[d]["name"])
            name.push(sub_point[d]["name"])
            content.push(sub_point[d]["content"])
            s+=1}}
    point=read.questionInt("Choose a point : ")
    y=1
    for (i=0; i<name.length;i++,y++){
        if (point==y){
            console.log(name[i])
            console.log(content[i])
            console.log()
        }}
      
})
  
}).catch((reject)=>{
  console.log(reject);
})
