function interactiveHero() {
  var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight,
    {
      transparent : true,
      autoResize : true
    });

  // insert stage (canvas element) into DOM
  $('.site-intro').append(renderer.view)

  // create root container to hold the scene
  var stage = new PIXI.Container();
  stage.interactive = true;

  // declare global variable for the sprite so that animate() can access it
  var welcomeText;

  PIXI.loader.add('welcomeText', '/assets/home-hero/welcome.png').load(function (loader, resources) {

    // assign sprite to
    welcomeText = new PIXI.Sprite(resources.welcomeText.texture);

    // set texture position
    var welcomeTextWidth = welcomeText.width;
    var welcomeTextHeight = welcomeText.height;

    welcomeText.y = (window.innerHeight / 2) - (welcomeText.height / 2);
    welcomeText.x = (window.innerWidth / 2) - (welcomeText.width / 2);

    // add texture to DOM
    stage.addChild(welcomeText);

    // init animation
    animate();

    function animate() {
      renderer.render(stage);
      requestAnimationFrame(animate);
    }
  })
}

$(function(){
  console.log('hero.js running...');

  // init functions
  interactiveHero();
})