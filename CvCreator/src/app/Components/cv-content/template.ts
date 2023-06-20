export class Template {
  public static htmlPattern = `

      <div @firstPage id="first-page" class="page">
        <div @pageContent id="page-content" class="page-content">


        <h1> <span @firstName>lukasz</span> - <span @lastName></span> </h1>
        <h1> <span @firstName>lukasz</span> - <span @lastName></span> </h1>
        <h1> <span @firstName>lukasz</span> - <span @lastName></span> </h1>
        <h1> <span @firstName>lukasz</span> - <span @lastName></span> </h1>
        <h1> <span @firstName>lukasz</span> - <span @lastName></span> </h1>
        <h2 style="color:green" @description></h2>
        <h2 style="color:green" @description></h2>
        <h2 style="color:green" @description></h2>
        <h2 style="color:green" @description></h2>
        <h2 style="color:green" @description></h2>
        <h2 style="color:green" @description></h2>
        <h2 style="color:green" @description></h2>
        <h2 style="color:green" @description></h2>
            <h2 style="color:green" @description></h2>
            <h2 style="color:green" @description></h2>
        

       

            <div @list class="black">
            <div style="border: 3px solid orange"> 
              <h1 @first></h1>
              <h1 @second></h1> 
              <div @removeIfEmpty style="border:2px solid blue">
                <div style="border:2px solid red">
                    <h2 @third> </h2>
                </div>
              </div>
              </div> 
            </div>
      


            <div style="display: flex"> <h1 @firstName></h1> <h1> - </h1> <h1 @lastName></h1></div>
           <div><h1 @description></h1></div>

            <div style="color:red">
              <h2 #d1 @description></h2>
              <div>
                <h2 #d2 style="color:green" @description></h2>
              </div>
            </div>
            <h2 @description></h2>

            <h1 @description style="color: orange"></h1>
            <h2 style="color:red" @description></h2>
            <h2 style="color:green;" @description></h2>
            <h1>w</h1>
            <h2 style="color:red" @description></h2>
            <h2 style="color:green" @description></h2>
            <h2 style="color:green" @description></h2>
            <h2 style="color:green" @description></h2>
            <h2 style="color:green" @description></h2>
            <h2 style="color:green" @description></h2>
            <h2 style="color:green" @description></h2>
            <h2 style="color:blue" @description></h2>
           <!-- <h1 @dede style="color:red"> <span @firstName>lukasz</span> - <span @lastName></span> </h1>
            <h1 @dede  style="color:green"> <span @firstName>lukasz</span> - <span @lastName></span> </h1>
              <h1 @dede  style="color:blue"> <span @firstName>lukasz</span><span></span> - <span @lastName></span> </h1> -->


            <div style="display: flex; color: red"> <h1 @firstName></h1> <h1> - </h1> <h1 @lastName></h1></div>
            <div style="display: flex; color: green"> <h1 @firstName></h1> <h1> - </h1> <h1 @lastName></h1></div>
            <div style="display: flex; color: blue"> <h1 @firstName></h1> <h1> - </h1> <h1 @lastName></h1></div>

      
        </div>
      </div>
      <div id="middle-page" class="page">
        <div @pageContent id="page-content" class="box">

        </div>
      </div>


      <style>
      *{
        margin: 0; 
        padding: 0;
        box-sizing: border-box;
        font-size:5mm;
      }

      .page-content{
        // border: 10px solid yellow;
        // height: calc(1000px - 40mm);
      }

      .page{
        width: 210mm;
        max-height: 297mm;
        // width: 350px;
        height: 297mm;
        border: 1px solid green;
        padding: 20mm;

      }
      </style>
   `;

  public static data = {
    firstName: 'Imię',
    lastName: 'Nazwisko',
    items: [{ 1: 'jeden' }, { 2: 'dwa' }, { 3: 'trzy' }, { 4: 'cztery' }],
    description: `jeden dwa trzy cztery piec szesc siedem osiem dziewiec dziesiec 
    jedenascie dwanascie trzynascie czternascie pietnascie 
      szesnascie siedemnascie osiemnascie dziewietnascie dwadziescia`,
  };
}
