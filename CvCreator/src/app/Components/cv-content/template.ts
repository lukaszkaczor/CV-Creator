export class Template {
  public static htmlPattern = `
   
    <div @firstPage id="first-page" class="page" >
      <div @pageContent id="page-content" class="page-content">

          <div @list>
            <h1 @first></h1>
            <h1 @second></h1>
          </div>

      </div>
    </div>
    <div id="middle-page" class="page">
      <div @pageContent id="page-content" class="box">

  


      </div>
    </div>
    <div id="last-page" class="page">
      <div class="box"></div>
    </div>

 
    <style>

    .page-content{
      // border: 10px solid yellow;
      // max-height: 100%
    }

    .page{
      width: 350px;
      max-height: 500px;
      // width: 350px;
      height: 500px;
      border: 1px solid green
    }
    </style>
 `;
  //   public static htmlPattern = `

  //     <div @firstPage id="first-page" class="page" >
  //       <div @pageContent id="page-content" class="page-content">

  //           <div @list>
  //             <h1 @first></h1>
  //             <h1 @second></h1>
  //           </div>

  //           <h1> <span @firstName>lukasz</span> - <span @lastName></span> </h1>

  //           <h1> <span @firstName>lukasz</span> - <span @lastName></span> </h1>
  //          <div><h1 @description></h1></div>
  //           <h2 @description></h2>
  //           <div><h2 @description></h2></div>
  //           <h2 @description></h2>

  //           <h1 @description style="color: orange"></h1>
  //           <h2 style="color:red" @description></h2>
  //           <h2 style="color:green;" @description></h2>
  //           <h2 style="color:green" @description></h2>
  //           <h2 style="color:green" @description></h2>
  //           <h2 style="color:green" @description></h2>
  //           <h2 style="color:green" @description></h2>
  //           <h2 style="color:green" @description></h2>
  //           <h2 style="color:green" @description></h2>
  //           <h2 style="color:green" @description></h2>
  //           <h2 style="color:blue" @description></h2>
  //           <h1 @dede style="color:red"> <span @firstName>lukasz</span> - <span @lastName></span> </h1>
  //           <h1  style="color:green"> <span @firstName>lukasz</span> - <span @lastName></span> </h1>
  //           <h1  style="color:blue"> <span @firstName>lukasz</span> - <span @lastName></span> </h1>
  //       </div>
  //     </div>
  //     <div id="middle-page" class="page">
  //       <div @pageContent id="page-content" class="box">

  //       </div>
  //     </div>
  //     <div id="last-page" class="page">
  //       <div class="box"></div>
  //     </div>

  //     <style>

  //     .page-content{
  //       // border: 10px solid yellow;
  //       // max-height: 100%
  //     }

  //     .page{
  //       width: 350px;
  //       max-height: 500px;
  //       // width: 350px;
  //       height: 500px;
  //       border: 1px solid green
  //     }
  //     </style>
  //  `;

  public static data = {
    firstName: 'Imię',
    lastName: 'Nazwisko',
    items: [{ 1: 'jeden' }, { 2: 'dwa' }, { 3: 'trzy' }, { 4: 'cztery' }],
    description: `jeden dwa trzy cztery piec szesc siedem osiem dziewiec dziesiec 
    jedenascie dwanascie trzynascie czternascie pietnascie 
      szesnascie siedemnascie osiemnascie dziewietnascie dwadziescia`,
  };
}
