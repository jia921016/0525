var monster_colors ="231942-5e548e-9f86c0-be95c4-e0b1cb".split("-").map(a=>"#"+a)
class Monster{  
    constructor(args){ 
      this.r =args.r || random(50,100)
      this.p =args.p ||createVector(random(width),random(height))
      this.v =args.v ||createVector(random(-1,1),random(-1,1))
      this.color=args.color||random(monster_colors)
      this.mode=random(["happy","bad"])
      this.dead=false //代表活著
      this.timenum=0 //延長時間讓它顯示
      
    }

draw(){//劃出元件
    if(this.dead ==false){
    push()//重新設定圓點位置
        translate(this.p.x,this.p.y)//把原點(0,0)座標移到物件中心位置
        fill(this.color)
        noStroke()
        ellipse(0,0,this.r)
        // stroke(this.color)
        // strokeWeight(5)
        // line(this.r/2,0,this.r,0)
        if(this.mode=="happy"){
            fill("#fcd5ce")
            ellipse(0,0,this.r/2)
            fill("#e29578")
            ellipse(0,0,this.r/3)
        }else{
            fill("#edf6f9")
            arc(0,0,this.r/2,this.r/2,0,PI)
            fill("#9ef01a")
            arc(0,0,this.r/3,this.r/3,0,PI)
        }
        //+++++++++
        stroke(this.color)
        strokeWeight(5)
        noFill()
        for(var j=0;j<8;j++){
            rotate(PI/4)
            beginShape()
                for(var i=0;i<30;i++){
                    vertex(this.r/2+i,sin(i/2+frameCount/10)*10)
            }
        endShape()
        }
    pop()//恢復原點到整個視窗的左上角
}
else
{//怪物死亡畫面
    this.timenum=this.timenum+1
    push()
        translate(this.p.x,this.p.y)//把原點(0,0)座標移到物件中心位置
        fill(this.color)
        noStroke()
        ellipse(0,0,this.r)
        stroke(255)
        line(-this.r/2,0,this.r/2,0)
        stroke(this.color)
        strokeWeight(5)
        noFill()
        for(var j=0;j<8;j++){
            rotate(PI/4)
            line(this.r/2,0,this.r,0)
        }
    pop()
}

}

update(){//計算出移動元件後的位置
    this.p.add(this.v)
    if(this.p.x<=0 || this.p.x>=width){
        this.v.x=-this.v.x
      }
      if(this.p.y<=0 || this.p.y>=height)
      this.v.y=-this.v.y
    }
    isBallInRanger(x,y){//功能:判斷飛彈的位置是在物件範圍內
        let d = dist(x,y,this.p.x,this.p.y)//計算兩點之間的距離
        if(d<this.r/2){
          return true//飛彈與物件的距離小於物件的寬度，代表碰觸了
        }else{
          return false//飛彈(x,y)與物件的距離(this.p.x,this.p.y)大於物件的半徑，代表沒有碰觸
        }
      }
    
}


