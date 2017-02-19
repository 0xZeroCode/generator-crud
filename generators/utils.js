function fileCondition(file) {
  var extension = file.relative.split('.')[1];

  return file.relative !== '.gitignore' && extension !== 'html';
}

module.exports = {
  fileCondition: fileCondition
};
