<template>
  <div class="load-wrapp">
    <div class="load-3">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
    </div>
  </div>
</template>

<style scoped>
.load-wrapp {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px 10px 0;
  padding: 20px 20px 20px;
  border-radius: 5px;
}

.load-wrapp p {padding: 0 0 20px;}
.load-wrapp:last-child {margin-right: 0;}

.line {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background-color: #333;
  /* border: 3px #80bd01 solid; */
}

.load-3 .line:nth-last-child(1) {animation: loadingC .6s .1s linear infinite;}
.load-3 .line:nth-last-child(2) {animation: loadingC .6s .2s linear infinite;}
.load-3 .line:nth-last-child(3) {animation: loadingC .6s .3s linear infinite;}

@keyframes loadingC {
  0 {transform: translate(0,0);}
  50% {transform: translate(0,15px);}
  100% {transform: translate(0,0);}
}
</style>
