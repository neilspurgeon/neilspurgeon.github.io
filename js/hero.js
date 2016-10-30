function interactiveHero() {
  var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, {
    transparent : true
  })

  // insert stage (canvas element) into DOM
  $('#site-intro').append(renderer.view)

  // create root container to hold the scene
  var stage = new PIXI.Container();
  stage.interactive = true;

  var container = new PIXI.Container();
  stage.addChild(container);

  PIXI.loader
    .add([
      '/assets/home-hero/welcome.png',
      '/assets/home-hero/displace.png'
      ])
    .load(setup);

  function setup() {
    var welcomeText = new PIXI.Sprite(
      PIXI.loader.resources['/assets/home-hero/welcome.png'].texture
    );

    // get window size
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    // find amount to scale image
    var imgScale = windowWidth / welcomeText.width;

    // resize image to width of screen
    welcomeText.height = welcomeText.height * imgScale;
    welcomeText.width = welcomeText.width * imgScale;

    // set sprite's position to center of window
    welcomeText.x = (windowWidth / 2) - (welcomeText.width / 2);
    welcomeText.y = (windowHeight / 2) - (welcomeText.height / 2);

    console.log(welcomeText.width)
    // add sprite to DOM
    container.addChild(welcomeText);

    var displacementSprite = new PIXI.Sprite(
      PIXI.loader.resources['/assets/home-hero/displace.png'].texture
    );

    var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

    container.filters = [displacementFilter];

    // set sprite's scale
    displacementFilter.scale.x = 110;
    displacementFilter.scale.y = 110;

    // add sprite to DOM
    stage.addChild(displacementSprite);

    // trigger function when mouse moves or touched
    stage
        .on('mousemove', onPointerMove)
        .on('touchmove', onPointerMove);

    function onPointerMove(eventData) {
        displacementSprite.x = eventData.data.global.x - 100;
        displacementSprite.y = eventData.data.global.y - displacementSprite.height /2;
    }

    // Resize renderer and re-center background image on window resize
    window.onresize = function (event){
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;

      // resize renderer to window
      renderer.resize(windowWidth,windowHeight);

      // find amount to scale image
      imgScale = windowWidth / welcomeText.width;

      // resize image to width of screen
      welcomeText.height = welcomeText.height * imgScale;
      welcomeText.width = welcomeText.width * imgScale;

      // reposition the image to screen center
      welcomeText.x = (windowWidth / 2) - (welcomeText.width / 2);
      welcomeText.y = (windowHeight / 2) - (welcomeText.height / 2);
    }
  }

  animate();

  function animate() {
    renderer.render(stage);
    requestAnimationFrame(animate);
  }
}

$(function(){
  console.log('hero.js running...');

  // init functions
  interactiveHero();
})