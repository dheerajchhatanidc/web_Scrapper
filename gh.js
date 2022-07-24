const fs=require("fs");
const path=require("path");
const cheerio=require("cheerio");
const request=require("request");
const pdfkit=require("pdfkit");
request("https://github.com/topics",cb);
function cb(err,req,html){
let $ =cheerio.load(html);
const topics =$(".topic-box");
for(let i=0;i<topics.length;i++){
    let topiclink=$(topics[i]).find("a").attr("href");

   topiclink="https://github.com"+topiclink;
    let topiclink1=topiclink;
    let arr=topiclink1.split("/");
    const topicName=arr[arr.length-1];
  let FolderPath=path.join("E:",topicName);
  if(fs.existsSync(FolderPath)){

  }
  else{
      fs.mkdirSync(FolderPath)
  }
handleEachTopic(topiclink,FolderPath);
}



}

function handleEachTopic(url,FolderPath){
 request(url,cb);
 
function cb(err,req,html){
    let $=cheerio.load(html);
    let repos=$(`li[data-view-component=true]` );
 let cnt=0;
    for(let i=0;i<repos.length;i++){
       if(cnt==8)break;
       let ele=$(repos[i]).has(`seg[class="octicon octicon-issue-opened color-gray-light"]`)
       if(ele){
      let x=  $(repos[i]).find("a").attr("href").split("/");
      if(x[x.length-1]=="issues"){
          let issueLink="https://github.com"+$(repos[i]).find("a").attr("href");
        
       
        

          let filePath=path.join(FolderPath,`${cnt}.pdf`)



 cnt++;
        let   issueArrays=getAllIssues(issueLink,filePath);
     
        //   console.log(fs.readFileSync(filePath));






      }
       }
     

    
}

}
}
function getAllIssues(url,filePath){
 request(url,cb);
//   var ansArr="";
  
    function cb(err,req,html){
       
handlehtml(html,filePath)
        
       }   

        function handlehtml(html,filePath){
            let $ =cheerio.load(html);
            let arr=$(".flex-auto.min-width-0.p-2.pr-3.pr-md-2");
            let ansArr=[];   
            for(let i=0;i<arr.length;i++){
                let finalUrl=$(arr[i]).find("a").attr("href");
                finalUrl="https://github.com"+finalUrl;
ansArr.push(finalUrl)
              
               
            }
            let pdfDoc = new pdfkit;
pdfDoc.pipe(fs.createWriteStream(filePath));
pdfDoc.text(JSON.stringify(ansArr));
pdfDoc.end();
            
        }
        
        
       

}
