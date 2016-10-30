function interactiveHero() {
  var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight,
    {
      transparent : true,
      autoResize : true
    });

  // insert stage (canvas element) into DOM
  $('#site-intro').append(renderer.view)

  // create root container to hold the scene
  var stage = new PIXI.Container();
  stage.interactive = true;

  var container = new PIXI.Container();
  stage.addChild(container);

  // container.scale.x = 1;
  // container.scale.y = 1;

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

    welcomeText.y = (window.innerHeight / 2) - (welcomeText.height / 2);
    welcomeText.x = (window.innerWidth / 2) - (welcomeText.width / 2);

    container.addChild(welcomeText);

    var displacementSprite = new PIXI.Sprite(
      PIXI.loader.resources['/assets/home-hero/displace.png'].texture
    );

    var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

    stage.addChild(displacementSprite);

    container.filters = [displacementFilter];
    displacementFilter.scale.x = 110;
    displacementFilter.scale.y = 110;

    stage
        .on('mousemove', onPointerMove)
        .on('touchmove', onPointerMove);

    function onPointerMove(eventData) {
        displacementSprite.x = eventData.data.global.x - 100;
        displacementSprite.y = eventData.data.global.y - displacementSprite.height /2;
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