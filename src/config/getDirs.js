
function getDirs() {
    const PATHS = getPaths();
  
    return {
      UPLOAD_DIR: PATHS.upload,
      IMAGES_DIR: PATHS.images,
      DB_PATH: path.join(PATHS.images, "images.json")
    };
  }