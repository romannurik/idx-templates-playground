import * as THREE from 'three';

const renderListeners = [];

export function setup3dScene(selector) {
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.set(0, 0, 3);

  let resize = () => {
    camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.render(scene, camera);
  };

  const canvas = document.querySelector(selector);
  canvas.appendChild(renderer.domElement);
  const resizeObserver = new ResizeObserver(() => resize());
  resizeObserver.observe(canvas);
  resize();

  let clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    let delta = clock.getDelta();
    renderListeners.forEach(listener => listener(delta));
    renderer.render(scene, camera);
  });

  // setup objects in the scnee
  setupLights(scene);
  setupObjects(scene);
}

function setupLights(scene) {
  const directionalLight = new THREE.DirectionalLight();
  directionalLight.position.set(10, 10, 10);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2024;
  directionalLight.shadow.mapSize.height = 2024;

  const ambientLight = new THREE.AmbientLight(undefined, Math.PI / 2);

  const spotLight = new THREE.SpotLight(undefined, Math.PI, undefined, 0.15, 1, 0);
  spotLight.position.set(10, 10, 10);

  const pointLight = new THREE.PointLight(undefined, Math.PI, undefined, 0);
  pointLight.position.set(-10, -10, -10);

  scene.add(directionalLight, ambientLight, spotLight, pointLight);
}

function setupObjects(scene) {
  scene.add(
    addCube([-1, 0.5, 0], 1),
    addCube([1.2, -0, 0], 1.5),
    addCube([0, -0.5, 0], 0.5),
    addShadowPlane(),
  );
}

function addCube([x, y, z], speed) {
  const cube = new THREE.Mesh();
  cube.position.set(x, y, z);
  cube.material = new THREE.MeshPhongMaterial({ color: 0x603BCE });
  cube.geometry = new THREE.BoxGeometry(1, 1, 1);
  cube.castShadow = true;
  cube.scale.set(0.3, 0.3, 0.3);
  renderListeners.push((delta) => {
    let [x, y, z] = cube.position.toArray();
    x += delta * (speed ?? 1);
    if (x > 2.5) {
      x = -2.5
      y = Math.random() * 1 - 0.5;
    }
    cube.position.set(x, y, z);
    ([x, y, z] = cube.rotation.toArray());
    x += delta * (speed ?? 1);
    z += delta * 0.5;
    cube.rotation.set(x, y, z);
  });

  return cube;
}

function addShadowPlane() {
  const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry());
  shadowPlane.receiveShadow = true;
  shadowPlane.position.set(0, 0, -0.5);
  shadowPlane.material = new THREE.ShadowMaterial({
    opacity: 0.5,
    transparent: true,
  });
  renderListeners.push(() => {
    shadowPlane.scale.set(window.innerWidth * 2, window.innerHeight * 2, 1);
  });
  return shadowPlane;
}